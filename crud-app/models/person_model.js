const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter The Product Name"],
    },

    age: {
      type: Number,
      required: true,
      default: 0,
    },

    email: {
      type: String,
      required: true,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

const person = mongoose.model("Person", personSchema);

module.exports = person;
