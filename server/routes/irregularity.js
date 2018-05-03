
//封禁模块
module.exports.listen = function(app,conn){
    
    //删除等级
    app.post('/irregularity/del',function(req,res){
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
   
    
    //新增封禁
    app.post('/irregularity/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `insert into irregularity(u_id,starttime,time,reason) values(${req.body.u_id},'${new Date().getTime()}','${req.body.time}','${req.body.reason}')`
    	console.log(sql)
    	conn.query(sql,function(err,result){
    		
            if(err){
                res.send('err')
            }else{
            	res.send('success')
            }
        })
    })
    
    //获取等级详情
    app.post('/irregularity/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from leval where id = ${req.body.id}`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result[0])
            }
        })
    })
    
    //修改等级详情
    app.post('/irregularity/update',function(req,res){
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