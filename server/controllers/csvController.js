// const parse = require('csv-parse')

const handleParse = (req, res) => {
    console.log(req.file)
    console.log(req.body)
}

module.exports = { handleParse }