$(function(){
	//假装有用户
	 sessionStorage.setItem("userid", "13");
	//获取视频id
	var v_id = location.href.split('?')[1]
	
	var videoinfo = {}
	var collection = {}
	var grade = {}
	//获取视频信息
	$.ajax({
		type:"post",
		url:"http://localhost:2255/video/id",
		data:{
			id:v_id
		},
		async:false,
		success:function(data){
			videoinfo = data
		}
	});
	
	//获取收藏信息
	$.ajax({
		type:"post",
		url:"http://localhost:2255/collection/id",
		data:{
			v_id:v_id,
			u_id:sessionStorage.getItem('userid')
		},
		async:false,
		success:function(data){
			collection = data
		}
	});
	
	//获取评分信息
	$.ajax({
		type:"post",
		url:"http://localhost:2255/grade/id",
		data:{
			v_id:v_id,
			u_id:sessionStorage.getItem('userid')
		},
		async:false,
		success:function(data){
			grade = data
		}
	});
	
	//拼接头部
	var html = `<h3>${videoinfo.v_name}</h3>
				<div class="main-user">
					<span>${videoinfo.username}</span>
					<span>发布于</span>
					<span>${DateToString(videoinfo.v_time)}</span>
					<span>频道： ${videoinfo.channelname}</span>
					<div class="star-bg">
						<span class="star" style="width: ${(grade.avg/10*90).toFixed(0)}px;"></span>
					</div>
					<b>${grade.avg==null?'0':grade.avg.toFixed(1)}分</b>
				</div>`
	
	$('.main-title').html(html)
	
	//载入视频源和弹幕
	$("#danmup").DanmuPlayer({
	  src:videoinfo.v_url,       //视频源
	  width:800,			//视频宽度
	  height:440,			//视频高度
	  urlToPostDanmu:"http://localhost:2255/danmu/save",
	 
	});
	var dandan = []
	$.ajax({
	  	type:"post",
	  	url:"http://localhost:2255/danmu/id",
	  	data:{
	  		id:sessionStorage.getItem('videoid')
	  	},
	  	async:false,
	  	success:function(data){
	  		for(var i = 0 ; i<data.length ; i++){
	  			dandan[i] = JSON.parse(data[i].danmu)
	  		}
	  		$("#danmup .danmu-div").danmu("addDanmu",dandan)
	  	}
	});
	
	//拼接右边部分的简介、收藏、硬币
	html = `<div class="brief">
				<h3>简介</h3>
				<p>${videoinfo.v_brief}</p>
			</div>
			<div class="num">
				<img src="${collection.isLike?'../img/nolike.png':'../img/yeslike.png'}" />
				<span>${collection.num}</span>
				<img src="../img/coin.png" />
				<span>${videoinfo.v_coin}</span>
			</div>
			<div class="grade">
				<h3>评分</h3>
				<span>我的评分</span>
				<div class="star-bg toGetGrade">
					<span class="star" style="width: ${grade.isGrade?(grade.grade/10*90).toFixed(0):'0'}px;"></span>
				</div>
				<b>${grade.isGrade?grade.grade:'0'}分</b>
				${grade.isGrade?'':'<a>确定</a>'}
			</div>`
	$('.right').html(html)
})
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