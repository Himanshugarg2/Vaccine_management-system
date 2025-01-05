const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const vaccineRoutes = require('./Routes/VaccineRoute');
const doctorRoutes = require('./Routes/DoctorRoutes');
const userVaccineRoutes = require('./Routes/userVaccine');
const otpRoutes = require('./Routes/otpRoutes'); // Import OTP routes

require('dotenv').config();
require('./Models/db');

// Use the PORT environment variable, or default to 10000 if not provided by Render
const PORT = process.env.PORT || 10000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/vaccines', vaccineRoutes);
app.use('/doctors', doctorRoutes);
app.use('/user-vaccines', userVaccineRoutes);
app.use('/otp', otpRoutes); // Use OTP routes

app.listen(PORT, '0.0.0.0', () => {
   console.log(`Server is running on port ${PORT}`);
});
