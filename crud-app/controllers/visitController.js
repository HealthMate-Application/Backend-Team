const Visit = require("../models/visit");
const HandlerFactory = require("./handlerFactory");

// Get All Visits
const getVisits = HandlerFactory.getAll(Visit);

// Get Single Visit
const getVisit = HandlerFactory.getOne(Visit);

// Create New Visit
const createVisit = HandlerFactory.createOne(Visit);

// Update Visit
const updateVisit = HandlerFactory.updateOne(Visit);

// Delete Visit
const deleteVisit = HandlerFactory.deleteOne(Visit);

module.exports = {
  getVisits,
  getVisit,
  createVisit,
  updateVisit,
  deleteVisit,
};
