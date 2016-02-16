var request = require('request');
var cheerio = require('cheerio')

var url = process.argv[2];

var rows = [];

request.get(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var cheerio = require('cheerio'),
      $ = cheerio.load(body);
    // console.log($('td code').text());
    $('tr').slice(32, 40).each (function() {
      var permissions = $('code', this).first().text();
      var link = $('a', this).attr('href');
      console.log(permissions);
      console.log(link);
    })

  }
});
