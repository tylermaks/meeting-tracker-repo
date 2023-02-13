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

        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({ accessToken })
        console.log("Success!")
    } else {
        return res.sendStatus(401)
    }
}


module.exports = { handleLogin }