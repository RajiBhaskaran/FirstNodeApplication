var express = require('express'),
app = express(),
http = require('http'),
path = require('path'),
gapi = require('./lib/gapi');
data=require('./lib/data');


app.configure(function() {
  app.set('port', 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(app.router);
});

app.get('/', function(req, res) {
  var locals = {
        title: 'My entry page',
		url:gapi.url
      };
  res.render('index.jade', locals);
});

app.get('/oauth2callback', function(req, res) {
	var code = req.query.code;
	gapi.client.getToken(code, function(err, tokens){
	if(tokens && tokens.access_token){
	sheet= new gapi.spreadsheets(tokens.access_token);
	sheet.searchByColumn('name');
	sheet.addRow(data.data[1],function(res){
	console.log(res);
	});
	}
  });
  var locals = {
        title: 'My sample app',
        url: gapi.url
      };
  res.render('index.jade', locals);
});

var server = app.listen(8080);

console.log('Express server started on port %s', server.address().port);