const router              = require("express").Router();
const { AdminController } = require('../controllers');
const {authentication, authorization} = require('../middlewares');

router.post('/', authentication, authorization, AdminController.addProductC)
router.get('/', authentication, AdminController.getAllProductC)
router.get('/:id', authentication, AdminController.getOneProductC)
router.put('/:id', authentication, authorization, AdminController.updateProductC)
router.delete('/:id', authentication, authorization, AdminController.deleteOneProductC)

module.exports = router;