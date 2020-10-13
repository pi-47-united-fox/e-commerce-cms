const router = require('express').Router()

const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const authentication = require('../middlewares/authentication')

router.use('/users', userRoute)

router.use(authentication)
router.use('/products', productRoute)

module.exports = router