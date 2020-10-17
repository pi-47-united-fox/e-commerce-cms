const { Product } = require('../models/');

class ProductController {

    static async getAllProduct(req, res, next) {
        try {
            let data = await Product.findAll()
            res.status(200).json(data)

        } catch (err) {
            next(err)
        }

    }
    static async postProduct(req, res, next) {
        try {
            const { name, image_url, price, stock } = req.body

            let value = {
                name: name,
                image_url: image_url,
                price: price,
                stock: stock
            }
            // console.log(value);
            let data = await Product.create(value)
            // console.log(data, " <<<<<<");
            res.status(201).json(data)

        } catch (err) {
            next(err)
        }

    }
    static async putProduct(req, res, next) {
        try {
            const { name, image_url, price, stock } = req.body
            let value = {
                name: name,
                image_url: image_url,
                price: price,
                stock: stock
            }

            let data = await Product.update(value, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            return res.status(201).json(data[1][0])

        } catch (err) {
            next(err)
        }

    }
    static async deleteProduct(req, res, next) {
        try {
            let data = await Product.destroy({
                where: { id: req.params.id }
            })
            if (data === 0) {
                throw ({
                    name: "not found",
                    message: 'not found data !',
                    statusCode: 400
                })
            } else {
                return res.status(200).json({ message: "delete success" })
            }
        } catch (err) {
            next(err)
        }
    }


}

module.exports = { ProductController }