const Airtable = require('airtable')

//SETUP AIRTABLE DATABASE
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_MEETING_ID


const handleData = (req, res) => {
    const { userId, data } = req.body
    if (!userId || !data) return res.sendStatus(400)

    let success = true

    data.map( (entry, i) => {
        base(table).select({
            sort: [
                {field: 'Meeting_ID', direction: "asc"}
            ]
        }).eachPage(function page(records, fetchNextPage){
            const lastEntry = records[records.length -1].fields.Meeting_ID
        
            base(table).create({
                "Meeting_ID": `${Number(lastEntry) + 1 + i}`,
                "advisorLink": [userId],
                "CompanyName-old": entry.company,
                "Date": entry.date,
                "MeetingType": [entry.meetingType],
                "Duration": Number(entry.duration),
                "Notes": entry.notes
             }, function(err) {
                 if(err){
                     console.error(err)
                     return
                 }
             })
    
            fetchNextPage()
        }, function done(err){
            if(err){
                success = false
                console.error(err)
                return
            }
        })
    })

    success ? res.sendStatus(204) : res.sendStatus(400)
}

module.exports = { handleData }