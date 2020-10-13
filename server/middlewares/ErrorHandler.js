const ErrorHandler=(err,req,res,next)=>{
    switch (err.name){
        case 'LoginFail':
            res.status(err.status).json({message:err.message})
            break;
        case 'Email Unavailable':
            res.status(err.status).json({message:err.message})
            break;
        case 'login needed':
            res.status(err.status).json({message:err.message})
            break;
        case 'user not found':
            res.status(err.status).json({message:err.message})
            break;
        case 'not authorized':
            res.status(err.status).json({message:err.message})
            break;
        case 'product not found':
            res.status(err.status).json({message:err.message})
            break;
        case 'SequelizeValidationError':
            res.status(err.status).json({message:err.message})
            break;
        default:
            console.log(err)
            res.status(500).json({message:err})
            break;
    }
}

module.exports = {
    ErrorHandler
}