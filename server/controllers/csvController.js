const Airtable = require('airtable')

//SETUP AIRTABLE DATABASE
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const meetings = process.env.AIRTABLE_MEETING_ID
const companies = process.env.AIRTABLE_COMPANIES_ID

const createNewMeeting = (companyId, entry, userId, count) => { 
    base(meetings).select({
        sort: [
            {field: 'Meeting_ID', direction: "asc"}
        ]
    }).eachPage(function page(records, fetchNextPage){
        let lastEntry = records[records.length - 1].fields.Meeting_ID + 1 + count
        
        base(meetings).create({
            "Meeting_ID": lastEntry,
            "advisorLink": [userId],
            "CompanyNameId": [companyId.id],
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
            console.error(err)
            return
        }
    })
}


const handleData = (req, res) => {
    const { userId, data } = req.body
    if (!userId || !data) return res.sendStatus(400)

    let success = true
    let count = 0

    data.forEach( entry => {
        base(companies).select({
            sort: [
                {field: 'companyName', direction: "asc"}
            ]
        }).eachPage(function page(records, fetchNextPage){
            let companyId = records.find(record => record.get('companyName') === entry.company)
            if (companyId) { 
                createNewMeeting(companyId, entry, userId, count)
                count++
            }

            fetchNextPage()       
        }, function done(err){
            if(err){
                success = false
                console.error(err)
            }
        })
    })

    success ? res.sendStatus(204) : res.sendStatus(400)
}

module.exports = { handleData }