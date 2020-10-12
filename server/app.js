// if (proccess.env.NODE_ENV === "development") {
    require("dotenv");
// }

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const { errHandler } = require('./middlewares');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routers"));
app.use(errHandler)

// app.listen(PORT, () => {
//     console.log ('Listen', PORT)
// })

module.exports = app;
