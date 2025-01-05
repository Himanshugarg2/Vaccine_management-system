import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 font-bold text-xl">
            Admin Dashboard
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/Vaccinedashboard" className="text-gray-300 hover:text-white transition-colors">
              Manage Vaccines
            </a>
            <a href="/Doctordashboard" className="text-gray-300 hover:text-white transition-colors">
              Manage Doctors
            </a>
            
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/Vaccinedashboard"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
              >
                Manage Vaccines
              </a>
              <a
                href="/Doctordashboard"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
              >
                Manage Doctors
              </a>
              
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;