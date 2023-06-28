const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
// value specifying how many times we run algorithm on the data to be scrambled
const SALT = Number(process.env.SALT)

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) throw Error("Incorrect schema values")

        // Instantiate a new model using provided req.body object values
        // Hash the password using .hashSync() with req.body.password and the SALT value
        // Assign the password property to the value of .hashSync() return
        const newUser = new User({ name, email, password: bcrypt.hashSync(password, SALT) })
        // Save the model document into the collection
        await newUser.save()

        res.status(201).json({
            message: `User created`,
            newUser
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// http://localhost:4000/auth/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        
        let foundUser = await User.findOne({ email })
        
        if (!foundUser) throw Error("User not found")

        // Async .compare() method which takes password from req.body
        // Compares it against password from the user found in the db
        const verifyPwd = await bcrypt.compare(password, foundUser.password)

        if (!verifyPwd) throw Error("Incorrect password")

        res.status(200).json({
            message: `Logged in`,
            foundUser
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router