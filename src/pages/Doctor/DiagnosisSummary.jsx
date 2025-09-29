import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DiagnosisSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { diagnosisData, patientData } = location.state || {};

  if (!diagnosisData || !patientData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No diagnosis data available.</p>
        <button onClick={() => navigate('/app/doctor/patients')} className="btn-primary mt-4">
          Back to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-mint-600 hover:text-mint-700">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </button>

      <div className="card p-4 space-y-4">
        <h1 className="text-2xl font-bold">Diagnosis Summary</h1>

        <div>
          <h2 className="font-semibold">Patient Info</h2>
          <p><strong>Name:</strong> {patientData.name}</p>
          <p><strong>Age:</strong> {patientData.age}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
        </div>

        <div>
          <h2 className="font-semibold">Encounter Details</h2>
          <p><strong>Chief Complaint:</strong> {diagnosisData.chiefComplaint}</p>
          <p><strong>Clinical Notes:</strong> {diagnosisData.clinicalNotes}</p>
        </div>

        <div>
          <h2 className="font-semibold">Diagnoses</h2>
          {diagnosisData.diagnoses?.length > 0 ? (
            <ul className="list-disc list-inside">
              {diagnosisData.diagnoses.map(d => (
                <li key={d.id}>{d.namasteName} ({d.icdCode}) - Notes: {d.notes}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No diagnoses added</p>
          )}
        </div>

        <div>
          <h2 className="font-semibold">Prescriptions</h2>
          {diagnosisData.prescriptions?.length > 0 ? (
            <ul className="list-disc list-inside">
              {diagnosisData.prescriptions.map(p => (
                <li key={p.id}>{p.medication} - {p.dosage} {p.frequency} for {p.duration}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No prescriptions added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisSummary;