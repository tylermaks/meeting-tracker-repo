const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/cors')
const app = express()
const verifyJWT = require('./middleware/verifyJWT')
const PORT = 5000

//SETUP
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//ROUTES
app.use('/register', require('./routes/api/register'))
app.use('/auth', require('./routes/api/users'))
app.use(verifyJWT)

//need to add route to information -- check routes for the right controllers

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))