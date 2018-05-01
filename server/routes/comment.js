
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
    
    //查找评论根据视频id
    app.post('/comment/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `insert into pl(v_id,userid,time,content) values(${req.body.v_id},${req.body.userid},'${req.body.time}','${req.body.content}')`
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
    
    
}