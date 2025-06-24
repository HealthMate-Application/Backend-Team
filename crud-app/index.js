const express = require("express");
const app = express();
const mongoose = require("mongoose");
const globalErrorHandler = require("./controllers/errorController.js");
const ApiError = require("./utlis/ApiError.js");
const indexRouter = require("./routes/indexRouter.js");

// Middleware
app.use(express.json()); // Middleware To Parse JSON Data
app.use(express.urlencoded({ extended: false })); // Middleware To Parse URL Encoded Data

// Routes
indexRouter(app); // Mounting Index Router

//  Health Check Route
app.get("/health", (req, res) => {
  res.status(200).send("Ok");
});

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Setting The Server Port
const PORT = 3001;
app.use(globalErrorHandler);

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
