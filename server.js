const crawler = require("./server/crawler");
const wiki = require("./server/wiki");

let express = require('express');
let app = express();

//static
app.use('/', express.static(__dirname + '/web'));

let server = require('http').Server(app);
server.listen(process.env.PORT || 8081);

//api
app.get('/api', function (request, response) {
    response.json({});
});

app.get('/url', async function (request, response) {
    const page1 = await crawler.getURLData(request.query.url1);
    const page2 = await crawler.getURLData(request.query.url2);
    response.json([page1, page2]);
});

app.get('/wiki', async function (request, response) {
    response.json(await wiki.getWikiCategories(request.query.title, request.query.lang));
});

