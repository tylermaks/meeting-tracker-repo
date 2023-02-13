const data = {}
data.users = require('../testData.json')


const getUser = (req, res) => {
    return res.json({ "id": req.params.id})
}

const updateUser = (req, res) => {
    //Returning to complete this function later
}

const deleteUser = (req, res) => {
    //Returning to complete this function later
}

module.exports = { getUser, updateUser, deleteUser }