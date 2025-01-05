import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const verifyOtp = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://immunilink.onrender.com/otp/verify-otp', { email, otp });
            setMessage(response.data.message);
            if (response.status === 200) {
                navigate('/Doctor');
            }
        } catch (error) {
            setMessage(error.response?.data.message || 'Error verifying OTP. Please try again.');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-red-600">Verify OTP</h2>
                    <p className="text-gray-500 mt-2">Enter the OTP sent to your email</p>
                    <p className="text-sm text-red-600 mt-1">{email}</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label 
                                htmlFor="otp" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                placeholder="Enter OTP code"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            onClick={verifyOtp}
                            disabled={isLoading || !otp}
                            className={`w-full py-3 rounded-lg font-medium transition-all duration-200
                                ${isLoading || !otp 
                                    ? 'bg-gray-300 cursor-not-allowed' 
                                    : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'}`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                    Verifying...
                                </div>
                            ) : 'Verify OTP'}
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

export default VerifyOtp;