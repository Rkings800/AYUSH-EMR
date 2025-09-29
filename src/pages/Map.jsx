import React from "react";
import HospitalMap from "../components/Visual/HospitalMap";
import Header from "./Header";
import HeaderHero from "./HeaderHero";

function Map() {
  return (
    <div>
        <HeaderHero />
        <Header />
    <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-slate-50">
       
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Find Nearby Government Hospitals
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Locate the nearest government healthcare facilities with our
          interactive map. Get directions and distance information instantly.
        </p>
      </div>

      {/* Map Container Card */}
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
          <HospitalMap />
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/64/64113.png"
              alt="User"
              className="w-5 h-5"
            />
            <span>Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
              alt="Hospital"
              className="w-5 h-5"
            />
            <span>Government Hospital</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="Nearest"
              className="w-5 h-5"
            />
            <span>Nearest Hospital</span>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Map;