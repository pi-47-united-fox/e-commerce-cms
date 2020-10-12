module.exports = (req, res, next) => {
    if (req.userData.role == 'admin') {
        next()
    } else {
        res.status(403).json({
            message: 'You dont have access'
        })
    }
}