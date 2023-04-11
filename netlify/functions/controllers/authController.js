const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Airtable = require('airtable')

//Setup Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_ADVISORS_ID

const handleLogin = async (req, res) => {
    const { email, pswd } = req.data
    if (!email || !pswd) {
        return res.status(400).json({"message": "Email and password are required"})
    }
    
    try {
        const records = await base(table).select({
            view: "Grid view"
        }).all()
        
        const foundUser = records.find(record => record.get('id') === email)
        if (!foundUser) {
            return res.sendStatus(401)
        }

        const match = await bcrypt.compare(pswd, foundUser.fields.password)
        if (match) {
            const { id, fields: { id: username, role: roles, firstName: fName, lastName: lName } } = foundUser
    
            const accessToken = jwt.sign(
                { "UserInfo": { username, roles } },
                process.env.ACCESS_TOKEN,
                { expiresIn: '900s'}
            )
            
            const refreshToken = jwt.sign(
                { "UserInfo": { username, roles } },
                process.env.REFRESH_TOKEN,
                { expiresIn: '1d'}
            )
            
            await base(table).update(foundUser.id, { "refreshToken": refreshToken })
            
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
            res.json({ id, roles, accessToken, fName, lName })
        } else {
            return res.sendStatus(401)
        }
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}


module.exports = { handleLogin }