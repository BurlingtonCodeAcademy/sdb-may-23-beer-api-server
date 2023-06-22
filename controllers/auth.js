const router = require("express").Router()
// Import helper functions
const { read, save } = require("../helper/rw")
// Import path to json file
const dbPath = "./db/users.json"

router.post("/register", (req, res) => {
    try {
        // Destructure the body
        const { name, email, password } = req.body
        // Grab current view of our json file
        let userDB = read(dbPath)
        // Check if user exists
        let foundUser = userDB.filter(usr => usr.email === email)
        // Throw error if user already exists
        if (foundUser.length > 0) {
            throw Error("Email already exists")
        }
        // Push data to read array if user exists
        userDB.push({ name, email, password })
        // Save the user to the json file
        save(userDB, dbPath)
        // Send a response
        res.status(201).json({
            message: `User created`,
            email
        })
    } catch(err) {
        res.status(500).json({
            message: `${err}`,
        })
    }
})


// http://localhost:4000/auth/login
router.post("/login", (req, res) => {
    try {
        // Get data from the request.body
        const email = req.body.email
        const password = req.body.password

        // Read current data inside .json file
        const db = read(dbPath)

        // Check if the email from body matches email in .json file
        const foundUser = db.filter(usr => usr.email === email)

        // Error handling if no user is found
        if (foundUser.length === 0) {
            throw Error("No user found")
            // ? OR response way in lieu of throwing exceptions
            // res.status(403).json({
            //     message: `User not found`
            // })
        }

        // foundUser[0].password === password
        //     ? res.status(200).json({
        //         message: `User logged in`
        //     })
        //     : res.status(403).json({
        //         message: `Incorrect password`
        //     })

        // Error handling if passwords do not match
        if (foundUser[0].password !== password) {
            throw Error("Incorrect credentials")
        }

        // Response if passwords do match
        res.status(200).json({
            message: `User logged in`
        })

    } catch(err) {
        // All other error handling catchall
        res.status(500).json({
            message: `${err}`
        })
    }
})




module.exports = router