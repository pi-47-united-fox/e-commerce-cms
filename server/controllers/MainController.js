const { User }          = require("../models");
const { Jwt, BcryptJs } = require("../helpers");


class MainControoler {
    static loginUserC(req, res, next) {
        // console.log (req.body)
        if (req.body.email == "" || req.body.password == "") {
            return next({
                name: "invalid email pw input",
            });
        } else {
            User.findOne({
                where: { email: req.body.email },
            }).then((result) => {
                const pwCheck = BcryptJs.check(req.body.password, result.password)
                if (pwCheck) {
                    let access_token = Jwt.generate(result.id, result.email, result.role);
                    res.status(200).json({
                        access_token
                    });
                } else {
                    return next({
                        name: "invalid email pw input",
                    });
                }
            }).catch((err) => {
                return next({
                    name: "invalid email pw input",
                });
            });
        }
    }
}

module.exports = MainControoler