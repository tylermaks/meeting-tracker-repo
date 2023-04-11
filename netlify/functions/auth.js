const authController = require("./controllers/authController")

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { message: event.httpMethod, statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const body = JSON.parse(event.body)
    const result = await authController.handleLogin(body)
    return { statusCode: 200, body: JSON.stringify(result) }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}