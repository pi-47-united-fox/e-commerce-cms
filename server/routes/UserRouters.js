const route = require('express').Router()
const { UserController } = require('../controllers')

route.post('/login', UserController.loginHandler)

module.exports = route