
//vip视频管理模块
module.exports.listen = function(app,conn){
    
    //查找所有vip
    app.post('/vip',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select vipVideo.id as id, video.v_name , video.v_url , channel.name as channelname , vipVideo.addtime , user.name as username , vipVideo.sort , vipVideo.v_id from vipVideo , video , channel , user where user.id = video.u_id and video.c_id = channel.c_id and vipVideo.v_id = video.id order by vipVideo.sort`
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	res.send(result)
            }
        })
    })
    
    //查找vip   附带评分
    app.post('/vip/all/grade',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `SELECT v.*, AVG(grade.num) as avg_num
					FROM video as v LEFT JOIN grade ON v.id = grade.v_id where  v.v_status = 3
					GROUP BY v.id `
    	console.log(sql)
        conn.query(sql,function(err,result){
            res.send(result)
        })
    })
    
    //修改排序
    app.post('/vip/update/sort',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update vipVideo set sort = ${req.body.sort} where id = ${req.body.id}`
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
    app.post('/vip/id',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from vipVideo where id = ${req.body.id}`
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
    app.post('/vip/del',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `delete from vipVideo where id = ${req.body.id}`
    	console.log(sql)
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
            	res.send('success')
            }
        })
    })
    
    //新增vip
    app.post('/vip/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `insert into vipVideo(v_id,addtime,sort) values(${req.body.v_id} , '${new Date().getTime()}' , 1)`
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