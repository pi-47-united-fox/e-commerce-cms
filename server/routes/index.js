const router = require('express').Router()
const UserController = require('../controllers/userController.js')
const ProductController = require('../controllers/productController.js')
const { authentication, authorization } = require('../middlewares/userAuth')

router.post('/login', UserController.login)

router.use(authentication)
router.get('/stocks', authorization, ProductController.findAllProducts)
router.post('/stocks', authorization, ProductController.addProduct)
router.put('/stocks/:id', authorization, ProductController.updateProduct)
router.delete('/stocks/:id', authorization, ProductController.deleteProduct)


module.exports = router