$(function(){
	$.ajax({
		type:'post',
		url:'http://localhost:2255/channel/sort',
		async:false,
		success:function(data){
			console.log(data)
			var html = '';
			for(var i in data){
				html += `<li class="channelli">
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
})
