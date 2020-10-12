"use strict";

if (process.env.NODE_ENV === "development") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", router);
app.use(errorHandler);

// app.listen(port, () => {
// 	console.log(`Listening in port: ${port}`);
// });

module.exports = app;
