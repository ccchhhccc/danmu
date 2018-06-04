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
	
	//所有数据列表
	var videolist = []
	//查询所有数据
	$.ajax({
		type:"post",
		url:"http://localhost:2255/video/rank/all",
		data:{
			sortname:'v_num'
		},
		async:false,
		success:function(data){
			videolist = data
		}
	});
	
	//获取弹幕数量
	var danmunum = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/danmu/allnum",
		async:false,
		success:function(data){
			danmunum = data
		}
	});
	
	//当前页数
	var page = 1
	//将十条数据插入页面中
	$('.allList').find('ul').html(addHtml(videolist,page,danmunum))
	
	//排序方式    播放量&&硬币&&收藏
	$('.navbar').find('a').on('click',function(){
		$('.navbar').find('a').removeClass('active')
		$(this).addClass('active')
		page = 1
		var key = $(this).attr('data-sort')
		$.ajax({
			type:"post",
			url:"http://localhost:2255/video/rank/all",
			data:{
				sortname:key
			},
			async:false,
			success:function(data){
				videolist = data
			}
		});
		$('.allList').find('ul').html(addHtml(videolist,page,danmunum))
	})
	
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if(scrollTop + windowHeight >= scrollHeight){
			page++
			console.log(0)
			if(addHtml(videolist,page,danmunum)==''){
				return
			}
			console.log(233)
	　　　	var html = $('.allList').find('ul').html()+addHtml(videolist,page,danmunum)
			$('.allList').find('ul').html(html)
		}
	});
	
	//页面跳转
	$('.allList').on('click',function(event){
		var id
		if($(event.target).parents('li').attr('data-id')){
			id = $(event.target).parents('li').attr('data-id')
		}else{
			id= $(event.target).attr('data-id')
		}
		if(id==undefined){
			return 
		}
		location.href = 'http://localhost:2255/html/detail.html?'+id
	})
	
	//跳转投稿
	$('#toUpload').on('click',function(){
		location.href = `http://localhost:2255/html/contribute.html`
	})
	
	//跳转个人中心
	$('.myname').on('click',function(){
		var userid = $(this).attr('data-uid')
		//url拼接
		location.href = `http://localhost:2255/html/usermain.html?`+userid
	})
	
})
function addHtml(arr,page,danmunum){
	var html = '';
	if(10*(page-1) >= arr.length){
		return ''
	}else{
		var maxlen = 10*page-1 < arr.length-1 ? 10*page-1:arr.length-1
		var minlen = 10*(page-1)
		for(var i = minlen ; i<= maxlen ; i++){
			var flag = false
			for(var j in danmunum){
				if(danmunum[j].v_id ==arr[i].id){
					flag = true
					break
				}
			}
			
			html += `<li class="tovideo" data-id="${arr[i].id}">
						<div class="num">${i+1}</div>
						<img src="${arr[i].v_img}" class="headurl"/>
						<div class="info">
							<h5>${arr[i].v_name}<i class="vip  ${arr[i].v_status==3?'':'hide'}"></i></h5>
							<i class="seenum"></i>
							<span>${arr[i].v_num}</span>
							<i class="danmunum"></i>
							<span>${flag?danmunum[j].count:0}</span>
							<i class="author"></i>
							<span class="authorname">${arr[i].name}</span>
						</div>
					</li>`
		}
		return html
	}
}
