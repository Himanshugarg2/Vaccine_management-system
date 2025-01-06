import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, X } from 'lucide-react';

const VaccineDashboard = () => {
  const [vaccines, setVaccines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVaccine, setCurrentVaccine] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ageLimit: '',
    govtPrice: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Fetch vaccines
  const fetchVaccines = async () => {
    try {
      const response = await fetch('https://immunilink.onrender.com/vaccines');
      const data = await response.json();
      setVaccines(data);
    } catch (error) {
      showAlert('Error fetching vaccines', 'error');
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = currentVaccine
        ? `https://immunilink.onrender.com/vaccines/${currentVaccine._id}`
        : 'https://immunilink.onrender.com/vaccines';
      const method = currentVaccine ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showAlert(
          `Vaccine ${currentVaccine ? 'updated' : 'added'} successfully`,
          'success'
        );
        fetchVaccines();
        handleCloseModal();
      }
    } catch (error) {
      showAlert('Error saving vaccine', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vaccine?')) {
      try {
        const response = await fetch(`https://immunilink.onrender.com/vaccines/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          showAlert('Vaccine deleted successfully', 'success');
          fetchVaccines();
        }
      } catch (error) {
        showAlert('Error deleting vaccine', 'error');
      }
    }
  };

  const handleEdit = (vaccine) => {
    setCurrentVaccine(vaccine);
    setFormData({
      name: vaccine.name,
      description: vaccine.description,
      ageLimit: vaccine.ageLimit,
      govtPrice: vaccine.govtPrice
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVaccine(null);
    setFormData({
      name: '',
      description: '',
      ageLimit: '',
      govtPrice: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Vaccine Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={20} />
            Add Vaccine
          </button>
        </div>

        {alert.show && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              alert.type === 'error'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {alert.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vaccines.map((vaccine) => (
            <div
              key={vaccine._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{vaccine.name}</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Description:</span>
                    <br />
                    <span className="text-sm">{vaccine.description}</span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Age Limit:</span> {vaccine.ageLimit}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Government Price:</span>{' '}
                    ₹{vaccine.govtPrice.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(vaccine)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(vaccine._id)}
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
                  {currentVaccine ? 'Edit Vaccine' : 'Add New Vaccine'}
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
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none h-24"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age Limit
                  </label>
                  <input
                    type="text"
                    value={formData.ageLimit}
                    onChange={(e) =>
                      setFormData({ ...formData, ageLimit: e.target.value })
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Government Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.govtPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, govtPrice: e.target.value })
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
                    {currentVaccine ? 'Update' : 'Add'} Vaccine
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

export default VaccineDashboard;