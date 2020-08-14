// this module is used to hide api key so that it is not visible in project when uploaded in to github
const dotenv = require('dotenv');
dotenv.config();


var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()
// Configuring express to user body-parser as middle-ware
const bodyParser = require('./../../node_modules/body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('./../../node_modules/cors');
app.use(cors());

const https = require('follow-redirects').https;
const fs = require('fs');
const apiKey = process.env.API_KEY;

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    //res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/getResults', function (req, res) {
    const text = req.body.text;

    console.log('text received:'+text);

    const options = {
      'method': 'POST',
      'hostname': 'api.meaningcloud.com',
      'path': '/sentiment-2.1?key='+apiKey+'&lang=en&txt='+text,
      'headers': {
       },
      'maxRedirects': 20
    };

    var nReq = https.request(options, function (res) {
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

    nReq.end();
})
