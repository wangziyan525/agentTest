var appVideo = {
		queryFees:base.context + "qywx/learnVideo/findUserFee.xa", //查看积分列表
		base:'/wxqy',
		errormsg:"网络连接错误，请稍候再试"
};
appVideo.fillTemplate = function(tmpl,obj){
	var html = tmpl;
	for(var key in obj){
		var regexp = eval("/\{" + key + "\}/ig");			
		html = html.replace(regexp,obj[key]);
	}
	return html;
};
function GetQueryString(name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	   var r = window.location.search.substr(1).match(reg);
	   if (r!=null) 
		   return (r[2]); 
	   return null;
}
var wxcode = GetQueryString('code');
$(document).ready(function(){
	initJSSDK(['hideAllNonBaseMenuItem']);
    wx.ready(function() {
        wx.hideAllNonBaseMenuItem();
    });
	//获取积分列表
	queryFeeList();
	$("body").on("click",".video_page",function(e){
		top.location.replace('index.html?v='+Math.random());
	});
	$("body").on("click",".apply_page",function(e){
		top.location.replace('count.html?v='+Math.random());
	});
});

function queryFeeList(){
	$.ajax({
		url : appVideo.queryFees,
		type : 'POST',
		'content-Type':'application/json;charset=utf-8;',
		data : JSON.stringify({
			/*'userId':JSON.parse($.cookie("user")).userid*/
		}),
		beforeSend: function(xhr) {
			$.showLoading();
        },
		success : function(data) {
			if(data.retcode=="0"){
				var list = data.data;
				if(list.length>0){
					var htmls="";
					var feeTemp = $('#feeTemp').html();
					var feeToday = list[0].todayFee;
					$("#feeToday").html(feeToday);
					var allfee = 0;
					for(var i=0;i<list.length;i++) {
						var temp = {};
						temp.name= list[i].videoInfo.title;
						temp.fee=list[i].fee;
						temp.updatetime=list[i].updatetime;
						allfee += list[i].fee
						htmls += appVideo.fillTemplate(feeTemp,temp);
					}
					$(".allPointNum").html(allfee);
					$('.pointdet_con').append(htmls);
					$(".jifen").show();
				}else {
					$("#feeToday").html("0");
					$(".allPointNum").html("0");
					$(".notips").show();
					$(".zwsj").show();
					$(".jifen").hide();
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

