const express = require("express")
const router = express.Router()
const meetingListController = require("../../controllers/meetingListController")

router.route("/")
    .post(meetingListController.getAdvisorMeetingList)


module.exports = router