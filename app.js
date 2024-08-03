const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoute');
const carRoute = require("./routes/carRoute");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// Init Middleware  
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Define Routes
app.use('/api/auth', authRoute);
app.use('/api/cars', carRoute);

module.exports = app;
