const express = require("express");

const router = express.Router();
const userControllers = require("../Controllers/userControllers");

router.get("/initial", userControllers.getInitialDetails);
router.get("/:id", userControllers.getDetails);

module.exports = router;
