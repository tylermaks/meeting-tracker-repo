//IMPORTS
const jwt = require('jsonwebtoken')
const Airtable = require('airtable')

//SETUP AIRTABLE DATABASE
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_ADVISORS_ID

//FUNCTION
const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt

    base(table).select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        //FIND USER
        const foundUser = records.find(record => record.get('refreshToken') === refreshToken)
        if (!foundUser) return res.sendStatus(403)

        //VARIFY TOKEN
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN,
            (err, decoded) => {
                if (err || foundUser.fields.id !== decoded.UserInfo.username) return res.sendStatus(403) //invalid token
                const accessToken = jwt.sign(
                    { 
                        "username" : decoded.UserInfo.username,
                        "roles": decoded.UserInfo.roles
                    },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: '59s'} 
                )
                res.json({ accessToken })
            }
        )

        fetchNextPage()
    }, function done(err) {
        if (err) {
            console.error(err) 
            return
        } 
    })
}



module.exports = { handleRefreshToken }