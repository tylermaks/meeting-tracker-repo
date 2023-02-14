require('dotenv').config()
const jwt = require('jsonwebtoken')
const data = {}
data.users = require('../testData.json')

//WILL NEED TO UPDATE ONCE AIRTABLE API IS CREATED
const handleLogout= (req, res) => {
    //On client, also delete the access token
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)

    //Check Token Exists
    const refreshToken = cookies.jwt
    const foundUser = data.users.find(user => user.refreshToken === refreshToken)
    if (!foundUser){
        res.clearCookie('jwt', {httpOnly: true, sameSite:'None', secure: true})
        return res.sendStatus(204)
    } 

    //Delete refreshToken
    //Return once Airable API is working
}