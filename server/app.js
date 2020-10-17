
if (process.env.NODE_ENV === 'development') {
require('dotenv').config()
}
const express = require('express')
const app = express()
const routes = require('./routes/index')
const port = process.env.PORT || 3000
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.use(routes)
app.use(errorHandler)

app.get('/',(req, res )=> {
    res.status(200).send({name: "hello"})
})

app.listen(port, ()=>{
    console.log(`app running on port ${port}`)
})

module.exports = app