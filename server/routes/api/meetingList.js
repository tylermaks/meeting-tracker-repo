const express = require("express")
const router = express.Router()
const meetingListController = require("../../controllers/meetingListController")

router.route("/")
    .post(meetingListController.getMeetingList)


module.exports = router