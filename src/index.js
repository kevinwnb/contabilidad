const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")
const auth = require("./middleware/auth")
const jwt = require("jsonwebtoken")
const mysql = require("mysql2")
var cookieParser = require("cookie-parser")
const accountRouter = require("./routes/account.router")
const tripRouter = require("./routes/trip.router")
const fs = require("fs")
const refuelRouter = require("./routes/refuel.router")


app.use(express.json())
app.use(cookieParser())

// app.use("/disculpas", (req, res) => {
//     return res.sendFile(path.join(__dirname, "disculpas.html"))
// })

// app.post("/api/disculpas", (req, res) => {
//     if (!req.body.respuesta) {
//         return res.json({ success: false, error: "Please provide the required fields" })
//     }
//     fs.writeFile(path.resolve(__dirname, "respuestas.txt"), req.body.respuesta, function(err) {
//         if(err) {
//             return res.json({ success: false, error: "Ha ocurrido un error en el servidor" })
//         }

//         return res.json({ success: true, error: "" })
//     });
// })

app.use("/", express.static(path.join(__dirname, "client", "dist", "client")))

// Account
app.use("/api", accountRouter)

// Trips
app.use("/api/trip", auth, tripRouter)

// Refuels
app.use("/api/refuel", auth, refuelRouter)

app.use("*", (req, res) => res.redirect("/"))

app.listen(process.env.PORT || 80, () => {
    console.log("Server started on port 80")
})