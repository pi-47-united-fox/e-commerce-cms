const router = require('express').Router()
const ProductController = require('../controller/product-controller')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/', ProductController.listProduct)
router.get('/:id', ProductController.findById)
router.post('/', ProductController.addProduct)
router.put('/:id', authorization, ProductController.editProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)


module.exports = router