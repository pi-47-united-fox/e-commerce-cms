const route = require('express').Router()
const routeProduct = require("./product")
const routeUser = require("./user")

route.use("/", routeUser)
route.use("/product", routeProduct)

module.exports = route