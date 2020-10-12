require('dotenv').config()
const express = require('express');
const app = express();
const route = require("./routes/index")
const { errorHandler } = require("./middleware/errorHandler")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to my app" })
})

app.use(route)

app.use(errorHandler)

module.exports = app


