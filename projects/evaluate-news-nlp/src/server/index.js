const dotenv = require('dotenv');
dotenv.config();

// var textapi = new meaningcloud({
//   application_key: process.env.API_KEY
// });

//
// var path = require('path')
// const express = require('express')
// const mockAPIResponse = require('./mockAPI.js')
//
// const app = express()
//
// app.use(express.static('dist'))
//
// console.log(__dirname)
//
// app.get('/', function (req, res) {
//     //res.sendFile('dist/index.html')
//     res.sendFile(path.resolve('src/client/views/index.html'))
// })
//
// // designates what port the app will listen to for incoming requests
// app.listen(8080, function () {
//     console.log('Example app listening on port 3030!')
// })
//
// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })

var https = require('follow-redirects').https;
var fs = require('fs');
var apiKey = process.env.API_KEY;

var text = escape("This is a very nice restaurant");
console.log('/sentiment-2.1?key='+apiKey+'&lang=en&txt='+text+'&model=Restaurants');
var options = {
  'method': 'POST',
  'hostname': 'api.meaningcloud.com',
  'path': '/sentiment-2.1?key='+apiKey+'&lang=en&txt='+text,
  'headers': {
   },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();
