const jwt = require('jsonwebtoken')
const Airtable = require('airtable')

//Setup AirTable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const table = process.env.AIRTABLE_ADVISORS_ID

const findUserByRefreshToken = async (refreshToken) => {
  const queryResult = await base(table).select({
    view: "Grid view",
    filterByFormula: `{refreshToken} = '${refreshToken}'`
  }).firstPage()

  return queryResult[0]
}

const deleteRefreshToken = async (recordId) => {
  return new Promise((resolve, reject) => {
    base(table).update(recordId, {
      "refreshToken": ''
    }, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

const handleLogout= async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //Cookie doesn't exist 

  const refreshToken = cookies.jwt

  try {
    const foundUser = await findUserByRefreshToken(refreshToken)
    if (!foundUser) {
      res.clearCookie('jwt', {httpOnly: true, sameSite:'None', secure: true})
      return res.sendStatus(204)
    }

    await deleteRefreshToken(foundUser.id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error) 
    console.log("Unable to log out")
    res.sendStatus(500)
  }
}

module.exports = { handleLogout }
