import React, { useState } from 'react';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const requestOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://immunilink.onrender.com/otp/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        setStep(2);
        setMessage('OTP sent successfully to your email');
      } else {
        setMessage(data.message || 'Error sending OTP');
      }
    } catch (error) {
      setMessage('Error sending OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://immunilink.onrender.com/otp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await response.json();
      setMessage(data.message);
      if (response.ok) {
        window.location.href = '/Doctor';
      }
    } catch (error) {
      setMessage('Error verifying OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const handleBack = () => {
    setStep(1);
    setOtp('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-600">Doctor Login</h2>
          <p className="text-gray-500 mt-2">Access your medical dashboard</p>
        </div>

        <div className="space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <button
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
                    Sending OTP...
                  </div>
                ) : 'Get OTP'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <span className="text-sm text-red-600 font-medium">
                    Sent to: {email}
                  </span>
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter OTP"
                  required
                />
              </div>

              <button
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

              <button
                onClick={handleBack}
                className="w-full py-3 rounded-lg font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200"
              >
                Back to Email
              </button>
            </div>
          )}

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

export default DoctorLogin;