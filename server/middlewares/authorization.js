const { Product } = require("../models/index")

const authorization = (req, res, next) => {
    const targetId = req.params.id
    Product.findByPk(targetId)
        .then(data => {
            if(req.userData.role !== 'admin') {
                res.status(401).json({
                    message: "You do not have an access"
                })
            } else {
                next()
            }
        })
        .catch(err => {
            console.log(err)
        })

}

module.exports = authorization