const { Banner } = require('../models');

class BannerController {
    static getAllBanner (req, res, next) {
        console.log ('seudah masuk controller')
        Banner.findAll()
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            next(err)
        });
    }
    
    static addBannerC (req, res, next) {
        console.log ('masuk add')
        Banner.create ({
            title: req.body.title,
            image_url: req.body.image_url,
            description: req.body.description,
            isActive: req.body.isActive
        }).then((result) => {
            return res.status(201).json(result)
        }).catch((err) => {
            next(err)
        });
    }


    static updateBannerC (req, res, next) {
        Banner.update ({
            title: req.body.title,
            image_url: req.body.image_url,
            description: req.body.description,
            isActive: req.body.isActive
        },{
            where: {id: +req.params.id},
            returning: true
        }).then((result) => {
            if (result[1].length == 0) {
                return next({
                    name: 'not found'
                })
            } else {
                return res.status(200).json(result[1][0])
            }
        }).catch((err) => {
            next(err)
        });
    }

    static deleteBanner (req, res, next) {
        Banner.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (result == 1) {
                return res.status(200).json({
                    message: 'Banner: success deleted'
                })
            } else {
                return next({ name: 'not found' })
            }
        }).catch((err) => {
            next(err)
        });
    }

}

module.exports = BannerController