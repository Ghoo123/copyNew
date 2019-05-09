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

  apiData.lastname = req.body.lastName;
  apiData.firstname = req.body.firstName;
  apiData.email = req.body.email;
  apiData.telephone = req.body.phone;
  apiData.apikey = {apikey:'51363aa0ca7743f2af06a45308e87baa'};
  apiData.countryiso = req.body.countryCode;
  apiData.password  = req.body.password;
  console.log(apiData);
  // log.info('subscription to ',apiData, ' accepted at ', new Date().toJSON());
  var options = { method: 'POST',
  url: 'https://api.water-pipeline.com/SignalsServer/api/registerUser',
  headers: 
   { 'Content-Type': 'application/json' },
  body: JSON.stringify(apiData) };

request(options, function (error, response,crmData) {
  console.log('response of crm');
  if (error) throw new Error(error);
    res.json(crmData);
});


});
module.exports = router;
