var request = require('request');
var cheerio = require('cheerio');

var url = process.argv[2];

request(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)
  }
  // console.log(response.statusCode);
  // console.log(response.headers['content-type']);
})