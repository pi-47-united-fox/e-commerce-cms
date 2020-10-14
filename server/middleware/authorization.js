const { Product } = require("../models")

const authorization = (req, res, next) => {
    Product.findByPk(req.params.id)
        .then((data) => {
            if (!data) {
                console.log(data)
                return res.status(404).json({ msg: "Data Not Found" })
            } else if (data.UserId !== req.userData.id) {
                return res.status(401).json({ msg: "You do not have access" })
            } else {
                next()
            }
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        })
}

module.exports = authorization