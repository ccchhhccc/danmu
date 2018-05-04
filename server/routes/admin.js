
//管理员管理模块
module.exports.listen = function(app,conn){
	
	//查找全部管理员
    app.post('/admin',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from admin`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result)
            }
        })
    })
    
    //删除
    app.post('/admin/del',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `delete from admin where id = ${req.body.id} `;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
   
    
    //新增
    app.post('/admin/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from admin where loginname = '${req.body.loginname}'`
    	var addsql = `insert into admin(loginname,password,name,setting,video,vip,user,management,height) values('${req.body.loginname}','${req.body.password}','${req.body.name}',${req.body.setting=='true'?1:0},${req.body.video=='true'?1:0},${req.body.vip=='true'?1:0},${req.body.user=='true'?1:0},${req.body.management=='true'?1:0},0)`
    	console.log(sql)
    	conn.query(sql,function(err,result){
            if(result.length==0){
            	conn.query(addsql,function(err,result){
		            res.send('success')
        		})
            }else{
            	res.send('repeat')
            }
        })
    })
    
    //详情
    app.post('/admin/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from admin where id = ${req.body.id}`
    	console.log(sql)
    	conn.query(sql,function(err,result){
            res.send(result[0])
        })
    })
    
    //详情
    app.post('/admin/update',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update admin set name = '${req.body.name}' , setting = ${req.body.setting=='true'?1:0} , video = ${req.body.video=='true'?1:0} , vip = ${req.body.vip=='true'?1:0} , user = ${req.body.user=='true'?1:0} , management = ${req.body.management=='true'?1:0} where id = ${req.body.id}`
    	console.log(sql)
    	console.log(req.body.vip)
    	console.log(req.body.vip=='true')
    	console.log(req.body.vip==true?1:0)
    	conn.query(sql,function(err,result){
            res.send('success')
        })
    })
    
}