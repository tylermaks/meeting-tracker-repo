const bcrypt = require('bcrypt')
const data = {}
data.users = require('../testData.json')

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

const createNewUser = async (req, res) => {
    const { fName, lName, email, pswd} = req.body
    if (!email || !pswd) return res.status(400).json({"message": "Email and password are required"})
    
    //Check of duplicate users
    const duplicateUser = data.users.find(user => user.email === email)
    if (duplicateUser) return res.sendStatus(409)

    try{
        const hashedPswrd = await bcrypt.hash(pswd, 10)
        
        const newUser = {
            id: data.users[data.users.length - 1].id + 1 || 1,
            fName: fName,
            lName: lName,
            email: email,
            pswd: hashedPswrd
        }

        console.log(newUser)
        // data.setUsers([...data.users, newUser])
        // res.json(data.users)
    } catch (error){
        res.status(500).json({'message': error.message})
    }
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