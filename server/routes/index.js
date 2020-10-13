const route = require('express').Router()
const UserRouters = require('./UserRouters')
const ProductRouters = require('./ProductRouters')




route.use('/', UserRouters)
route.use('/product', ProductRouters)





module.exports = route