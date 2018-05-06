$(function(){
	//登录
	$('#login').click(function(){
		//判断是否为空
		if($('#phone').val()==''){
			$('#notic').html('请输入手机号码').css({'display':'block'})
			return
		}
		if($('#pwd').val()==''){
			$('#notic').html('请输入密码').css({'display':'block'})
			return
		}
		$.ajax({
			type:'post',
			url:'http://localhost:2255/user/login',
			data:{
				phone:$('#phone').val(),
				password:$('#pwd').val()
			},
			success:function(data){
				if(data.msg=='err'){
					$('#notic').html('账号或密码错误').css({'display':'block'})
				}else if(data.msg=='success'){
					sessionStorage.setItem('id',data.id)
					location.href = 'http://localhost:2255/'
				}else{
					$('#layer').find('p').html('账号封禁到'+DateToString(data.time))
					$('#muhu').css({'display':'block'})
					$('#layer').css({'display':'block'})
				}
			}
		})
	})
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