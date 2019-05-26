var express = require('express');
var router = express.Router();
var request = require("request");
const fixieRequest = request.defaults({ 'proxy': ' http://fixie:T0RpNcgPkdIzKLi@olympic.usefixie.com:80'});
const opts = {
    errorEventName: 'error',
    logDirectory: '', // NOTE: folder must exist and be writable...
    fileNamePattern: '',
    dateFormat: 'YYYY.MM.DD'
};

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/affliates', function (req, res, next) {
    let apiData = {}
    console.log('in client crm body', req.body)

    opts.logDirectory = './public/logFiles/';
    opts.fileNamePattern = 'request.txt';
    // const log = require('simple-node-logger').createRollingFileLogger( opts );

    apiData.lastName = req.body.lastName;
    apiData.firstName = req.body.firstName;
    apiData.email = req.body.email;
    apiData.phone = req.body.phone;
    apiData.countryCode = req.body.countryCode;
    apiData.password = req.body.password;
    apiData.sc = req.body.sc;
    console.log(apiData);
    var options = {
        method: 'POST',
        url: 'https://api.water-pipeline.com/SignalsServer/api/registerUser',
        qs:
         {
             firstname: apiData.firstName,
             lastname: apiData.lastName,
             email: apiData.email,
             telephone: apiData.phone,
             countryiso: apiData.countryCode,
             apikey: '51363aa0ca7743f2af06a45308e87baa'
             sc: 'ICmarkets'
         },
        headers:
         {
             'Postman-Token': '62b16b75-d54d-48bf-865c-7d93f3c7539d',
             'cache-control': 'no-cache'
         }
    };

    fixieRequest(options, function (err, data, body) {
      res.json(body);
    });

});
module.exports = router;
// Your code here!
