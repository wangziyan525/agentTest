var appMessage={
	saveData:base.context + "/communications/certificate/collect/saveData", //保存
	findType:base.context + "/communications/certificate/collect/findType", //查询
	findList:base.context + "/communications/certificate/collect/findList", //查询
	getPic:base.context + "/getPicStream", //获取图片
	flag:"",
	errormsg:"网络连接错误，请稍候再试",
	videoTypelist:[],
	typeid:"",
	scopeid:''
}

$(function(){
	initJSSDK(['hideAllNonBaseMenuItem']);
	wx.ready(function() {
		wx.hideAllNonBaseMenuItem();
	});
	appMessage.flag=GetQueryString('flag');
	queryVideoType();
	getImgcode();
	window.addEventListener('resize',function () {
		if(document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA'){
			if(/Android/gi.test(navigator.userAgent)){
				setTimeout(()=>{
					document.activeElement.scrollIntoView();
				},100);
			}else {
				document.body.scrollTop = document.body.scrollHeight / 8
			}
		}
	})
	function getImgcode(){
		$("#imgcodeImg").attr("src",appMessage.getPic+"?t="+new Date().getTime());
	}

	$("#imgcodeImg").on("click",function(){
		getImgcode();
	})

	if(appMessage.flag=="send"){
		$("#tab22").addClass("bar__item--on");
		$("#tab11").removeClass("bar__item--on");
		$("#tab2").show();
		$("#tab1").hide();
		$("#tab3").hide();
		queryList();
		clearInfo();
	}else{
		$("#tab11").addClass("bar__item--on");
		$("#tab22").removeClass("bar__item--on");
		$("#tab2").hide();
		$("#tab1").show();
		$("#tab3").hide();
	}

	$("#biaoti1").on("click",function(){
		$("#biaoti1").addClass("apply-xuanzhong");
		$("#biaoti1").removeClass("apply-weixuan");
		$("#biaoti2").addClass("apply-weixuan");
		$("#biaoti2").removeClass("apply-xuanzhong");
		$("#biaoti3").addClass("apply-weixuan");
		$("#biaoti3").removeClass("apply-xuanzhong");
		var auditStatus = ''
		queryList(auditStatus);
	})
	$("#biaoti2").on("click",function(){
		$("#biaoti2").addClass("apply-xuanzhong");
		$("#biaoti2").removeClass("apply-weixuan");
		$("#biaoti1").addClass("apply-weixuan");
		$("#biaoti1").removeClass("apply-xuanzhong");
		$("#biaoti3").addClass("apply-weixuan");
		$("#biaoti3").removeClass("apply-xuanzhong");
		var auditStatus = -1
		queryList(auditStatus);
	})
	$("#biaoti3").on("click",function(){
		$("#biaoti3").addClass("apply-xuanzhong");
		$("#biaoti3").removeClass("apply-weixuan");
		$("#biaoti2").addClass("apply-weixuan");
		$("#biaoti2").removeClass("apply-xuanzhong");
		$("#biaoti1").addClass("apply-weixuan");
		$("#biaoti1").removeClass("apply-xuanzhong");
		var auditStatus = 0
		queryList(auditStatus);
	})
	$(".navbar").on("click",".navbar__item",function(){
		$(this).addClass("bar__item--on");
		$(this).siblings().removeClass("bar__item--on");
		var tab=$(this).attr("data-currentTab");
		if(tab=="tab1"){
			$("#tab1").show();
			$("#tab2").hide();
			$("#tab3").hide();
			clearInfo();
		}else if(tab=="tab2"){
			$("#tab2").show();
			$("#tab1").hide();
			$("#tab3").hide();
			queryList();
		}
	})

	$("#range").on("click",function(){
		$("#tab4").show();
	});
	$("#videoType").on("click",function(){
		$("#tab5").show();
	});
	$("#range0").on("click",function(){
		$("#tab4").hide();
		$("#range").val('全行可见');
		appMessage.scopeid = 0
		$("#range1 .range-img").hide()
		$("#range0 .range-img").show()
	});
	$("#range1").on("click",function(){
		$("#tab4").hide();
		$("#range").val('白名单');
		appMessage.scopeid = 1
		$("#range0 .range-img").hide()
		$("#range1 .range-img").show()
	});
	$("body").on("click",".video_page",function(e){
		top.location.replace('index.html?v='+Math.random());
	});

	$("body").on("click",".fee_page",function(e){
		top.location.replace('feelist.html?v='+Math.random());
	});

	$("#describe").on("input",function(){
		var num1=$(this).val().length;
		$("#currentNum1").text(num1);
	})

	$("#tab1").on("click",".butApply",function(){
		submit();
	})
	$("#warnTo").on("click",function(){
		$("#tab3").show();
		$("#tab2").hide();
		// $("#tab1").hide();
		$(".navbar").hide();
	})
	$("#tab3").on("click",".butApply",function(){
		// $("#tab1").show();
		$("#tab3").hide();
		$("#tab2").hide();
		$(".navbar").show();
	})


	$('input,textarea').on('blur',function(){
		setTimeout(function(){
			/*var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight-1,0),1000); */
			document.body.scrollTop = document.body.scrollTop
		},100);
	});


	/*$("#beizhu").on("input",function(){
		var num1=$(this).val().length;
		$("#currentNum2").text(num1);
	})	*/


})
var wxcode = GetQueryString('code');
function queryVideoType(){
	$.ajax({
		url : appMessage.findType+"?code="+wxcode,
		type : 'POST',
		beforeSend: function(xhr) {
			//$.showLoading();
		},
		success : function(data) {
			if(data.retcode=="0"){
				var str="";
				var list =data.data;
				appMessage.videoTypelist = data.data
				$('#tab5').html("");
				if(list.length>0){
					  str += "<div class=\"range-list\" style='height: 50%; overflow-y: auto;'>"+"<div class=\"range-biaoti\">选择类型</div>";
					for (var i=0;i<list.length;i++){
						// var id = list[i].id
						// var chinesename = list[i].chinesename
						str+=`<div class=\"range-test\" onclick=\"videoTypeon(${list[i].id})\">`+list[i].chinesename+`<img id=${list[i].id} src=\"./image/xuanxzhe.png\" class=\"range-img\"></div>`
					}
				}else{
					// str+="<option value=''>"+暂无可选类型+"</option>" {};
				}
				htmls = str +"<div style=\"width: 100%; height: 4px; background: #F5F6F7;\"></div>" + "<div class=\"range-quxiao\" onclick=\"quxiao()\"> 取消</div></div>"
				$('#tab5').html(htmls);
			}else{
				if(data.retcode!=-88){
					$.alert(data.retmsg);
				}
			}
		}
		,error : function(xhr,status,error){
			//$.hideLoading();
		}
		,complete:function(xhr){
			//$.hideLoading();
		}
	})
}
function checkInfo(){
	var flag=true;
	var title=$("#title").val();
	var videoType=$("#videoType").val();
	var range=$("#range").val();
	var describe=$("#describe").val();
	var describeLength=$("#describe").val().length;
	/*var beizhu=$("#beizhu").val();*/
	if(!title){
		$.alert("请输入上传视频标题");
		flag=false;
		return flag;
	}
	if(!videoType){
		$.alert("请选择视频类型");
		flag=false;
		return flag;
	}
	if(!range){
		$.alert("请选择视频可见范围");
		flag=false;
		return flag;
	}
	if(!describe){
		$.alert("请输入视频信息");
		flag=false;
		return flag;
	}
	if(describeLength<10){
		$.alert("视频信息最少10个字");
		flag=false;
		return flag;
	}
	/*if(!beizhu){
		alert("请输入备注信息");
		flag=false;
		return flag;
	}*/
	return flag
}
function clearInfo(){
	$("#title").val("");
	$("#videoType").val("");
	$("#range").val("");
	$("#describe").val("");
	/*$("#beizhu").val("");*/
	$("#currentNum1").text("0");
	/*$("#currentNum2").text("0");*/
}
function submit(){
	if(checkInfo()){
		$.ajax({
			url : appMessage.saveData,
			type : 'POST',
			data : JSON.stringify({
				/*'userId':JSON.parse($.cookie("user")).userid,*/
				'title':$("#title").val(),
				'typeid':appMessage.typeid,
				'scope':appMessage.scopeid,//0为全行开发 1为白名单开放
				'describe':$("#describe").val(),
				'validateCode':$("#validateCode").val()
				/*'remark':$("#beizhu").val()*/
			}),
			beforeSend: function(xhr) {
				$.showLoading();
			},
			success : function(data) {
				if(data.retcode=="0"){
					$("#tab22").addClass("bar__item--on");
					$("#tab11").removeClass("bar__item--on");
					$("#tab2").show();
					$("#tab1").hide();
					$("#tab3").hide();
					queryList();
					clearInfo();
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

}
function videoTypeon(id) {
	console.log(id,'id')
	for (var i=0;i<appMessage.videoTypelist.length;i++){
		if( id == appMessage.videoTypelist[i].id ){
			$(`#${appMessage.videoTypelist[i].id}.range-img`).show();
			appMessage.typeid = id
			$("#videoType").val(appMessage.videoTypelist[i].chinesename);
		}else {
			$(`#${appMessage.videoTypelist[i].id}.range-img`).hide()
		}
	}
	$("#tab5").hide();
}
function quxiao(){
	$("#tab4").hide();
	$("#tab5").hide();
}
function queryList(auditStatus){
	$.ajax({
		url : appMessage.findList+"?code="+wxcode,
		type : 'POST',
		data : JSON.stringify({
			'auditStatus':auditStatus
			/*'userId':JSON.parse($.cookie("user")).userid*/
		}),
		beforeSend: function(xhr) {
			$.showLoading();
		},
		success : function(data) {
			if(data.retcode=="0"){
				var list = data.data;
				$('#listPart').html("");
				$(".zwsj").hide();
				$(".notips").hide();
				if(list.length>0){
					var htmls="";
					var listTemp = $('#listTemp').html();
					for(var i=0;i<list.length;i++) {
						var temp = {};
						if(list[i].auditstatus==-1){
							temp.auditstatus= "处理中";
							temp.status= "#f59224";
						}else if(list[i].auditstatus==0){
							temp.auditstatus= "处理完成";
							temp.status= "#5cd3a8";
						}
						if(list[i].scope==0){
							temp.scope="全行"
						}else if(list[i].scope==1){
							temp.scope="白名单"
						}
						temp.createtime=list[i].createtime;
						temp.title=list[i].title;
						temp.chinesename=list[i].type.chinesename;
						temp.describe = list[i].describe;
						/*temp.remark = list[i].remark;*/
						htmls += appMessage.fillTemplate(listTemp,temp);
					}
					$('#listPart').html(htmls);
				}else {
					$(".zwsj").show();
					$(".notips").show();
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
appMessage.fillTemplate = function(tmpl,obj){
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
