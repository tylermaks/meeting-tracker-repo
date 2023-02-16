const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Airtable = require('airtable')
require('dotenv').config()

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_TABLE_ID

 const getData = () => {
    base(table).select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 1,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            console.log('Retrieved', record.get('id'));
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });

 }



const data = {
    users: require('../testData.json'),
    setUsers: function (thing) {this.users = thing}
}


const handleLogin = async (req, res) => {
    getData()

    // //Validate POST request
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
        const roles = Object.values(foundUser.role).filter(Boolean);
        const fName = foundUser.fName
        const lName = foundUser.lName

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
        
        //Returning to include Airtable Database Api
        //Will need to save refreshToken to current user to log out

        // const otherUsers = data.users.filter(person => person.username !== foundUser.username)
        // const currentUser = {...foundUser, refreshToken}

        // data.setUsers([...otherUsers, currentUser])
        // await fsPromises.writeFile(
        //     path.join(__dirname, "..", "testData.json"),
        //     JSON.stringify(data.users)
        // )
        
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({ roles, accessToken, fName, lName })
        console.log("Success!")
    } else {
        return res.sendStatus(401)
    }
}


module.exports = { handleLogin }