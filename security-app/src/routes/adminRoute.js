const express = require("express");

const authController = require("./../controllers/authController");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo("admin"));

router.route("/dashboard/stats").get(adminController.getDashboardStats);

module.exports = router;
