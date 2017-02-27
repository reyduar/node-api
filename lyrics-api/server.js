// load express module.
var express = require("express");
var bodyParser = require('body-parser')


var app = express();
var port = process.env.PORT || 3000;

// Always use express inbuilt router.
var router = express.Router();
router.get('/',function(req,res){
 // Express determines the common header type.
 res.end("<h1>Express and Nodemon is running now</h1>");
});
// This will navigate all router to proceed /home
app.use('/home',router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, function(){
	console.log(`Listening at Server http://localhost:${port}`);
});

