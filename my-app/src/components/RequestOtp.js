import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestOtp = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const requestOtp = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://immunilink.onrender.com/otp/request-otp', { email });
            setMessage(response.data.message);
            if (response.status === 200) {
                navigate('/verifyotp', { state: { email } });
            }
        } catch (error) {
            setMessage(error.response?.data.message || 'Error sending OTP. Please try again.');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-red-600">Doctor Login</h2>
                    <p className="text-gray-500 mt-2">Request OTP for authentication</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            onClick={requestOtp}
                            disabled={isLoading || !email}
                            className={`w-full py-3 rounded-lg font-medium transition-all duration-200
                                ${isLoading || !email 
                                    ? 'bg-gray-300 cursor-not-allowed' 
                                    : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'}`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                    Requesting OTP...
                                </div>
                            ) : 'Request OTP'}
                        </button>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-lg ${message.includes('success') 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-red-50 text-red-700'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestOtp;