import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaUserMd, FaShieldAlt } from "react-icons/fa";

const images = [
  "/health.jpg",
  "/health1.jpg",
  "/health2.jpg",
  "/health3.jpg",
];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto h-screen max-w-7xl px-4">
        <div className="flex h-full">
          {/* Left side - Image Carousel */}
          <div className="hidden lg:flex w-2/3 p-6">
            <div className="relative w-full h-5/6 my-auto rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={images[currentIndex]}
                alt="ImmuniLink"
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? "w-6 bg-white" : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center p-6">
            <div className="space-y-6">
              <div className="text-center lg:text-left space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to ImmuniLink
                </h1>
                <p className="text-lg text-gray-600">
                  Your trusted healthcare companion
                </p>
              </div>

              <div className="flex flex-col gap-4 max-w-md mx-auto lg:mx-0">
                <Link
                  to="/signin"
                  className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-green-500/25 hover:shadow-2xl"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FaUser className="text-lg" />
                  </div>
                  <span className="text-lg font-semibold group-hover:translate-x-2 transition-transform">
                    User Login
                  </span>
                </Link>

                <Link
                  to="/RequestOtp"
                  className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-red-500/25 hover:shadow-2xl"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FaUserMd className="text-lg" />
                  </div>
                  <span className="text-lg font-semibold group-hover:translate-x-2 transition-transform">
                    Doctor Login
                  </span>
                </Link>

                <Link
                  to="/DoctorDashboard"
                  className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-purple-500/25 hover:shadow-2xl"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FaShieldAlt className="text-lg" />
                  </div>
                  <span className="text-lg text-white font-semibold group-hover:translate-x-2 transition-transform">
                    Admin Login
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;