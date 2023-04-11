const Airtable = require('airtable')

// Setup AirTable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_COMPANIES_ID

// Retrieve company data from Airtable
const getCompanyData = async () => {
  const records = await base(table).select({
    sort: [{ field: 'companyName', direction: 'asc' }]
  }).all()
  
  const companyData = records.map(record => record.fields)
  return companyData
}

// Send company data to client
const getCompanies = async (req, res) => {
  try {
    const companyData = await getCompanyData()
    res.json({ companyArr: companyData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to send company list' })
  }
}

module.exports = { getCompanies }
