require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const cors = require('cors')
const corsOptionsDelegate = require('./config/cors')
const app = express()
const verifyJWT = require('./middleware/verifyJWT')
const PORT = 5000
const path = require('path');

app.use(cookieParser())
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

<<<<<<< HEAD
// // Serve the index.html file as the default page for all other routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
//  })
=======
// Serve the index.html file as the default page for all other routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
//  })

>>>>>>> a24592116f28e95a8fff783419e5f7463abd6120

//SETUP
app.use(credentials)
app.use(cors(corsOptionsDelegate))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//ROUTES
app.use('/auth', require('./routes/api/auth'))
app.use('/refresh', require('./routes/api/refresh'))
app.use(verifyJWT)
app.use('/meetingList', require('./routes/api/meetingList'))
app.use('/logout', require('./routes/api/logout'))
app.use('/meeting', require('./routes/api/meeting'))
app.use('/companies', require("./routes/api/companies"))
app.use('/settings', require('./routes/api/settings'))
app.use('/supportRequests', require('./routes/api/supportRequests'))


app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
