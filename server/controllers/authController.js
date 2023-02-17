const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Airtable = require('airtable')
require('dotenv').config()

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_TABLE_ID


const data = {
    users: require('../testData.json'),
    setUsers: function (thing) {this.users = thing}
}


const handleLogin = async (req, res) => {
    //Validate POST request
    const { email, pswd } = req.body
    if (!email || !pswd) return res.status(400).json({"message": "Email and password are required"})
    
    //CHECK AIRTABLE FOR USER
    base(table).select({
        fields: ['id']
    }).eachPage( function page(records, fetchNextPage) {
        const foundUser = records.find( record => record.get('id') === email)
        if (!foundUser) {
            return res.sendStatus(401)
        }

        fetchNextPage();
    }, function done(err) {
        if (err) {
            console.error(err); return;
        } 
    })
    
    
    //Confirm Password and Create JWT
    // const match = await bcrypt.compare(pswd, foundUser.pswd)
    // if (match) {
    //     const roles = Object.values(foundUser.role).filter(Boolean);
    //     const fName = foundUser.fName
    //     const lName = foundUser.lName

    //     const accessToken = jwt.sign(
    //         { 
    //             "UserInfo": {
    //                 "username": foundUser.username,
    //                 "roles": roles
    //             }
    //         },
    //         process.env.ACCESS_TOKEN,
    //         { expiresIn: '59s'}
    //     )
        
    //     const refreshToken = jwt.sign(
    //         { "username": foundUser.username},
    //         process.env.REFRESH_TOKEN,
    //         { expiresIn: '1d'}
    //     )
        
        //Returning to include Airtable Database Api
        //Will need to save refreshToken to current user to log out
        
    //     res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
    //     res.json({ roles, accessToken, fName, lName })
    //     console.log("Success!")
    // } else {
    //     return res.sendStatus(401)
    // }
}


module.exports = { handleLogin }