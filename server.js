var http = require('http'),
	journals = require('./data'),
	db = require('./db'),
	app = require('./app')(journals);

http.createServer(app).listen(app.get('port'), function(){
  console.log('In Server.js, Doug server listening on port ' + app.get('port'));
});