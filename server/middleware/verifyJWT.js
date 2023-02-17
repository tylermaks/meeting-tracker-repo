const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.sendStatus(401)

    console.log(authHeader)
    console.log(req.user)
    console.log(req.email)

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403) //invalid token
            req.user = decoded.username
            next()
        }
    )
}   

module.exports = verifyJWT