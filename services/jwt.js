'use stritc'

var jwt = require('jwt-simple');
var moment = require('moment');
var secretKey = 'random_secret_key';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }

    return jwt.encode(payload, secretKey);
}