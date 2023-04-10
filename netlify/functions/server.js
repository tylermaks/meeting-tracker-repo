require('dotenv').config()
const express = require('express')
const credentials = require('./middleware/credentials')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptionsDelegate = require('./config/cors')
const app = express()
const verifyJWT = require('./middleware/verifyJWT')

//SETUP
app.use(credentials)
app.use(cors(corsOptionsDelegate))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//ROUTES
app.use('/.netlify/functions/auth', require('./routes/api/auth'))
app.use('/.netlify/functions/refresh', require('./routes/api/refresh'))
app.use(verifyJWT)
app.use('/.netlify/functions/meetingList', require('./routes/api/meetingList'))
app.use('/.netlify/functions/logout', require('./routes/api/logout'))
app.use('/.netlify/functions/meeting', require('./routes/api/meeting'))
app.use('/.netlify/functions/companies', require("./routes/api/companies"))
app.use('/.netlify/functions/settings', require('./routes/api/settings'))
app.use('/.netlify/functions/supportRequests', require('./routes/api/supportRequests'))

exports.handler = async (event, context) => {
  const PORT = process.env.PORT || 9000;
  const server = app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Server is running on Port: ${PORT}` }),
  };
}
