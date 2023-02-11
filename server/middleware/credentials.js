const allowedOrigins = ['http://127.0.0.0.1:5000', 'http://localhost:3000']

const credentials = (res, req, next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true)
    }

    next()
}

module.exports = credentials