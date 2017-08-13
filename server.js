'use stritc'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;


// MongoDb connection with mongoose
mongoose.connect('mongodb://admin:password@ds163699.mlab.com:63699/node-api-mdb', {useMongoClient: true })
.then( () => {
	console.info('Success to connect Database: node-api-mdb');
	app.listen(port, () => console.log(`Listening at Server http://localhost:${port}`));
})
.catch(err => {
	console.error('Error to connect Database: node-api-mdb. More info--> ' + err);
	throw err;
});


