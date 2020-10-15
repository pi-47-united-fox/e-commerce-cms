const router = require("express").Router();
const { MainController } = require('../controllers')

router.get('/', (req, res) => {
    res.send('Server Success Running...')
})

router.post('/login', MainController.loginUserC)
router.use('/products', require('./product'))
router.use('/banners', require('./banner'))

module.exports = router;
