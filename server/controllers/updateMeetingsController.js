const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const table = process.env.AIRTABLE_MEETING_ID

const getSortedRecords = async (tableName, sortFields) => {
  const records = [];
  await base(tableName)
    .select({
      sort: sortFields
    })
    .eachPage((pageRecords, fetchNextPage) => {
      records.push(...pageRecords);
      fetchNextPage();
    });
  return records;
};

const createMeetingRecord = async (companyId, entry, userId, count) => {
  const records = await getSortedRecords(table, [{ field: 'meeting_ID', direction: 'asc' }]);
  const lastEntry = records[records.length - 1].fields.meeting_ID + 1 + count;
  await base(table).create({
    meeting_ID: lastEntry,
    advisorLink: [userId],
    companyNameId: [companyId.id],
    date: entry.date,
    meetingType: [entry.meetingType],
    duration: Number(entry.duration),
    notes: entry.notes,
  });
};

const addNewMeeting = async (req, res) => {
  try {
    const { userId, data } = req.body;
    if (!userId || !data) {
      return res.status(400).send('Missing user ID or data');
    }

    let count = 0;
    const promises = [];

    for (const entry of data) {
      const records = await getSortedRecords('companies', [{ field: 'companyName', direction: 'asc' }]);
      const companyId = records.find((record) => record.get('companyName') === entry.company);

      if (companyId) {
        promises.push(createMeetingRecord(companyId, entry, userId, count));
        count++;
      }
    }

    await Promise.all(promises);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to add new meeting');
  }
};

const deleteMeetingRecord = async (req, res) => {
  try {
    await base(table).destroy(req.body);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to delete selected records in database');
  }
};

module.exports = { addNewMeeting, deleteMeetingRecord };
