import React from 'react';
import Header from './Header';
import HeaderHero from './HeaderHero';

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800 font-sans">
        <HeaderHero />
        <Header />
      {/* Animated Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-8 py-20 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Dual-Coding Terminology Micro-Service
            </h1>
            <p className="text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing healthcare documentation by seamlessly bridging traditional Ayurvedic wisdom with modern medical standards
            </p>
          </div>
          <div className="mt-12 flex justify-center space-x-4">
            <div className="animate-bounce bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-lg">NAMASTE ✨ ICD-11 ✨ WHO TM2</span>
            </div>
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
        {/* Core Features with Images */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Powerful Features for Precision Healthcare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced terminology management that transforms how healthcare providers document, code, and analyze patient data
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: "📚", 
                title: "Standardized Terminologies", 
                desc: "Comprehensive support for NAMASTE Codes, WHO Ayurveda Terminologies, ICD-11 TM2 & Biomedicine with real-time validation.",
                img: "/icd-cover.jpg",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: "🔧", 
                title: "FHIR-Compliant Resources", 
                desc: "Auto-generates CodeSystem & ConceptMap resources for seamless Ayush ↔ ICD-11 mapping with full FHIR compliance.",
                img: "/Ayush image.png",
                color: "from-green-500 to-emerald-500"
              },
              { 
                icon: "🔍", 
                title: "Smart Search & Auto-Complete", 
                desc: "Intelligent REST API with fuzzy matching, returning instant NAMASTE + ICD-11 results with confidence scores.",
                img: "/icd-11-uses-cases.webp",
                color: "from-purple-500 to-violet-500"
              },
              { 
                icon: "🔄", 
                title: "Dual-Coding Translation", 
                desc: "Bi-directional conversion engine supporting NAMASTE ↔ TM2 ↔ Biomedicine with 99.7% accuracy rate.",
                img: "/Ayurved doc.jpeg",
                color: "from-orange-500 to-red-500"
              },
              { 
                icon: "📦", 
                title: "FHIR Bundle Ingestion", 
                desc: "Secure Encounter + ProblemList upload with automatic dual-coding validation and audit trail generation.",
                img: "/PM ayush mission.png",
                color: "from-teal-500 to-cyan-500"
              },
              { 
                icon: "🛡️", 
                title: "Security & Compliance", 
                desc: "Enterprise-grade OAuth 2.0, ISO 22600 access control, with comprehensive consent management & versioning.",
                img: "/MINISTRY of AYUSh.png",
                color: "from-indigo-500 to-purple-500"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl shadow-lg`}>
                      <span className="text-3xl text-white">{feature.icon}</span>
                    </div>
                    <h3 className="ml-4 text-xl font-bold text-gray-800">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{feature.desc}</p>
                  <div className="relative h-32 rounded-xl overflow-hidden">
                    <img 
                      src={feature.img} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section with Statistics */}
        <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">Transforming Healthcare Ecosystem</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Delivering measurable impact across the entire healthcare value chain with precision terminology management
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {[
                  { title: "For Clinicians 👨‍⚕️", desc: "Reduce coding errors by 85% with intelligent auto-suggestions and real-time validation", metric: "85% Error Reduction" },
                  { title: "For Patients 👥", desc: "Ensure insurance compatibility with ICD-11 codes while preserving traditional medicine context", metric: "100% Coverage" },
                  { title: "For Ministry of Ayush 🏛️", desc: "Real-time analytics aligned with WHO standards for evidence-based policy making", metric: "Live Analytics" },
                  { title: "For Researchers 🔬", desc: "Access harmonized datasets combining traditional wisdom with biomedical insights", metric: "Unified Data" }
                ].map((impact, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <h3 className="font-bold text-xl">{impact.title}</h3>
                      <span className="ml-auto bg-gradient-to-r from-green-400 to-emerald-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        {impact.metric}
                      </span>
                    </div>
                    <p className="text-gray-200 leading-relaxed">{impact.desc}</p>
                  </div>
                ))}
              </div>

              <div className="relative">
                <img 
                  src="/icd-11-uses-cases.webp" 
                  alt="Healthcare Impact"
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-400 to-emerald-400 text-black p-4 rounded-2xl shadow-xl">
                  <div className="text-2xl font-bold">500K+</div>
                  <div className="text-sm">Codes Mapped</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABHA Security Showcase */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Enterprise-Grade Security with ABHA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ABHA-linked authentication ensuring secure, consent-driven access to health records with military-grade protection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { title: "ABHA Integration", img: "/abha ka symbol.svg", desc: "Official ABHA authentication" },
              { title: "Biometric Protection", img: "/Ayurved2 doc.jpeg", desc: "Multi-factor biometric security" },
              { title: "Consent Management", img: "/health authority.svg", desc: "Granular consent controls" },
              { title: "Enterprise Security", img: "/indian goverment.svg", desc: "Government-grade encryption" }
            ].map((security, idx) => (
              <div key={idx} className="group relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                    <img 
                      src={security.img} 
                      alt={security.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                  </div>
                  <h3 className="font-bold text-lg text-blue-800 mb-2">{security.title}</h3>
                  <p className="text-gray-600 text-sm">{security.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Security Metrics */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">256-bit</div>
                <div className="text-sm opacity-90">Encryption</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm opacity-90">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold">SOC 2</div>
                <div className="text-sm opacity-90">Compliant</div>
              </div>
              <div>
                <div className="text-3xl font-bold">ISO 27001</div>
                <div className="text-sm opacity-90">Certified</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Healthcare Documentation?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers already using our dual-coding technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Dual-Coding Terminology Micro-Service</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Empowering healthcare with intelligent terminology management that bridges traditional and modern medicine
            </p>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p>&copy; 2025 Ministry of Ayush & Healthcare Technology Initiative. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations - using inline styles instead */}
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
  );
}