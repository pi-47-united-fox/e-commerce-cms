const router = require('express').Router()
const CartController = require('../controller/cart-controller')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.get('/', CartController.getCarts)
router.post('/:ProductId', CartController.addCart)
router.put('/:id', CartController.editQuantity)
router.delete('/:id', CartController.deleteCart)

module.exports = router