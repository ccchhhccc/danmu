
//收藏模块
module.exports.listen = function(app,conn){
    //查询
    app.post('/grade/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select count(*) as count,avg(num) as avg from grade where v_id = ${req.body.v_id}`
    	console.log(sql)
    	var obj = {}
    	conn.query(sql,function(err,result){
    		obj.count = result[0].count
    		obj.avg = result[0].avg
    		sql = `select * from grade where u_id = ${req.body.u_id}`
	    	console.log(sql)
	    	conn.query(sql,function(err,result){
	    		if(result.length==0){
	    			obj.isGrade = false
	    		}else{
	    			obj.isGrade = true
	    			obj.grade = result[0].num
	    		}
	    		res.send(obj)
	    	})
    	})
    })
    
   
   
    
}