var request = require('request');
var cheerio = require('cheerio')

var url = process.argv[2];

var rows = [];

request.get(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var cheerio = require('cheerio'),
      $ = cheerio.load(body);
    // console.log($('td code').text());
    $('tr').each (function() {
      var regEx = /(?:\.([^.]+))?$/;
      var permissions = $('code', this).first().text();
      var link = $('a', this).attr('href');
      // var ext = regEx.exec(link);
      var ext = link.substr(link.lastIndexOf('.') + 1);
      if (ext.length > 3) {
        ext = "folder"
      }
      console.log(ext);
    })
  }
});
