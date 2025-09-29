import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  MapPin, 
  Phone, 
  Mail, 
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  Search,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI, doctorAPI } from '../../api/api';

/**
 * New Appointment Page
 * 
 * Purpose: Allow patients to book new appointments with doctors
 * 
 * Features:
 * - Doctor selection with search and filtering
 * - Date and time slot selection
 * - Appointment type selection (consultation, follow-up, etc.)
 * - Reason for visit input
 * - Form validation and error handling
 * - Success confirmation
 * - Responsive design with healthcare theming
 */
const NewAppointment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [reason, setReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Mock available time slots - in real app, this would come from doctor's schedule
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = 9; // 9 AM
    const endTime = 17; // 5 PM
    
    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  useEffect(() => {
    // Fetch doctors list
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        // Using mock data for now - replace with real API call when available
        const mockDoctors = [
          {
            id: '1',
            name: 'Dr. Rajesh Kumar',
            specialty: 'General Physician',
            experience: '12 years',
            rating: 4.8,
            image: '/api/placeholder/150/150',
            availability: 'Available Today',
            consultationFee: '₹500'
          },
          {
            id: '2',
            name: 'Dr. Priya Sharma',
            specialty: 'Pediatrician',
            experience: '8 years',
            rating: 4.9,
            image: '/api/placeholder/150/150',
            availability: 'Available Tomorrow',
            consultationFee: '₹600'
          },
          {
            id: '3',
            name: 'Dr. Amit Patel',
            specialty: 'Cardiologist',
            experience: '15 years',
            rating: 4.7,
            image: '/api/placeholder/150/150',
            availability: 'Available in 2 days',
            consultationFee: '₹800'
          },
          {
            id: '4',
            name: 'Dr. Anita Desai',
            specialty: 'Gynecologist',
            experience: '10 years',
            rating: 4.6,
            image: '/api/placeholder/150/150',
            availability: 'Available Today',
            consultationFee: '₹700'
          }
        ];
        
        // TODO: Replace with real API call when backend endpoint is available
        // const response = await doctorAPI.getDoctors();
        // setDoctors(response.data.data);
        
        setDoctors(mockDoctors);
        setAvailableTimeSlots(generateTimeSlots());
      } catch (err) {
        setError('Failed to load doctors. Please try again.');
        console.error('Error fetching doctors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDoctor || !selectedDate || !selectedTime || !appointmentType || !reason) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const appointmentData = {
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        patientId: user?.id,
        patientName: user?.name,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        reason: reason,
        consultationFee: selectedDoctor.consultationFee
      };

      const response = await userAPI.bookAppointment(appointmentData);
      
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/app/appointments');
        }, 3000);
      } else {
        setError(response.data.message || 'Failed to book appointment');
      }
      
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Error booking appointment:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setAppointmentType('consultation');
    setReason('');
    setError('');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-2">
              Appointment Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully booked. You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Doctor:</span>
                  <p className="text-gray-900">{selectedDoctor?.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <p className="text-gray-900">{new Date(selectedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Time:</span>
                  <p className="text-gray-900">{selectedTime}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <p className="text-gray-900 capitalize">{appointmentType}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Redirecting to dashboard in a moment...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/app/dashboard')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-heading font-semibold text-gray-900">
                  Book New Appointment
                </h1>
                <p className="text-gray-600 mt-1">
                  Schedule an appointment with your preferred doctor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Doctor Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4 flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-mint-600" />
              Select Doctor
            </h2>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
                />
              </div>
            </div>

            {/* Doctor List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedDoctor?.id === doctor.id
                      ? 'border-mint-500 bg-mint-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <p className="text-xs text-gray-500">{doctor.experience} experience</p>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500 ml-3">{doctor.availability}</span>
                      </div>
                      <p className="text-sm font-medium text-mint-600 mt-1">{doctor.consultationFee}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No doctors found matching your search.</p>
              </div>
            )}
          </div>

          {/* Appointment Details */}
          {selectedDoctor && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-mint-600" />
                Appointment Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getMinDate()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
                    required
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
                    required
                  >
                    <option value="">Select a time slot</option>
                    {availableTimeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Appointment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type *
                  </label>
                  <select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
                    required
                  >
                    <option value="consultation">Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="checkup">Regular Checkup</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                {/* Consultation Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee
                  </label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium">
                    {selectedDoctor.consultationFee}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reason for Visit */}
          {selectedDoctor && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-mint-600" />
                Reason for Visit *
              </h2>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please describe your symptoms or reason for this appointment..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500 resize-none"
                required
              />
              
              <p className="text-sm text-gray-500 mt-2">
                This information helps the doctor prepare for your appointment.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {selectedDoctor && (
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-mint-600 text-white rounded-lg hover:bg-mint-700 focus:ring-2 focus:ring-mint-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Booking...
                  </div>
                ) : (
                  'Book Appointment'
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewAppointment;