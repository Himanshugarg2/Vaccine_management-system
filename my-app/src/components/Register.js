import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaLock, FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import './Register.css';
import image from './image.png';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    childName: "",
    birthDate: "",
    parentMobile: "",
    parentEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://immunilink.onrender.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration Successful! You can now log in.');
        navigate('/signin');
      } else {
        setError(result.message || "Registration failed!");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setError("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <section className="flex-grow-1" style={{ backgroundColor: "#f0f7f0", paddingBottom: "50px" }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-xl-10">
              <div className="card shadow" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={image}
                      alt="register form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <h5 className="fw-bold mb-3 pb-3" style={{ letterSpacing: "1px", fontFamily: "Montserrat, sans-serif", fontSize: "2rem" }}>
                          Register a new account
                        </h5>

                        {error && <div className="alert alert-danger" role="alert">{error}</div>}

                        {/* Input Fields */}
                        {/* Child's Name */}
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <span className="input-group-text">
                              <FaUser />
                            </span>
                            <input
                              type="text"
                              name="childName"
                              className="form-control form-control-lg"
                              value={formData.childName}
                              onChange={handleInputChange}
                              placeholder="Child's Name"
                              required
                            />
                          </div>
                        </div>

                        {/* Birth Date */}
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <span className="input-group-text">
                              <MdDateRange />
                            </span>
                            <input
                              type="date"
                              name="birthDate"
                              className="form-control form-control-lg"
                              value={formData.birthDate}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        {/* Parent's Mobile */}
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <span className="input-group-text">
                              <FaPhone />
                            </span>
                            <input
                              type="tel"
                              name="parentMobile"
                              className="form-control form-control-lg"
                              value={formData.parentMobile}
                              onChange={handleInputChange}
                              placeholder="Parent's Mobile Number"
                              required
                            />
                          </div>
                        </div>

                        {/* Parent's Email */}
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <span className="input-group-text">
                              <FaEnvelope />
                            </span>
                            <input
                              type="email"
                              name="parentEmail"
                              className="form-control form-control-lg"
                              value={formData.parentEmail}
                              onChange={handleInputChange}
                              placeholder="Parent's Email Address"
                              required
                            />
                          </div>
                        </div>

                        {/* Password */}
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <span className="input-group-text">
                              <FaLock />
                            </span>
                            <input
                              type="password"
                              name="password"
                              className="form-control form-control-lg"
                              value={formData.password}
                              onChange={handleInputChange}
                              placeholder="Password"
                              required
                            />
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <span className="input-group-text">
                              <FaLock />
                            </span>
                            <input
                              type="password"
                              name="confirmPassword"
                              className="form-control form-control-lg"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              placeholder="Confirm Password"
                              required
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                          </button>
                        </div>

                        <p className="mb-5 pb-lg-2" style={{ color: "#4caf50" }}>
                          Already have an account? <Link to="/signin" style={{ color: "#4caf50" }}>Login here</Link>
                        </p>
                        <a href="#!" className="small text-muted">Terms of use.</a>
                        <a href="#!" className="small text-muted">Privacy policy</a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
