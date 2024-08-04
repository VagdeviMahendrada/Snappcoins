const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require("cors");
require('dotenv').config()
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth.route');
const transactionRoutes = require('./routes/transaction.route');
const profileRoutes = require('./routes/profile.route');
const merchandiseRoutes = require('./routes/merchandise.route');
const port = process.env.PORT || 3003

app.use(express.json())
app.use(bodyParser.json());
app.use(
    cors()
  );
  
  // Serve static files from the "uploads" directory
  app.use('/uploads', express.static('uploads'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth',authRoutes)
app.use('/api/profile',profileRoutes)
app.use('/api/transactions',transactionRoutes)
app.use('/api/merchandise',merchandiseRoutes)

connectDB() //DB connection

app.listen(port,()=>{
    console.log(`Server is running on https://localhost:${port}!!!`);
})