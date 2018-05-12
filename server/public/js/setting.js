$(function(){
	//假装有用户
	sessionStorage.setItem("userid", "13")
	//获取用户id
	var u_id = sessionStorage.getItem("userid")
	if(u_id==undefined ||u_id==0){
		return
	}
	var userinfo = {}
	//获取查看的用户信息
	$.ajax({
		type:"post",
		url:"http://localhost:2255/user/getInfo",
		data:{
			id:u_id
		},
		async:false,
		success:function(data){
			userinfo = data.data
		}
	});
	
	var leval = []
	var myleval = 1
	//获取等级
	$.ajax({
		type:"post",
		url:"http://localhost:2255/leval",
		async:false,
		success:function(data){
			leval = data
			console.log(data)
			for(var i in data){
				if(Number(userinfo.leval)<data[i].value){
					myleval = Number(i)+1
					break
				}
			}
		}
	});
	console.log(myleval)
	
	//插入头部信息
	var html = `<img src="${userinfo.centerurl}" class="mainbg"/>
				<div class="bottom-info">
					<img src="${userinfo.headurl}" class="user-head"/>
					<div class="user-info">
						<h3>${userinfo.name}</h3>
						<span>LV${myleval}</span>
						<p>${userinfo.signname==null?'':userinfo.signname}</p>
					</div>
				</div>`
	$('.main').html(html)
	
	//插入硬币数量
	var num = userinfo.sum+userinfo.coinnum
	$('.bi').html(num)
	
	//判断是否是自己账号以及能否签到
	if(u_id==sessionStorage.getItem('userid')){
		if(DateToString(userinfo.signday)){
			$('.qiandao').html(`<a class='signin'>签到</a>`)
		}else{
			$('.qiandao').html(`<a>已签到</a>`)
		}
	}
	//签到
	$('.signin').on('click',function(){
		$.ajax({
			type:"post",
			url:"http://localhost:2255/user/signin",
			data:{
				id:u_id
			},
			async:false,
			success:function(data){
				$('.qiandao').html('<a>已签到</a>')
			}
		});
	})
	
	//拼接设置
	var html = `<li class="checkli">
					<b class="check" data-name="video"></b>
					<em style="${userinfo.video==0?'':'display:none;'}"></em>
					<span>我的视频</span>
				</li>
				<li class="checkli">
					<b class="check" data-name="liker"></b>
					<em style="${userinfo.liker==0?'':'display:none;'}"></em>
					<span>我的关注</span>
				</li>
				<li class="checkli">
					<b class="check" data-name="fans"></b>
					<em style="${userinfo.fans==0?'':'display:none;'}"></em>
					<span>我的粉丝</span>
				</li>
				<li class="checkli">
					<b class="check" data-name="collection"></b>
					<em style="${userinfo.collection==0?'':'display:none;'}"></em>
					<span>我的收藏</span>
				</li>`
	$('.setting').html(html)
	
	html = `<li class="checkli">
				<span>我的昵称：</span>
				<span>${userinfo.name}</span>
				<input type="text" class="newvalue"/>
				<b class="save clear headbuttom">取消</b>
				<b class="save savetxt" data-name="name">保存</b>
				<img src="../img/update.png" class="update"/>
			</li>
			<li class="checkli">
				<span>我的头像：</span>
				<img src="${userinfo.headurl}" class="infourl">
				<div class="uploadbox newvalue">
					<form id="uploadForm" >
						<input type="file" id="file" class="uploadhead" name="head"/>
					</form>
					<img  class="uploadurl"/>
				</div>
				<b class="save del headbuttom">取消</b>
				<b class="save headbuttom savehead">保存</b>
				<img src="../img/update.png" class="update"/>
			</li>
			<li class="checkli">
				<span>个性签名：</span>
				<span>${userinfo.signname==null?'':userinfo.signname}</span>
				<input type="text" class="newvalue"/>
				<b class="save clear headbuttom">取消</b>
				<b class="save savetxt" data-name="signname">保存</b>
				<img src="../img/update.png" class="update"/>
			</li>
			<li class="checkli">
				<span>我的简介：</span>
				<span>${userinfo.brief==null?'':userinfo.brief}</span>
				<input type="text" class="newvalue"/>
				<b class="save clear headbuttom">取消</b>
				<b class="save savetxt" data-name="brief">保存</b>
				<img src="../img/update.png" class="update"/>
			</li>
			<li class="checkli mysex">
				<span>性别：</span>
				<b class="check checkboy" data-name="sexboy"></b>
				<em class="boy" style="${userinfo.sex==1?'':'display:none;'}"></em>
				<span class="sex">男</span>
				<b class="check checkgirl"  data-name="sexgirl"></b>
				<em class="girl" style="${userinfo.sex==0?'':'display:none;'}"></em>
				<span class="sex">女</span>
			</li>
			<li class="checkli">
				<span>背景图片：</span>
				<img src="${userinfo.centerurl}" class="updatebg"/>
				<div class="uploadbox2 newvalue">
					<form id="bgForm">
					<input type="file" class="uploadbg" name="bg" id="bgfile"/>
					</form>
					<img class="bgurl" />
				</div>
				<b class="save delete headbuttom">取消</b>
				<b class="save headbuttom savebg">保存</b>
				<img src="../img/update.png" class="update"/>
			</li>`
	$('.personsetting').html(html)
	
	//隐私设置的    选中事件
	$('.check').on('click',function(){
		$(this).next().css({'display':'block'})
		var key = $(this).attr('data-name')
		var value = 0
		if(key=='sexboy'){
			key = 'sex'
			$('.boy').css({'display':'block'})
			$('.girl').css({'display':'none'})
			value = 1
		}else if(key=='sexgirl'){
			key = 'sex'
			$('.girl').css({'display':'block'})
			$('.boy').css({'display':'none'})
			value = 0
		}
		$.ajax({
			type:"post",
			url:"http://localhost:2255/user/setting",
			async:false,
			data:{
				id:u_id,
				key:key,
				value:value
			},
			success:function(data){
			}
		});
	})
	
	//隐私设置的    取消选中事件
	$('em').on('click',function(){
		$(this).css({'display':'none'})
		var key = $(this).prev().attr('data-name')
		var value = 1
		if(key=='sexboy'){
			key = 'sex'
			$('.boy').css({'display':'block'})
			$('.girl').css({'display':'none'})
			value = 1
		}else if(key=='sexgirl'){
			key = 'sex'
			$('.girl').css({'display':'block'})
			$('.boy').css({'display':'none'})
			value = 0
		}
		$.ajax({
			type:"post",
			url:"http://localhost:2255/user/setting",
			async:false,
			data:{
				id:u_id,
				key:key,
				value:value
			},
			success:function(data){
			}
		});
	})
	
	//点击修改按钮
	$('.update').on('click',function(){
		$(this).prev().css({'display':'inline-block'}).prev().css({'display':'inline-block'}).prev().css({'display':'inline-block'})
		$(this).css({'display':'none'})
	})
	
	//点击取消按钮
	$('.clear').on('click',function(){
		$(this).prev().val('')
		$(this).prev().css({'display':'none'})
		$(this).css({'display':'none'}).next().css({'display':'none'}).next().css({'display':'inline-block'})
		
	})
	
	//文本形式更改个人设置
	$('.savetxt').on('click',function(){
		//空值不做处理
		if($(this).prev().prev().val()==''){
			return
		}
		var key = $(this).attr('data-name')
		var value = $(this).prev().prev().val()
		$.ajax({
			type:"post",
			url:"http://localhost:2255/user/setting",
			async:false,
			data:{
				id:u_id,
				key:key,
				value:value
			},
			success:function(data){
				location.href = location.href
			}
		});
	})
	
	//选中头像处理
	$('#file').on('change',function(event){
		var url = URL.createObjectURL(event.target.files[0])
		$('.uploadurl').attr({'src':url}).css({'display':'block'})
	})
	
	//取消选中的头像
	$('.del').on('click',function(){
		$('#file').val('')
		$('.uploadurl').attr({'src':''}).css({'display':'none'})
		$(this).prev().css({'display':'none'})
		$(this).next().next().css({'display':'block'})
		$(this).next().css({'display':'none'})
		$(this).css({'display':'none'})
	})
	
	
	//确认上传头像
	$('.savehead').on('click',function(){
		var headurl = ''
		//上传文件获取路径
		$.ajax({
			url: "http://localhost:2255/upload",
            type: "POST",
            processData:false,
            contentType:false,
            cache:false,
            async:false,
            data: new FormData($("#uploadForm")[0]),
            success:function(data){
            	if(data === 'err'){
            		console.log('图片上传失败，请重新上传')
            	}else{
            		headurl = 'http://localhost:2255/uploads/' + data
            	}
            }
		});
		//将数据插入数据库中
		$.ajax({
			type:"post",
			url:"http://localhost:2255/user/setting",
			async:false,
			data:{
				id:u_id,
				key:'headurl',
				value:headurl
			},
			success:function(data){
				showModal()
				//location.href = location.href
			}
		});
	})
	
	//选中背景处理
	$('#bgfile').on('change',function(event){
		var url = URL.createObjectURL(event.target.files[0])
		$('.bgurl').attr({'src':url}).css({'display':'block'})
	})
	
	//取消选中的背景
	$('.delete').on('click',function(){
		$('#bgfile').val('')
		$('.bgurl').attr({'src':''}).css({'display':'none'})
		$(this).prev().css({'display':'none'})
		$(this).next().next().css({'display':'block'})
		$(this).next().css({'display':'none'})
		$(this).css({'display':'none'})
	})
	
	
	//确认上传背景
	$('.savebg').on('click',function(){
		var headurl = ''
		//上传文件获取路径
		$.ajax({
			url: "http://localhost:2255/upload",
            type: "POST",
            processData:false,
            contentType:false,
            cache:false,
            async:false,
            data: new FormData($("#bgForm")[0]),
            success:function(data){
            	if(data === 'err'){
            		console.log('图片上传失败，请重新上传')
            	}else{
            		headurl = 'http://localhost:2255/uploads/' + data
            	}
            }
		});
		//将数据插入数据库中
		$.ajax({
			type:"post",
			url:"http://localhost:2255/user/setting",
			async:false,
			data:{
				id:u_id,
				key:'centerurl',
				value:headurl
			},
			success:function(data){
				showModal()
				//location.href = location.href
			}
		});
	})
	
	$('#topay').on('click',function(){
		location.href = location.href
	})
	
	//滚动事件
	$(window).scroll(function(){
		var top = $(window).scrollTop()
		$('#muhu').css({
			'top':top+'px',
			'bottom':'0'
		})
		$('#layer').css({
			top:top+150+'px'
		})
	})
})
//打开模态框
function showModal(){
	$('#muhu').css({'display':'block'})
	$('#layer').css({'display':'block'})
	$('.no').css({'display':'none'})
}
function DateToString (format) {
	let d = new Date(Number(format))
	if(format==''){
		return true
	}
	if(d.getDate() == new Date().getDate()){
		if(d.getMonth() ==new Date().getMonth()){
			if(d.getFullYear() == new Date().getFullYear()){
				return false
			}else{
				return true
			}
		}else{
			return true
		}
	}else{
		return true
	}
}