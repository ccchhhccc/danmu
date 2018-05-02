var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyparser = require('body-parser');
var multer = require('multer');

//application / json解析
app.use(bodyparser.json());
//解析应用程序/ x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));

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
	console.log(233)
	if(oldname === urlname){
		res.send('err')
	}else{
		oldname = urlname
		res.send(urlname)
	}
    
})

//引入路由
var user = require('./routes/user.js')
var carousel = require('./routes/carousel.js')
var channel = require('./routes/channel.js')
var validatecode = require('./routes/validatecode.js')
var leval = require('./routes/leval.js')
var video = require('./routes/video.js')
var recommend = require('./routes/recommend.js')
var comment = require('./routes/comment.js')
var reply = require('./routes/reply.js')
var vipVideo = require('./routes/vipVideo.js')

//设置静态文件夹
app.use(express.static('public'));
app.use(express.static('static'));
//数据库链接
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'danmu'
});

//路由监听
//用户模块
user.listen(app,conn)
//轮播图模块
carousel.listen(app,conn)
//频道模块
channel.listen(app,conn)
//短信验证码模块
validatecode.listen(app,conn)
//经验等级模块
leval.listen(app,conn)
//经验等级模块
video.listen(app,conn)
//推荐管理模块
recommend.listen(app,conn)
//评论管理模块
comment.listen(app,conn)
//回复管理模块
reply.listen(app,conn)
//vip管理模块
vipVideo.listen(app,conn)


app.listen(2255);

console.log('start server in localhost:2255')
