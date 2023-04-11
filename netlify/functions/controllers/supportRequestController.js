const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_REQUESTS_ID

const getSupportRequests = (req, res) => {
    const requestArr = []

    base(table)
        .select({
            sort: [{field: 'requestID', direction: 'asc'}],
        })
        .eachPage(
            async (records, fetchNextPage) => {
                for (const record of records) {
                    requestArr.push(record.fields)
                }
                await fetchNextPage()
            },
            (error) => {
                if (error) {
                    console.error(error)
                    console.log('Unable to retrieve support request list')
                } else {
                    res.json({ requestArr })
                }
            }
        )
}

module.exports = { getSupportRequests }