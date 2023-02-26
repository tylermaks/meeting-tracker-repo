const express = require("express")
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const csvController = require("../../controllers/csvController")

router.post("/", upload.single('file'), csvController.handleParse)


module.exports = router