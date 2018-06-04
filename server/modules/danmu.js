
//弹幕模块
module.exports.listen = function(app,conn){
    
    //弹幕存储
    app.post('/danmu/save',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `insert into dandan(danmu,v_id,addtime,u_id) values('${req.body.danmu}',${req.body.v_id},'${new Date().getTime()}',${req.body.u_id})`
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		res.send(result)
    	})
    })
    
    //弹幕存储
    app.post('/danmu/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	console.log(req.body)
    	conn.query(`select danmu from dandan where v_id = ${req.body.id}`,function(err,result){
    		res.send(result)
    	})
    })
    
    //获取弹幕数量
    app.post('/danmu/allnum',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	console.log(req.body)
    	conn.query(`select *,count(v_id) as count from dandan GROUP BY v_id`,function(err,result){
    		res.send(result)
    	})
    })
    
}