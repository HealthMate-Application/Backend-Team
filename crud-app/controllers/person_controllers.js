const Person = require("../models/person_model");

// Get All Persons
const getPersons = async (req, res) => {
  try {
    const persons = await Person.find({});
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get One Person
const getOnePerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create A Person
const createPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update A Person
const updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body); // Person that We Need To Update
    if (!person) {
      res.status(404).json({ message: "Product Not Found!" });
    }

    const updatedPerson = await Person.findById(req.params.id); // Person After Updated
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete A Person
const deletePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id); // Person that We Need To Delete
    if (!person) {
      res.status(404).json({ message: "Product Not Found!" });
    }

    res.status(200).json({ message: "Person Deleted Successfuly!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPersons,
  getOnePerson,
  createPerson,
  updatePerson,
  deletePerson,
};
