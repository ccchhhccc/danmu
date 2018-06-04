//引入短信模块
var smsClient = require('./message.js');

//负责验证码的模块
module.exports.listen = function(app,conn){
    
    //获取验证码
    app.post('/code/getCode',(req,response)=>{
    	response.append("Access-Control-Allow-Origin","*");
        var num = GetRandomNum(5);
        //判断之前是否还遗留着验证码
        new Promise(function(){
        	conn.query(`select * from validatecode where phone = '${req.body.phone}'`,function(err,result){
	            if(err){
	            	console.log('err')
	            }else{
	                if(result.length != 0){
	                	var sql = `delete from validatecode where phone = ${req.body.phone} `;
				        conn.query(sql,function(err,result){
				            console.log('del code')
				        })
	                }
	            }
	        })
        }).then(
        	//发送短信
	        smsClient.sendSMS({
	            PhoneNumbers: req.body.phone,
	            SignName: '陈海超',
	            TemplateCode: 'SMS_122281214',
	            TemplateParam: `{"code":"${num}"}`
	        }).then(function (res) {
	            let {Code}=res
	            if (Code === 'OK') {
	            	//获取当前时间
	            	var addtime = new Date().getTime()
	                //处理返回参数
	                conn.query(`insert into validatecode values('${req.body.phone}','${num}','${addtime}')`,function(err,result){
	                    if(err){
	                        return
	                    }else{
	                    	console.log('insert into table')
	                        response.send('success')
	                    }
	                })
	               
	            }else{
	            	response.send('err')
	            }
	        }, function (err) {
	            console.log(err)
	            response.send('err')
	        })
        )
        
    })

	//判断手机号码和验证码是否匹配
    app.post('/code/validate',function(req,res){
    	res.append("Access-Control-Allow-Origin","*");
        var sql = `select * from validatecode where phone = '${req.body.phone}' and code = '${req.body.code}'`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                	//验证成功后验证码失效
                	var sql = `delete from validatecode where phone = ${req.body.phone} `;
			        conn.query(sql,function(err,result){
			        })
                    res.send('success')
                }else{
                    res.send('err')
                }
            }
        })
    })

    
}

function GetRandomNum(n){
    var num = '';
    for(var i = 0 ; i<n ; i++){
        num += parseInt(Math.random()*10) ;
    }
    return num ;
}
    