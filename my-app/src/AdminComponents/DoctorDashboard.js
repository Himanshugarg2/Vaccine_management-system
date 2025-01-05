import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorForm from './DoctorForm';
import DoctorList from './DoctorList';
import { FaUserPlus, FaUserMd } from 'react-icons/fa';

const DoctorDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios.get('https://immunilink.onrender.com/doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  };

  const handleDoctorSaved = () => {
    fetchDoctors();
    setEditingDoctorId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (id) => {
    setEditingDoctorId(id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://immunilink.onrender.com/doctors/${id}`);
      setDoctors(doctors.filter(doctor => doctor._id !== id));
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3 text-slate-800">
          <FaUserMd className="text-slate-800 text-3xl" />
          Doctor Management Dashboard
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsFormVisible(true)}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-md transition-colors duration-200 shadow-md"
        >
          <FaUserPlus className="text-sm" />
          Add Doctor
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <DoctorForm
            doctorId={editingDoctorId}
            onDoctorSaved={handleDoctorSaved}
            onCancel={() => {
              setEditingDoctorId(null);
              setIsFormVisible(false);
            }}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <DoctorList
          doctors={doctors}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default DoctorDashboard;