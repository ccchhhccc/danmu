var mysql = require('mysql')

module.exports.getConnection = function(){
	//数据库链接
	var conn = mysql.createConnection({
	    host     : '127.0.0.1',
	    user     : 'root',
	    password : 'root',
	    database : 'danmu'
	});
	
	return conn
}
