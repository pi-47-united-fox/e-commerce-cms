const router = require('express').Router()
const UserRouter = require('./user-router')
const ProductRouter = require('./product-router')
const CartRouter = require('./cart-router')

router.get('/', (req, res) => {
    res.send('yes....')
})

router.use('/',UserRouter)
router.use('/products',ProductRouter)
router.use('/carts',CartRouter)

module.exports = router