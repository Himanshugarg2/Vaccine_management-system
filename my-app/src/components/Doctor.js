import React, { useState, useEffect } from 'react';

const Doctor = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const fetchUserId = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auth/get-user-id?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
      });
      const data = await response.json();
      setUserId(data._id);
      fetchUserVaccines(data._id);
      localStorage.setItem("email", email);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      setError("Error fetching user ID");
    }
  };

  const fetchUserVaccines = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/user-vaccines/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setVaccines(data);
    } catch (error) {
      console.error("Error fetching user vaccines:", error);
      setError("Error fetching user vaccines");
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async (vaccine) => {
    try {
      const response = await fetch(
        `http://localhost:8080/user-vaccines/${userId}/${vaccine.vaccineId._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.userVaccine) {
        await fetchUserVaccines(userId);
      }
    } catch (error) {
      console.error("Error marking vaccine as complete:", error);
      setError("Error marking vaccine as complete");
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    fetchUserId();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">Doctor-Vaccine Dashboard</h2>

      <form onSubmit={handleEmailSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Enter patient's Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Fetch Vaccines
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      ) : vaccines.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {vaccines.map((vaccine) => (
            <div 
              key={vaccine._id} 
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h5 className="text-xl font-semibold text-red-700 mb-2">
                {vaccine.vaccineId.name}
              </h5>
              <p className="text-gray-600 mb-4">{vaccine.vaccineId.description}</p>
              {vaccine.isCompleted ? (
                <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                  Marked as Complete
                </div>
              ) : (
                <button 
                  onClick={() => markComplete(vaccine)} 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Mark Complete
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No vaccines found for this user.</div>
      )}
    </div>
  );
};

export default Doctor;