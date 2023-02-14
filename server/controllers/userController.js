const data = {}
data.users = require('../testData.json')


const getUser = (req, res) => {
    const foundUser = data.users.find(user => user.id === req.params.id)
    if (!foundUser) {
        return res.sendStatus(401)
    }

    return res.json({"fName":foundUser.fName, "lName":foundUser.lName})
}

const updateUser = (req, res) => {
    //Returning to complete this function later
}

const deleteUser = (req, res) => {
    //Returning to complete this function later
}

module.exports = { getUser, updateUser, deleteUser }