if(process.env.NODE_ENV === "development"){
    require("dotenv").config();
}

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/index')
const {ErrorHandler} = require('./middlewares/ErrorHandler')

app.use(cors())


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.status(200).json({message:'welcome to cms server'})
})

app.use(router)
app.use(ErrorHandler)


module.exports = app