import React, { useState } from 'react';
import axios from 'axios';
import './VaccineList.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 

const VaccineList = ({ vaccines, onEdit, onDelete }) => {
  const [deleteError, setDeleteError] = useState('');
  const [deletingId, setDeletingId] = useState(null); 

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vaccine?')) {
      setDeletingId(id); 
      axios.delete(`https://immunilink.onrender.com/vaccines/${id}`)
        .then(() => {
          onDelete(id);
          setDeleteError('');
        })
        .catch(() => {
          setDeleteError(`Error deleting vaccine with ID: ${id}. Please try again.`);
        })
        .finally(() => {
          setDeletingId(null); 
        });
    }
  };

  return (
    <div>
      {deleteError && <div className="alert alert-danger">{deleteError}</div>}

      {vaccines.length === 0 ? (
        <p>No vaccines available. Add a vaccine to get started.</p>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Age Limit</th>
              <th>Government Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map(vaccine => (
              <tr key={vaccine._id}>
                <td>{vaccine.name}</td>
                <td>{vaccine.description}</td>
                <td>{vaccine.ageLimit}</td>
                <td>₹{vaccine.govtPrice}</td>
                <td>
                  <button 
                    className="btn-edit" 
                    onClick={() => onEdit(vaccine._id)} 
                    disabled={deletingId === vaccine._id} // Disable while deleting
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(vaccine._id)} 
                    disabled={deletingId === vaccine._id} 
                  >
                    {deletingId === vaccine._id ? 'Deleting...' : <><FontAwesomeIcon icon={faTrashAlt} /> Delete</>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VaccineList;
