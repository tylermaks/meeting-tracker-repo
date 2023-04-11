const Airtable = require('airtable');
const bcrypt = require('bcrypt');

// Initialize Airtable Database Variables
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const table = process.env.AIRTABLE_ADVISORS_ID;

// Function to find user in database
const findUser = async (userName) => {
  const records = await base(table).select({
    view: "Grid view",
    filterByFormula: `id = "${userName}"`
  }).all();
  return records[0];
};

// Function to compare passwords
const comparePasswords = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

const updateSettings = async (req, res) => {
  try {
    // Validate data was received
    const { userName, currentPswd } = req.body;
    if (!userName) {
      return res.status(400).json({ "message": "User not found" });
    }

    const user = await findUser(userName);
    if (!user) {
      return res.sendStatus(401);
    }

    const match = await comparePasswords(currentPswd, user.fields.password);
    match ? res.sendStatus(200) : res.sendStatus(400);
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to update user details');
  }
};

module.exports = { updateSettings };
