const crawler = require("./server/crawler");

let express = require('express');
let app = express();

//static
app.use('/', express.static(__dirname + '/'));

let server = require('http').Server(app);
server.listen(process.env.PORT || 8080);


//api
app.get('/api', function (request, response) {

    response.json({});
});

app.get('/url', async function (request, response) {

    // console.log(request.query.url)
    // console.log(request.query.param2)

    response.json(await crawler.getURLData(request.query.url));
});

