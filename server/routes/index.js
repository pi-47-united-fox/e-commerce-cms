const router = require('express').Router()
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const { authentication, authorization } = require('../middlewares/middleware')


router.post('/login', userController.loginHandler)
router.get('/product', productController.listHandler)
router.use(authentication)
router.post('/product', authorization, productController.addHandler)
router.put('/product/:id', authorization, productController.putHandler)
router.delete('/product/:id', authorization, productController.deleteHandler)

module.exports = router