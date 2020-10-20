const errorHandler = (err, req, res, next) => {
    switch(err.name){
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({
                message: 'Email already registered'
            })
            break
        case 'Unauthorized':
            res.status(401).json({
                name: 'Unauthorized',
                message: err.message
            })
            break
        case 'SequelizeValidationError':
            res.status(400).json({
                name: 'Bad Request',
                message: err.errors[0].message
            })
            break
        case 'Forbidden':
            res.status(403).json({
                name: 'Forbidden',
                message: "You do not have access!"
            })
            break
        case 'Not Found':
            res.status(404).json({
                name: 'Not Found',
                message: 'Not Found'
            })
            break
        default:
            status = 500
            res.status(status).json({
                name: err.name,
                message: err.message
            })
            break
    }
}

module.exports = errorHandler