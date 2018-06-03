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
	}else{
		location.href = `http://localhost:2255/`
	}
	
	var userinfo = {}
	//获取查看的用户信息
	$.ajax({
		type:"post",
		url:"http://localhost:2255/user/getInfo",
		data:{
			id:userid
		},
		async:false,
		success:function(data){
			userinfo = data.data
		}
	});
	
	var leval = []
	var myleval = 1
	var mytitle  = ''
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
					mytitle = data[i].title
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
						<span>${mytitle}</span>
						<p>${userinfo.signname==null?'':userinfo.signname}</p>
					</div>
				</div>`
	$('.main').html(html)
	//获取所有频道分类
	$.ajax({
		type:"post",
		url:"http://localhost:2255/channel/sort",
		async:false,
		success:function(data){
			var html = ''
			for(var i in data){
				html += `<option value="${data[i].c_id}">${data[i].name}</option>`
			}
			$('.channelcheck').html(html)
		}
	});
	
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
	
	//选中头像
	$('#file').on('change',function(event){
		var url = URL.createObjectURL(event.target.files[0])
		$('.myhead').attr({'src':url}).css({'display':'block'})
		$('.headclear').css({'display':'inline-block'})
	})
	
	//取消头像
	$('.headclear').on('click',function(){
		$('#file').val('')
		$('.myhead').attr({'src':''}).css({'display':'none'})
		$(this).css({'display':'none'})
	})
	
	//选中视频
	$('#videofile').on('change',function(event){
		var url = URL.createObjectURL(event.target.files[0])
		$('.myvideo').attr({'src':url}).css({'display':'block'})
		$('.headbuttom').css({'display':'inline-block'})
	})
	
	//取消视频
	$('.headbuttom').on('click',function(){
		$('#videofile').val('')
		$('.myvideo').attr({'src':''}).css({'display':'none'})
		$(this).css({'display':'none'})
	})
	
	//上传进度
	function uploadProgress(evt) {
        if (evt.lengthComputable) {
          var percentComplete = Math.round(evt.loaded * 100 / evt.total);
          document.getElementById('num').innerHTML = percentComplete.toString() + '%';
          //修改弹窗的进度
          $('#fiter').find('h3').html('已上传'+percentComplete.toString()+'%')
        }
    }
	console.log()
	
	//上传标志
	var uploadFlag = false
	$('.upload').on('click',function(){
		
		//去除前后空格
		$('.v_name').val($('.v_name').val().trim())
		$('.v_brief').val($('.v_brief').val().trim())
		//空值判断
		if($('#file').val()=='' || $('#videofile').val()==''){
			showNotic()
			return
		}
		if($('.v_name').val()=='' || $('.v_brief').val()==''){
			showNotic()
			return
		}
		
		//开始上传  &&  应参影藏按钮
		$('#muhu').css({'display':'block'})
		$('#fiter').css({'display':'block'}).find('a').css({'display':'none'})
		
		var fd = new FormData();
        fd.append("videofile", document.getElementById('videofile').files[0]);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.open("POST", "http://localhost:2255/upload");
        xhr.send(fd);
        xhr.onreadystatechange = function(data){
			//ajax请求成功以及服务器请求成功
			if(xhr.readyState==4&&xhr.status==200){
				var r = xhr.responseText;
				var headurl = ''
				//上传文件获取路径
				$.ajax({
					url: "http://localhost:2255/upload",
		            type: "POST",
		            processData:false,
		            contentType:false,
		            cache:false,
		            async:false,
		            data: new FormData($("#uploadhead")[0]),
		            success:function(data){
		            	if(data === 'err'){
		            		console.log('图片上传失败，请重新上传')
		            	}else{
		            		headurl = 'http://localhost:2255/uploads/' + data
		            	}
		            }
				});
				console.log(r)
				console.log(headurl)
				//新增视频
				$.ajax({
					type:"post",
					url:"http://localhost:2255/video/add",
					data:{
						v_name:$('.v_name').val(),
						v_url:'http://localhost:2255/uploads/'+r,
						v_img:headurl,
						c_id:$('.channelcheck').val(),
						u_id:sessionStorage.getItem("userid"),
						v_brief:$('.v_brief').val(),
					},
					async:false,
					success:function(data){
						//改变弹窗符号
						changeSymbol()
						//显示两个按钮
						$('#fiter').find('a').css({'display':'inline-block'})
					}
				});
			}
		}
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
		$('#fiter').css({
			top:top+150+'px'
		})
	})
	
	//关闭输入提示框
	$('#btn').on('click',function(){
		closeNotic()
	})
	
	//继续上传
	$('.continueUpload').on('click',function(){
		location.href = location.href
	})
	
	//返回主页
	$('.goback').on('click',function(){
		var uid = sessionStorage.getItem("userid")
		location.href = `http://localhost:2255/html/usermain.html?` + uid
	})
})
//打开输入提示模态框
function showNotic(){
	$('#muhu').css({'display':'block'})
	$('#layer').css({'display':'block'})
}
//关闭输入提示模态框
function closeNotic(){
	$('#muhu').css({'display':'none'})
	$('#layer').css({'display':'none'})
}


//将感叹号变为勾勾   && 变信息
function changeSymbol(){
	$('#fiter').find('i').css({
		'display': 'inline-block',
		'width': '88px',
		'height': '88px',
		'background': '#fff',
		'border': '4px solid #edf8e7',
		'border-radius': '50%',
		'margin-top': '35px'
	})
	$('#fiter').find('em').css({
		'height': '5px',
		'width': '25px',
		'position': 'absolute',
		'background': '#a5dc86',
		'border-radius': '2px',
		'left': '50%',
		'margin-left': '-26px',
		'top': '89px',
		'transform': 'rotate(45deg)'
	})
	$('#fiter').find('b').css({
		'height': '5px',
		'width': '47px',
		'position': 'absolute',
		'background': '#a5dc86',
		'border-radius': '2px',
		'left': '50%',
		'margin-left': '-13px',
		'top': '83px',
		'transform': 'rotate(-45deg)'
	})
	
	$('#fiter').find('h3').html('投稿成功')
	$('#fiter').find('p').html('您已成功投稿，管理员审核后可上线')
}
