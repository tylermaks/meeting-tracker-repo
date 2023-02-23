const Airtable = require('airtable')

//SETUP AIRTABLE DATABASE
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_MEETING_ID

const handleAddMeeting = (req, res) => {
    const { id, company, date, type, duration, notes } = req.body
    if (!id) return res.sendStatus(403)

    base(table).select({
        sort: [
            {field: 'Meeting_ID', direction: "asc"}
        ]
    }).eachPage(function page(records, fetchNextPage){
        const lastEntry = records[records.length -1].fields.Meeting_ID
    
        base(table).create({
            "Meeting_ID": `${Number(lastEntry) + 1}`,
             "advisorLink": [id],
             "CompanyName": company,
             "Date": date,
             "MeetingType": [type],
             "Duration": duration,
             "Notes": notes
         }, function(err) {
             if(err){
                 console.error(err)
                 return
             }
         })

         fetchNextPage()
         return res.sendStatus(204)
    }, function done(err){
        if(err){
            console.error(err)
            return
        }
    })
}

module.exports = { handleAddMeeting }