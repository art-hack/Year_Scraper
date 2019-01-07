const rp = require('request-promise');
const cheerio = require('cheerio');

var getData = (url) => {
    return new rp(url)
    .then((html) => {
        var $ = cheerio.load(html);
        var name = $('.firstHeading').text();
        var bday = $('.bday').text();
        return {name: name, bday: bday};
    })
    .catch((err) => {
        console.log(`Error! ${err.name}`);
    });
};

module.exports.getData = getData;