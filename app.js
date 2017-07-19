var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Welcome to Elasticsearch!');
});

var client = require('./connection.js');

// show status
client.cluster.health({}, function(err, resp, status) {
	app.get('/', function(req, res) {
		res.send(resp);
	});
	console.log(resp);
});
client.cat.indices({}, function (err, resp, status) {
	console.log(resp);
});

// create index
client.indices.create({
	index: 'gov'
}, function(err, resp, status) {
	console.log("--- create index ---");
	if (err) {
		app.get('/', function(req, res) {
			res.send(err);
		});
		console.log(err);
	}
	else {
		app.get('/', function(req, res) {
			res.send(resp);
		});
		console.log(resp);
	}
});

// create mapping

// insert data
client.index({
	index: 'gov',
	id: '1',
	type: 'mytype',
	body: {
		'name': 'he',
		'myid': '12'
	}
}, function (err, resp, status) {
	console.log('--- insert data ---');
	console.log(resp);
});

// // add document through bulk
// var myBody = { index: {_index: 'gov', _type: 'mytype', _id: '2'} },
// {
// 	"name": "shlje",
// 	"myid": "998",
// };
// client.bulk({
// 	index: 'gov',
// 	type: 'mytype',
// 	body: myBody
// });

// query data
client.search({
	index: 'bank',
	type: 'account',
	body: {
		query: {
			match: { "age": 32 }
		},
	}
}, function (err, resp, status) {
	if (err) {
		console.log("search error: " + err);
	}
	else {
		console.log("--- Response ---");
		console.log(resp);
		console.log("--- Hits ---");
		resp.hits.hits.forEach(function(hit) {
			console.log(hit);
		})
	}
});
// // wildcard search
// query: {
// 	wildcard: { "field": "???wich" }
// }
// // regular expression search
// query: {
// 	regexp: { "field": ".+wich" }
// }
// delete a document

client.delete({
	index: 'gov',
	id: '1',
	type: 'mytype'
}, function (err, resp, status) {
	console.log('--- delete document ---');
	console.log(resp);
});

// delete index
client.indices.delete({
	index: 'gov'
}, function(err, resp, status) {
	console.log('--- delete index ---');
	app.get('/', function(req, res) {
		res.send(resp);
	});
	console.log(resp);
});
// app.get('/', function (req, res) {
//   res.send(response);
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});