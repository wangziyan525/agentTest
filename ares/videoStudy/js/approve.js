var appMessage={
		approve:base.context + "/communications/certificate/collect/approve", //审核
		findList:base.context + "/communications/certificate/collect/findById", //查询
		id:"",
		errormsg:"网络连接错误，请稍候再试"
}

$(function(){
	initJSSDK(['hideAllNonBaseMenuItem']);
    wx.ready(function() {
        wx.hideAllNonBaseMenuItem();
    });
	appMessage.id=GetQueryString('id');
	queryInfo();
	$("#refusePart").on("click",function(){
		submitForm();
	})
})
var wxcode = GetQueryString('code');
function queryInfo(){
	$.ajax({
		url : appMessage.findList+"?code="+wxcode,
		type : 'POST',
		data : JSON.stringify({
			'id':appMessage.id
		}),
		beforeSend: function(xhr) {
			$.showLoading();
        },
		success : function(data) {
			if(data.retcode=="0"){
				var list = data.data;
				if(list){
					$("#createtime").text(list.createtime);
					if(list.auditstatus==-1){
						$("#auditstatus").text("待处理");
						$("#auditstatus").css("color","#f59224");
						$("#refusePart").show();
					}else if(list.auditstatus==0){
						$("#auditstatus").text("处理完成");
						$("#auditstatus").css("color","#5cd3a8");
						$("#refusePart").hide();
					}
					$("#name").text(list.name);
					$("#depName").text(list.depName);
					$("#telephone").text(list.telephone);
					$("#title").text(list.title);
					$("#chinesename").text(list.type.chinesename);
					$("#describe").text(list.describe);
					/*$("#remark").text(list.remark);*/
					if(list.scope==0){
						$("#scope").text("全行");
					}else if(list.scope==1){
						$("#scope").text("白名单");
					}
				}else{
					$.alert("该视频需求不存在");
				}
				
				
			}else{
				if(data.retcode!=-88){
					$.alert(data.retmsg);
				}
			}
		}
		,error : function(xhr,status,error){
			$.hideLoading();
		}
		,complete:function(xhr){
			$.hideLoading();
		}
	}); 
}
function submitForm(){
	$.ajax({
		url : appMessage.approve+"?code="+wxcode,
		type : 'POST',
		data : JSON.stringify({
			/*'userId':JSON.parse($.cookie("user")).userid,*/
			'id':appMessage.id
		}),
		beforeSend: function(xhr) {
			//$.showLoading();
        },
		success : function(data) {
			if(data.retcode==0){
			   $.alert("您已处理成功");
			   queryInfo();
			}else{
				if(data.retcode!=-88){
					$.alert(data.retmsg);
				}
			}
		}
		,error : function(xhr,status,error){
			$.hideLoading();
		}
		,complete:function(xhr){
			$.hideLoading();
		}
	})
}

function GetQueryString(name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	   var r = window.location.search.substr(1).match(reg);
	   if (r!=null) 
		   return (r[2]); 
	   return null;
	}