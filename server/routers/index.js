const router = require("express").Router();
const { MainController } = require('../controllers')

router.post('/login', MainController.loginUserC)
router.use('/products', require('./product'))

module.exports = router;
