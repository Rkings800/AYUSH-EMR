import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, AlertCircle } from 'lucide-react';
import DiagnosisForm from '../../components/Forms/DiagnosisForm';
import TerminologySearch from './TerminologySearch';

const Diagnose = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        // Mock patient data
        const mockPatient = {
          id: patientId,
          name: 'Rajesh Kumar',
          age: 45,
          gender: 'Male',
          abhaId: 'ABHA-1234567890',
          phone: '+91-98765-43210',
          address: '123 Main Street, Mumbai',
          medicalHistory: 'Type 2 Diabetes, Hypertension',
          allergies: 'Penicillin',
          emergencyContact: '+91-98765-43211'
        };
        setPatient(mockPatient);
      } catch (err) {
        setError('Failed to load patient information');
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [patientId]);

  const handleSuccess = (responseData) => {
    navigate('/app/doctor/diagnosis-summary', {
      state: {
        diagnosisData: responseData?.originalFormData || responseData,
        patientData: patient
      }
    });
  };

  const handleCancel = () => navigate('/app/doctor/patients');

  if (loading) return <div className="p-6 animate-pulse">Loading patient info...</div>;
  if (error) return (
    <div className="text-center py-12">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium">{error}</h3>
      <button onClick={handleCancel} className="btn-primary mt-4">Back to Patients</button>
    </div>
  );

  return (
    <div className="space-y-6">
      <button onClick={handleCancel} className="flex items-center text-mint-600 hover:text-mint-700">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Patients
      </button>

      {patient && (
        <div className="card p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-12 w-12 bg-mint-100 rounded flex items-center justify-center">
              <User className="h-6 w-6 text-mint-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Diagnose Patient</h1>
              <p className="text-gray-600">Creating diagnosis for {patient.name}</p>
            </div>
          </div>

          <DiagnosisForm
            patientId={patientId}
            selectedDiagnosis={selectedDiagnosis}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default Diagnose;