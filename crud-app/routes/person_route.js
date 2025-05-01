const express = require("express");
const {
  getPersons,
  getOnePerson,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/person_controllers");
const router = express.Router();

//get all persons
router.get("/", getPersons);

//get one person
router.get("/:id", getOnePerson);

//create a person
router.post("/", createPerson);

//update a person
router.put("/:id", updatePerson);

//delete a person
router.delete("/:id", deletePerson);

module.exports = router;
