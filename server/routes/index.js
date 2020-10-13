const router = require('express').Router()
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const { authentication } = require('../middlewares/middleware')


router.post('/login', userController.loginHandler)

router.use(authentication)
router.get('/product', productController.listHandler)
router.post('/product', productController.addHandler)
router.put('/product/:id', productController.putHandler)
router.delete('/product/:id', productController.deleteHandler)

module.exports = router