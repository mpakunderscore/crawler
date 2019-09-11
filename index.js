let request = require('request');
let express = require('express');
let app = express();

//static
app.use('/', express.static(__dirname + '/'));

let server = require('http').Server(app);
server.listen(process.env.PORT || 8080);

let globalWords = [];

//api
app.get('/api', function (request, response) {

    response.json({count: globalWords.length, words: globalWords});
});


let url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&titles=Albert%20Einstein&prop=revisions&rvprop=content'

request(url, function (error, response, body) {

    let responseJson = JSON.parse(body);
    let text = responseJson.query.pages[Object.keys(responseJson.query.pages)[0]].revisions[0]['*']; // Print the HTML for the Google homepage.

    let words = text.split(' ').reduce((prev, next) => {

        if (next.length === 1)
            return prev;

        prev[next] = (prev[next] + 1) || 1;
        return prev;

    }, {});

    let sortable = [];
    for (let name in words) {
        let word = {name: name, count: words[name]}
        sortable.push(word);
    }

    sortable.sort(function(a, b) {
        return b['count'] - a['count'];
    });

    globalWords = sortable;
});


