$(function(){
	sessionStorage.setItem("userid", "20");
	
	//获取用户id
	var u_id = sessionStorage.getItem("userid")
	if(u_id==undefined ||u_id==0){
		return
	}
	var userinfo = {}
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
        }
    }
	console.log()
	$('.upload').on('click',function(){
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
						console.log(data)
					}
				});
			}
		}
	})
})
