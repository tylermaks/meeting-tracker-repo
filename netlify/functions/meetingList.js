const meetingListController = require("./controllers/meetingListController")

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const result = await meetingListController.getAdvisorMeetingList(event.body)
    return { statusCode: 200, body: JSON.stringify(result) }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
