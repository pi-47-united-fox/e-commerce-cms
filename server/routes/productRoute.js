const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.getProduct)

router.get('/:id', ProductController.getProductOne)

router.post('/', ProductController.postProduct)

router.put('/:id', authorization, ProductController.putProduct)

router.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = router