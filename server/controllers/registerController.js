const bcrypt = require('bcrypt')


const createNewUser = async (req, res) => {
    const { fName, lName, email, pswd} = req.body
    if (!email || !pswd) return res.status(400).json({"message": "Email and password are required"})
    
    //Check of duplicate users
    // const duplicateUser = data.users.find(user => user.email === email)
    // if (duplicateUser) return res.sendStatus(409)

    // try{
    //     const hashedPswrd = await bcrypt.hash(pswd, 12)
        
    //     const newUser = {
    //         id: parseInt(data.users[data.users.length - 1].id) + 1 || 1,
    //         fName: fName,
    //         lName: lName,
    //         email: email,
    //         pswd: hashedPswrd
    //     }

    //     console.log(newUser)
    //     // ADD IN AIRTABLE LATER
 

    // } catch (error){
    //     res.status(500).json({'message': error.message})
    // }
}

module.exports = { createNewUser }