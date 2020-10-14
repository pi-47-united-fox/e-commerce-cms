const router = require('express').Router()
const ProductsController = require('../controllers/productsControllers')
const authorization = require('../middleware/authorization')
const authentication = require('../middleware/authentification')

router.get('/', ProductsController.getAllProduct)
router.use(authentication)
router.get('/:id', ProductsController.getOneProducts)
router.post('/', ProductsController.AddProduct)
router.put('/:id',authorization, ProductsController.editProduct)
router.patch('/:id',authorization, ProductsController.editElement)
router.delete('/:id',authorization, ProductsController.deleteProduct)

module.exports = router

