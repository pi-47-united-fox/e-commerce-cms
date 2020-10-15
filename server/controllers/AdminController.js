const { Product, Category, Banner } = require('../models');

class AdminController {
    // @todo menambah category
    static addProductC(req, res, next) {
        console.log ('data dari client: ', req.body)
        if(req.body.categoryName === '') {
            req.body.categoryName = 'Uncategorized'
        }
        
        Category.findOne({
            where: {
                categoryName: req.body.categoryName
            }
        }).then (result => {
            if (result) {
                console.log ('masuk Category Find One')
                return result
            } else {
                console.log ('masuk Category create')
                return Category.create({
                    categoryName: req.body.categoryName
                })
            }
        }).then (category => {
            console.log ('masuk Product Create', category)
            return Product.create({
                name: req.body.name,
                image_url: req.body.image_url,
                price: +req.body.price,
                stock: +req.body.stock,
                CategoryId: category.id
            }, {
                returning: true,
                include: [{
                    model: Category
                }]
            })
        }).then((result) => {
            console.log ('Selesai Add')
            return res.status(201).json(result)
        }).catch((err) => {
            console.log ('dari create data: ', err)
            next(err)
        });
    }

    static getAllProductC (req, res, next) {
        Product.findAll({
            include: [Category]
        }).then((result) => {
                return res.status(200).json(result)
        }).catch((err) => {
            next(err)
        });
    }

    // @audit mungkin getOneProductC ini diganti di getter client - tanpa hit API
    static getOneProductC (req, res, next) {
        Product.findByPk(+req.params.id, {
            include: [Category]
        }).then((result) => {
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

    // @todo Update category
    static updateProductC (req, res, next) {
        Category.findOne({
            where: {
                categoryName: req.body.categoryName
            }
        }).then (result => {
            if (result) {
                return result
            } else {
                return Category.create({
                    categoryName: req.params.categoryName
                })
            }
        }).then (category => {
            return Product.update({
                name: req.body.name,
                image_url: req.body.image_url,
                price: +req.body.price,
                stock: +req.body.stock,
                CategoryId: category.id
            }, {
                where: {
                    id: +req.params.id
                },
                returning: true
            })
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

    static getAllBanner (req, res, next) {
        console.log ('seudah masuk controller')
        Banner.findAll()
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            next(err)
        });
    }
}

module.exports = AdminController