const express = require('express');
const sequelize= require('./config/db');
require('dotenv').config();

const app=express();
app.use(express.json());

const PORT= process.env.PORT ||  8081;

sequelize.authenticate()
.then(()=>{
    console.log('✅ Database connected successfully');
    app.listen(PORT,()=>{
        console.log(`🚀 Server running on port ${PORT}`);
    });
}).catch((err)=>{
    console.error('❌ Unable to connect to the database:', err.message);
});