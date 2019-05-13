var express = require('express');
var router = express.Router();
var request = require("request");
const opts = {
  errorEventName:'error',
      logDirectory:'', // NOTE: folder must exist and be writable...
      fileNamePattern:'',
      dateFormat:'YYYY.MM.DD'
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/clientcrm', function(req, res, next) {
  let apiData = {}
  console.log('in client crm')
  opts.logDirectory = './public/logFiles/';
  opts.fileNamePattern = 'request.txt';
  // const log = require('simple-node-logger').createRollingFileLogger( opts );

  apiData.lastName = req.body.lastName;
  apiData.firstName = req.body.firstName;
  apiData.email = req.body.email;
  apiData.phone = req.body.phone;
  apiData.affiliateInfo = {affiliateId:'24066'};
  apiData.countryCode = req.body.countryCode;
  apiData.password  = req.body.password;
  console.log(apiData);
  // log.info('subscription to ',apiData, ' accepted at ', new Date().toJSON());
  var options = { method: 'POST',
  url: 'https://api.finte.co/v3/users',
  qs: { webId: '08cd854f-d1b2-4250-90ab-c0bf827749fc' },
  headers: 
   { 'Content-Type': 'application/json' },
  body: JSON.stringify(apiData) };

request(options, function (error, response,crmData) {
  console.log('response of crm');
  if (error) throw new Error(error);
    res.json(crmData);
});


});



router.post('/affliates', function(req, res, next) {
  let apiData = {}
    console.log('in client crm body',req.body)

  opts.logDirectory = './public/logFiles/';
  opts.fileNamePattern = 'request.txt';
  // const log = require('simple-node-logger').createRollingFileLogger( opts );

  apiData.lastName = req.body.lastName;
  apiData.firstName = req.body.firstName;
  apiData.email = req.body.email;
  apiData.phone = req.body.phone;
  apiData.countryCode = req.body.countryCode;
  apiData.password  = req.body.password;
  console.log(apiData);
  var options = { method: 'POST',
  url: 'https://api.water-pipeline.com/SignalsServer/api/registerUser',
  qs: 
   { firstname: apiData.firstName,
     lastname: apiData.lastName,
     email: apiData.email,
     telephone: apiData.phone,
     countryiso: apiData.countryCode,
     apikey: '51363aa0ca7743f2af06a45308e87baa' },
  headers: 
   { 'Postman-Token': '62b16b75-d54d-48bf-865c-7d93f3c7539d',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error)
    res.json(error);
    else
    res.json(body);
});

});
module.exports = router;
