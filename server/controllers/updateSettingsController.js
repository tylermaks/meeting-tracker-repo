const Airtable = require('airtable')
const bcrypt = require('bcrypt')

//Initialize Airtable Database Variables 
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_ADVISORS_ID

const updateSettings = (req, res) => {
    //Validate data was received
    const { userName, currentPswd } = req.body
    if (!userName) return res.status(400).json({"message": "User not found"})

    base(table).select({
        view: "Grid view"
    }).eachPage(async function page(records, fetchNextPage){
        //Find user in Database
        const foundUser = records.find(record => record.get('id') === userName)
        if (!foundUser) {
            return res.sendStatus(401)
        }
        //Compare currentPassword with password stored in database
        const match = await bcrypt.compare(currentPswd, foundUser.fields.password)
        match ? res.sendStatus(200) : res.sendStatus(400)

        fetchNextPage()
    }, function done(err) {
        if (err) {
            console.error(err)
            return
        } 
    })
}

module.exports = { updateSettings }