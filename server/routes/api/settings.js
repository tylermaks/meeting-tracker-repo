const express = require("express")
const router = express.Router()
const updateSettingsController = require("../../controllers/updateSettingsController")

router.post("/", updateSettingsController.updateSettings)

module.exports = router