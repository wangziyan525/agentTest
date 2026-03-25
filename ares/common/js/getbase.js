//var token = localStorage.getItem("X-Token");
/*var formUrl=location.href;
var code = GetQueryString("code");
if(code==null){
    var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+base.appid+'&redirect_uri='+encodeURIComponent(formUrl)+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
    top.location.replace(url);
}else{
    getUserInfo(code);
}*/

$.ajax({
    url : base.context + "provider/getUserInfoBySession.xa",
    type : 'POST',
    data :JSON.stringify({}),
    async : true,
    cache : false,
    success : function(data) {
        debugger
        if (typeof(data) == 'string') {
            data = JSON.parse(data);
        }
        if (data.retcode == 0) {
            $.cookie("user", JSON.stringify(data.user) , { path: '/' });
            getUserFinish();
        }else {
            var fromurl=location.href;
            var code = GetQueryString("code");
            if(code==null){
                var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+base.appid+'&redirect_uri='+encodeURIComponent(fromurl)+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
                top.location.replace(url);
            }else{
                getUserInfo(code);
            }
        }
    },error : function(xhr,status,error){
        top.location.replace(location.href.split(base.prefix)[0]+base.prefix+"about/common_error.html");
    }
});


//获取用户信息
function getUserInfo(code){
	$.ajax({
		url : base.context + "provider/getUserinfo.xa",
		type : 'POST',
		data :JSON.stringify({"code":code}),
		async : true,
        cache : false,
        dataType:"json",
        contentType:'application/json;charset=utf-8;',
		success : function(data,textStatus,request) {
			if (typeof(data) == 'string') {
				data = JSON.parse(data);
			}
			if(data.retcode == 'success'){
                var setCookie = request.getResponseHeader('Access-Control-Expose-Headers');
                setCookie = setCookie.split("=")[1].replace(';','');
                $.cookie("SESSION", setCookie , { path: '/' });
                let user =  data.data;
                delete user.token;
                $.cookie("user", JSON.stringify(user) , { path: '/' });
                getUserFinish();
			}else if (data.retcode == '-11') {
                top.location.replace("https://weixin.xacbank.com.cn/wxqy/about/common_error.html");
            } else {
                $.alert('',data.retmsg,function(){
                    window.close();
                });
			}
		},error : function(xhr,status,error){
			top.location.replace("https://weixin.xacbank.com.cn/wxqy/about/common_error.html");
		}
	});
}

//url获取参数
function GetQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null)
	   return (r[2]);
   return null;
}
