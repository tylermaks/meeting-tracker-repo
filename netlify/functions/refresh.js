// const express = require("express")
// const router = express.Router()
// const refreshTokenController = require("../../controllers/refreshTokenController")

// router.get("/", refreshTokenController.handleRefreshToken)


// module.exports = router

const refreshTokenController = require("../../server/controllers/refreshTokenController")

const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const body = JSON.parse(event.body)
    const result = await refreshTokenController.handleRefreshToken(body)
    return { statusCode: 200, body: JSON.stringify(result) }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}

module.exports = { handler }