if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require("express")
const app = express()
const PORT = process.env.SECRET
const routes = require("../routes/index")

app.use(express.urlencoded( { extended:true } ))
app.use(express.json())

app.use(routes)