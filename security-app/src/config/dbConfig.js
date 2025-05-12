const mongoose = require("mongoose");

const dbUrl = process.env.DATABASE_DOCKER;

const DB = () => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("DB connections successful!");
    })
    .catch((err) => {
      console.log(`Error ${err}`);
    });
};

module.exports = DB;
