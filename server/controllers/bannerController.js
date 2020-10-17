const {Banner} = require("../models")

class BannerController{

    static postBanner(req,res,next){
        console.log( req.body )
        Banner.create(req.body)
            .then(result=>{
                res.status(201).json(result)
            })
            .catch(err=>{
                console.log(err);
                next(err)
            })
    }

    static getBanners(req,res,next){ 
        Banner.findAll()
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                next(err)
            })
    }
 
    static putBanner(req,res,next){ 
        Banner.update(req.body, {where:{id: req.params.id}})
            .then(()=>{
                res.status(200).json({msg:"Updated Successfully"})
            })
            .catch(err=>{
                next(err)
            })
    }

    static deleteBanner(req,res,next){ 

        Banner.destroy({where: {id: +req.params.id}})
            .then(data => {
                res.status(200).json({msg: 'Deleted Successfully'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = BannerController