const express = require("express")
const router = express.Router()
const meetingListController = require("../../controllers/meetingListController")

router.post("/", meetingListController.getAdvisorMeetingList)


module.exports = router