const route = require('express').Router()
const { ProductController } = require('../controllers')
const {Authentication} = require('../middlewares/Authentication')
const {Authorization} = require('../middlewares/Authorization')
const {AuthProduct} = require('../middlewares/AuthProduct')


route.get('/', Authentication, ProductController.getProductHandler)

route.post('/', Authentication, Authorization, ProductController.addProductHandler)

route.put('/:id', Authentication, Authorization, Authorization , AuthProduct,ProductController.editProductHandler)

route.delete('/:id', Authentication, Authorization, AuthProduct, ProductController.deleteProductHandler)





module.exports = route
