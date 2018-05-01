
//回复模块
module.exports.listen = function(app,conn){
    
    //查找评论根据视频id
    app.post('/reply/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `SELECT
						u1.NAME as hfname,
						u2.NAME as plname,
						c.*	
					FROM
						user AS u1
						LEFT JOIN hf AS c ON u1.id = c.hfuserid
						LEFT JOIN user AS u2 ON c.pluserid = u2.id
						where c.v_id = ${req.body.id}`
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
    app.post('/reply/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `insert into hf values(${req.body.plid},${req.body.hfuserid},'${req.body.hfcontent}','${req.body.time}',${req.body.pluserid},${req.body.v_id})`
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