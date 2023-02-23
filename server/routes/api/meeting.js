const express = require("express")
const router = express.Router()
const meetingController = require("../../controllers/meetingController")

router.post("/", meetingController.handleAddMeeting)


module.exports = router