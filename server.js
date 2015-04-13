var http = require ("http");
var express = require('express');
var mongoose = require ("mongoose");
var app = express();
var mongodbHeroku = 'mongodb://<currencycalculator>:<sfdcj123>@ds061711.mongolab.com:61711/heroku_app35634722'
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
mongodbHeroku ||
'mongodb://localhost/HelloMongoose';

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
var theport = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});
app.get('/test', function(req, res) {
	console.log('aaa');
	mongoose.connect(uristring, function (err, res) {
  	if (err) {
  		//res.send('ERROR connecting to: ' + uristring + '. ' + err);
  	} else {
  		//res.send('Succeeded connected to: ' + uristring);
  	}
	});
	console.log('bbb');
});
app.listen(port, function() {
    console.log('App is running on http://localhost:' + port);
});