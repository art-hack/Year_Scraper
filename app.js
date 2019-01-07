const cheerio = require('cheerio');
const axios = require('axios');
const request = require('request');
const rp = require('request-promise');
const process = require('./process');

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
var final_result =[];

rp(url)
  .then(function(html){
    var $ = cheerio.load(html);
    const wikiUrls = [];
    var promise =[];
    for (let i = 0; i < 45; i++) {
      wikiUrls.push($('big > a')[i].attribs.href);
      promise.push(process.getData('https://en.wikipedia.org'+wikiUrls[i]).then(function(result){final_result.push(result);}));
    }
    Promise.all(promise).then(function(values){console.log(final_result)});
  })
  .catch(function(err){
    console.log(`Error! ${err.name}`);
  });