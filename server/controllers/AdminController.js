const {Product} = require('../models');

class AdminController {
    static addProductC(req, res, next) {
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }).then((result) => {
            return res.status(201).json(result)
        }).catch((err) => {
            next(err)
        });
    }

    static getAllProductC (req, res, next) {
        Product.findAll()
            .then((result) => {
                return res.status(200).json(result)
            }).catch((err) => {
                next(err)
            });
    }

    static getOneProductC (req, res, next) {
        Product.findByPk(+req.params.id)
            .then((result) => {
                if (result === null) {
                    return next({
                        name: 'not found'
                    })
                } else {
                    return res.status(200).json(result)
                }

            }).catch((err) => {
                return next(err)
            });
    }

    static updateProductC (req, res, next) {
        Product.update({
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }, {
            where: {
                id: +req.params.id
            },
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
            return next(err)
        });
    }

    static deleteOneProductC (req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (result == 1) {
                return res.status(200).json({
                    message: 'Product: success deleted'
                })
            } else {
                return next({ name: 'not found' })
            }
        }).catch((err) => {
            next(err)
        });
    }
}

module.exports = AdminController