const express = require("express")
const router = express.Router()
const meetingController = require("../../controllers/meetingController")

router.post("/", meetingController.handleData)
router.delete("/", meetingController.deleteMeetingRecord)


module.exports = router