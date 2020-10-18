const { Product } = require("../models/index")

class ProductController {
    static findAllProducts(req, res, next) {
        Product.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addProduct(req, res, next) {
        let newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(newProduct)
            .then(data => {
                res.status(201).json({
                    message: "A new product has been successfully added.",
                    id: data.id,
                    name: data.name,
                    image_url: data.image_url,
                    price: data.price,
                    stock: data.stock
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        let targetId = +req.params.id
        Product.findOne({
            where:{
                id: targetId
            }
        })
            .then(data => {
                if(req.userData.role !== 'admin') {
                    res.status(401).json({
                        message: "You do not have an access."
                    })
                } else {
                    return Product.destroy({
                        where:{
                            id: data.id
                        }
                    })
                }
            })
            .then(data => {
                res.status(200).json({
                    message: "Product has been successfully deleted."
                })
            })
            .catch(err => {
                next(err)
            })

    }

    static editProduct(req, res, next) {
        let targetId = +req.params.id
        let dataEdit = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.findOne({
            where: {
                id: targetId
            }
        })
            .then(data => {
                if(req.userData.role !== 'admin') {
                    res.status(401).json({
                        message: "You do not have an access."
                    })
                } else {
                    return Product.update(dataEdit, {
                        where: {
                            id: data.id
                        }
                    })
                }
            })
            .then(data => {
                res.status(200).json({
                    message: "Product has been successfully updated."
                })
            })
            .catch(err => {
                next(err)
            })

    }

}

module.exports = ProductController