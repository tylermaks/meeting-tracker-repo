const Airtable = require('airtable')

//SETUP AIRTABLE DATABASE
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_MEETING_ID


const getUser = (req, res) => {
    const meetingArr = []

    base(table).select({
        filterByFormula: `advisorLink = "${req.params.id}"`
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach( record => {
            meetingArr.push(
                {
                    record_ID: record.id, 
                    fields: record.fields
                }
            )
        })
        res.json({ meetingArr })  
              
        fetchNextPage()
    }, function done(err){
        //Catching empty Array might be needed here...return later

        if (err) {
            console.log(err)
            return
        }
    })
} 
    

module.exports = { getUser }