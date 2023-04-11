const express = require("express")
const router = express.Router()
const csvController = require("../../controllers/companiesController")

router.get("/", csvController.getCompanies)


module.exports = router