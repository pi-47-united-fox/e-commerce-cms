const { Product } = require('../models')

class ProductCOntroller {
    static findById(req, res, next) {

        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }
    static listProduct(req, res, next) {
        Product.findAll()
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }
    static addProduct(req, res, next) {
        let product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            UserId: req.userData.id

        }
        Product.create(product)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }
    static deleteProduct(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data) {
                    return res.status(201).json({
                        message: 'Deleted successfully'
                    })
                } else {
                    return res.status(400).json({
                        message: `Data not found, faild to delete`
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
    static editProduct(req, res, next) {
        let product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category

        }
        Product.update(product, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                return res.status(201).json({
                    message: `Update product successfully`
                })
            })
            .catch(err => {
                return next(err)
            })
    }


}


module.exports = ProductCOntroller