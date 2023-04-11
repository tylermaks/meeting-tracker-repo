const allowedOrigins = require("../config/allowedOrigins");

exports.handler = function (event, context, callback) {
  const origin = event.headers.origin;

  if (allowedOrigins.includes(origin)) {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": true,
      },
    };
    return callback(null, response);
  }

  const response = {
    statusCode: 403,
    body: JSON.stringify({
      error: "Not allowed to access this resource from this origin.",
    }),
  };
  return callback(null, response);
};
