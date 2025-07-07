// server.js
const express = require('express');
const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require("./routes/auth");
const orderRoutes = require('./routes/orderRoutes');
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
// ROUTES
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/orders', orderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



