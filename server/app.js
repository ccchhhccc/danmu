var express = require('express');
var app = express();

var bodyparser = require('body-parser');
//application / json解析
app.use(bodyparser.json());
//解析应用程序/ x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));

//配置session
var session = require('./session/index').listen(app)
//获取数据库链接
var conn = require('./db/index').getConnection()
//路由监听
var route = require('./routes/index').listen(app,conn)


//设置静态文件夹
app.use(express.static('public'));
app.use(express.static('static'));

app.listen(2255);
console.log('start server in localhost:2255')
