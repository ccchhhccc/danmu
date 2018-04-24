
//频道模块
module.exports.listen = function(app,conn){
    
    //查找频道
    app.post('/channel',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from channel order by sort`,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send({
                	msg:'success',
                	data:result
                })
            }
        })
    })
    
    //更改频道状态
    app.post('/channel/status',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update channel set status = ${req.body.status} where c_id = ${req.body.id} `;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
    //删除频道
    app.post('/channel/del',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `delete from channel where c_id = ${req.body.id} `;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
    //新增频道
    app.post('/channel/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `insert into channel(name,imgurl,status,addtime,brief,sort) VALUES('${req.body.name}','http://localhost:2255/uploads/${req.body.imgurl}',1,'${new Date().getTime()}','${req.body.brief}',${req.body.sort})`;
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
    //获取有效的频道信息并排序
    app.post('/channel/sort',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from channel where status = 1 order by sort , addtime`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result)
            }
        })
    })
    
    //获取频道详情
    app.post('/channel/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from channel where c_id = ${req.body.id}`,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result[0])
            }
        })
    })
    
    //修改频道
    app.post('/channel/update',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
        conn.query(`update  channel set name = '${req.body.name}' , imgurl = '${req.body.imgurl}' , brief = '${req.body.brief}' , sort = ${req.body.sort} , addtime = '${new Date().getTime()}' where c_id = ${req.body.c_id}`,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
}