
var webpack = require('webpack'),
	webpackCfg = require('./webpack.config.js'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	path = require('path'),
	app = express(),
	MongoClient = require('mongodb'),
	compiler = webpack(webpackCfg.config);

var db_name = 'euros';

var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;

var routes = require('./routes/index.js');

if(process.env.MONGODB_URI){
  mongodb_connection_string = process.env.MONGODB_URI;
}

MongoClient.connect(mongodb_connection_string,function(err,db) {
	
	if(!err) {
		app.set('port',process.env.PORT || 3000);

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({'extended':'true'}));
		app.use(cookieParser());
		app.use(express.static(path.join(__dirname,'builds')));

		compiler.watch(webpackCfg.watchOptions,webpackCfg.watchHandler);
	
		routes(app,db);

		app.listen(app.get('port'),app.get('ip'), function() {
			console.log("Node app is running at localhost:" + app.get('port'));
		});
	}
	
});