const router = require('express').Router()
const userRouter = require('./user-router')
const ProductRouter = require('./product-router')


router.get('/', (Req, res) => {
    res.send('yes....')
})

router.use('/',userRouter)
router.use('/products',ProductRouter)


module.exports = router