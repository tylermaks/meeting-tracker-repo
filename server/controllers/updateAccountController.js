const Airtable = require('airtable')
const bcrypt = require('bcrypt')

//Initialize Airtable Database Variables 
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_ADVISORS_ID

const handleAccountUpdate = (req, res) => {
    //Validate data was received
    const { userName, currentPswd } = body.req
    if (!userName) return res.status(400).json({"message": "User not found"})

    base(table).select({
        filterByFormula: `id = ${userName}`
    }).eachPage(async function page(records, fetchNextPage){
        //Compare currentPassword with password stored in database
        const match = await bcrypt.compare(currentPswd, records.fields.password)
        match ? res.status(200).json({"message": "Success"}) : res.sendStatus(401)

        fetchNextPage()
    }, function done(err) {
        if (err) {
            console.error(err)
            return
        } 
    })
}

module.exports = { handleAccountUpdate }