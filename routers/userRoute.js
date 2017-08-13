'use stritc'

var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Upload image file
var multipart = require('connect-multiparty');
var md_upload = multipart( {uploadDir: './uploads/users'} );

//Route for get by Id
router.get('/user/search/:id', md_auth.ensureAuth, userController.getById);

//Route for create
router.post('/user/create', [md_auth.ensureAuth, md_admin.isAdmin], userController.create);

//Route for login
router.post('/user/login', userController.login);

//Route for update
router.put('/user/update/:id', md_auth.ensureAuth, userController.update);

//Route for remove 
router.delete('/user/delete/:id', [md_auth.ensureAuth, md_admin.isAdmin], userController.remove);

//Route for get all
router.get('/users', md_auth.ensureAuth, userController.getAll);

//Route for upload user image
router.post('/user/upload-avatar/:id', [md_auth.ensureAuth, md_upload], userController.uploadImage);

//Route for get user image
router.get('/user/get-avatar/:imageFile', md_auth.ensureAuth, userController.getImageFile);

module.exports = router;
