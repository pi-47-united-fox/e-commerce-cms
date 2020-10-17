require('dotenv').config()

const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const routes = require('./routes')
const port = process.env.PORT
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', function(req, res) {
    res.status(200).json('Hello world');
  });

app.use(routes)
app.use(errorHandler)

app.listen(port, ()=> {
    console.log(`App listen on port: ${port}`)
})

module.exports = app