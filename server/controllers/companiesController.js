const Airtable = require('airtable')

//Setup AirTable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_COMPANIES_ID

//Get list of company data
const getCompanies = (req, res) => {
    base(table).select({
        sort: [
            {field: 'companyName', direction: "asc"}
        ]
    }).eachPage(function page(records, fetchNextPage){
        //Create a company array to be send to frontend with company records
        const companyArr = []

        records.forEach( record => { 
            companyArr.push(record.fields)
        })

        fetchNextPage()
        res.json({ companyArr })
    }, function done(err){
        if(err){
            console.error(err)
            return
        }
    })
}

module.exports = { getCompanies }