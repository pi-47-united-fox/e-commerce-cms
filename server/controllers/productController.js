const { Product } = require("../models/index")

class ProductController{
    static findAllProducts(req, res, next){
        Product.findAll({
            attributes: { exclude: ['updatedAt', 'createdAt'] }
          })
            .then(result => {
                if(result){
                    // console.log(result)
                    res.status(200).json(result)
                }
                else{
                    next({name: 'Not Found', message: 'Data not found!'})
                }
            })
            .catch(err => {
                // res.status(400).json(err)
                // res.send(err)
                next(err)
            })

    }

    static addProduct(req, res, next){
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            UserId: req.userData.id
        }

        Product.create(obj)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOneProduct(req, res, next){
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if(result){
                res.status(200).json(result)
            }
            else{
                next({name: 'Not Found', message: 'Data not found!'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static updateProduct(req, res, next){
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.update(obj, {
            where:{
                id: +req.params.id
            }
        })
            .then(result => {
                res.status(200).json({message: "A Product has been updated."})
            })
            .catch(err => {
                // res.status(404).json(err)
                next(err)
            })
    }

    static deleteProduct(req, res, next){
        Product.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(() => {
                res.status(200).json({
                    message: "A Product has been deleted."
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController