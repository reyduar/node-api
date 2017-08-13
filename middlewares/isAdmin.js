'use stritc'

exports.isAdmin = function(req, res, next){
    if(req.user.role != 'ROLE_ADMIN'){
        res.status(403).send({message: "Do not have permissions"});
    }else{
        next();
    }
}