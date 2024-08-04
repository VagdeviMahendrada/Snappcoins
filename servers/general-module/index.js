const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3002;
const merchandiseRoutes = require("./routes/merchandise.route");
const profilePicRoute = require("./routes/profile.route");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected!"))
    .catch((err) => {
      console.log(err);
    });
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/merchandise", merchandiseRoutes);
app.use("/api", profilePicRoute);

connectDB(); //DB connection

app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}!!!`);
});
