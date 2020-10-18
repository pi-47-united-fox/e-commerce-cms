const jwt = require("jsonwebtoken")
const key = 'abcd1234'

function sign(payload){
    return jwt.sign(payload,key)
}
function verify(payload){
    return jwt.verify(payload,key)
}
module.exports = {sign,verify}