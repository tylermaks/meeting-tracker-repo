//IMPORTS
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Airtable = require('airtable')

//SETUP AIRTABLE DATABASE
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_TABLE_ID

//LOGIN 
const handleLogin = (req, res) => {
    //Validate POST request
    const { email, pswd } = req.body
    if (!email || !pswd) return res.status(400).json({"message": "Email and password are required"})
    
    //CHECK AIRTABLE FOR USER AND PASSWORD 
    base(table).select({
        view: "Grid view"
    }).eachPage(async function page(records, fetchNextPage) {
        //FIND USER
        const foundUser = records.find(record => record.get('id') === email)
        if (!foundUser) {
            return res.sendStatus(401)
        }

        //MATCH PASSWORD
        const match = await bcrypt.compare(pswd, foundUser.fields.password)
        if (match) {
            //For testing only: change this to roles, record id, email and password....keep in React authContext and use to retrieve and write data in the spreadsheet component
            const roles = foundUser.fields.role // likely need to change this when adding Admin functionality
            const fName = foundUser.fields.firstName
            const lName = foundUser.fields.lastName
    
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN,
                { expiresIn: '59s'}
            )
            
            const refreshToken = jwt.sign(
                { "username": foundUser.username},
                process.env.REFRESH_TOKEN,
                { expiresIn: '1d'}
            )
            
            //SAVE REFRESHTOKEN TO AIRTABLE
            base(table).update(foundUser.id, {
                "refreshToken": refreshToken
            }, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })

            res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
            res.json({ roles, accessToken, fName, lName })
            console.log("Success!")
        } else {
            return res.sendStatus(401)
        }

        fetchNextPage();
    }, function done(err) {
        if (err) {
            console.error(err)
            return
        } 
    })
}


module.exports = { handleLogin }