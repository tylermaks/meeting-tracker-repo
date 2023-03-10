const jwt = require('jsonwebtoken')
const Airtable = require('airtable')

//SETUP AIRTABLE DATABASE
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_ADVISORS_ID

const handleLogout= (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //Cookie doesn't exist 

    const refreshToken = cookies.jwt

    base(table).select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        //FIND USER
        const foundUser = records.find(record => record.get('refreshToken') === refreshToken)
        //DELETE TOKEN IF USER FOUND
        if (foundUser) {
            base(table).update(foundUser.id, {
                "refreshToken": ''
            }, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            return res.sendStatus(204)
        }

        fetchNextPage()
    }, function done(err) {
        if (err) {
            //IF USER IS NOT FOUND AND COOKIE EXISTS, CLEAR COOKIE
            if (!foundUser){
                res.clearCookie('jwt', {httpOnly: true, sameSite:'None', secure: true})
                return res.sendStatus(204)
            }
            
            console.error(err) 
            return
        } 
    })


}

module.exports = { handleLogout }