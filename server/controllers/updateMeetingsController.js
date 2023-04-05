const Airtable = require('airtable')

//SETUP AIRTABLE DATABASE
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const meetings = process.env.AIRTABLE_MEETING_ID
const companies = process.env.AIRTABLE_COMPANIES_ID

//Create a new meeting record in AirTable using data passed from AddHourModal Component
const createMeetingRecord = (companyId, entry, userId, count) => { 
    base(meetings).select({
        sort: [
            {field: 'meeting_ID', direction: "asc"}
        ]
    }).eachPage(function page(records, fetchNextPage){
        let lastEntry = records[records.length - 1].fields.meeting_ID + 1 + count

        base(meetings).create({
            "meeting_ID": lastEntry,
            "advisorLink": [userId],
            "companyNameId": [companyId.id],
            "date": entry.date,
            "meetingType": [entry.meetingType],
            "duration": Number(entry.duration),
            "notes": entry.notes
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

//Validate user and data, then call createMeetingRecord
const addNewMeeting = (req, res) => {
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
                createMeetingRecord(companyId, entry, userId, count)
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

//Delete the select record from AirTable
const deleteMeetingRecord = (req, res) => {
    base(meetings).destroy(req.body),
    function(err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted', deletedRecords.length, 'records');
    } 
    res.sendStatus(204)
}

module.exports = { addNewMeeting, deleteMeetingRecord }