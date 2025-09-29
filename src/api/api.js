import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/v1/namaste';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Custom login with email/password
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Custom signup
  signup: (userData) => api.post('/auth/signup', userData),
  
  // ABHA login redirect (handled by backend)
  abhaLogin: () => {
    window.location.href = `${API_BASE_URL}/auth/abha/login`;
  },
  
  // Get current user profile
  getProfile: () => api.get('/user/me'),
  
  // Update user profile
  updateProfile: (data) => api.put('/user/me', data),
  
  // Link ABHA ID
  linkAbha: (abhaData) => api.post('/user/link-abha', abhaData),
};

// User/Patient API endpoints
export const userAPI = {
  // Get user encounters/records
  getEncounters: () => api.get('/user/encounters'),
  
  // Get specific encounter
  getEncounter: (id) => api.get(`/user/encounters/${id}`),
  
  // Get prescriptions
  getPrescriptions: () => api.get('/user/prescriptions'),
  
  // Get specific prescription
  getPrescription: (id) => api.get(`/prescriptions/${id}`),
  
  // Get medical records
  getRecords: () => api.get('/user/records'),
  
  // Get user appointments
  getAppointments: () => api.get('/user/appointments'),
  
  // Book new appointment
  bookAppointment: (appointmentData) => api.post('/appointments/book', appointmentData),
  
  // Cancel appointment
  cancelAppointment: (id) => api.delete(`/appointments/${id}`),
};

// Doctor API endpoints
export const doctorAPI = {
  // Get doctor's patients
  getPatients: () => api.get('/doctor/patients'),
  
  // Search patients
  searchPatients: (query) => api.get(`/patients?q=${encodeURIComponent(query)}`),
  
  // Get patient records
  getPatientRecords: (patientId) => api.get(`/patients/${patientId}/records`),
  
  // Get doctor stats
  getStats: () => api.get('/doctor/stats'),
  
  // Upload FHIR bundle (diagnosis/encounter)
  uploadBundle: (bundle) => {
    console.log('API: Uploading bundle to /bundles/upload');
    console.log('API: Bundle data:', bundle);
    console.log('API: Base URL:', API_BASE_URL);
    
    return api.post('/bundles/upload', bundle)
      .then(response => {
        console.log('API: Upload successful:', response);
        return response;
      })
      .catch(error => {
        console.error('API: Upload failed:', error);
        console.error('API: Error response:', error.response);
        console.error('API: Error message:', error.message);
        console.error('API: Error config:', error.config);
        throw error;
      });
  }
};

// Admin API endpoints
export const adminAPI = {
  // Get system stats
  getStats: () => api.get('/admin/stats'),
  
  // Get all users
  getUsers: () => api.get('/admin/users'),
  
  // Update user
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  
  // Delete user
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  
  // Get all doctors
  getDoctors: () => api.get('/admin/doctors'),
  
  // Approve doctor
  approveDoctor: (id) => api.put(`/admin/doctors/${id}/approve`),
};

// Terminology API endpoints
export const terminologyAPI = {
  // Search NAMASTE/ICD codes
  search: (query) => api.get(`/terminology/search?q=${encodeURIComponent(query)}`),
  
  // Translate NAMASTE to ICD
  translate: (namasteCode) => api.post('/terminology/translate', { namasteCode }),
};

// Chat API endpoints
export const chatAPI = {
  // Send message to chatbot
  sendMessage: (message) => api.post('/chat', { message }),
};

export default api;
