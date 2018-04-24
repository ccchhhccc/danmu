
//轮播图模块
module.exports.listen = function(app,conn){
    
    //查找所有轮播图
    app.post('/admin/carousels',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from carousel order by sort `,function(err,result){
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
    
    //更改轮播图状态
    app.post('/admin/carousels/status',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `update carousel set status = ${req.body.status} where id = ${req.body.id} `;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
    //删除轮播图
    app.post('/admin/carousels/del',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `delete from carousel where id = ${req.body.id} `;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
    //新增轮播图
    app.post('/admin/carousels/add',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	var sql = `insert into carousel(title,link,status,addtime,sort,url) VALUES('${req.body.title}','${req.body.link}',1,'${req.body.addtime}',${req.body.sort},'${req.body.url}')`
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
    //修改轮播图
    app.post('/admin/carousels/update',function(req,res){
    	res.append("Access-Control-Allow-Origin","*")
    	console.log(req.body)
    	var sql = `update carousel set title = '${req.body.title}',link = '${req.body.link}',addtime = '${req.body.addtime}',sort = ${req.body.sort} ,url = '${req.body.url}' where id = ${req.body.id}`
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
    
    //获取轮播图详情
    app.post('/admin/carousels/detail',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from carousel where id = ${req.body.id} `;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result[0])
            }
        })
    })
    
    //获取有效轮播图并排序
    app.post('/admin/carousels/sort',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
    	var sql = `select * from carousel where status = 1 order by sort , addtime`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result)
            }
        })
    })
}