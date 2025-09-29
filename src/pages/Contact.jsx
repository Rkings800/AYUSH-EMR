import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  User,
  MessageSquare,
  Building
} from 'lucide-react';
import Header from './Header';
import HeaderHero from './HeaderHero';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 2000);
  };

  return (
    <div>
      <HeaderHero />
      <Header />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-blue-500/10 to-purple-500/20"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-8 py-20 text-center">
          <div className="animate-fade-in-up space-y-6">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-lg font-medium">🏥 Ministry of Ayush Initiative</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              We're here to help you streamline your healthcare practice with our dual-coding technology
            </p>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 text-slate-50 fill-current">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20 space-y-24">
        {/* Contact Information Cards */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-lg mb-6 w-fit">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Phone Support</h3>
            <p className="text-gray-600 mb-4">Available 24/7 for healthcare emergencies</p>
            <p className="text-2xl font-bold text-blue-600">+91 1800-AYUSH-24</p>
            <p className="text-sm text-gray-500 mt-2">Toll-free healthcare support</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg mb-6 w-fit">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Email Support</h3>
            <p className="text-gray-600 mb-4">Get detailed technical assistance</p>
            <p className="text-lg font-bold text-blue-600">support@vedemr.ayush.gov.in</p>
            <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-4 rounded-2xl shadow-lg mb-6 w-fit">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Visit Us</h3>
            <p className="text-gray-600 mb-4">Ministry of Ayush headquarters</p>
            <p className="text-lg font-bold text-blue-600">New Delhi, India</p>
            <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM-6PM</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg mb-6 w-fit">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Response Time</h3>
            <p className="text-gray-600 mb-4">Quick resolution guaranteed</p>
            <p className="text-2xl font-bold text-blue-600">2-4 Hours</p>
            <p className="text-sm text-gray-500 mt-2">For critical issues</p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about VedEMR? We're here to help you streamline your healthcare practice with our dual-coding technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline h-4 w-4 mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline h-4 w-4 mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="inline h-4 w-4 mr-2" />
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="inline h-4 w-4 mr-2" />
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your healthcare technology needs..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Additional Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">Ministry of Ayush</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Government of India's initiative to promote traditional healthcare systems including Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Address:</strong> Ministry of Ayush, AYUSH Bhawan, B-Block, GPO Complex, INA, New Delhi-110023</p>
                  <p><strong>Working Hours:</strong> Monday to Friday, 9:00 AM to 5:30 PM IST</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">What is VedEMR?</h4>
                    <p className="text-gray-600 text-sm">VedEMR is a dual-coding terminology micro-service that bridges traditional Indian medicine with modern healthcare standards.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">How does dual-coding work?</h4>
                    <p className="text-gray-600 text-sm">It integrates NAMASTE codes with WHO ICD-11 TM2 for seamless data exchange between traditional and modern healthcare systems.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Is my data secure?</h4>
                    <p className="text-gray-600 text-sm">Yes, we use enterprise-grade security with ABHA integration and comply with all healthcare data protection regulations.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Emergency Support</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For urgent healthcare technology issues or system outages, please contact our emergency support team immediately.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-800 font-semibold">🚨 Emergency Hotline: +91 1800-AYUSH-24</p>
                  <p className="text-red-700 text-sm mt-1">Available 24/7 for critical system issues</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Find Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit our headquarters at the Ministry of Ayush in New Delhi
            </p>
          </div>
          
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-96 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Ministry of Ayush</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  AYUSH Bhawan, B-Block, GPO Complex, INA, New Delhi-110023, India
                </p>
                <p className="text-sm text-gray-500 mt-2">Interactive map integration available</p>
              </div>
            </div>
            {/* Map placeholder - can be replaced with actual Google Maps integration */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
              <p className="text-xs text-gray-600">Get Directions</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Dual-Coding Terminology Micro-Service</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Bridging ancient wisdom with modern technology for a healthier tomorrow
            </p>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p>&copy; 2025 Ministry of Ayush & Healthcare Technology Initiative. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <div className="hidden">
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .animate-fade-in-up {
              animation: fade-in-up 1s ease-out;
            }
          `
        }} />
      </div>
    </div>
    </div>
  );
}