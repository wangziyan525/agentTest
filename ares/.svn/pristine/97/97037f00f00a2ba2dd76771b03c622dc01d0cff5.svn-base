document.write("<script src='https://res.wx.qq.com/open/js/jweixin-1.6.0.js'><\/script>");

let baseContext = "/wxqy/WECHAT";
var app = {};
app.fillTemplate = function(tmpl,obj){
	var html = tmpl;
	for(var key in obj){
		var regexp = eval("/\{" + key + "\}/ig");			
		html = html.replace(regexp,obj[key]);
	}
	return html;
};
function initJSSDK(applist){
	$.ajax({
		url : baseContext + "/WXJSSDK/sign",   
		type : 'POST',
		data : {
			"url" : encodeURIComponent(window.location.href.split('#')[0])
		},
		async : false,
		cache : false,
		success : function(data, textStatus,xhr,status) {
			if(typeof data === "string"){
				data = $.parseJSON(data);
			} 
			if (data.retcode == "0") {
			    console.log("=======initJSSDK=========")
				app.json = JSON.parse(data.json);
				wx.config({
					beta:true,
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: app.json.appId, // 必填，公众号的唯一标识
				    timestamp: app.json.timestamp, // 必填，生成签名的时间戳
				    nonceStr: app.json.nonceStr, // 必填，生成签名的随机串
				    signature: app.json.signature,// 必填，签名，见附录1
				    jsApiList: applist // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
			}
		},error : function(xhr,status,error){
		},complete:function(xhr){
		}
	});
}
function initGroupJSSDK(){
	$.ajax({
		url : baseContext + "/WXJSSDK/groupsign",   
		type : 'POST',
		data : {
			"url" : encodeURIComponent(window.location.href.split('#')[0])
		},
		async : false,
		cache : false,
		success : function(data, textStatus,xhr,status) {
			if(typeof data === "string"){
				data = $.parseJSON(data);
			} 
			if (data.retcode == "0") {
				app.groupjson = JSON.parse(data.json);
			}
		},error : function(xhr,status,error){
		},complete:function(xhr){
		}
	});
}