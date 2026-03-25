

function getuserCode(){
    $.ajax({
        url : base.context + "provider/getUserInfoBySession.xa",
        type : 'POST',
        data :JSON.stringify({}),
        async : true,
        cache : false,
        success : function(data,textStatus,request) {

            //会话处理
            var setCookie = request.getResponseHeader('Access-Control-Expose-Headers');
            if(setCookie && setCookie!= ''){
                setCookie = setCookie.split("=")[1].replace(';','');
                $.cookie("SESSION", setCookie , { path: '/' });
                console.log(setCookie);
            };
            
            if (typeof(data) == 'string') {
                data = JSON.parse(data);
            }
            if (data.retcode == 'success') {
                $.cookie("user", JSON.stringify(data.data) , { path: '/' });
                getUserFinish();
            }else {
                var fromurl=location.href;
                var code = GetQueryString("code");
                if(code==null){
                    var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+base.appid+'&redirect_uri='+encodeURIComponent(fromurl)+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
                    top.location.replace(url);
                }else{
                    getUserFinish(code);
                }
            }
        },error : function(xhr,status,error){
            top.location.replace(location.href.split(base.prefix)[0]+base.prefix+"about/common_error.html");
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

getuserCode();