require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || "127.0.0.1"

const authController = require("./controllers/auth")
const beerController = require("./controllers/routes")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authController)
app.use("/api", beerController)

app.listen(PORT, HOST, () => {
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