const router = require('express').Router()
const userController = require("../controllers/usersController");
const RouterProduct = require('../routes/productsRouter')
// const authentication = require('../middleware/authentification')

router.post('/login', userController.login)
// router.post('/register', userController.register)

// router.use(authentication)
router.use('/products', RouterProduct)

module.exports = router