$(function(){
	//获取视频id
	var v_id = location.href.split('?')[1]
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
				sessionStorage.setItem("userid", "0")
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
							<i id="toUpload">投稿</i>
							<a class="myname" data-uid="${data.data.id}">${data.data.name}</a>`
				$('.my').html(html)
				$('.user').css({'display':'none'})
			}
		});
	}
	
	//如果没有获取到视频id则不处理
	if(v_id==undefined){
		return
	}
	sessionStorage.setItem("videoid", v_id)
	var videoinfo = {}
	var collection = {}
	var grade = {}
	var userinfo = {}
	//获取用户信息
	$.ajax({
		type:"post",
		url:"http://localhost:2255/user/getInfo",
		data:{
			id:sessionStorage.getItem('userid')
		},
		async:false,
		success:function(data){
			userinfo = data.data
		}
	});
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
					<span class="myname" data-uid="${videoinfo.u_id}">${videoinfo.username}</span>
					<span>发布于</span>
					<span>${DateToString(videoinfo.v_time)}</span>
					<span class="toChannel" data-cid="${videoinfo.c_id}">频道： ${videoinfo.channelname}</span>
					<div class="star-bg">
						<span class="star" style="width: ${(grade.avg/10*90).toFixed(0)}px;"></span>
					</div>
					<b>${grade.avg==null?'0':grade.avg.toFixed(1)}分</b>
				</div>`
	
	$('.main-title').html(html)
	
	
	$('.toChannel').on('click',function(){
		var cid = $(this).attr('data-cid')
		//url拼接
		location.href = `http://localhost:2255/html/channelList.html?`+cid
	})
	
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
	  		id:v_id
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
				<img class="like" src="${collection.isLike?'../img/yeslike.png':'../img/nolike.png'}" />
				<span class="collectionnum">${collection.num}</span>
				<img class="paycoin" src="../img/coin.png" />
				<span class="coinnumber">${videoinfo.v_coin}</span>
			</div>
			<div class="grade">
				<h3>评分</h3>
				<span>我的评分</span>
				<div class="star-bg ${grade.isGrade?'':'toGetGrade'}">
					<span class="star" style="width: ${grade.isGrade?(grade.grade/10*90).toFixed(0):'0'}px;"></span>
				</div>
				<b class="mygrade">${grade.isGrade?grade.grade:'0'}分</b>
				${grade.isGrade?'':'<a class="sendGrade">确定</a>'}
			</div>`
	$('.right').html(html)
	
	//跳转投稿
	$('#toUpload').on('click',function(){
		location.href = `http://localhost:2255/html/contribute.html`
	})
	
	//评分效果
	$('.toGetGrade').on('mouseover',function(event){
		var num = (event.offsetX/9).toFixed(1)
		$('.toGetGrade').find('.star').css({'width':event.offsetX})
		$(this).on('mousemove',function(event){
			num = (event.offsetX/9).toFixed(1)
			$('.grade').find('.mygrade').html(num+'分')
			$('.toGetGrade').find('.star').css({'width':event.offsetX})
		})
	})
	
	//拼接回复
	var pllist = []
	var hflist = []
	$.ajax({
		type:"post",
		url:"http://localhost:2255/comment/id",
		data:{
			id:v_id,
		},
		async:false,
		success:function(data){
			pllist = data.data
		}
	});
	$.ajax({
		type:"post",
		url:"http://localhost:2255/reply/id",
		data:{
			id:v_id,
		},
		async:false,
		success:function(data){
			hflist = data.data
		}
	});
	
	var html = ''
	for(var i = 0 ; i<pllist.length ; i++){
		html += `<div class="comment-show-con clearfix"><div class="comment-show-con-img pull-left"><img src="${pllist[i].headurl}" alt=""></div> <div class="comment-show-con-list pull-left clearfix"><div class="pl-text clearfix"> <a class="comment-size-name myname" data-uid="${pllist[i].userid}" data-id="${pllist[i].userid}" data-plid="${pllist[i].id}">${pllist[i].name} : </a> <span class="my-pl-con">&nbsp;${pllist[i].content}</span> </div> <div class="date-dz"> <span class="date-dz-left pull-left comment-time">${pllist[i].time}</span> <div class="date-dz-right pull-right comment-pl-block"><a href="javascript:;" class="removeBlock" data-id="${pllist[i].userid}" data-name="${pllist[i].name}" data-content="${pllist[i].content}">举报</a> <a href="javascript:;" class="date-dz-pl pl-hf pull-left hf-con-block">回复</a></div> </div><div class="hf-list-con" style="display: block;">`
		for(var j = 0 ; j<hflist.length ; j++){
			if(pllist[i].id == hflist[j].plid){
				html += `<div class="all-pl-con"><div class="pl-text hfpl-text clearfix"><a class="comment-size-name myname" data-uid="${hflist[j].hfuserid}" data-id="${hflist[j].hfuserid}" data-plid="${pllist[i].id}">${hflist[j].hfname} : </a><span class="my-pl-con">回复<a class="atName myname" data-id="${hflist[j].pluserid}" data-uid="${hflist[j].pluserid}">@${hflist[j].plname} </a> :  ${hflist[j].hfcontent}</span></div><div class="date-dz"> <span class="date-dz-left pull-left comment-time">${hflist[j].time}</span> <div class="date-dz-right pull-right comment-pl-block"> <a href="javascript:;" class="removeBlock" data-id="${hflist[j].hfuserid}" data-name="${hflist[j].hfname}" data-content="${hflist[j].hfcontent}">举报</a> <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> </div> </div></div>`
			}
		}
		html += `</div></div> </div>`
	}
	$('.comment-show').html(html)
	
	//跳转个人中心
	$('.myname').on('click',function(){
		var userid = $(this).attr('data-uid')
		//url拼接
		location.href = `http://localhost:2255/html/usermain.html?`+userid
	})
	
	
	//发送评分
	$('.sendGrade').on('click',function(){
		if(!validateLogin()){
			return
		}
		var num = $('.mygrade').html().split('分')[0]
		$.ajax({
			type:"post",
			url:"http://localhost:2255/grade/add",
			data:{
				v_id:v_id,
				u_id:sessionStorage.getItem('userid'),
				num:num
			},
			async:false,
			success:function(data){
				$('.sendGrade').css({'display':'none'})
				//移除类名
				$('.star-bg').removeClass('toGetGrade')
				$('.mygrade').removeClass('mygrade')
			}
		});
	})
	
	//收藏&&取消收藏
	$('.like').on('click',function(){
		if(!validateLogin()){
			return
		}
		var url = ''
		if(collection.isLike){
			url = 'del'
		}else{
			url = 'add'
		}
		$.ajax({
			type:"post",
			url:"http://localhost:2255/collection/"+url,
			async:true,
			data:{
				v_id:v_id,
				u_id:sessionStorage.getItem('userid')
			},
			success:function(data){
				collection.isLike = !collection.isLike
				$('.like').attr({
					'src':collection.isLike?'../img/yeslike.png':'../img/nolike.png'
				})
				if(collection.isLike){
					$('.collectionnum').html(Number($('.collectionnum').html())+1)
				}else{
					$('.collectionnum').html(Number($('.collectionnum').html())-1)
				}
			}
		});
	})
	
	//投币
	$('.paycoin').click('click',function(){
		if(!validateLogin()){
			return
		}
		var total = userinfo.sum+userinfo.coinnum
		if(total>0){
			//将弹框文字变换
			$('#layer').find('h3').html('投币提示')
			$('#layer').find('p').html(`您的硬币剩余${userinfo.sum+userinfo.coinnum},投币将消耗一枚硬币`)
		}else{
			//将弹框文字变换
			$('#layer').find('h3').html('投币提示')
			$('#layer').find('p').html(`您的硬币不足`)
			$('#topay').css({'display':'none'})
		}
		
		showModal()
	})
	
	//确认投币
	function topay(){
		$.ajax({
			type:"post",
			url:"http://localhost:2255/video/pay",
			data:{
				id:v_id,
				u_id:sessionStorage.getItem('userid')
			},
			async:false,
			success:function(data){
				$('.coinnumber').html(Number($('.coinnumber').html())+1)
				userinfo.coinnum = userinfo.coinnum-1
			}
		});
	}
	
	//点击确认投币
	$('#topay').on('click',function(){
		if(validateLogin()){
			topay()
		}
		closeModal()
		$('#layer').find('h3').html('登录提示')
		$('#layer').find('p').html(`登录后才能发表弹幕、评论等`)
		$('#topay').css({'display':'inline-block'})
	})
	
	//点击取消关闭
	$('.no').on('click',function(){
		closeModal()
	})
	
	//关闭敏感词框框
	$('.goback').on('click',function(){
		closeFiter()
	})

	<!--textarea高度自适应-->
	$('.content').flexText();
	
	<!--点击评论创建评论条    创建评论-->
	$('.commentAll').on('click','.plBtn',function(){
		if(!validateLogin()){
			return
		}
        var myDate = new Date();
        //获取当前年
        var year=myDate.getFullYear();
        //获取当前月
        var month=myDate.getMonth()+1;
        //获取当前日
        var date=myDate.getDate();
        var h=myDate.getHours();       //获取当前小时数(0-23)
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        if(m<10) m = '0' + m;
        var s=myDate.getSeconds();
        if(s<10) s = '0' + s;
        var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
        //获取输入内容
        var oSize = $(this).siblings('.flex-text-wrap').find('.comment-input').val();
        console.log(MyFiter(oSize))
        if(!MyFiter(oSize)){
        	showFiter()
        	return
        }
        //动态创建评论模块
        oHtml = '<div class="comment-show-con clearfix"><div class="comment-show-con-img pull-left"><img src="images/header-img-comment_03.png" alt=""></div> <div class="comment-show-con-list pull-left clearfix"><div class="pl-text clearfix"> <a href="#" class="comment-size-name">David Beckham : </a> <span class="my-pl-con">&nbsp;'+ oSize +'</span> </div> <div class="date-dz"> <span class="date-dz-left pull-left comment-time">'+now+'</span> <div class="date-dz-right pull-right comment-pl-block"><a href="javascript:;" class="removeBlock">删除</a> <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a>  </div> </div><div class="hf-list-con"></div></div> </div>';
        if(oSize.replace(/(^\s*)|(\s*$)/g, "") != ''){
        	$.ajax({
        		type:"post",
        		url:"http://localhost:2255/comment/add",
        		data:{
        			v_id:v_id,
        			userid:sessionStorage.getItem('userid'),
        			time:now,
        			content:oSize
        		},
        		success:function(data){
        			console.log(data)
        			location.href = location.href
        		}
        	});
            $(this).parents('.reviewArea ').siblings('.comment-show').prepend(oHtml);
            $(this).siblings('.flex-text-wrap').find('.comment-input').prop('value','').siblings('pre').find('span').text('');
        }
    });
    
    <!--点击回复动态创建回复块   创建回复框-->
    $('.comment-show').on('click','.pl-hf',function(){
    	if(!validateLogin()){
			return
		}
    	
        //获取回复人的名字
        var fhName = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').html();
        //回复@
        var fhN = '回复@'+fhName;
        //var oInput = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.hf-con');
        var fhHtml = '<div class="hf-con pull-left"> <textarea class="content comment-input hf-input" placeholder="" onkeyup="keyUP(this)"></textarea> <a href="javascript:;" class="hf-pl">评论</a></div>';
        //显示回复
        if($(this).is('.hf-con-block')){
            $(this).parents('.date-dz-right').parents('.date-dz').append(fhHtml);
            $(this).removeClass('hf-con-block');
            $('.content').flexText();
            $(this).parents('.date-dz-right').siblings('.hf-con').find('.pre').css('padding','6px 15px');
            //console.log($(this).parents('.date-dz-right').siblings('.hf-con').find('.pre'))
            //input框自动聚焦
            $(this).parents('.date-dz-right').siblings('.hf-con').find('.hf-input').val('').focus().val(fhN);
        }else {
            $(this).addClass('hf-con-block');
            $(this).parents('.date-dz-right').siblings('.hf-con').remove();
        }
    });
    
    <!--评论回复块创建                 下面的回复-->
    $('.comment-show').on('click','.hf-pl',function(){
    	if(!validateLogin()){
			return
		}
        var oThis = $(this);
        var myDate = new Date();
        //获取当前年
        var year=myDate.getFullYear();
        //获取当前月
        var month=myDate.getMonth()+1;
        //获取当前日
        var date=myDate.getDate();
        var h=myDate.getHours();       //获取当前小时数(0-23)
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        if(m<10) m = '0' + m;
        var s=myDate.getSeconds();
        if(s<10) s = '0' + s;
        var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
        //获取输入内容
        var oHfVal = $(this).siblings('.flex-text-wrap').find('.hf-input').val();
        var oHfName = $(this).parents('.hf-con').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').html();
        var oAllVal = '回复@'+oHfName;
        
        var pluserid = $(this).parents('.hf-con').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').attr('data-id');
        var plid = $(this).parents('.hf-con').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').attr('data-plid');
        
        if(oHfVal.replace(/^ +| +$/g,'') == '' || oHfVal == oAllVal){

        }else {
            $.getJSON("../json/pl.json",function(data){
                var oAt = '';
                var oHf = '';
                $.each(data,function(n,v){
                    delete v.hfContent;
                    delete v.atName;
                    var arr;
                    var ohfNameArr;
                    if(oHfVal.indexOf("@") == -1){
                        data['atName'] = '';
                        data['hfContent'] = oHfVal;
                    }else {
                        arr = oHfVal.split(':');
                        ohfNameArr = arr[0].split('@');
                        data['hfContent'] = arr[1];
                        data['atName'] = ohfNameArr[1];
                    }

                    if(data.atName == ''){
                        oAt = data.hfContent;
                    }else {
                        oAt = '回复<a href="#" class="atName">@'+data.atName+'</a> : '+data.hfContent;
                    }
                    oHf = data.hfName;
                    console.log(data.hfContent,'data.hfContent')
                });

//              var oHtml = '<div class="all-pl-con"><div class="pl-text hfpl-text clearfix"><a href="#" class="comment-size-name">${userinfo.chc} : </a><span class="my-pl-con">'+oAt+'</span></div><div class="date-dz"> <span class="date-dz-left pull-left comment-time">'+now+'</span> <div class="date-dz-right pull-right comment-pl-block"> <a href="javascript:;" class="removeBlock">举报</a> <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> </div> </div></div>';
//              oThis.parents('.hf-con').parents('.comment-show-con-list').find('.hf-list-con').css('display','block').prepend(oHtml) && oThis.parents('.hf-con').siblings('.date-dz-right').find('.pl-hf').addClass('hf-con-block') && oThis.parents('.hf-con').remove();
                if(!MyFiter(data.hfContent)){
		        	showFiter()
		        	return
		        }
                $.ajax({
                	type:"post",
                	url:"http://localhost:2255/reply/add",
                	data:{
                		plid:plid,
                		hfuserid:sessionStorage.getItem('userid'),
                		pluserid:pluserid,
                		hfcontent:data.hfContent,
                		time:now,
                		v_id:v_id
                	},
                	success:function(data){
                		console.log(0000)
                		location.href = location.href
                		
                		/*
                			注意一定要改我的名字    加上id   不然再次回复会报错的 
                			骚操作处理   不加了
                		*/
                	}
                });
            });
        }
    });
    
    //举报
    $('.removeBlock').on('click',function(){
    	if(!validateLogin()){
			return
		}
    	var id = $(this).attr('data-id')
    	var content = $(this).attr('data-content')
    	$('#inform').find('.p1').html(`您将举报${$(this).attr('data-name')}`)
    	$('#inform').find('.p1').attr({'data-id':id})
    	$('#inform').find('.p2').html(`举报内容:${$(this).attr('data-content')}`)
    	$('#inform').find('.p2').attr({'data-content':content})
    	$('#muhu').css({'display':'block'})
		$('#inform').css({'display':'block'})
    })
    
    //取消举报
    $('.noinform').on('click',function(){
    	$('#muhu').css({'display':'none'})
		$('#inform').css({'display':'none'})
    })
    
    //发送举报请求
    $('#yesinform').on('click',function(){
    	console.log(0)
    	if($('.informtxt').val()==''){
    		return
    	}
    	$.ajax({
			type:"post",
			url:"http://localhost:2255/inform/add",
			data:{
				u_id:$('#inform').find('.p1').attr('data-id'),
				informer:sessionStorage.getItem('userid'),
				reason:$('.informtxt').val(),
				content:$('#inform').find('.p2').attr('data-content')
			},
			async:false,
			success:function(data){
				$('.informtxt').val('')
			}
		});
		$('#muhu').css({'display':'none'})
		$('#inform').css({'display':'none'})
    })
    
    //如果是vip视频则进行对用户身份判断  如果不是会员则将视频源替换成默认视频
    if(videoinfo.v_status==3){
    	//判断用户是否为会员
    	$.ajax({
			type:"post",
			url:"http://localhost:2255/user/isVip",
			data:{
				u_id:sessionStorage.getItem('userid')
			},
			async:false,
			success:function(data){
				//如果不是会员  则替换视频内容
				if(data=='no'){
					$('#muhu').css({'display':'block'})
					$('#vipnotic').css({'display':'block'})
					$('video').attr({'src':''})
				}
			}
		})
    }
    
    $('.novip').on('click',function(){
    	location.href = `http://localhost:2255`
    })
    
})
//敏感词过滤
function MyFiter(str){
	var fiter = []
	$.ajax({
		type:"get",
		url:"../json/fiter.json",
		async:false,
		success:function(data){
			fiter = data.data
		}
	})
	for(var i in fiter){
		if(str.indexOf(fiter[i])>=0){
			return false
		}
	}
	console.log('allpass')
	return true
}


<!--textarea限制字数-->
function keyUP(t){
    var len = $(t).val().length;
    if(len > 139){
        $(t).val($(t).val().substring(0,140));
    }
}
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
	$('#fiter').css({
		top:top+150+'px'
	})
	$('#inform').css({
		top:top+150+'px'
	})
})
//登录验证
function validateLogin(){
	if(sessionStorage.getItem('userid')==undefined || sessionStorage.getItem('userid')==0){
		var top = $(window).scrollTop() 
		$('#muhu').css({
			'display':'block',
			'top':top+'px',
			'bottom':'0'
		})
		$('#layer').css({
			'display':'block',
			top:top+150+'px'
		})
		
		sessionStorage.setItem("userid", "0")
		return false
	}else{
		return true
	}
}
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

//关闭敏感词模态框
function closeFiter(){
	$('#muhu').css({'display':'none'})
	$('#fiter').css({'display':'none'})
}
//打开敏感词模态框
function showFiter(){
	$('#muhu').css({'display':'block'})
	$('#fiter').css({'display':'block'})
}
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