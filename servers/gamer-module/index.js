const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require("cors");
require('dotenv').config()
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth.route');
const walletRoutes = require('./routes/wallet.route');
const profileRoutes = require('./routes/profile.route');
const merchantDisplatRoutes = require('./routes/merchandiseDisplay.route');
const transaction = require('./routes/transHistory.route');
//const snapcoinbank = require('./routes/snapcoin.route');
const snappscollected =  require('./routes/snappscollected.route')
const cartCollected = require('./routes/cartController.route');
const port = process.env.PORT || 5001

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth',authRoutes)
app.use('/api/profile',profileRoutes);
app.use('/api/wallet',walletRoutes)
app.use('/api/merchant',merchantDisplatRoutes);
app.use('/api/transaction',transaction);
//app.use('/api/snappcoin',snapcoinbank);
app.use('/api/snapps',snappscollected);
app.use('/api/cart',cartCollected);
connectDB() //DB connection

app.listen(port,()=>{
    console.log(`Server is running on https://localhost:${port} !!!`);
})