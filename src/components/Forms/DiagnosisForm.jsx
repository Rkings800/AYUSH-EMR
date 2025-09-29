import React, { useState } from 'react';
import { 
  Stethoscope, Plus, Trash2, Save, Upload, FileText, AlertCircle 
} from 'lucide-react';
import TerminologySearch from "../../pages/Doctor/TerminologySearch";

const DiagnosisForm = ({ patientId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: patientId || '',
    encounterDate: new Date().toISOString().split('T')[0],
    encounterType: 'consultation',
    chiefComplaint: '',
    clinicalNotes: '',
    vitals: { bloodPressure:'', heartRate:'', temperature:'', weight:'', height:'', oxygenSaturation:'' },
    diagnoses: [],
    prescriptions: [],
    attachments: []
  });

  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Input handlers */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name.startsWith('vitals.')){
      const key = name.split('.')[1];
      setFormData(prev => ({ ...prev, vitals: { ...prev.vitals, [key]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  /** Diagnosis handlers */
  const handleDiagnosisSelect = (diagnosis) => setSelectedDiagnosis(diagnosis);

  const addDiagnosis = () => {
    if(!selectedDiagnosis) return;
    const newDiagnosis = { id: Date.now(), ...selectedDiagnosis, notes: '', includeBiomedical: true };
    setFormData(prev => ({ ...prev, diagnoses: [...prev.diagnoses, newDiagnosis] }));
    setSelectedDiagnosis(null);
  };

  const removeDiagnosis = (id) => setFormData(prev => ({ ...prev, diagnoses: prev.diagnoses.filter(d => d.id !== id) }));
  const updateDiagnosisNotes = (id, notes) => setFormData(prev => ({ 
    ...prev, diagnoses: prev.diagnoses.map(d => d.id === id ? { ...d, notes } : d) 
  }));

  /** Prescription handlers */
  const addPrescription = () => setFormData(prev => ({ 
    ...prev, prescriptions: [...prev.prescriptions, { id: Date.now(), medication:'', strength:'', form:'tablet', dosage:'', frequency:'', duration:'', instructions:'' }] 
  }));

  const updatePrescription = (id, field, value) => setFormData(prev => ({ 
    ...prev, prescriptions: prev.prescriptions.map(p => p.id === id ? { ...p, [field]: value } : p) 
  }));

  const removePrescription = (id) => setFormData(prev => ({ ...prev, prescriptions: prev.prescriptions.filter(p => p.id !== id) }));

  /** File attachments */
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map(file => ({ id: Date.now()+Math.random(), name: file.name, size:file.size, type:file.type, file }));
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeAttachment = (id) => setFormData(prev => ({ ...prev, attachments: prev.attachments.filter(a => a.id !== id) }));

  /** Validation */
  const validateForm = () => {
    const newErrors = {};
    if(!formData.patientId.trim()) newErrors.patientId = 'Patient ID is required';
    if(!formData.chiefComplaint.trim()) newErrors.chiefComplaint = 'Chief complaint is required';
    if(!formData.clinicalNotes.trim()) newErrors.clinicalNotes = 'Clinical notes are required';
    if(formData.diagnoses.length === 0) newErrors.diagnoses = 'At least one diagnosis is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Convert form data to FHIR bundle format
      const bundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: [
          {
            resource: {
              resourceType: "Encounter",
              id: `encounter-${Date.now()}`,
              status: "finished",
              class: {
                system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                code: formData.encounterType
              },
              subject: {
                reference: `Patient/${formData.patientId}`
              },
              period: {
                start: new Date(formData.encounterDate).toISOString()
              },
              reasonCode: [{
                text: formData.chiefComplaint
              }]
            }
          },
          {
            resource: {
              resourceType: "Observation",
              id: `observation-${Date.now()}`,
              status: "final",
              category: [{
                coding: [{
                  system: "http://terminology.hl7.org/CodeSystem/observation-category",
                  code: "vital-signs"
                }]
              }],
              code: {
                text: "Vital Signs"
              },
              subject: {
                reference: `Patient/${formData.patientId}`
              },
              component: [
                formData.vitals.bloodPressure && {
                  code: { text: "Blood Pressure" },
                  valueString: formData.vitals.bloodPressure
                },
                formData.vitals.heartRate && {
                  code: { text: "Heart Rate" },
                  valueQuantity: {
                    value: parseFloat(formData.vitals.heartRate),
                    unit: "beats/min"
                  }
                },
                formData.vitals.temperature && {
                  code: { text: "Temperature" },
                  valueQuantity: {
                    value: parseFloat(formData.vitals.temperature),
                    unit: "Cel"
                  }
                }
              ].filter(Boolean)
            }
          },
          ...formData.diagnoses.map(diagnosis => ({
            resource: {
              resourceType: "Condition",
              id: `condition-${diagnosis.id}`,
              clinicalStatus: {
                coding: [{
                  system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  code: "active"
                }]
              },
              code: {
                coding: [{
                  system: "http://snomed.info/sct",
                  code: diagnosis.namasteCode,
                  display: diagnosis.namasteName
                }],
                text: diagnosis.notes
              },
              subject: {
                reference: `Patient/${formData.patientId}`
              }
            }
          })),
          ...formData.prescriptions.map(prescription => ({
            resource: {
              resourceType: "MedicationRequest",
              id: `medication-${prescription.id}`,
              status: "active",
              intent: "order",
              medicationCodeableConcept: {
                text: prescription.medication
              },
              subject: {
                reference: `Patient/${formData.patientId}`
              },
              dosageInstruction: [{
                text: `${prescription.dosage} ${prescription.frequency} for ${prescription.duration}`,
                additionalInstruction: [{
                  text: prescription.instructions
                }]
              }]
            }
          }))
        ]
      };

      // Import the doctorAPI at the top of the file
      const { doctorAPI } = await import('../../api/api.js');
      
      const response = await doctorAPI.uploadBundle(bundle);
      
      onSuccess && onSuccess({ originalFormData: formData, savedData: response.data });
    } catch(err) {
      console.error('Error saving diagnosis', err);
      setErrors({ submit: `Failed to save diagnosis: ${err.message}` });
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 bg-mint-100 rounded flex items-center justify-center"><Stethoscope className="h-5 w-5 text-mint-600" /></div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Diagnosis & Prescription Form</h2>
            <p className="text-gray-600">Record a new encounter</p>
          </div>
        </div>

        {errors.submit && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-center"><AlertCircle className="h-4 w-4 text-red-600 mr-2"/><p className="text-sm text-red-600">{errors.submit}</p></div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient ID *</label>
              <input name="patientId" value={formData.patientId} onChange={handleChange} className={`input-field ${errors.patientId ? 'border-red-300' : ''}`} placeholder="Enter patient ID" />
              {errors.patientId && <p className="text-sm text-red-600">{errors.patientId}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Encounter Date</label>
              <input type="date" name="encounterDate" value={formData.encounterDate} onChange={handleChange} className="input-field" />
            </div>
          </div>

          {/* Complaint & Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Chief Complaint *</label>
            <textarea name="chiefComplaint" rows={2} value={formData.chiefComplaint} onChange={handleChange} className={`input-field ${errors.chiefComplaint ? 'border-red-300' : ''}`} />
            {errors.chiefComplaint && <p className="text-sm text-red-600">{errors.chiefComplaint}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Clinical Notes *</label>
            <textarea name="clinicalNotes" rows={3} value={formData.clinicalNotes} onChange={handleChange} className={`input-field ${errors.clinicalNotes ? 'border-red-300' : ''}`} />
            {errors.clinicalNotes && <p className="text-sm text-red-600">{errors.clinicalNotes}</p>}
          </div>

          {/* Diagnoses */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Diagnoses</h3>
            <TerminologySearch onSelect={handleDiagnosisSelect} />
            {selectedDiagnosis && (
              <div className="mt-3 flex items-center justify-between p-3 bg-mint-50 rounded">
                <p className="text-sm font-medium">{selectedDiagnosis.namasteName}</p>
                <button type="button" onClick={addDiagnosis} className="btn-primary flex items-center"><Plus className="h-4 w-4 mr-1"/> Add</button>
              </div>
            )}
            {errors.diagnoses && <p className="text-sm text-red-600 mt-2">{errors.diagnoses}</p>}
            <div className="mt-4 space-y-3">
              {formData.diagnoses.map(d => (
                <div key={d.id} className="p-4 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div><p className="font-medium">{d.namasteName}</p><p className="text-xs text-gray-500">NAMASTE: {d.namasteCode} | ICD: {d.icdCode}</p></div>
                    <button type="button" onClick={() => removeDiagnosis(d.id)} className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4"/></button>
                  </div>
                  <textarea rows={2} value={d.notes} onChange={e => updateDiagnosisNotes(d.id, e.target.value)} className="input-field" placeholder="Notes..." />
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Prescriptions</h3>
              <button type="button" onClick={addPrescription} className="btn-primary flex items-center"><Plus className="h-4 w-4 mr-1"/> Add Medication</button>
            </div>
            {formData.prescriptions.map(p => (
              <div key={p.id} className="p-4 border rounded mb-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Medication</h4>
                  <button type="button" onClick={() => removePrescription(p.id)} className="text-red-600"><Trash2 className="h-4 w-4"/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input placeholder="Medication Name" value={p.medication} onChange={e=>updatePrescription(p.id,'medication',e.target.value)} className="input-field" />
                  <input placeholder="Strength" value={p.strength} onChange={e=>updatePrescription(p.id,'strength',e.target.value)} className="input-field" />
                  <select value={p.form} onChange={e=>updatePrescription(p.id,'form',e.target.value)} className="input-field"><option>tablet</option><option>capsule</option><option>syrup</option><option>injection</option></select>
                  <input placeholder="Dosage" value={p.dosage} onChange={e=>updatePrescription(p.id,'dosage',e.target.value)} className="input-field" />
                  <input placeholder="Frequency" value={p.frequency} onChange={e=>updatePrescription(p.id,'frequency',e.target.value)} className="input-field" />
                  <input placeholder="Duration" value={p.duration} onChange={e=>updatePrescription(p.id,'duration',e.target.value)} className="input-field" />
                </div>
                <textarea placeholder="Instructions" rows={2} value={p.instructions} onChange={e=>updatePrescription(p.id,'instructions',e.target.value)} className="input-field mt-2" />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="btn-secondary" disabled={isSubmitting}>Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center">
              {isSubmitting ? <Upload className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2"/>}
              {isSubmitting ? 'Saving...' : 'Save Diagnosis'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiagnosisForm;