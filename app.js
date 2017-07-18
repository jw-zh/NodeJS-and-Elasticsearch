var express = require('express');
var app = express();

var client = require('./connection.js');
var response;
client.cluster.health({}, function(err, resp, status) {
	console.log("-- Client Health --", resp);
	response = resp;
});

app.get('/', function (req, res) {
  res.send(response);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});