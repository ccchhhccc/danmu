$(function(){
	
	var u_id = location.href.split('?')[1]
	
	//拼接用户导航条
	var tobarHtml = `<li><a href="http://localhost:2255/html/usermain.html?${u_id}">主页</a></li>
					 <li><a href="http://localhost:2255/html/usercenter.html?${u_id}">关注</a></li>
					 <li><a href="http://localhost:2255/html/fans.html?${u_id}">粉丝</a></li>
					 <li class="active"><a href="http://localhost:2255/html/collect.html?${u_id}">收藏</a></li>
					 <li class="set"><a href="http://localhost:2255/html/setting.html?${u_id}">设置</a></li>
					 <li>
						<i class="bi">233</i>
					 </li>
					 <li class="qiandao">
						
					 </li>`
	$('.tobar').html(tobarHtml)
	
	//获取用户id
	var userid = sessionStorage.getItem('userid')
	console.log(userid)
	
	//判断是否登录
	$.ajax({
		type:"post",
		url:"http://localhost:2255/user/isLogin",
		data:{
			id:userid
		},
		async:false,
		success:function(data){
			//如果用户和服务端不匹配
			if(data=='err'){
				userid = 0 
				sessionStorage.setItem("userid", "0")
			}
		}
	});
	
	if(userid!=undefined && userid!=0 && userid!=null){
		//获取用户信息
		$.ajax({
			type:"post",
			url:"http://localhost:2255/user/getInfo",
			data:{
				id:userid
			},
			async:false,
			success:function(data){
				var html = `<img class="myname" src="${data.data.headurl}" data-uid="${data.data.id}"/>
							<a class="logout">注销</a>
							<i id="toUpload">投稿</i>
							<a class="myname" data-uid="${data.data.id}">${data.data.name}</a>`
				$('.my').html(html)
				$('.user').css({'display':'none'})
			}
		});
	}
	
	$('.logout').on('click',function(){
		$.ajax({
			type:"post",
			url:"http://localhost:2255/user/logout",
			async:true,
			success:function(){
				location.href = location.href
			}
		});
	})
	
	//获取查看的用户信息
	var userinfo = {}
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
	var mytitle = ''
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
					mytitle = data[i].title
					break
				}
			}
		}
	});
	
	//插入头部信息
	var html = `<img src="${userinfo.centerurl}" class="mainbg"/>
				<div class="bottom-info">
					<img src="${userinfo.headurl}" class="user-head"/>
					<div class="user-info">
						<h3>${userinfo.name}</h3>
						<span>${mytitle}</span>
						<p>${userinfo.signname==null?'':userinfo.signname}</p>
					</div>
				</div>`
	$('.main').html(html)
	
	//插入硬币数量
	var num = userinfo.sum+userinfo.coinnum
	$('.bi').html(num)
	
	//判断是否已经关注
	var like = false
	$.ajax({
		type:"post",
		url:"http://localhost:2255/like/id",
		data:{
			u_id:u_id,
			liker:sessionStorage.getItem('userid')
		},
		async:false,
		success:function(data){
			if(data=='like'){
				like = true
			}
		}
	});
	//判断是否是自己账号以及能否签到
	if(u_id==sessionStorage.getItem('userid')){
		if(DateToString(userinfo.signday)){
			$('.qiandao').html(`<a class='signin'>签到</a>`)
		}else{
			$('.qiandao').html(`<a>已签到</a>`)
		}
		
	}else{
		console.log(0)
		$('.qiandao').html(`<a class='like'>${like?'已关注':'关注'}</a>`)
		$('.nome').css({'display':'none'})
		$('.set').css({'display':'none'})
		
	}
	
	//关注&&取消关注
	$('.like').on('click',function(){
		var thisobj = $(this)
		//判断是否登录
		if(sessionStorage.getItem("userid")==undefined || sessionStorage.getItem("userid")==0){
			showModal()
			return
		}
		if(thisobj.html()=='已关注'){
			$.ajax({
				type:"post",
				url:"http://localhost:2255/like/del",
				async:true,
				data:{
					u_id:u_id,
					liker:sessionStorage.getItem("userid")
				},
				success:function(data){
					like = false
					thisobj.html('关注')
				}
			});
		}else{
			$.ajax({
				type:"post",
				url:"http://localhost:2255/like/add",
				async:true,
				data:{
					u_id:u_id,
					liker:sessionStorage.getItem("userid")
				},
				success:function(data){
					like = true
					thisobj.html('已关注')
				}
			});
		}
	})
	
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
	
	//获取我的收藏
	var mycollection = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/collection/user/all",
		data:{
			u_id:sessionStorage.getItem("userid")
		},
		async:false,
		success:function(data){
			mycollection = data
		}
	});
	
	//获取ta的收藏
	var himcollection = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/collection/user/all",
		data:{
			u_id:u_id
		},
		async:false,
		success:function(data){
			himcollection = data
		}
	});
	
	//获取弹幕数量
	var dandan = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/video/collection/dandannum",
		data:{
			u_id:u_id
		},
		async:false,
		success:function(data){
			dandan = data
		}
	});
	
	//拼接下面的列表
	var html = ''
	for(var i in himcollection){
		var flag = false
		var dandanflag = false
		for(var j in mycollection){
			if(himcollection[i].v_id==mycollection[j].v_id){
				flag = true
				break
			}
		}
		for(var k in dandan){
			if(himcollection[i].v_id==dandan[k].v_id){
				dandanflag = true
				break
			}
		}
		html += `<li>
					<img src="${himcollection[i].v_img}" class="tovideo" data-vid="${himcollection[i].v_id}"/>
					<div class="info">
						<h5  class="tovideo" data-vid="${himcollection[i].v_id}">${himcollection[i].v_name}</h5>
						<i class="seenum"></i>
						<span>${himcollection[i].v_num}</span>
						<i class="danmunum"></i>
						<span>${dandanflag?dandan[k].sum:0}</span>
						<i class="author"></i>
						<span class="authorname toUser" data-uid="${himcollection[i].u_id}">${himcollection[i].name}</span>
					</div>
					<a class="tocollectvideo" data-id="${himcollection[i].v_id}">${flag?'已收藏':'收藏'}</a>
				</li>`
	}
	$('.mycollection').html(html)
	
	
	//跳转收藏的视频详情
	$('.tovideo').on('click',function(){
		var vid = $(this).attr('data-vid')
		location.href = `http://localhost:2255/html/detail.html?` + vid
	})
	
	$('.toUser').on('click',function(){
		var uid = $(this).attr('data-uid')
		location.href = `http://localhost:2255/html/usermain.html?` + uid
	})
	
	//列表收藏&&取消收藏
	$('.tocollectvideo').on('click',function(){
		//判断是否登录
		if(sessionStorage.getItem("userid")==undefined || sessionStorage.getItem("userid")==0){
			showModal()
			return
		}
		var thisobj = $(this)
		var id = $(this).attr('data-id')
		if(thisobj.html()=='已收藏'){
			$.ajax({
				type:"post",
				url:"http://localhost:2255/collection/del",
				async:true,
				data:{
					v_id:id,
					u_id:sessionStorage.getItem("userid")
				},
				success:function(data){
					thisobj.html('收藏')
				}
			});
		}else{
			$.ajax({
				type:"post",
				url:"http://localhost:2255/collection/add",
				async:true,
				data:{
					v_id:id,
					u_id:sessionStorage.getItem("userid")
				},
				success:function(data){
					thisobj.html('已收藏')
				}
			});
		}
	})
	
	//权限判断
	if(userinfo.collection==1 && u_id!=sessionStorage.getItem("userid")){
		$('.mycollection').html('')
	}
	
	$('.no').on('click',function(){
		closeModal()
	})
	
	$('#topay').on('click',function(){
		location.href = 'http://localhost:2255/html/login.html'
	})
	
	//跳转个人中心
	$('.myname').on('click',function(){
		var userid = $(this).attr('data-uid')
		//url拼接
		location.href = `http://localhost:2255/html/usermain.html?`+userid
	})
	
	//跳转投稿
	$('#toUpload').on('click',function(){
		location.href = `http://localhost:2255/html/contribute.html`
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
//关闭模态框
function closeModal(){
	$('#muhu').css({'display':'none'})
	$('#layer').css({'display':'none'})
}
//打开模态框
function showModal(){
	$('#muhu').css({'display':'block'})
	$('#layer').css({'display':'block'})
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