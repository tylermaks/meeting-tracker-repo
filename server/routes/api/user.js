const express = require("express")
const router = express.Router()
const userController = require("../../controllers/userController")

router.route('/')
    .put(userController.updateUser)
    .delete(userController.deleteUser)

router.route("/:id")
    .get(userController.getUser)


module.exports = router