
module.exports.listen = function(app,conn){
	//引入模块并监听
	var user = require('../modules/user').listen(app,conn)
	var carousel = require('../modules/carousel').listen(app,conn)
	var channel = require('../modules/channel').listen(app,conn)
	var validatecode = require('../modules/validatecode').listen(app,conn)
	var leval = require('../modules/leval').listen(app,conn)
	var video = require('../modules/video').listen(app,conn)
	var recommend = require('../modules/recommend').listen(app,conn)
	var comment = require('../modules/comment').listen(app,conn)
	var reply = require('../modules/reply').listen(app,conn)
	var vipVideo = require('../modules/vipVideo').listen(app,conn)
	var irregularity = require('../modules/irregularity').listen(app,conn)
	var inform = require('../modules/inform').listen(app,conn)
	var admin = require('../modules/admin').listen(app,conn)
	var danmu = require('../modules/danmu').listen(app,conn)
	var collection = require('../modules/collection').listen(app,conn)
	var grade = require('../modules/grade').listen(app,conn)
	var like = require('../modules/like').listen(app,conn)
	var upload = require('../upload/index').listen(app,conn)
}