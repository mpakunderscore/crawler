let request = require('request');
let express = require('express');
let app = express();

//static
app.use('/', express.static(__dirname + '/web'));

let server = require('http').Server(app);
server.listen(process.env.PORT || 8080);

let globalWords = [];

//api
app.get('/api', function (request, response) {

    response.json({count: globalWords.length, words: globalWords});
});

