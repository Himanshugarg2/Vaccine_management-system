import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VaccineForm from './VaccineForm';
import VaccineList from './VaccineList';
import { FaPlus, FaSyringe } from 'react-icons/fa';

const VaccineDashboard = () => {
  const [vaccines, setVaccines] = useState([]);
  const [editingVaccineId, setEditingVaccineId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = () => {
    axios.get('https://immunilink.onrender.com/vaccines')
      .then(response => {
        setVaccines(response.data);
      })
      .catch(error => {
        console.error('Error fetching vaccines:', error);
      });
  };

  const handleVaccineSaved = (newVaccine) => {
    if (editingVaccineId) {
      setVaccines(vaccines.map(vaccine =>
        vaccine._id === newVaccine._id ? newVaccine : vaccine
      ));
    } else {
      setVaccines([...vaccines, newVaccine]);
    }
    setEditingVaccineId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (id) => {
    setEditingVaccineId(id);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    axios.delete(`https://immunilink.onrender.com/vaccines/${id}`)
      .then(() => {
        setVaccines(vaccines.filter(vaccine => vaccine._id !== id));
      })
      .catch(error => {
        console.error('Error deleting vaccine:', error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3 text-slate-800">
          <FaSyringe className="text-slate-800" />
          Vaccine Management Dashboard
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsFormVisible(true)}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-md transition-colors duration-200 shadow-md"
        >
          <FaPlus className="text-sm" />
          Add Vaccine
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <VaccineForm
            vaccineId={editingVaccineId}
            onVaccineSaved={handleVaccineSaved}
            onCancel={() => {
              setEditingVaccineId(null);
              setIsFormVisible(false);
            }}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <VaccineList
          vaccines={vaccines}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default VaccineDashboard;