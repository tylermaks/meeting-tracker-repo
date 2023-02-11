const data = {}
data.users = require('../testData.json')


const getUser = (req, res) => {
    // const user = data.users.find(user => user.username === req.body.email)
    // if (!user) return res.status(400).json({"message": `User not found: ${req.params.email}`})

    // return res.json({ "test": "test", "fName": user.fName, "lName": user.lName})
    return res.json(data.users)
}

const updateUser = (req, res) => {
    //Returning to complete this function later
}

const deleteUser = (req, res) => {
    //Returning to complete this function later
}

module.exports = { getUser, updateUser, deleteUser }