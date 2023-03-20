const express = require("express")
const router = express.Router()
const csvController = require("../../controllers/csvController")

router.post("/", csvController.handleData)
router.delete("/", csvController.deleteMeetingRecord)


module.exports = router