const express = require("express");
const router = express.Router();
const hostController = require("../controllers/host.controller");

router.post("/signup", hostController.signup);
router.post("/signin", hostController.signin);

module.exports = router;
