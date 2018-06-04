
//举报管理模块
module.exports.listen = function(app,conn){
    
    //分页查询，每页十条
    let pageNum = 6
    
    //删除举报
    app.post('/inform/del',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `delete from inform where id = ${req.body.id} `;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
   
    
    //新增举报
    app.post('/inform/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	conn.query(`insert into inform(u_id,informer,reason,content,time) values (${req.body.u_id},${req.body.informer},'${req.body.reason}','${req.body.content}','${new Date().getTime()}')`,function(err,result){
            if(err){
                res.send('err')
            }else{
            	res.send('success')
            }
        })
    })
    
    //分页查询举报信息   根绝时间排序
    app.post('/inform/sort',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var contsql = `SELECT
						u1.NAME as toinformname,
						u2.NAME as informername,
						c.*	
					FROM
						user AS u1
						LEFT JOIN inform AS c ON u1.id = c.u_id
						LEFT JOIN user AS u2 ON c.informer = u2.id
						where c.id = c.id `
    	var contentSql = `SELECT
						u1.NAME as toinformname,
						u2.NAME as informername,
						c.*	
					FROM
						user AS u1
						LEFT JOIN inform AS c ON u1.id = c.u_id
						LEFT JOIN user AS u2 ON c.informer = u2.id
						where c.id = c.id ORDER BY time DESC
    				LIMIT ${pageNum*(req.body.page -1)} , ${pageNum}`
    	console.log(contsql)
    	console.log(contentSql)
    	conn.query(contsql,function(err,result){
    		var obj = {}
            obj.total = result.length
            conn.query(contentSql,function(err,result){
	            obj.data = result
	            obj.currpage = Number(req.body.page)
	            res.send(obj)
	        })
        })
    })
    
    
    //封禁时删除评论或回复
    app.post('/inform/delmessage',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sqlpl = `delete from pl where userid = ${req.body.u_id} and content like '%${req.body.content}%' `
    	console.log(sqlpl)
    	conn.query(sqlpl,function(err,result){
    		
        })
    	
    	var sqlhf = `delete from hf where hfuserid = ${req.body.u_id} and hfcontent like '%${req.body.content}%'`
    	console.log(sqlhf)
    	conn.query(sqlhf,function(err,result){
    		
        })
    	res.send('success')
    })
    
}