const router = require('express').Router()
const UserController = require('../controllers/userController.js')

router.post('/login', UserController.login)


module.exports = router