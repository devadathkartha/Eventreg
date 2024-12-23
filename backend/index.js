
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

require('dotenv').config();
connectDB();

const app = express();
app.use(express.json())
app.use(require('cors')());

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');


app.use('/api/users', userRoutes);
app.use('/api/events',eventRoutes)

const port=process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Event Management API is running on http://localhost:${port}`);
});