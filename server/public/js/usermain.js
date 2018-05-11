$(function(){
	//假装有用户
	sessionStorage.setItem("userid", "13")
	var u_id = location.href.split('?')[1]
	console.log(u_id)
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
		$('.qiandao').html(`<a class='like'>${like?'已关注':'关注'}</a>`)
		$('.nome').css({'display':'none'})
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
				$('.qiandao').html(`<a>已签到</a>`)
				//硬币+1
				$('.bi').html(num+1)
			}
		});
	})
	
	//获取当前用户的所有收藏
	var collection = []
	if(sessionStorage.getItem("userid")!=undefined && sessionStorage.getItem("userid")!=0){
		$.ajax({
			type:"post",
			url:"http://localhost:2255/collection/user/all",
			data:{
				u_id:sessionStorage.getItem("userid")
			},
			async:false,
			success:function(data){
				collection = data
			}
		});
	}
	//获取弹幕数量
	var dandan = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/video/userid/dandannum",
		data:{
			u_id:u_id
		},
		async:false,
		success:function(data){
			dandan = data
		}
	});
	//获取审核中的视频
	$.ajax({
		type:"post",
		url:"http://localhost:2255/video/userid/nopass",
		data:{
			u_id:u_id
		},
		async:false,
		success:function(data){
			if(u_id==sessionStorage.getItem('userid')){
				var html = ``
				for(var i in data){
					html += `<li>
								<img src="${data[i].v_img}" />
								<div class="info">
									<h5>${data[i].v_name}</h5>
									<i class="seenum"></i>
									<span>0</span>
									<i class="danmunum"></i>
									<span>0</span>
								</div>
							</li>`
				}
				$('.nopassvideo').html(html)
			}
		}
	});
	
	//获取审核完的视频
	$.ajax({
		type:"post",
		url:"http://localhost:2255/video/userid/pass",
		data:{
			u_id:u_id
		},
		async:false,
		success:function(data){
			var html = ``
			for(var i in data){
				var flag = false
				var iscollection = false
				for(var j in dandan){
					if(data[i].id == dandan[j].v_id){
						flag = true
						break
					}
				}
				for(var k in collection){
					if(data[i].id == collection[k].v_id){
						iscollection = true
						break
					}
				}
				html += `<li>
							<img src="${data[i].v_img}" />
							<div class="info">
								<h5>${data[i].v_name}</h5>
								<i class="seenum"></i>
								<span>${data[i].v_num}</span>
								<i class="danmunum"></i>
								<span>${flag?dandan[j].sum:0}</span>
							</div>
							<a class="yeah" data-id="${data[i].id}">${iscollection?'已收藏':'收藏'}</a>
						</li>`
			}
			$('.passvideo').html(html)
		}
	});
	
	//收藏&&取消
	$('.yeah').on('click',function(){
		//判断是否登录
		if(sessionStorage.getItem("userid")==undefined || sessionStorage.getItem("userid")==0){
			showModal()
			return
		}
		var thisobj = $(this)
		var v_id = thisobj.attr('data-id')
		if($(this).html()=='已收藏'){
			$.ajax({
				type:"post",
				url:"http://localhost:2255/collection/del",
				data:{
					u_id:sessionStorage.getItem('userid'),
					v_id:v_id
				},
				async:false,
				success:function(data){
					thisobj.html('收藏')
				}
			});
		}else{
			$.ajax({
				type:"post",
				url:"http://localhost:2255/collection/add",
				data:{
					u_id:sessionStorage.getItem('userid'),
					v_id:v_id
				},
				async:false,
				success:function(data){
					thisobj.html('已收藏')
				}
			});
		}
		
	})
	
	//关闭模态框
	$('.no').on('click',function(){
		closeModal()
	})
	
	//去登录
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