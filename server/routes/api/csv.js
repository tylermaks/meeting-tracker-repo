const express = require("express")
const router = express.Router()
const csvController = require("../../controllers/csvController")

router.post("/", csvController.handleParse)


module.exports = router