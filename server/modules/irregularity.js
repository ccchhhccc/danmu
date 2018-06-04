
//封禁模块
module.exports.listen = function(app,conn){
    
    //删除封禁
    app.post('/irregularity/del',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `delete from irregularity where i_id = ${req.body.id} `;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
   
    
    //新增封禁
    app.post('/irregularity/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	//判断是否重复
    	var sql = `select * from irregularity where u_id = ${req.body.u_id}`
    	conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	if(result.length==0){
            		var addsql = `insert into irregularity(u_id,starttime,time,reason) values(${req.body.u_id},'${new Date().getTime()}','${req.body.time}','${req.body.reason}')`
			    	console.log(sql)
			    	conn.query(addsql,function(err,result){
			            if(err){
			                res.send('err')
			            }else{
			            	res.send('success')
			            }
			        })
            	}else{
            		var updatesql = `update irregularity set time = '${req.body.time}' , reason = '${req.body.reason}' , starttime = '${new Date().getTime()}' where u_id = ${req.body.u_id}`;
            		console.log(updatesql)
			        conn.query(updatesql,function(err,result){
			            if(err){
			                res.send('err')
			            }else{
			                res.send('success')
			            }
			        })
            	}
            }
        })
    	
    })
    
    //获取封禁详情
    app.post('/irregularity/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from irregularity where i_id = ${req.body.id}`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	if(result.length!=0){
            		res.send(result[0])
            	}
                
            }
        })
    })
    
    //修改封禁时间
    app.post('/irregularity/update/time',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update irregularity set time = '${req.body.time}'  where u_id = ${req.body.id}`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
    //修改封禁
    app.post('/irregularity/update',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update irregularity set time = '${req.body.time}' , reason = ${req.body.reason} where i_id = ${req.body.id}`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
}