const { Table } = require('airtable')
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
            meetingArr.push(record.fields)
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
    
const updateUser = (req, res) => {
    //Returning to complete this function later
}

const deleteUser = (req, res) => {
    //Returning to complete this function later
}

module.exports = { getUser, updateUser, deleteUser }