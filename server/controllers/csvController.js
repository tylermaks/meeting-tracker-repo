var fs = require('fs'); 
const { parse } = require('csv-parse')

const handleParse = (req, res) => {
    console.log(req.file)
    const csv = req.file
    if (!csv) return res.sendStatus(404)
    
    const records = []

    //Initialize Parser
    const parser = parse({
        delimiter:','
    })
    //Readable Stream API to Consume Records
    parser.on('readable', function(){
        let record
        while ((record = parser.read()) != null){
            records.push(record)
        }
    })
    //Catch any error
    parser.on('error', function(err){
        console.error(err.message)
    })

    parser.on('end', function(){
        console.log(records)
    })
    //Open file and pipe it into the parser
    // fs.readFileSync(req.file.buffer).pipe(parser)
    // return res.sendStatus(204)
}

module.exports = { handleParse }