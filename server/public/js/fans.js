$(function(){
	//假装有用户
	sessionStorage.setItem("userid", "14")
	var u_id = location.href.split('?')[1]
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
	
	//获取我的的关注列表
	var mylike = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/like/allLike",
		data:{
			liker:sessionStorage.getItem("userid")
		},
		async:false,
		success:function(data){
			mylike = data
		}
	});
	
	//获取用户粉丝
	var himfans = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/like/fans",
		data:{
			u_id:u_id
		},
		async:false,
		success:function(data){
			himfans = data
		}
	});
	
	//拼接下面的列表
	var html = ''
	for(var i in himfans){
		var flag = false
		for(var j in mylike){
			if(himfans[i].u_id==mylike[j].u_id){
				flag = true
				break
			}
		}
		html += `<li>
					<img class="focus" src="${himfans[i].headurl}"/>
					<div class="focus-info">
						<span>${himfans[i].name}</span>
						<p>${himfans[i].signname==null?'':himfans[i].signname}</p>
					</div>
					<a class="tolike  ${himfans[i].id==sessionStorage.getItem("userid")?'tohide':''}" data-id="${himfans[i].id}">${flag?'已关注':'关注'}</a>
				</li>`
	}
	$('.himfans').html(html)
	
	//列表关注&&取消关注
	$('.tolike').on('click',function(){
		//判断是否登录
		if(sessionStorage.getItem("userid")==undefined || sessionStorage.getItem("userid")==0){
			showModal()
			return
		}
		var thisobj = $(this)
		var id = $(this).attr('data-id')
		if(thisobj.html()=='已关注'){
			$.ajax({
				type:"post",
				url:"http://localhost:2255/like/del",
				async:true,
				data:{
					u_id:id,
					liker:sessionStorage.getItem("userid")
				},
				success:function(data){
					thisobj.html('关注')
				}
			});
		}else{
			$.ajax({
				type:"post",
				url:"http://localhost:2255/like/add",
				async:true,
				data:{
					u_id:id,
					liker:sessionStorage.getItem("userid")
				},
				success:function(data){
					thisobj.html('已关注')
				}
			});
		}
	})
	
	if(userinfo.fans==1 && u_id!=sessionStorage.getItem("userid")){
		$('.himfans').html('')
	}
	
	$('.no').on('click',function(){
		closeModal()
	})
	
	$('#topay').on('click',function(){
		location.href = 'http://localhost:2255/html/login.html'
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