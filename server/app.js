if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    require("dotenv").config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', function(req, res) {
    res.status(200).send('E-commerce CMS');
});

app.use(routes)
app.use(errorHandler)

// app.listen(port , () => {
//     console.log(`app listen on ${port}`)
// })
   
module.exports = app
