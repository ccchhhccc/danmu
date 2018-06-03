module.exports.listen = function(app,conn){
    //分页查询，每页十条
    let pageNum = 6
    
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
				sql = `insert into user (name,phone,pwd,headurl,status,leval,registertime,sex,coinnum,centerurl,signday,video,liker,fans,collection) values('手机用户${req.body.phone}' , '${req.body.phone}' , '${req.body.pwd}' , 'http://localhost:2255/uploads/defaulturl.jpg' , 1 , 1 , '${new Date().getTime()}',1,0,'http://localhost:2255/uploads/usercenter.png@100Q.webp','',0,0,0,0)`
				console.log(sql)
				conn.query(sql,function(err,result){
					res.send('success')
				})
			}
		})
    			
    })
    
    //用户重置密码
    app.post('/user/resetPwd',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	//判断手机是否已经注册
    	var sql = `select * from user where phone = ${req.body.phone}`
		conn.query(sql,function(err,result){
			if(err){
				res.send('err')
			}else if(result.length == 0){
				res.send('err')
			}else{
				//更新密码
				sql = `update user set pwd  = '${req.body.pwd}' where phone = '${req.body.phone}'`
				console.log(sql)
				conn.query(sql,function(err,result){
					res.send('success')
				})
			}
		})
    			
    })
    
    //用户登录
    app.post('/user/login',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from user where phone = '${req.body.phone}' and pwd = '${req.body.password}'`
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                	//封禁状态
                	if(result[0].status === 2){
                		sql = `select * from irregularity where u_id = ${result[0].id}`
                		console.log(sql)
                		conn.query(sql,function(err,results){
                			//判断时间是否还在封禁期间
                			if(Number(results[0].starttime) + Number(results[0].time) <new Date().getTime()){
                				//已经过了封禁期间   则删除封禁记录和更新用户的状态
                				sql = `delete  from irregularity where u_id = ${result[0].id}`
                				console.log(sql)
                				conn.query(sql,function(err,results){
                					req.session.user = result[0]
                					console.log(req.session)
		                			res.send({
				                		code:200,
				                    	msg:'success',
				                    	id:result[0].id
				                    })
                				})
                				console.log(`update user set status = 1 where id = ${result[0].id}`)
                				conn.query(`update user set status = 1 where id = ${result[0].id}`,function(err,result){
		                			
                				})
                			}else{
                				//如果用户还在封禁期间登录  则不允许登录
                				res.send({
			                		code:400,
			                    	msg:'该用户已被封禁',
			                    	time:Number(results[0].starttime) + Number(results[0].time)
			                    })
                			}
                		})
                	}else{
                		req.session.user = result[0]
                		console.log(req.session)
                		res.send({
	                		code:200,
	                    	msg:'success',
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
    //验证是否登录	
    app.post('/user/isLogin',function(req,res){
    	if(req.session.user){
    		if(req.session.user.id==req.body.id){
	    		res.send('success')
	    	}else{
	    		res.send('err')
	    	}
    	}else{
    		res.send('err')
    	}
    })
    
    //获取用户信息
    app.post('/user/getInfo',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from user where user.id = ${req.body.id}`
    	var obj = {}
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                	//处理密码
                	result[0].pwd = null
                	obj.data = result[0]
                	sql = `select SUM(v_coin) as sum from video where u_id = ${req.body.id} GROUP BY u_id`
                	console.log(sql)
                	conn.query(sql,function(err,result){
			            if(result.length!=0){
			            	obj.data.sum = result[0].sum
			            }else{
			            	obj.data.sum = 0
			            }
			            res.send(obj)
			        })
                    
                }else{
                    res.send({
                    	msg:'err'
                    })
                }
            }
        })
    })
    
    //经验+1
    app.post('/user/addLeval',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from user where id = ${req.body.id}`
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	if(result.length!=0){
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
            	
            }
        })
    })
    
    //获取所有用户信息   分页查找
    app.post('/userlist/sort',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var obj = {}
    	//获取总条数
    	var countSql = `select * from user where (name like '%${req.body.fiter}%' or phone like '%${req.body.fiter}%' or signname like '%${req.body.fiter}%' or brief like '%${req.body.fiter}%') ${req.body.status==''? '':' and status = '+req.body.status}`
    	//获取数据
    	var contentSql = `select * from user where (name like '%${req.body.fiter}%' or phone like '%${req.body.fiter}%' or signname like '%${req.body.fiter}%' or brief like '%${req.body.fiter}%') ${req.body.status==''? '':' and status = '+req.body.status}  ${req.body.sortname==''?'':' order by '+req.body.sortname+' desc '}  LIMIT ${pageNum*(req.body.page -1)} , ${pageNum}`
    	console.log(countSql)
    	console.log(contentSql)
    	//数据查询
        conn.query(countSql,function(err,result){
            obj.total = result.length
            conn.query(contentSql,function(err,result){
	            obj.data = result
	            obj.currpage = Number(req.body.page)
	            res.send(obj)
	        })
        })
    })
    
    //更改用户状态
    app.post('/user/status',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update user set status = ${req.body.status} where id = ${req.body.id}`
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	res.send('success')
            }
        })
    })
    
    //获取  违规  用户信息   分页查找
    app.post('/user/irregularity',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var obj = {}
    	var nowtime = new Date().getTime()
    	//获取总条数
    	var countSql = `select * from user,irregularity where (name like '%${req.body.fiter}%' or phone like '%${req.body.fiter}%' or signname like '%${req.body.fiter}%' or brief like '%${req.body.fiter}%')  and status = 2 and user.id =irregularity.u_id and (irregularity.time+irregularity.starttime)>${nowtime}`
    	//获取数据
    	var contentSql = `select * from user,irregularity where (name like '%${req.body.fiter}%' or phone like '%${req.body.fiter}%' or signname like '%${req.body.fiter}%' or brief like '%${req.body.fiter}%')  and status = 2 and user.id = irregularity.u_id and (irregularity.time+irregularity.starttime)>${nowtime} ${req.body.sortname==''?'':' order by '+req.body.sortname+' desc '}  LIMIT ${pageNum*(req.body.page -1)} , ${pageNum}`
    	console.log(countSql)
    	console.log(contentSql)
    	//数据查询
        conn.query(countSql,function(err,result){
            obj.total = result.length
            conn.query(contentSql,function(err,result){
	            obj.data = result
	            obj.currpage = Number(req.body.page)
	            res.send(obj)
	        })
        })
    })
    
    //获取  违规  用户信息   所有
    app.post('/user/irregularity/all',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var obj = {}
    	var nowtime = new Date().getTime()
    	//获取数据
    	var countSql = `select * from user,irregularity where  status = 2 and user.id =irregularity.u_id and (irregularity.time+irregularity.starttime)>${nowtime}`
    	console.log(countSql)
    	//数据查询
        conn.query(countSql,function(err,result){
            obj.total = result.length
            obj.data = result
            res.send(obj)
        })
    })
    
    //签到
    app.post('/user/signin',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update user set signday = ${new Date().getTime()} , coinnum = coinnum+1 where id = ${req.body.id}`
    	console.log(sql)
    	//数据查询
        conn.query(sql,function(err,result){
            res.send('success')
        })
    })
    
    //用户设置
    app.post('/user/setting',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update user set ${req.body.key} = '${req.body.value}'  where id = ${req.body.id}`
    	console.log(sql)
    	//数据查询
        conn.query(sql,function(err,result){
            res.send('success')
        })
    })
    
    //判断用户是否为vip用户
    app.post('/user/isVip',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from video where u_id = ${req.body.u_id} and (v_status = 1 or v_status = 3)`
    	console.log(sql)
    	//数据查询
        conn.query(sql,function(err,result){
            if(result.length==0){
            	res.send('no')
            }else{
            	res.send('yes')
            }
        })
    })
}

