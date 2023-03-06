const Airtable = require('airtable')

//SETUP AIRTABLE DATABASE
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const meetings = process.env.AIRTABLE_MEETING_ID
const companies = process.env.AIRTABLE_COMPANIES_ID


const handleData = (req, res) => {
    const { userId, data } = req.body
    if (!userId || !data) return res.sendStatus(400)

    let success = true

    data.forEach( (entry, i) => {
        console.log(i)
        base(companies).select({
            sort: [
                {field: 'companyName', direction: "asc"}
            ]
        }).eachPage(function page(records, fetchNextPage){
            let companyId = ''
            
            records.forEach( record => {
                if (record.fields.companyName.match(entry.company)){
                    companyId = record.id
                }
            })

            if (companyId) {
                base(meetings).select({
                    sort: [
                        {field: 'Meeting_ID', direction: "asc"}
                    ]
                }).eachPage(function page(records, fetchNextPage){
                    const lastEntry = records[records.length - 1].fields.Meeting_ID
                
                    base(meetings).create({
                        "Meeting_ID": `${Number(lastEntry) + i}`,
                        "advisorLink": [userId],
                        "CompanyNameId": [companyId],
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