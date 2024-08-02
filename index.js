const express = require('express');
const connectDB = require('./config/dbConnect');

const app = require('./app')

// Connect Database
connectDB();



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`));
