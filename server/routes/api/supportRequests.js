const express = require("express")
const router = express.Router()
const supportRequestController = require("../../controllers/supportRequestController")

router.get("/", supportRequestController.getSupportRequests)


module.exports = router