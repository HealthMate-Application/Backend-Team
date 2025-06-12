const express = require("express");
const app = express();
const mongoose = require("mongoose");
const personRoute = require("./routes/person_route.js");

// Middleware
app.use(express.json()); // Middleware To Parse JSON Data
app.use(express.urlencoded({ extended: false })); // Middleware To Parse URL Encoded Data

// Routes
app.use("/api/products", personRoute);

//  Health Check Route  
app.get('/health', (req, res) => {
  res.status(200).send('Ok');
});

// Setting The Server Port
const PORT = 3001 ;

// Connect To Database And Start The Server
mongoose
  .connect(
    "mongodb+srv://health:Health0123@cluster0.8j1hl.mongodb.net/Health_Mate?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database Connected!");
    app.listen(PORT, () => {
      console.log(`Server is up and rinning on Port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database Connection Faild!");
  });
