
//收藏模块
module.exports.listen = function(app,conn){
    //查询
    app.post('/collection/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from collection where v_id = ${req.body.v_id}`
    	console.log(sql)
    	var obj = {}
    	conn.query(sql,function(err,result){
    		obj.num = result.length
    		sql = `select * from collection where u_id = ${req.body.u_id}`
	    	console.log(sql)
	    	conn.query(sql,function(err,result){
	    		if(result.length==0){
	    			obj.isLike = false
	    		}else{
	    			obj.isLike = true
	    		}
	    		res.send(obj)
	    	})
    	})
    })
    
    //新增收藏
    app.post('/collection/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `insert into collection(v_id,u_id,collectiontime) values('${req.body.v_id}',${req.body.u_id},'${new Date().getTime()}')`
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send('success')
    	})
    })
    
    //取消收藏
    app.post('/collection/del',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	console.log(req.body)
    	conn.query(`delete from collection where u_id = ${req.body.u_id} and v_id = ${req.body.v_id}`,function(err,result){
    		res.send('success')
    	})
    })
    
    //查询用户的所有收藏
    app.post('/collection/user/all',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from collection,video,user where collection.u_id = ${req.body.u_id} and video.id = collection.v_id and video.u_id = user.id` 
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
    	})
    })
   
    
}