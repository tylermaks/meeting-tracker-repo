const express = require("express")
const router = express.Router()
const updateMeetingController = require("../../controllers/updateMeetingsController")

router.post("/", updateMeetingController.addNewMeeting)
router.delete("/", updateMeetingController.deleteMeetingRecord)


module.exports = router