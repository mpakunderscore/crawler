let express = require('express');
let app = express();

const port = 8080;

//static
app.use('/', express.static(__dirname + '/web'));

let server = require('http').Server(app);
server.listen(port);

//api
app.get('/api', function (request, response) {
    response.json({test: true});
});
