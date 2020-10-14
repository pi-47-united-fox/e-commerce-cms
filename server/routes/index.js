const router = require("express").Router()
const UserController = require("../controllers/userController")
const ProductController = require("../controllers/productController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.get('/', UserController.homeController)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/products', authorization, ProductController.findAllProducts)

router.post('/products', authorization, ProductController.addProduct)

router.put('/products/:id', authorization, ProductController.editProduct)

router.delete('/products/:id', authorization, ProductController.deleteProduct)

module.exports = router