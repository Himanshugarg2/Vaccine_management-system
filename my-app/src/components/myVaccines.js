import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import axios from 'axios';

const MyVaccines = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserVaccines = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("loggedInUserEmail");

      if (!token || !email) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      // Decode the token to extract user ID
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload._id;

      try {
        const response = await axios.get(`https://immunilink.onrender.com/user-vaccines/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        });
        setVaccines(response.data);
      } catch (err) {
        setError("Error fetching vaccines");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch vaccines initially
    fetchUserVaccines();

    // Set up polling to check for updates every 5 seconds
    const intervalId = setInterval(fetchUserVaccines, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader className="animate-spin" size={24} />
          <span>Loading vaccines...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Vaccines</h1>

        {vaccines.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-gray-600">
            No vaccines available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaccines.map((vaccine) => (
              <div
                key={vaccine._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {vaccine.vaccineId.name}
                    </h2>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                        vaccine.isCompleted
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {vaccine.isCompleted ? (
                        <>
                          <CheckCircle size={16} />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={16} />
                          <span>Pending</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-600 text-sm">
                      {vaccine.vaccineId.description}
                    </p>

                    <div className="border-t pt-3 space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Age Limit:</span>{' '}
                        {vaccine.vaccineId.ageLimit}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Government Price:</span>{' '}
                        ₹{vaccine.vaccineId.govtPrice.toLocaleString()}
                      </p>
                      {vaccine.isCompleted && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Completed on:</span>{' '}
                          {new Date(vaccine.completionDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVaccines;