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

router.put("/update/:id", (req, res) => {
    try {
        // Destructure beer id from the param
        const { id } = req.params
        // Read the database
        const db = read(dbPath)
        // Find index at which the entry exists within the db
        const found = db.findIndex(beer => beer.id === id)
        
        // Error handling if findIndex doesn't find anything (returns -1)
        if (found === -1) throw Error(`${id} not found`)
        
        // Reassign the values of properties inside db at found index
        // ! IF the replacement values exist in the body
        // If their value is falsey, keep existind db values
        db[found].brand = req.body.brand ?? db[found].brand
        db[found].brewery = req.body.brewery ?? db[found].brewery
        db[found].abv = req.body.abv ?? db[found].abv
        db[found].country = req.body.country ?? db[found].country
        db[found].style = req.body.style ?? db[found].style
        db[found].size = req.body.size ?? db[found].size

        // Save to db
        save(db, dbPath)
        
        res.status(200).json({
            message: `Updated data at index of ${found}`,
            data: db[found]
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }

})

router.delete("/delete/:id", (req, res) => {
    try {
        console.log("route hit")
        const { id } = req.params
        const db = read(dbPath)
        const updatedDb = db.filter(beer => beer.id !== id)

        if (db.length === updatedDb.length) throw Error(`${id} not found`)

        save(updatedDb, dbPath)

        res.status(200).json({
            message: `Database updated`
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router