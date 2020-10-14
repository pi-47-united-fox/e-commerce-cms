require("dotenv").config()
const express = require('express')
const app = express()
const routes = require('./routes')
const port = process.env.PORT || 3000
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', function(req, res) {
    res.status(200).send('Welcome To E-Commerce App');
});

app.use(routes)
app.use(errorHandler)

// app.listen(port , () => {
//     console.log(`app listen on ${port}`)
// })
   
module.exports = app