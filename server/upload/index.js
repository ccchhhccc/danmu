//引入文件上传模块
var multer = require('multer');

module.exports.listen = function(app,conn){
	var urlname = ''
	var oldname = ''
	//配置文件存储
	var storage = multer.diskStorage({
	    // 存储文件的地方
	    destination: function (req, file, cb) {
	        cb(null, './public/uploads')
	    },
	    // 存储文件的名字定义方案
	    filename: function (req, file, cb) {
	        console.log(file.originalname.split("."))
	        var fileFormat = file.originalname.split(".");
	        urlname = file.fieldname + '_' + Date.now() + "." + fileFormat[fileFormat.length - 1]
	        cb(null, urlname)
	    }
	})
	
	//配置上传参数
	var upload = multer({
	    storage: storage
	})
	
	//监听文件上传路由
	app.post("/upload", upload.any(), function (req, res) {
		res.append("Access-Control-Allow-Origin","*");
		console.log(oldname,urlname)
		if(oldname === urlname){
			res.send('err')
		}else{
			oldname = urlname
			res.send(urlname)
		}
	    
	})
}