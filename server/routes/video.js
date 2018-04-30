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
     
}