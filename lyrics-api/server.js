// load express module.
var express = require("express");
var bodyParser = require('body-parser')


var app = express();
var port = process.env.PORT || 3000;

// Always use express inbuilt router.
var router = express.Router();
router.get('/:isAlive?', (req, res) => {
 //Send HTML a message
 /*res.end("<h1>Express and Nodemon is running now</h1>");*/
 var param = req.params.isAlive;
 //send json a message
 if(req.params.isAlive){
 	res.status(200).send({serverConnection: "is alive!!!"});
 }else{
 	res.end("<h1>Welcome to LyricsT app 1.0</h1>");
 }
 
});
// This will navigate all router to proceed /home
app.use('/home',router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => console.log(`Listening at Server http://localhost:${port}`));
