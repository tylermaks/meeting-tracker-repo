const Airtable = require('airtable')

//Setup AirTable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_MEETING_ID


const getAdvisorMeetingList = async (req, res) => {
    const { userName } = req.body;
    const meetingArr = [];
  
    try {
      const records = await base(table).select({
        filterByFormula: `advisorLink = "${userName}"`
      }).all();
  
      records.forEach(record => {
        const { id: record_ID, fields } = record;
        meetingArr.push({ record_ID, fields });
      });
  
      res.json({ meetingArr });
    } catch (error) {
      console.error(error);
      console.log("Unable to get advisor meeting list");
      res.sendStatus(500);
    }
  };
  
  module.exports = { getAdvisorMeetingList };