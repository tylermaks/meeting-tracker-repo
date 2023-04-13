const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    console.log("Made it to verifyJWT")
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.sendStatus(401)

    const token = authHeader
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403) //invalid token
            req.username = decoded.username
            next()
        }
    )
}   

module.exports = verifyJWT