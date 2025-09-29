import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  XCircle,
  Clock3,
  ChevronLeft,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI } from '../../api/api';

/**
 * View Appointments Page
 * 
 * Purpose: Display patient's appointments with filtering and management options
 * 
 * Features:
 * - List all appointments with status indicators
 * - Filter by status (upcoming, completed, cancelled)
 * - Search appointments by doctor name or date
 * - View appointment details
 * - Cancel upcoming appointments
 * - Responsive design with healthcare theming
 */
const ViewAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Mock appointment data - replace with real API call
  const mockAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Rajesh Kumar',
      doctorSpecialty: 'General Physician',
      date: '2024-01-20',
      time: '09:30',
      type: 'consultation',
      reason: 'Regular health checkup',
      status: 'upcoming',
      consultationFee: '₹500',
      doctorImage: '/api/placeholder/150/150',
      location: 'Room 101, Main Building',
      phone: '+91 98765 43210'
    },
    {
      id: '2',
      doctorName: 'Dr. Priya Sharma',
      doctorSpecialty: 'Pediatrician',
      date: '2024-01-18',
      time: '14:00',
      type: 'follow-up',
      reason: 'Child vaccination follow-up',
      status: 'completed',
      consultationFee: '₹600',
      doctorImage: '/api/placeholder/150/150',
      location: 'Room 205, Children\'s Wing',
      phone: '+91 98765 43211'
    },
    {
      id: '3',
      doctorName: 'Dr. Amit Patel',
      doctorSpecialty: 'Cardiologist',
      date: '2024-01-25',
      time: '11:00',
      type: 'consultation',
      reason: 'Heart palpitations',
      status: 'upcoming',
      consultationFee: '₹800',
      doctorImage: '/api/placeholder/150/150',
      location: 'Room 301, Cardiac Center',
      phone: '+91 98765 43212'
    },
    {
      id: '4',
      doctorName: 'Dr. Anita Desai',
      doctorSpecialty: 'Gynecologist',
      date: '2024-01-15',
      time: '10:30',
      type: 'consultation',
      reason: 'Routine gynecological exam',
      status: 'cancelled',
      consultationFee: '₹700',
      doctorImage: '/api/placeholder/150/150',
      location: 'Room 401, Women\'s Health Center',
      phone: '+91 98765 43213'
    }
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchQuery, statusFilter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError('');

      // TODO: Replace with real API call when backend endpoint is available
      // const response = await userAPI.getAppointments();
      // setAppointments(response.data.data);
      
      // Using mock data for now
      setTimeout(() => {
        setAppointments(mockAppointments);
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError('Failed to load appointments. Please try again.');
      console.error('Error fetching appointments:', err);
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = appointments;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(apt => 
        apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.doctorSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.date.includes(searchQuery)
      );
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredAppointments(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <Clock3 className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      // TODO: Replace with real API call when backend endpoint is available
      // await userAPI.cancelAppointment(appointmentId);
      
      // Mock cancellation for now
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'cancelled' }
            : apt
        )
      );

    } catch (err) {
      setError('Failed to cancel appointment. Please try again.');
      console.error('Error cancelling appointment:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading appointments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/app/dashboard"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Dashboard
              </Link>
            </div>
            <Link
              to="/app/appointments/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book New Appointment
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">My Appointments</h1>
          <p className="text-gray-600">View and manage your medical appointments</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by doctor name, specialty, or date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-6">
                {appointments.length === 0 
                  ? "You haven't booked any appointments yet."
                  : "No appointments match your current filters."
                }
              </p>
              <Link
                to="/app/appointments/new"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Your First Appointment
              </Link>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={appointment.doctorImage}
                        alt={appointment.doctorName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.doctorName}
                          </h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1 capitalize">{appointment.status}</span>
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{appointment.doctorSpecialty}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(appointment.date)}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            {formatTime(appointment.time)}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Stethoscope className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="capitalize">{appointment.type}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            {appointment.location}
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            <strong>Reason:</strong> {appointment.reason}
                          </p>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-900">
                            Consultation Fee: {appointment.consultationFee}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      {appointment.status === 'upcoming' && (
                        <>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="flex items-center px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel
                          </button>
                          <a
                            href={`tel:${appointment.phone}`}
                            className="flex items-center px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </a>
                        </>
                      )}
                      {appointment.status === 'completed' && (
                        <button className="flex items-center px-4 py-2 text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors">
                          <Eye className="w-4 h-4 mr-2" />
                          View Report
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAppointments;