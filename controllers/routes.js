const router = require("express").Router()
const Beer = require("../models/Beer")

router.post("/create", async (req, res) => {
    try {

        const newBeer = new Beer(req.body)

        const saver = await newBeer.save()

        res.status(201).json({
            message: `Beer created`,
            newBeer
        })

    } catch(err) {
        console.log(err)
        err.name === "ValidationError"
        ? res.status(400).json({
            message: `Provided data type invalid`
        })
        : res.status(500).json({
            message: `${err}`
        })
    }
})

router.get("/", (_, res) => {
    try {
        
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

router.get("/:id", (req, res) => {
    try {
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: `${err}`
        })
    }
    
})

router.put("/update/:id", (req, res) => {
    try {

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }

})

router.delete("/delete/:id", (req, res) => {
    try {

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router