// if (process.env.NODE_ENV === "development") {
//     require('dotenv').config()
// }
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routers/index')
const errhendler = require('./middleware/errhendler')
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)
app.use(errhendler)


app.listen(PORT, () => {
    console.log(`This app runing at port:${PORT}`);
})


// module.exports = app
