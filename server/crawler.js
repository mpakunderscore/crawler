const cheerio = require('cheerio')

const axios = require('axios');

exports.getURLData = async function (url) {

    console.log(url)

    try {
        const response = await axios.get(url);
        const data = response.data;

        // console.log(data);

        const $ = cheerio.load(data)

        let title = $('title').text();
        let text = $.root().text().toLowerCase().replace(/\n/g, '');

        console.log('Title: ' + title)
        console.log('Text length: ' + text.length)

        // let responseJson = JSON.parse(body);
        // console.log(responseJson)
        // let text = responseJson.query.pages[Object.keys(responseJson.query.pages)[0]].revisions[0]['*']; // Print the HTML for the Google homepage.

        return {url: url, title: title, words: getWords(text), text: text.length};

    } catch (error) {
        console.log(error);
    }
}

let getWords = function (text) {

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

    console.log('Words length: ' + sortable.length)

    return sortable;
}

exports.getWikiCategories = async function (title) {
    try {
        if (title === 'Wiki') title = 'Main_topic_classifications';
        const url = encodeURI('https://en.wikipedia.org/wiki/Category:' + title);
        const response = await axios.get(url);
        const data = response.data;

        let categories = [];
        const $ = cheerio.load(data);
        $('#mw-subcategories .CategoryTreeItem').find('a').each(function (index, element) {
            // console.log($(element.nextSibling).nextSibling.innerHTML)
            categories.push({id: $(element).text(), info: $(element).next().text()});
            // console.log($(element.nextSibling).text())
        });

        return {categories: categories};
    } catch (error) {
        console.log(error);
    }
}

