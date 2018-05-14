//视频模块
module.exports.listen = function(app,conn){
	
    //分页查询，每页十条
    let pageNum = 6
    
    //分页查找未审核的视频    未审核视频状态为0   附加搜索   视频名称v_name   简介v_brief   频道c_id
    app.post('/video',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var obj = {}
    	//获取总条数
    	var countSql = `select count(*) as count  from video where (v_name like '%${req.body.filter ? req.body.filter : ''}%' or v_brief like '%${req.body.filter ? req.body.filter : ''}%') ${req.body.c_id ?  'and video.c_id ='+ req.body.c_id : ''} and v_status = 0 `
    	//获取数据
    	var contentSql = `select video.* , channel.name as channelname , user.name as username from video , user , channel where (v_name like '%${req.body.filter ? req.body.filter : ''}%' or v_brief like '%${req.body.filter ? req.body.filter : ''}%' ) ${req.body.c_id ?  'and video.c_id ='+ req.body.c_id : ''}  and user.id = video.u_id and channel.c_id = video.c_id and video.v_status = 0 LIMIT ${pageNum*(req.body.page -1)} , ${pageNum}`
    	console.log(contentSql)
    	//数据查询
        conn.query(countSql,function(err,result){
            obj.total = result[0].count
            conn.query(contentSql,function(err,result){
	            obj.data = result
	            obj.currpage = Number(req.body.page)
	            res.send(obj)
	        })
        })
    })
    
    //获取视频详情
    app.post('/video/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `select video.* , channel.name as channelname , user.name as username from video , user , channel where user.id = video.u_id and channel.c_id = video.c_id and video.id = ${req.body.id}` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result[0])	
	    })
    })
    
    //审核     通过状态为1，退回则状态为2
    app.post('/video/pass',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `update video set v_status = ${req.body.status} where id = ${req.body.id}` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send('success')	
	    })
    })
    
    //分页查审核的视频    排序   播放量  、 硬币 、 评分
    app.post('/video/sort',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var obj = {}
    	//获取总条数
    	var countSql = `select video.* , channel.name as channelname , user.name as username ${req.body.sortname=='avg' ? ' , avg(grade.num) as avg':''} from video , user , channel ${req.body.sortname=='avg'? ',grade':''} where ${req.body.c_id ?  'video.c_id ='+ req.body.c_id+' and ' : ''}   user.id = video.u_id and channel.c_id = video.c_id and (video.v_status = 1 or video.v_status = 3) ${req.body.sortname=='avg'? ' and grade.v_id = video.id GROUP BY video.id':''} order by ${req.body.sortname} desc `
    	//获取数据
    	var contentSql = `select video.* , channel.name as channelname , user.name as username ${req.body.sortname=='avg' ? ' , avg(grade.num) as avg':''} from video , user , channel ${req.body.sortname=='avg'? ',grade':''} where ${req.body.c_id ?  'video.c_id ='+ req.body.c_id+' and ' : ''}   user.id = video.u_id and channel.c_id = video.c_id and (video.v_status = 1 or video.v_status = 3) ${req.body.sortname=='avg'? ' and grade.v_id = video.id GROUP BY video.id':''} order by ${req.body.sortname} desc LIMIT ${pageNum*(req.body.page -1)} , ${pageNum}`
    	console.log(contentSql)
    	//数据查询
        conn.query(countSql,function(err,result){
            obj.total = result.length
            conn.query(contentSql,function(err,result){
	            obj.data = result
	            obj.currpage = Number(req.body.page)
	            res.send(obj)
	        })
        })
    })
    
    //视频投币  +1
    app.post('/video/pay',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `update video set v_coin = v_coin+1 where id = ${req.body.id}` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send('success')	
    		userpay(app,conn,req.body.u_id)
	    })
    })
    
    //查找用户审核通过的视频
    app.post('/video/userid/pass',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `select * from video where u_id = ${req.body.u_id} and (v_status = 1 or v_status = 3)` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
	    })
    })
    
    //查找用户审核中的视频
    app.post('/video/userid/nopass',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `select * from video where u_id = ${req.body.u_id} and v_status = 0` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
	    })
    })
    
    //获取个人视频弹幕数量
    app.post('/video/userid/dandannum',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `select count(*) as sum,dandan.v_id from dandan,video where dandan.v_id = video.id and video.u_id =${req.body.u_id} GROUP BY dandan.v_id` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
	    })
    })
    
    //获取收藏视频的弹幕数量
    app.post('/video/collection/dandannum',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `select count(*) as sum,dandan.v_id from dandan,collection where dandan.v_id = collection.v_id and collection.u_id =${req.body.u_id} GROUP BY dandan.v_id` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
	    })
    })
    
    //根据频道id查视频
    app.post('/video/c_id/all',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `SELECT v.*, AVG(grade.num) as avg_num
					FROM video as v LEFT JOIN grade ON v.id = grade.v_id where v.c_id = ${req.body.c_id} and (v.v_status = 1 or v.v_status = 3)
					GROUP BY v.id order by ${req.body.ordername} desc` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
	    })
    })
    
    //根据频道id查收藏数量
    app.post('/video/c_id/collection',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `SELECT collection.*,video.*,count(collection.v_id) as sum from collection,video WHERE collection.v_id = video.id and video.c_id = ${req.body.c_id} GROUP BY collection.v_id` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
	    })
    })
    
    //根据频道id查弹幕数量
    app.post('/video/c_id/dandan',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `SELECT dandan.*,video.*,count(dandan.v_id) as sum from dandan,video WHERE dandan.v_id = video.id and video.c_id = ${req.body.c_id} GROUP BY dandan.v_id` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
	    })
    })
    
    //查找所有审核通过的视频   排行榜   vip&&非vip
    app.post('/video/rank/all',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `SELECT v.*, count(collection.v_id) as count_num ,user.name
				FROM user,video as v LEFT JOIN collection ON v.id = collection.v_id where  (v.v_status = 1 or v.v_status = 3) and user.id = v.u_id
				GROUP BY v.id 
				ORDER BY ${req.body.sortname} desc` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
	    })
    })
    
    //新增视频
    app.post('/video/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `insert into video(v_name,v_url,v_img,c_id,v_status,v_time,u_id,v_brief,v_num,v_coin) values('${req.body.v_name}','${req.body.v_url}','${req.body.v_img}','${req.body.c_id}',0,'${new Date().getTime()}','${req.body.u_id}','${req.body.v_brief}',0,0)` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send('success')
	    })
    })
     
}
//用户视频-1
function userpay(app,conn,id){
	var sql = `update user set coinnum = coinnum-1 where id = ${id}` 
	console.log(sql)
	conn.query(sql,function(err,result){
		
    })
}
