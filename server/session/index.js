var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports.listen = function(app){
	//配置cookie
	app.use(cookieParser('sessiontest'));  
	//配置session
	app.use(session({  
		resave: true, // don't save session if unmodified  
		saveUninitialized: false, // don't create session until something stored  
		secret: 'sessiontest'
	})); 
}
