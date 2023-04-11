// const express = require('express')
// // const credentials = require('../../server/middleware/credentials')

// const cookieParser = require('cookie-parser')
// // const corsOptionsDelegate = require('../../server/config/cors')
// const app = express()
// const verifyJWT = require('../../server/middleware/verifyJWT')
// const serverless = require('serverless-http');

// //CORS
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next()
// })

// //SETUP
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())
// app.use(cookieParser())

// //ROUTES
// app.use('/auth', require('./auth'))
// app.use('/refresh', require('./refresh'))
// app.use(verifyJWT)
// app.use('/meetingList', require('./meetingList'))
// app.use('/logout', require('./logout'))
// // app.use('/.netlify/functions/server/meeting', require('./routes/api/meeting'))
// // app.use('/.netlify/functions/server/companies', require("./routes/api/companies"))
// // app.use('/.netlify/functions/server/settings', require('./routes/api/settings'))
// // app.use('/.netlify/functions/server/supportRequests', require('./routes/api/supportRequests'))

// module.exports.handler = serverless(app);

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const verifyJWT = require('../../server/middleware/verifyJWT')
const serverless = require('serverless-http');


//SETUP
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//CORS
app.use((req, res, next) => {
    const origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // add this line if you're using cookies
    next();
})


//ROUTES
app.use('/auth', require('./auth'))
app.use('/refresh', require('./refresh'))
app.use(verifyJWT)
app.use('/meetingList', require('./meetingList'))
app.use('/logout', require('./logout'))

// Set headers for all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

module.exports.handler = serverless(app);

