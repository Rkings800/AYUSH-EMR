import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import HeaderHero from "./HeaderHero";

const featuresData = [
  { 
    icon: "🔬",
    title: "Dual-Coding for Research", 
    desc: "Seamlessly map NAMASTE codes to WHO's ICD-11 TM2, unlocking global research and data validation for traditional medicine.",
    image: "/icd-cover.jpg"
  },
  { 
    icon: "📈",
    title: "AI-Powered Analytics", 
    desc: "Gain real-time insights into disease patterns and treatment efficacy, helping you make data-driven decisions.",
    image: "/Ayush image.png"
  },
  { 
    icon: "🤝",
    title: "ABHA & ABDM Integration", 
    desc: "Connect patient records securely to their ABHA IDs, enabling seamless data sharing within the Ayushman Bharat Digital Mission (ABDM).",
    image: "/abha ka symbol.svg"
  },
  { 
    icon: "🛡️",
    title: "Enterprise-Grade Security", 
    desc: "Protect sensitive patient data with granular access controls, OAuth 2.0, and comprehensive audit logs for full compliance.",
    image: "/abha security.avif"
  },
  { 
    icon: "📝",
    title: "Smart Forms & EMR", 
    desc: "Reduce documentation time with intelligent forms, auto-complete, and structured data entry tailored for Ayush practices.",
    image: "/Ayurved doc.jpeg"
  },
  { 
    icon: "🌐",
    title: "Global Interoperability", 
    desc: "Ensure your clinic's data is recognized worldwide, allowing for international collaboration and standardized reporting.",
    image: "/PM ayush mission.png"
  }
];

const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 text-gray-800 font-sans">

      {/* Header Sections */}
      <HeaderHero />
      <Header />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sky-300/20 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-300/20 to-cyan-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="/Banner 1 Modi ji.jpg" 
            alt="Ayush Healthcare" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-indigo-900/90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.15),transparent_60%)]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/40 rounded-full animate-float-delay"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400/20 rounded-full animate-float-slow"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Trusted by 1000+ Ayush practitioners
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in-up">
              The Future of Ayush Healthcare is Here
            </h1>
            
            <p className="text-xl md:text-2xl font-light mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              VedEMR is the first-of-its-kind EMR to seamlessly integrate NAMASTE, WHO ICD-11, and ABHA for a truly modern, connected healthcare ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400">
              <button
                onClick={() => navigate("/demo")}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Request a Free Demo
              </button>
              <button
                onClick={() => navigate("/features")}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-blue-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-6">
              ✨ Revolutionary Features
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Core Features of VedEMR
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our platform is built on cutting-edge technology to give clinicians, patients, and administrators the tools they need to succeed.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
              >
                <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl text-white font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300 mr-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* About content here (same as your previous code) */}
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-32 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-center text-white relative overflow-hidden">
        {/* Background & floating elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-blue-700/80 to-indigo-700/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* CTA content here (same as previous code) */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-blue-900 text-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer content (same as previous code) */}
        </div>
      </footer>
    </div>
  );
};

export default Landing;