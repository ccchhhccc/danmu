module.exports.listen = function(app,conn){
    
    //管理员登录
    app.post('/admin/login',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from admin where loginname = '${req.body.name}' and password = '${req.body.password}'`,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                    res.send({
                    	msg:'success',
                    	name:result[0].name
                    })
                }else{
                    res.send({
                    	msg:'err'
                    })
                }
                
            }
        })
    })
    
    //用户注册
    app.post('/user/register',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	//判断手机是否被已被注册
    	var sql = `select * from user where phone = ${req.body.phone}`
		conn.query(sql,function(err,result){
			if(err){
				res.send('err')
			}else if(result.length !== 0){
				res.send('err')
			}else{
				//插入数据库
				sql = `insert into user (name,phone,pwd,headurl,status,leval,registertime) values('手机用户${req.body.phone}' , '${req.body.phone}' , '${req.body.pwd}' , 'localhost:2255/uploads/defaulturl.jpg' , 1 , 1 , '${new Date().getTime()}')`
				conn.query(sql,function(err,result){
					res.send('success')
				})
			}
		})
    			
    })
    
    //用户登录
    app.post('/user/login',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from user where phone = '${req.body.phone}' and pwd = '${req.body.password}'`,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                	if(result[0].status === 1){
	                		res.send({
		                		code:200,
		                    	msg:'success',
		                    	id:result[0].id
		                    })
                	}else{
                		res.send({
	                		code:400,
	                    	msg:'该用户已被封禁',
	                    	id:result[0].id
	                    })
                	}
                }else{
                    res.send({
                    	msg:'err'
                    })
                }
                
            }
        })
    })
    
    //获取用户信息
    app.post('/user/getInfo',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from user where id = ${req.body.id}`
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                	//处理密码
                	result[0].pwd = null
                    res.send({
                    	msg:'success',
                    	data:result[0]
                    })
                }else{
                    res.send({
                    	msg:'err'
                    })
                }
            }
        })
    })
    
    //获取用户信息
    app.post('/user/addLeval',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from user where id = ${req.body.id}`
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	var newLeval =  Number(result[0].leval) + 1
            	sql = `update user set leval = '${newLeval}' where id = ${req.body.id}`
                conn.query(sql,function(err,result){
		            if(err){
		                res.send('err')
		            }else{
		            	res.send('success')
		            }
		        })
            }
        })
    })
}

