require('dotenv').config()
const express = require('express');
const app = express();
const route = require("./routes/index")
const cors = require('cors');
const { errorHandler } = require("./middleware/errorHandler")
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to my app" })
})

app.use(route)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`masuk ke sokin ni ${PORT}`)
})

module.exports = app


