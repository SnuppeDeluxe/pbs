const express = require("express");
const path = require("path");

const pbsController = require("../controllers/pbs");

const router = express.Router();

//Dashboard
router.get("/", pbsController.getDashboard);

module.exports = router;
