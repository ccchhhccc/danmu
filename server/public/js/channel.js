$(function(){
	
	//获取用户id
	var userid = sessionStorage.getItem('userid')
	console.log(userid)
	
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
})
