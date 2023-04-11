const logoutController = require("./controllers/logoutController")

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const result = await logoutController.handleLogout()
    return { statusCode: 200, body: JSON.stringify(result) }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}