const { User } = require('../models')

const authorization = (req, res, next) => {
    // console.log(req.userData);
    User.findByPk(req.userData.id)
        .then(user => {
            // console.log(user, '<----data user');
            if (user.role == 'admin') {
                next()
            } else {
                next({ name: 'Not Authorized' })
            }
        })
        .catch(err => {
            next(err)
        })

}



module.exports = authorization

