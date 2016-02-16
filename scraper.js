var request = require('request');
var cheerio = require('cheerio');
var json2csv = require('json2csv');
var fs = require('fs');

var url = process.argv[2];
var fields = ['permissions', 'link', 'ext']


request.get(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);

    var finalData = []

    $('tr').each (function() {
      var permissions = $('code', this).first().text();
      var link = $('a', this).attr('href');
      var ext = link.substr(link.lastIndexOf('.') + 1);

      if (ext === "/") {
        ext = "parent folder";
      }else if (ext.length > 3) {
        ext = "folder";
      }

      finalData.push({permissions, link, ext})
    });

    json2csv({ data: finalData, fields: fields }, function(err, csv) {
      if (err) {console.log(err)};
      fs.writeFile('files.csv', csv, function(err) {
        if (err) {console.log(err)};
        if (!err) {console.log("file saved")};
      })
    });
  }
});
