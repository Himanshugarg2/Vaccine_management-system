import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const requestOtp = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/otp/request-otp', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data.message || 'Error sending OTP. Please try again.');
        }
        setIsLoading(false);
    };

    const verifyOtp = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/otp/verify-otp', { email, otp });
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
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Doctor Login</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="otp" className="form-label">OTP</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="otp"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        onClick={requestOtp}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Requesting OTP...' : 'Request OTP'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-success btn-lg"
                                        onClick={verifyOtp}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                                    </button>
                                </div>
                            </form>
                            {message && (
                                <div className="alert alert-info mt-3" role="alert">
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorLogin;
