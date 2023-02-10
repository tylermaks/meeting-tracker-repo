const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const data = {}
data.users = require('../testData.json')


const handleLogin = async (req, res) => {
    //Validate POST request
    const { email, pswd } = req.body
    if (!email || !pswd) return res.status(400).json({"message": "Email and password are required"})
    //Find User in Database
    const foundUser = data.users.find(user => user.username === email)
    if (!foundUser) {
        return res.sendStatus(401)
    }
    //Confirm Password and Create JWT
    const match = await bcrypt.compare(pswd, foundUser.pswd)
    if (match) {
        //create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username},
            process.env.ACCESS_TOKEN,
            { expiresIn: '59s'}
        )
        
        const refreshToken = jwt.sign(
            { "username": foundUser.username},
            process.env.REFRESH_TOKEN,
            { expiresIn: '1d'}
        )
        
        //Returning to include Airtable Database Api
        //Will need to save refreshToken to current user to log out

        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({ accessToken })
    } else {
        return res.sendStatus(401)
    }
}



// const updateUser = (req, res) => {
//     const user = data.users.find(user => user.id === parseInt(req.body.id))
//     if (!user) {
//         return res.status(400).json({"message": "User not found"})
//     }

//     //Returning to complete this function later
// }

// const deleteUser = (req, res) => {
//     const user = data.users.find(user => user.id === parseInt(req.body.id))
//     if (!user) {
//         return res.status(400).json({"message": "User not found"})
//     }
    
//     const filteredArray = data.users.filter(user => user.id !== parseInt(req.body.id))
//     data.setUsers([...filteredArray])
//     res.json(data.users)
// }

module.exports = { handleLogin }