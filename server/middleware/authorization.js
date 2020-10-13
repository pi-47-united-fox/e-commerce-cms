const { Product } = require('../models')

const authorization = (req, res, next) => {
    // console.log(req.userData);
    const { id } = req.params
    const userData = req.userData.id
    // console.log(userData,id);
    Product.findByPk(id)
        .then(data => {
            console.log(data.userEmail);
            // console.log(data, '<-----ini pak polisi');
            if (data && data.UserId === userData) {
                next()
            } else {
                return res.status(400).json({
                    message: 'Data not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })

}



module.exports = authorization

