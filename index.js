const express = require('express');
const sequelize= require('./config/db');
require('dotenv').config();
require('./models/User');
const app=express();
app.use(express.json());

const PORT= process.env.PORT || 8081;
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Models synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err.message);
  });
  const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);