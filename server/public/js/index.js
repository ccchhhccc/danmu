$(function(){
	//获取轮播图
	$.ajax({
		type:"post",
		url:"http://localhost:2255/admin/carousels/sort",
		async:false,
		success:function(data){
			var html = ''
			for(var i in data){
				html += `<div class="swiper-slide"><a href="${data[i].link}"><img src="${data[i].url}"/></a></div>`
			}
			$('.swiper-wrapper').html(html)
		}
	});
	
	new Swiper ('.swiper-container', {
		// 如果需要分页器
		pagination: '.swiper-pagination',
		paginationClickable :true,
		autoplayDisableOnInteraction:false,
		autoplay:2000,
		loop: true,
		// 如果需要前进后退按钮
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'

	})
	
	$('.main>ul>li').on('click',function(){
		location.href = 'http://localhost:2255/html/detail.html'
	})
	
})
