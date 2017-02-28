'use stritc'
var app = require('./app');
var port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at Server http://localhost:${port}`));
