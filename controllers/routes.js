const router = require("express").Router()
const { read, save } = require("../helper/rw")
const { v4: uuid_v4 } = require("uuid")
const dbPath = "./db/beers.json"

router.post("/create", (req, res) => {
    try {
        // Generate an ID
        const id = uuid_v4()
        // Get all items from the json file
        const db = read(dbPath)
        // Extrapolate the data from the request
        // Check if the body has content
        if (Object.keys(req.body).length < 6) {
            throw Error("Please provide all content")
        }
        // Package id and the req data into a single object
        let newEntry = { id, ...req.body }
        // Push the new content into the db file
        db.push(newEntry)
        // Write new changes to the .json file
        save(db, dbPath)

    } catch(err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})

router.get("/", (_, res) => {
    try {
        const allBeers = read(dbPath)
        res.status(200).json(allBeers)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

router.get("/:id", (req, res) => {
    try {
        // Destructure the id value from the request
        const { id } = req.params
        // Get your json file contents
        const db = read(dbPath)
        // Find the matching id
        const foundItem = db.find(beer => beer.id === id)
    
        // Error handle if no item has been found
        if (!foundItem) throw Error("No item found")
    
        res.status(200).json(foundItem)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: `${err}`
        })
    }
    
})
// TODO: PUT api/update/:id -> edit one beer
// TODO: DELETE api/delete/:id -> delete one beer

module.exports = router