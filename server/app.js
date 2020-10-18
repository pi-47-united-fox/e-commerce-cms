const express = require("express")
const app = express()
const route = require("./routes/route") 
const cors = require("cors")

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(route)

// app.listen(port, ()=>{
//     console.log("listening on port", port);
// })

module.exports = app