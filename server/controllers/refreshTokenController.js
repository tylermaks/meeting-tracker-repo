const jwt = require('jsonwebtoken');
const Airtable = require('airtable');

//Setup AirTable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const table = process.env.AIRTABLE_ADVISORS_ID;

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const records = await base(table).select({
      view: 'Grid view',
    }).all();

    const foundUser = records?.find(record => record.get('refreshToken') === refreshToken);
    if (!foundUser) { return res.sendStatus(403);}


    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    if (foundUser.fields.id !== decoded.UserInfo.username) { return res.sendStatus(403);}

    const { fields: { id: userName, role: roles, firstName: fName, lastName: lName } } = foundUser

    const accessToken = jwt.sign(
      {
        username: decoded.UserInfo.username,
        roles: decoded.UserInfo.roles,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: '900s' },
    );
    res.json({ userName, fName, lName, roles, accessToken });
  } catch (error) {
    console.error(error);
    console.log('An error occurred while assigning the JWT token');
    res.sendStatus(500);
  }
};

module.exports = { handleRefreshToken };
