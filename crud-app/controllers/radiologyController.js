const Radiology = require('../models/radiologyScan');
const HandlerFactory = require('./handlerFactory');

// Get All Radiology Records
const getRadiologyRecords = HandlerFactory.getAll(Radiology);

// Get Single Radiology Record
const getRadiologyRecord = HandlerFactory.getOne(Radiology);

// Create New Radiology Record
const createRadiologyRecord = HandlerFactory.createOne(Radiology);

// Update Radiology Record
const updateRadiologyRecord = HandlerFactory.updateOne(Radiology);

// Delete Radiology Record
const deleteRadiologyRecord = HandlerFactory.deleteOne(Radiology);

module.exports = {
  getRadiologyRecords,
  getRadiologyRecord,
  createRadiologyRecord,
  updateRadiologyRecord,
  deleteRadiologyRecord
};