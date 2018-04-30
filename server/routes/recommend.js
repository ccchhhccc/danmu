
//推荐管理模块
module.exports.listen = function(app,conn){
    
    //查找所有推荐
    app.post('/recommend',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select recommend.t_id as id, video.v_name , video.v_url , channel.name as channelname , recommend.addtime , user.name as username , recommend.sort , recommend.v_id from recommend , video , channel , user where user.id = video.u_id and video.c_id = channel.c_id and recommend.v_id = video.id order by recommend.sort`
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	res.send(result)
            }
        })
    })
    
    //修改排序
    app.post('/recommend/update/sort',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update recommend set sort = ${req.body.sort} where t_id = ${req.body.t_id}`
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	res.send('success')
            }
        })
    })
    
    //获取详情
    app.post('/recommend/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from recommend where t_id = ${req.body.t_id}`
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	res.send(result[0])
            }
        })
    })
    
    //删除
    app.post('/recommend/del',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `delete from recommend where t_id = ${req.body.t_id}`
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	res.send('success')
            }
        })
    })
 
}