require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});

app.use(routes)

// app.listen(port , () => {
//     console.log(`app listen on ${port}`)
// })
   
module.exports = app
