require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/cors')
const app = express()
const verifyJWT = require('./middleware/verifyJWT')
const PORT = 5000

//SETUP
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//ROUTES
app.use('/register', require('./routes/api/register'))
app.use('/auth', require('./routes/api/auth'))
app.use('/refresh', require('./routes/api/refresh'))
// app.use(verifyJWT)
app.use('/user', require('./routes/api/user'))


app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))