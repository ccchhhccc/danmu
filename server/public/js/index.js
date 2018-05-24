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
	
//	$('.main>ul>li').on('click',function(){
//		location.href = 'http://localhost:2255/html/detail.html'
//	})
	
	//将推荐内容加入首页
	var html = ''
	$.ajax({
		type:"post",
		url:"http://localhost:2255/recommend/query/sort",
		async:false,
		success:function(data){
			for(var i in data){
				html += `<li>
							<img src="${data[i].v_img}"/>
							<div class="right-content">
								<div class="top">
									<h3>${data[i].v_name}</h3>
									<div class="author">
										<span>影片作者:</span>
										<i class="toUser" data-uid="${data[i].u_id}">${data[i].name}</i>
										<div class="star-bg">
											<span class="star" style="width:${data[i].avg_num==null?0:data[i].avg_num.toFixed(1)*9}px"></span>
										</div>
										<b>${data[i].avg_num==null?0:data[i].avg_num.toFixed(1)}分</b>
									</div>
									<p>${data[i].v_brief==null?'':data[i].v_brief}</p>
								</div>
								<div class="bottom">
									<span>${DateToString(data[i].v_time)}</span>
								</div>
							</div>
						</li>`
			}
		}
	});
	$('.main>ul').html(html)
	
	
	//跳转个人中心
	$('.toUser').on('click',function(){
		var userid = $(this).attr('data-uid')
		//
	})
})
// 转时间 如 2017-11-3 18:08:15
function addZero(i){
	if (i<10) {
		i="0" + i;
	}
	return i;
}
function DateToString (format) {
	let d = new Date(Number(format))
	let date = (d.getFullYear()) + "-" + 
	           (addZero(d.getMonth() + 1)) + "-" +
	           (addZero(d.getDate())) + " " + 
	           (addZero(d.getHours())) + ":" + 
	           (addZero(d.getMinutes()));
	return date
}