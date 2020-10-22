const { Product } = require('../models')

const authorization = (req,res,next) => {
    Product.findByPk(req.params.id)
    .then(data => {
        if(!data) {
            res.status(404).json({message: 'Not Found'})
        } else if (req.userData.role !== 'admin') {
            res.status(401).json({message: 'You are not Authorized'})
        } else {
            next()
        }
    })
}

module.exports = authorization