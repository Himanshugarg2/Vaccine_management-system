import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, X } from 'lucide-react';

const DoctorDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://immunilink.onrender.com/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      showAlert('Error fetching doctors', 'error');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = currentDoctor
        ? `https://immunilink.onrender.com/doctors/${currentDoctor._id}`
        : 'https://immunilink.onrender.com/doctors';
      const method = currentDoctor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showAlert(
          `Doctor ${currentDoctor ? 'updated' : 'added'} successfully`,
          'success'
        );
        fetchDoctors();
        handleCloseModal();
      }
    } catch (error) {
      showAlert('Error saving doctor', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        const response = await fetch(`https://immunilink.onrender.com/doctors/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          showAlert('Doctor deleted successfully', 'success');
          fetchDoctors();
        }
      } catch (error) {
        showAlert('Error deleting doctor', 'error');
      }
    }
  };

  const handleEdit = (doctor) => {
    setCurrentDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      email: doctor.email,
      phone: doctor.phone
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentDoctor(null);
    setFormData({
      name: '',
      specialization: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={20} />
            Add Doctor
          </button>
        </div>

        {alert.show && (
          <div className={`mb-4 p-4 rounded-lg ${
            alert.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {alert.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
                <p className="text-gray-600 mb-1">
                  Specialization: {doctor.specialization}
                </p>
                <p className="text-gray-600 mb-1">Email: {doctor.email}</p>
                <p className="text-gray-600 mb-4">Phone: {doctor.phone}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(doctor._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {currentDoctor ? 'Edit Doctor' : 'Add New Doctor'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({ ...formData, specialization: e.target.value })
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    {currentDoctor ? 'Update' : 'Add'} Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;