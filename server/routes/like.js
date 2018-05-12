
//关注模块
module.exports.listen = function(app,conn){
    //查询是否关注
    app.post('/like/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from likers where u_id = ${req.body.u_id} and liker = ${req.body.liker}`
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		if(result.length!=0){
    			res.send('like')
    		}else{
    			res.send('nolike')
    		}
    	})
    })
    
    //查询所有粉丝
    app.post('/like/fans',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from likers,user where likers.u_id = ${req.body.u_id} and user.id = likers.liker`
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
    	})
    })
    
    //查询所有关注
    app.post('/like/allLike',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from likers,user where likers.liker = ${req.body.liker} and user.id = likers.u_id`
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
    	})
    })
    
    //新增关注
    app.post('/like/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `insert into likers(u_id,liker,liketime) values('${req.body.u_id}',${req.body.liker},'${new Date().getTime()}')`
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send('success')
    	})
    })
    
    //取消关注
    app.post('/like/del',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	console.log(req.body)
    	conn.query(`delete from likers where u_id = ${req.body.u_id} and liker = ${req.body.liker}`,function(err,result){
    		res.send('success')
    	})
    })
    
    
}