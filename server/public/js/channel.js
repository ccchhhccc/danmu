$(function(){
	
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
	
	
	//获取频道信息
	$.ajax({
		type:'post',
		url:'http://localhost:2255/channel/sort',
		async:false,
		success:function(data){
			console.log(data)
			var html = '';
			for(var i in data){
				html += `<li class="channelli" data-id="${data[i].c_id}">
							<div class="move">
								<img src="${data[i].imgurl}" class="channel"/>
								<span>#${data[i].name}#</span>
							</div>
							<img src="../img/channel-arrow.png" class="go"/>
						</li>`
			}
			$('.allChannel').find('ul').html(html)
		}
	})
	
	
	//鼠标移动事件
	$('.channelli').on('mouseover',function(){
		$(this).find('.move').stop().animate({
			left:'-45px'
		},300)
	})
	$('.channelli').on('mouseout',function(){
		$(this).find('.move').stop().animate({
			left:'0'
		},300)
	})
	
	//进去频道专区
	$('.channelli').on('click',function(){
		var id = $(this).attr('data-id')
		location.href = `http://localhost:2255/html/channelList.html?`+id
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
})
