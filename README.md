# danmu
视频弹幕网站-------毕设

# 线上地址
http://118.24.4.133:2255/

# 对应后台管理系统的线上地址
http://118.24.4.133:2266/

# 弹幕插件
https://github.com/chiruom/DanmuPlayer

# 申请阿里云短信服务
https://dayu.aliyun.com/product/sms?spm=a3142.7791109.0.0.4eff69290s9sbZ

# 进入server/routes/message.js填写阿里云短信服务的秘钥
```
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'youKeyId'
const secretAccessKey = 'youAccessKey'
```

# 进入server/routes/send.js填写阿里云短信签名和使用的模板
```
 //发送短信
smsClient.sendSMS({
    PhoneNumbers: req.body.phone,
    SignName: '阿里云短信签名',
    TemplateCode: '阿里云短信模板',
    TemplateParam: `{"code":"${num}"}`
})
```

# 启动
进入server文件,运行app.js文件
```
node app
```


