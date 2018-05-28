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
							<a class="myname" data-uid="${data.data.id}">${data.data.name}</a>`
				$('.my').html(html)
				$('.user').css({'display':'none'})
			}
		});
	}
	
	
	//获取频道id
	var c_id = location.href.split('?')[1]
	
	$.ajax({
		type:"post",
		url:"http://localhost:2255/channel/id",
		data:{
			id:c_id
		},
		async:false,
		success:function(data){
			//拼接标题
			$('.channelname').html(data.name)
		}
	});
	
	//获取视频
	var allvideo = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/video/c_id/all",
		data:{
			c_id:c_id,
			ordername:'v_time'
		},
		async:false,
		success:function(data){
			allvideo = data
		}
	});
	
	//获取收藏数量
	var collection = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/video/c_id/collection",
		data:{
			c_id:c_id
		},
		async:false,
		success:function(data){
			collection = data
		}
	});
	
	//获取弹幕数量
	var dandan = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/video/c_id/dandan",
		data:{
			c_id:c_id
		},
		async:false,
		success:function(data){
			dandan = data
		}
	});
	
	
	var html = ``
	var page = 1
	$('.allList').find('ul').html(addInfo(allvideo,page,collection,dandan))
	
	
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if(scrollTop + windowHeight >= scrollHeight){
			page++
			if(addInfo(allvideo,page,collection,dandan)==''){
				return
			}
	　　　	var html = $('.allList').find('ul').html()+addInfo(allvideo,page,collection,dandan)
			$('.allList').find('ul').html(html)
			console.log(233)
		}
	});
	
	//排序方式    评分&&时间
	$('.navbar').find('a').on('click',function(){
		$('.navbar').find('a').removeClass('active')
		$(this).addClass('active')
		page = 1
		var key = $(this).attr('data-sort')
		$.ajax({
			type:"post",
			url:"http://localhost:2255/video/c_id/all",
			data:{
				c_id:c_id,
				ordername:key
			},
			async:false,
			success:function(data){
				allvideo = data
			}
		});
		$('.allList').find('ul').html(addInfo(allvideo,page,collection,dandan))
	})
	
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
})
//每次添加两行数据8条
function addInfo(arr,page,collection,dandan){
	var html = '';
	if(8*(page-1) >= arr.length){
		return ''
	}else{
		
		var maxlen = 8*page-1 < arr.length-1 ? 8*page-1:arr.length-1
		var minlen = 8*(page-1)
		console.log(minlen,maxlen)
		for(var i = minlen ; i<= maxlen ; i++){
			var flag = false
			var dandanflag = false
			for(var j in collection){
				if(collection[j].v_id == arr[i].id){
					flag = true
					break
				}
			}
			for(var k in dandan){
				if(dandan[k].v_id == arr[i].id){
					dandanflag = true
					break
				}
			}
			html += `<li class="todetail" data-id="${arr[i].id}">
						<div class="imgbox">
							<img src="${arr[i].v_img}" />
							<i class="vip ${arr[i].v_status==3?'':'hide'}"></i>
						</div>
						<div class="v-title">
							<h4>${arr[i].v_name}</h4>
							<div class="info">
								<i class="comment"></i>
								<span>${dandanflag?dandan[k].sum:0}</span>
								<i class="like"></i>
								<span>${flag?collection[j].sum:0}</span>
								<div class="star-bg">
									<span class="star" style="width:${arr[i].avg_num==null?0:arr[i].avg_num.toFixed(1)*9}px"></span>
								</div>
								<b>${arr[i].avg_num==null?0:arr[i].avg_num.toFixed(1)}分</b>
							</div>
						</div>
					</li>`
		}
		return html
	}
}
