import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, Plus, Trash2, Save, Upload, FileText, AlertCircle 
} from 'lucide-react';
import { doctorAPI } from '../../api/api';

// Global test function for debugging
if (typeof window !== 'undefined') {
  window.testAPI = async () => {
    console.log('Testing API connection...');
    try {
      const testBundle = {
        resourceType: "Bundle",
        type: "collection",
        timestamp: new Date().toISOString(),
        entry: [{
          resource: {
            resourceType: "Encounter",
            status: "finished",
            subject: { reference: "Patient/test-123" },
            period: { start: new Date().toISOString() }
          }
        }]
      };
      
      console.log('Sending test bundle:', testBundle);
      const response = await doctorAPI.uploadBundle(testBundle);
      console.log('API test successful:', response);
      return response;
    } catch (error) {
      console.error('API test failed:', error);
      throw error;
    }
  };
  
  console.log('Test API function available: window.testAPI()');
}
import TerminologySearch from "../../pages/Doctor/TerminologySearch";

const DiagnosisForm = ({ patientId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: patientId || '',
    encounterDate: new Date().toISOString().split('T')[0],
    encounterType: 'consultation',
    chiefComplaint: '',
    clinicalNotes: '',
    vitals: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      weight: '',
      height: '',
      oxygenSaturation: ''
    },
    diagnoses: [],
    prescriptions: [],
    attachments: []
  });

  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Handle basic input */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('vitals.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({ ...prev, vitals: { ...prev.vitals, [key]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  /** Diagnosis handlers */
  const handleDiagnosisSelect = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
  };

  const addDiagnosis = () => {
    if (!selectedDiagnosis) return;
    const newDiagnosis = {
      id: Date.now(),
      ...selectedDiagnosis,
      notes: '',
      includeBiomedical: true,
    };
    setFormData(prev => ({ ...prev, diagnoses: [...prev.diagnoses, newDiagnosis] }));
    setSelectedDiagnosis(null);
  };

  const removeDiagnosis = (id) => {
    setFormData(prev => ({ ...prev, diagnoses: prev.diagnoses.filter(d => d.id !== id) }));
  };

  const updateDiagnosisNotes = (id, notes) => {
    setFormData(prev => ({
      ...prev,
      diagnoses: prev.diagnoses.map(d => d.id === id ? { ...d, notes } : d)
    }));
  };

  const toggleBiomedical = (id) => {
    setFormData(prev => ({
      ...prev,
      diagnoses: prev.diagnoses.map(d => d.id === id ? { ...d, includeBiomedical: !d.includeBiomedical } : d)
    }));
  };

  /** Prescription handlers */
  const addPrescription = () => {
    setFormData(prev => ({
      ...prev,
      prescriptions: [
        ...prev.prescriptions,
        { id: Date.now(), medication: '', strength: '', form: 'tablet', dosage: '', frequency: '', duration: '', instructions: '' }
      ]
    }));
  };

  const updatePrescription = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const removePrescription = (id) => {
    setFormData(prev => ({ ...prev, prescriptions: prev.prescriptions.filter(p => p.id !== id) }));
  };

  /** File uploads */
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file
    }));
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeAttachment = (id) => {
    setFormData(prev => ({ ...prev, attachments: prev.attachments.filter(a => a.id !== id) }));
  };

  /** Validation */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientId.trim()) newErrors.patientId = 'Patient ID is required';
    if (!formData.chiefComplaint.trim()) newErrors.chiefComplaint = 'Chief complaint is required';
    if (!formData.clinicalNotes.trim()) newErrors.clinicalNotes = 'Clinical notes are required';
    if (formData.diagnoses.length === 0) newErrors.diagnoses = 'At least one diagnosis is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** FHIR bundle composer */
  const composeFhirBundle = () => ({
    resourceType: 'Bundle',
    type: 'collection',
    timestamp: new Date().toISOString(),
    entry: [
      {
        resource: {
          resourceType: 'Encounter',
          status: 'finished',
          subject: { reference: `Patient/${formData.patientId}` },
          period: { start: formData.encounterDate }
        }
      },
      ...formData.diagnoses.map(d => ({
        resource: {
          resourceType: 'Condition',
          code: { text: d.namasteName, coding: [{ code: d.icdCode, display: d.icdName }] },
          subject: { reference: `Patient/${formData.patientId}` },
          note: [{ text: d.notes }]
        }
      })),
      ...formData.prescriptions.map(p => ({
        resource: {
          resourceType: 'MedicationRequest',
          status: 'active',
          intent: 'order',
          medicationCodeableConcept: { text: p.medication },
          subject: { reference: `Patient/${formData.patientId}` },
          dosageInstruction: [{ text: `${p.dosage} ${p.frequency} for ${p.duration}`, additionalInstruction: [{ text: p.instructions }] }]
        }
      }))
    ]
  });

  /** Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    setIsSubmitting(true);
    try {
      const bundle = composeFhirBundle();
      console.log('Composed FHIR bundle:', bundle);
      const res = await doctorAPI.uploadBundle(bundle);
      console.log('API response:', res);
      if (res.data.success) {
        console.log('Success - calling onSuccess with data:', {
          ...res.data,
          originalFormData: formData
        });
        // Pass both the response data and the original form data
        onSuccess && onSuccess({
          ...res.data,
          originalFormData: formData
        });
      }
    } catch (error) {
      console.error('Bundle upload error:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error config:', error.config);
      const errorMessage = error.response?.data?.message || error.message || 'Please try again.';
      setErrors({ submit: `Failed to save diagnosis: ${errorMessage}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 bg-mint-100 rounded-lg flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-mint-600" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-gray-900">
              Diagnosis & Prescription Form
            </h2>
            <p className="text-gray-600">Record a new encounter with diagnosis and prescriptions</p>
          </div>
        </div>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient ID *</label>
              <input
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className={`input-field ${errors.patientId ? 'border-red-300' : ''}`}
                placeholder="Enter patient ID or ABHA"
              />
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
            <textarea
              name="chiefComplaint"
              rows={2}
              value={formData.chiefComplaint}
              onChange={handleChange}
              className={`input-field ${errors.chiefComplaint ? 'border-red-300' : ''}`}
            />
            {errors.chiefComplaint && <p className="text-sm text-red-600">{errors.chiefComplaint}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Clinical Notes *</label>
            <textarea
              name="clinicalNotes"
              rows={3}
              value={formData.clinicalNotes}
              onChange={handleChange}
              className={`input-field ${errors.clinicalNotes ? 'border-red-300' : ''}`}
            />
            {errors.clinicalNotes && <p className="text-sm text-red-600">{errors.clinicalNotes}</p>}
          </div>

          {/* Vitals */}
          <div className="card">
            <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">Vitals</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(formData.vitals).map(key => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    name={`vitals.${key}`}
                    value={formData.vitals[key]}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Diagnoses */}
          <div className="card">
            <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">Diagnoses</h3>
            <TerminologySearch onSelect={handleDiagnosisSelect} />
            {selectedDiagnosis && (
              <div className="mt-3 flex items-center justify-between p-3 bg-mint-50 rounded-lg">
                <p className="text-sm font-medium">{selectedDiagnosis.namasteName}</p>
                <button type="button" onClick={addDiagnosis} className="btn-primary flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </button>
              </div>
            )}
            {errors.diagnoses && <p className="text-sm text-red-600 mt-2">{errors.diagnoses}</p>}

            <div className="mt-4 space-y-3">
              {formData.diagnoses.map(d => (
                <div key={d.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{d.namasteName}</p>
                      <p className="text-xs text-gray-500">NAMASTE: {d.namasteCode} | ICD: {d.icdCode}</p>
                    </div>
                    <button type="button" onClick={() => removeDiagnosis(d.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={d.notes}
                    onChange={e => updateDiagnosisNotes(d.id, e.target.value)}
                    className="input-field"
                    placeholder="Notes for this diagnosis..."
                  />
                  {d.translatedCodes?.length > 0 && (
                    <div className="mt-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={d.includeBiomedical} onChange={() => toggleBiomedical(d.id)} />
                        <span className="text-sm">Include biomedical codes</span>
                      </label>
                      <div className="mt-1 text-xs text-gray-600">
                        {d.translatedCodes.map((c, i) => <div key={i}>{c.code} - {c.name}</div>)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-gray-900">Prescriptions</h3>
              <button type="button" onClick={addPrescription} className="btn-primary flex items-center">
                <Plus className="h-4 w-4 mr-1" /> Add Medication
              </button>
            </div>
            {formData.prescriptions.map(p => (
              <div key={p.id} className="p-4 border rounded-lg mb-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Medication</h4>
                  <button type="button" onClick={() => removePrescription(p.id)} className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input placeholder="Medication Name" value={p.medication} onChange={e => updatePrescription(p.id, 'medication', e.target.value)} className="input-field" />
                  <input placeholder="Strength" value={p.strength} onChange={e => updatePrescription(p.id, 'strength', e.target.value)} className="input-field" />
                  <select value={p.form} onChange={e => updatePrescription(p.id, 'form', e.target.value)} className="input-field">
                    <option>tablet</option><option>capsule</option><option>syrup</option><option>injection</option><option>cream</option><option>drops</option>
                  </select>
                  <input placeholder="Dosage" value={p.dosage} onChange={e => updatePrescription(p.id, 'dosage', e.target.value)} className="input-field" />
                  <input placeholder="Frequency" value={p.frequency} onChange={e => updatePrescription(p.id, 'frequency', e.target.value)} className="input-field" />
                  <input placeholder="Duration" value={p.duration} onChange={e => updatePrescription(p.id, 'duration', e.target.value)} className="input-field" />
                </div>
                <textarea placeholder="Instructions" rows={2} value={p.instructions} onChange={e => updatePrescription(p.id, 'instructions', e.target.value)} className="input-field mt-2" />
              </div>
            ))}
          </div>

          {/* Attachments */}
          <div className="card">
            <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">Attachments</h3>
            <input type="file" multiple onChange={handleFileUpload} className="input-field" />
            {formData.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.attachments.map(a => (
                  <div key={a.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{a.name}</span>
                    </div>
                    <button type="button" onClick={() => removeAttachment(a.id)} className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="btn-secondary" disabled={isSubmitting}>Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center" onClick={(e) => { console.log('Submit button clicked'); }}>
              {isSubmitting ? <Upload className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {isSubmitting ? 'Saving...' : 'Save Diagnosis'}
            </button>
            <button
              type="button"
              onClick={async () => {
                console.log('=== DIRECT API TEST STARTING ===');
                try {
                  console.log('1. Creating test bundle...');
                  const testBundle = {
                    resourceType: 'Bundle',
                    type: 'collection',
                    timestamp: new Date().toISOString(),
                    entry: [{
                      resource: {
                        resourceType: 'Encounter',
                        status: 'finished',
                        subject: { reference: 'Patient/test-123' },
                        period: { start: new Date().toISOString() }
                      }
                    }]
                  };
                  
                  console.log('2. Test bundle created:', testBundle);
                  console.log('3. Calling doctorAPI.uploadBundle...');
                  
                  const response = await doctorAPI.uploadBundle(testBundle);
                  
                  console.log('4. API Response received:', response);
                  console.log('5. Response data:', response.data);
                  
                  if (response.data && response.data.success) {
                    console.log('✅ DIRECT API TEST SUCCESSFUL!');
                    alert(`✅ API Test Successful!\nResponse: ${JSON.stringify(response.data, null, 2)}`);
                  } else {
                    console.log('❌ API returned but success=false');
                    alert(`❌ API returned but success=false\nResponse: ${JSON.stringify(response.data, null, 2)}`);
                  }
                } catch (error) {
                  console.error('❌ DIRECT API TEST FAILED:', error);
                  console.error('Error details:', {
                    message: error.message,
                    response: error.response,
                    config: error.config
                  });
                  alert(`❌ API Test Failed!\nError: ${error.message}\nCheck console for full details.`);
                }
                console.log('=== DIRECT API TEST COMPLETED ===');
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-bold"
            >
              🧪 TEST API DIRECTLY
            </button>
            <button
              type="button"
              onClick={async () => {
                console.log('=== FETCH TEST STARTING ===');
                try {
                  const testBundle = {
                    resourceType: 'Bundle',
                    type: 'collection',
                    timestamp: new Date().toISOString(),
                    entry: [{
                      resource: {
                        resourceType: 'Encounter',
                        status: 'finished',
                        subject: { reference: 'Patient/test-123' },
                        period: { start: new Date().toISOString() }
                      }
                    }]
                  };
                  
                  console.log('Testing with fetch...');
                  const response = await fetch('http://localhost:8000/api/v1/namaste/bundles/upload', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer test-token-123'
                    },
                    body: JSON.stringify(testBundle)
                  });
                  
                  console.log('Fetch response status:', response.status);
                  const data = await response.json();
                  console.log('Fetch response data:', data);
                  
                  if (data.success) {
                    alert(`✅ Fetch Test Successful!\nResponse: ${JSON.stringify(data, null, 2)}`);
                  } else {
                    alert(`❌ Fetch Test Failed!\nResponse: ${JSON.stringify(data, null, 2)}`);
                  }
                } catch (error) {
                  console.error('❌ FETCH TEST FAILED:', error);
                  alert(`❌ Fetch Test Failed!\nError: ${error.message}`);
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-bold"
            >
              🌐 TEST WITH FETCH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiagnosisForm;