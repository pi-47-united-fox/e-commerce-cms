const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            res.status(400).json({
                name: 'Bad Request',
                msg: 'input cant be empty'
            })
            break;

        case "SequelizeUniqueConstraintError":
            console.log(err)
            res.status(400).json({
            name: 'Bad Request',
            msg: 'input name not unique'
            })
            break;

        case "JsonWebTokenError":
            res.status(401).json({
            name: 'Bad Request',
            msg: 'access token required'
            })
            break;

        case "BadRequest":
            res.status(400).json({
                name: 'Bad Request',
                msg: 'bad request'
            })
            break;

        case "NotFound":
            res.status(404).json({
                name: 'Not Found',
                msg: 'test'
            })
            break;

        case "Unauthorized":
            res.status(401).json({
                name: 'Unauthorized',
                msg: 'unauthorized, you cant manipulate this data'
            })
            break;

        default:
            res.status(500).json({
                name: 'Internal Server Error',
                msg: err.message
            })
            break;
    }
}

module.exports = errorHandler