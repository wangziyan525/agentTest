document.write("<script src='https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js'><\/script>");

function initAgentConf(agentId,applist){
	var data = {};
	data.agentId = agentId;
	data.url = window.location.href.split('#')[0];
	$.ajax({
		url : base.context + "wechat-center/noxss/agentConf",
		type : 'POST',
		data : JSON.stringify(data),
		async : false,
		cache : false,
		contentType:'application/json;charset=utf-8;',
		success : function(data) {
			if(typeof data === "string"){
				data = $.parseJSON(data);
			}
			if (data.retcode == "success") {
				wx.ready(function () {
					var config = data.data;
					wx.agentConfig({
						corpid:base.appid,// 必填，企业号Id
						agentid: config.agentid, // 必填，公众号的唯一标识
						timestamp: config.timestamp, // 必填，生成签名的时间戳
						nonceStr: config.nonceStr, // 必填，生成签名的随机串
						signature: config.signature,// 必填，签名，见附录1
						jsApiList: applist,// 必填
						success :function (e) {
							console.log("======initAgentConf success=======")
						},
						fail : function (res) {
							alert(res.errMsg);
						}
					});
				});
			}
		},error : function(xhr,status,error){
		},complete:function(xhr){
		}
	});
}