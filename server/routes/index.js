'use strict'
const router = require('express').Router()
const UserController = require('../controllers/userController.js')
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authentication)
router.post('/products',ProductController.addProduct)
router.get('/products',ProductController.listProducts)
router.put('/products/:id', ProductController.updateProduct)
router.delete('/products/:id', ProductController.deleteProduct)

module.exports = router