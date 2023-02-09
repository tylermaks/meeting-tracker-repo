const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/cors')
const app = express()
const PORT = 5000

//SETUP CORS & MIDDLEWARE
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//ROUTES
app.use('/users', require('./routes/api/users'))

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))