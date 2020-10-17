const router              = require("express").Router();
const { BannerController } = require('../controllers');
const {authentication, authorization} = require('../middlewares');

router.get('/', authentication, BannerController.getAllBanner)
router.post('/', authentication, BannerController.addBannerC)
router.put('/:id', authentication, authorization, BannerController.updateBannerC)
router.delete('/:id', authentication, authorization, BannerController.deleteBanner)

module.exports = router;