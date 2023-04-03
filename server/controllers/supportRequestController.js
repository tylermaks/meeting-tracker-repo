const Airtable = require('airtable')

//SETUP AIRTABLE DATABASE
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_REQUESTS_ID

//Get Support Request
const getSupportRequests = (req, res) => { 
    base(table).select({
        sort: [
            {field: 'requestID', direction: "asc"}
        ]
    }).eachPage(function page(records, fetchNextPage){
        const requestArr = []

        records.forEach( record => { 
            requestArr.push(record.fields)
        })

        fetchNextPage()
        res.json({ requestArr })
    }, function done(err){
        if(err){
            console.error(err)
            return
        }
    })
}


module.exports = { getSupportRequests }