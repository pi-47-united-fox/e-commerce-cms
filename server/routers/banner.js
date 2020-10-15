const router              = require("express").Router();
const { AdminController } = require('../controllers');
const {authentication} = require('../middlewares');

router.get('/', authentication, AdminController.getAllBanner)

module.exports = router;