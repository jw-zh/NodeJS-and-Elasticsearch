var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client( {
	hosts: [
		'http://elastic:changeme@localhost:9200/'
	]
});

module.exports = client;