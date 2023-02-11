require('dotenv').config()
const jwt = require('jsonwebtoken')
const data = {}
data.users = require('../testData.json')

//WILL NEED TO UPDATE ONCE AIRTABLE API IS CREATED
const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)

    //Check Token Exists
    const refreshToken = cookies.jwt
    const foundUser = data.users.find(user => user.refreshToken === refreshToken)
    if (!foundUser) return res.sendStatus(403)

    console.log(foundUser)

    //Verify JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403) //invalid token
            const accessToken = jwt.sign(
                { "username" : decoded.username },
                process.env.ACCESS_TOKEN,
                { expiresIn: '59s'} 
            )
            res.json({ accessToken })
        }
    )
}



module.exports = { handleRefreshToken }