// load express module.
var express = require("express");
var app = express();
// Always use express inbuilt router.
var router = express.Router();
router.get('/',function(req,res){
 // Express determines the common header type.
 res.end("<h1>Express is running</h1>");
});
// This will navigate all router to proceed /home
app.use('/home',router);
app.listen(3000);
console.log("Listening at Port 3000");
