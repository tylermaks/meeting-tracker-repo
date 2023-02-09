const data = {}
data.users = require('../testData')


const getAllUsers = (req, res) => {
    res.json(data.users)
}

const getUser = (req, res) => {
    const user = data.users.find(user => user.id === parseInt(req.body.id))
    if (!user) {
        return res.status(400).json({"message": "Employee not found"})
    }

    res.json(user)
}

const createNewUser = (req, res) => {
    const newUser = {
        id: data.users[data.users.length - 1].id + 1 || 1,
        fName: req.body.firstname,
        lName: req.body.lastname,
        email: req.body.email,
        pswd: req.body.pswd
    }

    if (!newUser.email || !newUser.pswd) {
        return res.status(400).json({"message": "Email and password are required"})
    }

    data.setUsers([...data.users, newUser])
    res.json(data.users)
}

const updateUser = (req, res) => {
    const user = data.users.find(user => user.id === parseInt(req.body.id))
    if (!user) {
        return res.status(400).json({"message": "Employee not found"})
    }

    //Returning to complete this function later
}

const deleteUser = (req, res) => {
    const user = data.users.find(user => user.id === parseInt(req.body.id))
    if (!user) {
        return res.status(400).json({"message": "Employee not found"})
    }
    
    const filteredArray = data.users.filter(user => user.id !== parseInt(req.body.id))
    data.setUsers([...filteredArray])
    res.json(data.users)
}

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser }