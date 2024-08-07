const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoute');
const carRoute = require("./routes/carRoute");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

// Init Middleware  
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Define Rout
app.use('/api/auth', authRoute);
app.use('/api/cars', carRoute);

module.exports = app;
