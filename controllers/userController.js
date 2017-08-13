'use stritc'
//modules
var bcrypt = require('bcrypt-nodejs');
//models
var User = require('../models/user');
//jwt service
var jwt = require('../services/jwt');
//nodejs file system 
var fs = require('fs');
var path = require('path');

function create (req, res){
    var params = req.body;
    if(params.password && params.name && params.email && params.role){
        var entity = new User();
        entity.name = params.name;
        entity.surname = params.surname;
        entity.email = params.email;
        entity.password = params.password;
        entity.role = params.role;
        
        // encrypt password
        bcrypt.hash(params.password, null, null, function(err, hash) {
            entity.password = hash;
        });
        
        User.findOne({email: entity.email.toLowerCase()}, (err, result) => {
            if(err){
                res.status(500).send({message: "Server Error"});
            }else{
                if(!result){
                    entity.save((err, saved) => {
                        if(err){
                            res.status(500).send({message: "Server Error"});
                        }else{
                            if(!saved){
                                res.status(404).send({message: "Error create"});
                            }else{
                                res.status(200).send({message: "Success to create", create: saved});
                            }
                        }
                    });
                }else{
                    res.status(400).send({message: "Duplicate data"});
                }
            }
        });
    } else{
       res.status(400).send({message: "Missing data"});
    }
}

function update (req, res){
	var id = req.params.id;
	var params = req.body;
	if(id != req.user.sub){
		res.status(403).send({message: "Do not have permissions"});
	}else{
		User.findByIdAndUpdate(id, params, {new: true}, (err, updated) => {
			if(err){
				res.status(500).send({message: "Error to update", update: id});
			}else{
				res.status(200).send({message: "Success to update", update: updated});
			}
		});
	}
}

function remove (req, res){
	var id = req.params.id;
	User.findById(id, (err, entity) => {
		if(err){
			res.status(500).send({message: "Error to get entity", id: id});
		}
		if(!entity){
			res.status(404).send({message: "No found"});
		}else{
			entity.remove(err => {
				if(err){
					res.status(500).send({message: "Error to delete ", id: id});
				}else{
					res.status(200).send({message: "Success to delete", remove: entity});
				}
			});
		}
	});

}

function getAll (req, res){
	User.find({}).sort('name').exec((err, results) => {
		if(err){
			res.status(500).send({message: "Error to get all"});
		}else{
			if(!results){
				res.status(404).send({message: "Empty collection"});
			}else{
				res.status(200).send({items: results});
			}
		}
	});
}

function getById (req, res){
	var id = req.params.id;
	User.findById(id, (err, result) => {
		if(err){
			res.status(500).send({message: "Error to get entity", id: id});
		}else{
			if(!result){
				res.status(404).send({message: "No found"});
			}else{
				res.status(200).send({item: result});
			}
		}
	});
}

function uploadImage(req, res) {
	var id = req.params.id;
	var file_name = 'Not Upload..';
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg' ){
			
			if(id != req.user.sub){
				res.status(403).send({message: "Do not have permissions"});
			}else{
				User.findByIdAndUpdate(id, {image: file_name}, {new: true}, (err, updated) => {
					if(err){
						res.status(500).send({message: "Error to update", update: id});
					}else{
						res.status(200).send({message: "Success to update", update: updated, image: file_name});
					}
				});
			}

		}else{
			fs.unlink(file_path, (err) => {
				if(err){
					res.status(500).send({message: "File no valid and error to delete bad file"});
				}else{
					res.status(400).send({message: "File no valid"});
				}
			});
			
		}
		//res.status(200).send({file_path: file_path, file_split, file_split, file_name, file_name});
	}else{
		res.status(404).send({message: "File no found"});
	}
}

function getImageFile(req, res) {
	var imageFile = req.params.imageFile;
	var file_path = './uploads/users/'+imageFile;
	fs.exists(file_path, function(exists){
		if (exists) {
			res.sendFile(path.resolve(file_path));
		} else {
			res.status(404).send({message: "File no found"});
		}
	});
	//res.status(200).send({ message: 'get image file' });
}

function login(req, res) {
	var params = req.body;
	var email = params.email;
	var password = params.password;
	if(params.password && params.email){
		User.findOne({email: email.toLowerCase()}, (err, user) => {
            if(err){
                res.status(500).send({message: "Server Error"});
            }else{
                if(user){
					bcrypt.compare(password, user.password, (err, check) => {
						if (check) {

							//check and generate token
							if (params.gettoken) {
								//token generated
								res.status(200).send({ 
									token: jwt.createToken(user)
								 });	
							} else {
								res.status(200).send({ user });	
							}
							
						} else {
							res.status(404).send({message: "username or password incorrect"});
						}
					});
                    
                }else{
                    res.status(404).send({message: "User no found"});
                }
            }
        });
	}else{
		res.status(400).send({message: "Missing data"});
	}
}

module.exports = {
	getById,
	create,
	update,
	remove,
	getAll,
	uploadImage,
	getImageFile,
    login
}