const Airtable = require('airtable')

//Setup AirTable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_MEETING_ID


const getMeetingList = (req, res) => {
    const { userName } = req.body
    const meetingArr = []

    base(table).select({
        filterByFormula: `advisorLink = "${userName}"`
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
        if (err) {
            console.log(err)
            return
        }
    })
} 
    

module.exports = { getMeetingList }