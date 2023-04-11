const express = require('express')
const credentials = require('../../server/middleware/credentials')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptionsDelegate = require('../../server/config/cors')
const app = express()
const verifyJWT = require('../../server/middleware/verifyJWT')
const serverless = require('serverless-http');

//SETUP
app.use(credentials)
app.use(cors(corsOptionsDelegate))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//ROUTES
app.use('/auth', require('./auth'))
// app.use('/.netlify/functions/server/refresh', require('./routes/api/refresh'))
// app.use(verifyJWT)
// app.use('/.netlify/functions/server/meetingList', require('./routes/api/meetingList'))
// app.use('/.netlify/functions/server/logout', require('./routes/api/logout'))
// app.use('/.netlify/functions/server/meeting', require('./routes/api/meeting'))
// app.use('/.netlify/functions/server/companies', require("./routes/api/companies"))
// app.use('/.netlify/functions/server/settings', require('./routes/api/settings'))
// app.use('/.netlify/functions/server/supportRequests', require('./routes/api/supportRequests'))

module.exports.handler = serverless(app);
