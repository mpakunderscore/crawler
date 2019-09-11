let express = require('express');
let app = express();

//static
app.use('/', express.static(__dirname + '/'));

let server = require('http').Server(app);
server.listen(process.env.PORT || 8080);

let data = {test: true}

//api
app.get('/api', function (request, response) {
    response.json(data);
});