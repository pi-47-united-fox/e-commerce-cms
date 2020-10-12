const {Product} = require('../models')

class ProductController {
    static getProduct(req,res,next){
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static postProduct(req,res,next){
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        })
        .then(data=>{
            res.status(201).json(data) 
        })
        .catch(err=>{
            next(err)
        })
    }
    static putProduct(req,res,next){
        const putProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }
        Product.update(putProduct, {
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            if(data[0] === 1){
                res.status(201).json({message: 'Edit Successfully'})
            } else {
                res.status(404).json({message: 'Invalid Product'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static deleteProduct(req,res,next){
        Product.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            console.log(data)
            if(data === 1){
                res.status(200).json({message: 'Product Deleted'})
            } else {
                res.status(404).json({message: 'Invalid Product'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController