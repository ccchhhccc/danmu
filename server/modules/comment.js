
//评论模块
module.exports.listen = function(app,conn){
    
    //查找评论根据视频id
    app.post('/comment/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `SELECT pl.* , user.name,user.headurl from user,pl where v_id = ${req.body.id} and pl.userid = user.id`
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send({
                	msg:'success',
                	data:result
                })
            }
        })
    })
    
    //新增评论
    app.post('/comment/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `insert into pl(v_id,userid,time,content) values(${req.body.v_id},${req.body.userid},'${req.body.time}','${req.body.content}')`
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	userleval(app,conn,req.body.userid)
                res.send('success')
            }
        })
        
    })

}

//用户经验+1
function userleval(app,conn,id){
	var sql = `update user set leval = leval+1 where id = ${id}` 
	console.log(sql)
	conn.query(sql,function(err,result){
		
    })
}
