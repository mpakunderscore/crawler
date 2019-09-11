let express = require('express');
let app = express();

//static
app.use('/', express.static(__dirname + '/web'));

let server = require('http').Server(app);
server.listen(process.env.PORT || 8080);

//api
app.get('/api', function (request, response) {
    response.json({test: true});
});