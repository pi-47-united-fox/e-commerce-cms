const router = require('express').Router()
const ProductController = require('../controllers/productController')

router.get('/', ProductController.getProduct)

router.post('/', ProductController.postProduct)

router.put('/:id', ProductController.putProduct)

router.delete('/:id', ProductController.deleteProduct)

module.exports = router