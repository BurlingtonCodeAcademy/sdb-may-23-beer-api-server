require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { dbConnect } = require("./db")
const app = express()

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || "127.0.0.1"

const authController = require("./controllers/auth")
const beerController = require("./controllers/routes")
const sessionValidation = require("./middlewares/session")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authController)
app.use("/api", sessionValidation, beerController)

app.listen(PORT, HOST, () => {
    dbConnect()
    console.log(`[server] listening on ${HOST}:${PORT}`)
})

/* 
    ? Model-View-Controller (MVC)
    * architecture or system design style
    * breaks full stack application into:
        * model (data - ex: database)
        * view (client - ex: browser or Postman)
        * controller (logic - ex: endpoints)
    * we use MVC for Separation of Concerns
*/