
//弹幕模块
module.exports.listen = function(app,conn){
    
    //弹幕存储
    app.post('/danmu/save',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `insert into dandan(danmu,v_id,addtime) values('${req.body.danmu}',${req.body.v_id},'${new Date().getTime()}')`
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
   
    
}