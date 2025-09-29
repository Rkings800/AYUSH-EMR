import React from "react";
import Header from "./Header";
import HeaderHero from "./HeaderHero";
export default function About() {
  return (
    <div>

      <HeaderHero />
      <Header />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800 font-sans">
      {/* Animated Hero Section */}
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
              Bridging Ancient Wisdom with Modern Technology
            </h1>
            <p className="text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Empowering the Ayush Mission with groundbreaking dual-coding technology that harmonizes traditional Indian medicine with global healthcare standards
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
        {/* Mission Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Our Mission: Harmonizing Healthcare Systems
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Creating a unified language that bridges traditional Ayurvedic wisdom with modern medical standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="group">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-2xl shadow-lg">
                    <span className="text-2xl text-white">🎯</span>
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-800">The Challenge We Solve</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Traditional Indian medical systems serve millions, but their data often remains isolated, hindering research, policy-making, and patient care on a national and global scale.
                </p>
              </div>
              
              <div className="group">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl shadow-lg">
                    <span className="text-2xl text-white">💡</span>
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-800">Our Revolutionary Solution</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our Dual-Coding Terminology Micro-Service seamlessly integrates NAMASTE codes and WHO ICD-11 TM2, empowering practitioners to document patient data in a globally understood language.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/PM ayush mission.png" 
                alt="Ayush Mission"
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-2xl shadow-xl">
                <div className="text-xl font-bold">1M+</div>
                <div className="text-sm">Patients Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Ayush Mission Support */}
        <section className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-3xl shadow-2xl p-12 border border-white/20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
              Empowering the Ayush Mission 🇮🇳
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three pillars of transformation for traditional healthcare systems
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Standardization & Interoperability",
                desc: "Common language for data exchange combining NAMASTE codes and ICD-11 TM2 for consistent data across India, enabling accurate aggregation and evidence-based policymaking.",
                color: "from-blue-500 to-cyan-500",
                img: "/icd-cover.jpg"
              },
              {
                icon: "⚡",
                title: "Efficient EMR Adoption",
                desc: "Plug-and-play solution for EMR providers via REST API, lowering barriers to digital adoption and making electronic record transition seamless for clinics.",
                color: "from-green-500 to-emerald-500",
                img: "/Ayush image.png"
              },
              {
                icon: "🔬",
                title: "Validation & Research",
                desc: "Harmonized datasets enable researchers to study Ayush treatments effectively, driving discoveries and globally recognized evidence for traditional practices.",
                color: "from-purple-500 to-violet-500",
                img: "/icd-11-uses-cases.webp"
              }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`bg-gradient-to-r ${item.color} p-4 rounded-2xl shadow-lg`}>
                      <span className="text-3xl text-white">{item.icon}</span>
                    </div>
                    <h3 className="ml-4 text-xl font-bold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{item.desc}</p>
                  <div className="relative h-32 rounded-xl overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Showcase */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              A Holistic Solution for Modern Healthcare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on robust, industry-standard technology with comprehensive ecosystem features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/MINISTRY of AYUSh.png" 
                alt="Healthcare Technology"
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-2xl shadow-xl">
                <div className="text-xl font-bold">99.9%</div>
                <div className="text-sm">Uptime</div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-2xl shadow-lg">
                    <span className="text-2xl text-white">🔧</span>
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-gray-800">Smart Technology Stack</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Features include smart search, bi-directional translation, and secure data ingestion powered by <strong>ABHA integration</strong> with enterprise-grade security.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl shadow-lg">
                    <span className="text-2xl text-white">🌐</span>
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-gray-800">Global Recognition</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our service demonstrates that traditional medicine and modern technology can collaborate to create a more inclusive, efficient, and data-driven healthcare system.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-3 rounded-2xl shadow-lg">
                    <span className="text-2xl text-white">🎯</span>
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-gray-800">Mission Alignment</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to supporting the Ayush Mission's vision of holistic healthcare for all, ensuring traditional practices receive the global recognition they deserve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">Our Impact in Numbers</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Measurable results across the healthcare ecosystem
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold mb-2">500K+</div>
                <div className="text-sm opacity-90">Codes Mapped</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold mb-2">85%</div>
                <div className="text-sm opacity-90">Error Reduction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-sm opacity-90">System Uptime</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Global Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Healthcare Together?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join us in our mission to bridge traditional wisdom with modern technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
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