const express = require("express")
const router = express.Router()
const csvController = require("../../controllers/csvController")

router.post("/", csvController.handleData)


module.exports = router