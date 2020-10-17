const {Product,User} = require('../models/index')

class ProductController {
    static async addProduct(req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
            category: req.body.category
        }
        try{
            const data = await Product.create(newProduct)
            res.status(201).json(data)
        } catch (err) {
            res.status(500).json(err)
        }

    }
    static async listProducts(req, res, next) {
        try{
            const data = await Product.findAll()
            res.status(200).json(data)
        } catch(err) {
            res.status(500).json(err)
        }

    }
    static async updateProduct(req, res, next) {
        const idProduct = req.params.id
        const editProduct = {
            title: req.body.title,
            category: req.body.category,
        }
        try {
            const data = await Product.update(editProduct,{
                where: {
                    id: idProduct
                },
                returning: true
            })
            res.status(201).json(data[1][0])
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async deleteProduct(req, res, next) {
        const idProduct = req.params.id
        try{
            const data = await Product.destroy({where:
                {id: +idProduct}
            })
            if (data === 1) {
                res.status(200).json({msg:'Product has been deleted.'})
            }
            else {
                res.status(404).json({msg: 'Product Not Found'})
            }
        } catch (err) {
            res.status(500).json(err)
        }

    }
}
module.exports = ProductController