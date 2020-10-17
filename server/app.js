if(process.env.NODE_ENV === 'development'){
    require("dotenv").config();
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/', function(req, res) {
    res.status(200).send('E-commerce CMS');
});

app.use(routes)
app.use(errorHandler)

app.listen(port , () => {
    console.log(`app is listening on ${port}`)
})
   
module.exports = app
