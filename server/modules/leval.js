
//用户经验等级模块
module.exports.listen = function(app,conn){
    
    //查找所有等级
    app.post('/leval',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from leval order by value`,function(err,result){
            if(err){
                res.send('err')
            }else{
            	res.send(result)
            }
        })
    })
    
    
    //删除等级
    app.post('/leval/del',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `delete from leval where id = ${req.body.id} `;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
   
    
    //新增等级
    app.post('/leval/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	conn.query(`select * from leval where value = ${req.body.value}`,function(err,result){
            if(err){
                res.send('err')
            }else{
            	if(result.length == 0){
            		var sql = `insert into leval(title,value) VALUES('${req.body.title}',${req.body.value})`;
			        conn.query(sql,function(err,result){
			            if(err){
			                res.send('err')
			            }else{
			                res.send('success')
			            }
			        })
            	}else{
            		res.send('repeat')
            	}
            }
        })
    })
    
    //获取等级详情
    app.post('/leval/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from leval where id = ${req.body.id}`;
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
    
    //修改等级详情
    app.post('/leval/update',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update leval set title = '${req.body.title}' , value = ${req.body.value} where id = ${req.body.id}`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
}