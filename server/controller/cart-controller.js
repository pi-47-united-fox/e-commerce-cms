const { User, Product, Cart } = require('../models/index')

class CartController {
    static addCart(req, res, next) {
        // console.log(req.params.ProductId, req.userData.id)
        let price = req.body.price
        let quantity = 1
        let cartquantity = 0
        Cart.findOne({
            include: Product,
            where: {
                ProductId: req.params.ProductId,
                UserId: req.userData.id
            }
        })
            .then(data => {
                // console.log('data', data.Product.price);
                if (data) {
                    // console.log('<-------------------ini dia!!!!');
                    cartquantity = data.quantity
                    return Product.findOne({
                        where: {
                            id: req.params.ProductId
                        }
                    })

                } else {
                    // console.log(data);
                    return Cart.create({
                        quantity: quantity,
                        total: price * quantity,
                        ProductId: req.params.ProductId,
                        UserId: req.userData.id
                    })
                }
            })
            .then(data => {
                // console.log(data.hasOwnProperty("stock"), 'disini');

                if (data.stock !== undefined) {
                    console.log(data, '<------ini data');
                    let cartTotal = cartquantity + 1
                    if (data.stock < (cartTotal)) {
                        return ({ message: 'out of stock', status: 400 })
                    } else {
                        return Cart.update({
                            quantity: cartTotal,
                            total: Number(data.price) * cartTotal,
                        }, {
                            where: { ProductId: req.params.ProductId, UserId: req.userData.id },
                            returning: true
                        })
                    }
                } else {
                    return res.status(201).json(data)
                }
            })
            .then(update => {
                console.log(update)
                if (update.status === 400) {
                    return res.status(400).json({ message: update.message })
                } else {
                    return res.status(200).json({ message: 'Sucessfully add cart' })
                }
            })
            .catch(err => {
                console.log(err);
                return next(err)
            })
    }
    static getCarts(req, res, next) {
        // console.log('masuk');
        // console.log(req.userData, '<------ini get cart');
        User.findByPk(req.userData.id, { include: Product })
            .then(result => {
                res.status(200).json(result.Products)
            })
            .catch(err => {
                next(err)
            })
    }
    static editQuantity(req, res, next) {
        // console.log('ini di edit bro');
        // console.log(req.userData.id);
        const cartData = {
            where: {
                UserId: req.userData.id,
                ProductId: req.params.id
            }
        }
        const updateQuantity = {
            quantity: req.body.quantity
        }
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data.stock < req.body.quantity) {
                    return { message: 'out of stock', status: 400 }
                } else {
                    return Cart.update(updateQuantity, cartData)
                }
            })
            .then(result => {
                if (result.status === 400) {
                    return res.status(400).json({ message: result.message })
                } else {
                    return res.status(200).json({ message: "Successfully edit quantity" })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static deleteCart(req, res, next) {
        const cartDelete = {
            where: {
                UserId: req.userData.id,
                ProductId: req.params.id
            }
        }

        Cart.destroy(cartDelete)
            .then(result => {
                res.status(200).json({ message: "successfully delete cart" })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CartController