if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.port || 3000
const router = require('./routers/index')
const errhendler = require('./middleware/errhendler')
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)
app.use(errhendler)


app.listen(port, () => {
    console.log(`This app runing at port:${port}`);
})


// module.exports = app
