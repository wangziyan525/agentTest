var appVideo = {
	findType:base.context + "qywx/learnVideo/findTypeList.xa", //查询
	queryList:base.context + "qywx/learnVideo/findList.xa", // 查询视频列表
	initVideoRecord:base.context + "qywx/learnVideo/saveDemandVolume.xa", // 点击观看
	updateVideoFee:base.context + "qywx/learnVideo/saveFee.xa", // 完成观看任务
	queryFees:base.context + "qywx/learnVideo/findUserFee.xa", //查看积分列表
	lookPepos:base.context + "qywx/learnVideo/getVideoLookLogList.xa", //观看人数
	base:'/wxqy',
	initFlag:false,
	saveCacheFlag:true,
	keyWord:"",
	id:"",
	content:'',
	recommend:"",
	errormsg:"网络连接错误，请稍候再试",
	secondVideoType:"1"
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
	console.log(window.location.href);
	initJSSDK();
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId : app.json.appId, // 必填，公众号的唯一标识
		timestamp: app.json.timestamp, // 必填，生成签名的时间戳
		nonceStr: app.json.nonceStr, // 必填，生成签名的随机串
		signature: app.json.signature,// 必填，签名，见附录1
		jsApiList: ['chooseImage','uploadImage','previewImage','onMenuShareAppMessage','hideMenuItems','showMenuItems','hideOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	wx.ready(function(){
		wx.hideMenuItems({
			menuList: ['menuItem:copyUrl','menuItem:share:timeline','menuItem:share:qq','menuItem:share:weiboApp','menuItem:openWithSafari','menuItem:favorite','menuItem:share:facebook','menuItem:share:QZone','menuItem:share:email','menuItem:readMode'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		});
		//var imgurl_share =  window.location.href.split("/wxqy/")[0].split("/crystal/")[0]+appCrystal.sharetimelineimg;
	});
	//判断是否分享进入页面，如果是分享则直接跳转至分享视频位置
	let type = GetQueryStrings('type');
	if (type == null || type == undefined || type == '') {
		queryVideoType();
	}else{
		appVideo.id = type;
		appVideo.content = decodeURIComponent(GetQueryStrings('content'));
		appVideo.secondVideoType = GetQueryStrings('videoType');
		queryVideoList();
		$("#videoPage").show();
		$("#indexPage").hide();
		if(appVideo.secondVideoType=='1'){
			$('.qiehuan>span:first-child').attr('class','active');
			$('.qiehuan>span:first-child').siblings().attr('class','');
		}else if(appVideo.secondVideoType=='2'){
			$('.qiehuan>span:nth-child(2)').attr('class','active');
			$('.qiehuan>span:nth-child(2)').siblings().attr('class','');
		}else{
			$('.qiehuan>span:last-child').attr('class','active');
			$('.qiehuan>span:last-child').siblings().attr('class','');
		}
		share();
	}

	$("body").on("click",".video_page",function(e){
		top.location.replace('index.html?v='+Math.random());
	});
	$("body").on("click",".fee_page",function(e){
		top.location.replace('feelist.html?v='+Math.random());
	});
	$("body").on("click",".apply_page",function(e){
		top.location.replace('count.html?v='+Math.random());
	});
	$("#searchCancel").on("click",function(){
		appVideo.keyWord="";
		if(appVideo.id){
			queryVideoList();
		}else{
			$("#videoPage").hide();
			$("#indexPage").show();
			$("#searchCancels").trigger('click');
		}

	});
	$("#typeList").on("click",".gridsLine",function(){
		appVideo.id=$(this).attr("data_id");
		appVideo.recommend=$(this).attr("data_recommend");
		appVideo.content = $(this).find('.videoTitel').text();
		queryVideoList();
		$("#videoPage").show();
		$("#indexPage").hide();
	});



	setInterval(function(){//10分钟调用一次
		getSession();
	},1000*60*10);
});

function getSession(){
	$.ajax({
		url : appVideo.queryFees+"?code="+wxcode,
		type : 'POST',
		beforeSend: function(xhr) {
			$.showLoading();
		},
		success : function(data) {
			if(data.retcode=="0"){

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

// 获取视频列表
function queryVideoType(){
	$.ajax({
		url : appVideo.findType+"?code="+wxcode,
		type : 'POST',
		beforeSend: function(xhr) {
			$.showLoading();
		},
		'content-Type':'application/json;charset=utf-8;',
		data : JSON.stringify({}),
		success : function(data) {
			if(data.retcode=="0"){
				$('#listPart').html("");
				var htmls="";
				var typeTemp = $('#typeTemp').html();
				var list=data.data;

				if(list.length>0){
					for (var i=0;i<list.length;i++){
						var temp = {};
						temp=list[i];
						htmls += appVideo.fillTemplate(typeTemp,temp);
					}
				}else{
					$(".notips").show();
				}
				$("#typeList").html(htmls);

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

function toPage(){
	$(".videoWrap").html("");
}

function search(){
	appVideo.keyWord = $("#searchInput").val().trim();
	queryVideoList();
	$("#searchInput").blur();
}

function search1(){
	appVideo.keyWord = $("#searchInputs").val().trim();
	appVideo.id="";
	appVideo.recommend="";
	$("#videoPage").show();
	$("#indexPage").hide();
	queryVideoList();
	$("#searchInputs").blur();
}

//手机锁屏视频停止
document.addEventListener("visibilitychange",function(){
	if(document.visibilityState=='hidden'){
		var videos = document.getElementsByTagName('video');
		for (var i = videos.length - 1; i >= 0; i--) {
			var p = i;
			videos[p].pause();
		}
	}
});
function play(num){
	var videos = document.getElementsByTagName('video');
	$("#imgid"+num).hide();
	$(videos[num]).attr("controls","controls");
	videos[num].play();
}

//获取视频列表
function queryVideoList(){
	// if(appVideo.id == '12'){
	// 	$('#qiehuan').show();
	// }else{
	// 	$('#qiehuan').hide();
	// 	appVideo.secondVideoType = '';
	// }
	queryVideoList1();
	share();
}

//获取视频列表2
function queryVideoList1(){
	// alert(appVideo.secondVideoType);
	$.ajax({
		url : appVideo.queryList+"?code="+wxcode,
		type : 'POST',
		data : JSON.stringify({
			/*'userId':JSON.parse($.cookie("user")).userid,*/
			'typeId':appVideo.id,
			'title':appVideo.keyWord,
			'recommend':appVideo.recommend,
			'secondVideoType':appVideo.secondVideoType
		}),
		'content-Type':'application/json;charset=utf-8;',
		beforeSend: function(xhr) {
			$.showLoading();
		},
		success : function(data) {
			if(data.retcode=="0"){
				$('.videoWrap').html("");
				$('.notips').hide();
				console.log(data);
				if(data.secondType.length>0){
					for(var i=0;i<data.secondType.length;i++) {
							if(data.secondType[i] == '1'){
								$("#qiehuan1").show();
							}else if(data.secondType[i] == '2'){

							}else if(data.secondType[i] == '3'){

							}
					}
				}
				var list = data.data;
				if(list.length>0){
					for(var i=0;i<list.length;i++) {
						var htmls="";
						var videoTemp = $('#videoBoxTemp').html();
						for(var i=0;i<list.length;i++) {
							var temp = {};
							temp.id= list[i].id;
							temp.url=list[i].url;
							temp.releaseInfo=list[i].releaseInfo;
							temp.allDemandVolume=list[i].allDemandVolume;
							temp.cover=list[i].cover;
							temp.imgid="imgid"+i;
							if(list[i].myUrl!=''){
								//temp.controls = "controls";
								temp.imgsrc="image/play.png";
								temp.imgclick="play("+i+")";
							}else {
								//temp.controls = "";
								temp.imgsrc="image/unplay.png";
								temp.imgclick="";
							}
							if(list[i].myDemandVolume==0){
								temp.ifSeeClass="color:#121212";
							}else{
								temp.ifSeeClass="color:#848484";
							}
							htmls += appVideo.fillTemplate(videoTemp,temp);
						}
						$('.videoWrap').append(htmls);
					}
					initVideo();
				}else {
					if(appVideo.keyWord){
						$('.notips').text('暂无与“'+appVideo.keyWord+'”相关的视频');
					}else{
						$('.notips').text("暂无视频");
					}
					$('.notips').show();
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

function secToTime(s){
	var t="";
	if(s>-1){
		var min=Math.floor(s/60)%60;
		var sec=Math.floor(s%60);
		if(min<10){
			t+="0";
		}
		t+=min+":";
		if(sec<10){
			t+="0";
		}
		t+=sec;
	}
	if(t=="00:00"){
		t="00:01";
	}
	return t;
}
function setInit(nowNum){
	var videos = document.getElementsByTagName('video');
	for (var p = videos.length - 1; p >= 0; p--) {
		if(nowNum!=p){
			if($(videos[p]).attr("controls")){
				videos[p].pause();
				$(videos[p]).removeAttr("controls");
				$("#imgid"+p).show();
				//$(videos[p]).parent().html($(videos[p]).parent().html());
				//initVideo();
			}
		}
	}
}

//初始化视频
function initVideo(){
	var videos = document.getElementsByTagName('video');
	for (var p = videos.length - 1; p >= 0; p--) {
		(function(){
			videos[p].num=p;
			videos[p].firstPlay=true;
			videos[p].flag=true;
			if(localStorage.getItem($(videos[p]).attr("id"))){//初始化缓存时间
				$(videos[p]).attr("myCurrentTime",localStorage.getItem($(videos[p]).attr("id")));
				$(videos[p]).attr("myMaxTime",localStorage.getItem($(videos[p]).attr("id")));
				var seeTime=secToTime($(videos[p]).attr("myCurrentTime"));
				$("#myCurrentTime"+$(videos[p]).attr("id")).text("上次观看"+seeTime);
				$("#myCurrentTime"+$(videos[p]).attr("id")).show();
			}
			else{
				$(videos[p]).attr("myCurrentTime",0);
				$(videos[p]).attr("myMaxTime",0);
				$("#myCurrentTime"+$(videos[p]).attr("id")).hide();
			}
			videos[p].addEventListener('canplay',function(e){
				e.preventDefault();
				if($(videos[this.num]).attr("myCurrentTime")-videos[this.num].currentTime>1){
					videos[this.num].currentTime=$(videos[this.num]).attr("myCurrentTime");
				}
			});
			videos[p].addEventListener('play',function(e){
				e.preventDefault();
				appVideo.initFlag=true;
				recordVideo($(videos[this.num]).attr("id"));
				setInit(this.num);
				//$(videos[p]).parents(".videoBox").find(".video_tit").hide();//播放的时候视频上方隐藏标题
			});
			videos[p].addEventListener('pause',function(e){
				e.preventDefault();
				var seeTime=secToTime($(videos[this.num]).attr("myCurrentTime"));
				$("#myCurrentTime"+$(videos[this.num]).attr("id")).text("上次观看"+seeTime);
				//$(videos[p]).parents(".videoBox").find(".video_tit").show();//暂停播放的时候视频上方显示标题
			});
			videos[p].addEventListener('timeupdate',function(e){
				e.preventDefault();
				if(appVideo.initFlag){
					if(this.firstPlay){
						if($(videos[this.num]).attr("myCurrentTime")-videos[this.num].currentTime>1){
							videos[this.num].currentTime=$(videos[this.num]).attr("myCurrentTime");
						}
						this.firstPlay=false;
					}
					var current = videos[this.num].currentTime;
					var time = videos[this.num].duration;
					if((current - $(videos[this.num]).attr("myMaxTime") > 0.8) ) {//拖动不能超过最大播放过的时间，否则返回拖动前的时间点
						videos[this.num].currentTime=$(videos[this.num]).attr("myCurrentTime");
					}else {
						$(videos[this.num]).attr("myCurrentTime",current);//记录当前播放时间
						if(current>$(videos[this.num]).attr("myMaxTime")){//记录最大播放过的时间
							$(videos[this.num]).attr("myMaxTime",current);
						}
						if(appVideo.saveCacheFlag){//1秒记录1次缓存当前播放时间
							appVideo.saveCacheFlag = false;
							localStorage.setItem($(videos[this.num]).attr("id"), current);
							setTimeout(function(){
								appVideo.saveCacheFlag = true;
							},1000);
						}
						if(time>0 && (current>=time*0.8) && this.flag){//播放进度超过视频总时间的80%则积1分
							this.flag=false;
							successVideo($(videos[this.num]).attr("id"));
						}
					}
				}
			});
		})();
	}
}

//纪录用户观看视频
function recordVideo(id){
	$.ajax({
		url : appVideo.initVideoRecord+"?code="+wxcode,
		type : 'POST',
		data : JSON.stringify({
			/*'userId':JSON.parse($.cookie("user")).userid,*/
			'videoId': id,
			'share_userId':JSON.parse($.cookie("user")).userid
		}),
		'content-Type':'application/json;charset=utf-8;',
		beforeSend: function(xhr) {
			//$.showLoading();
		},
		success : function(data) {
			if(data.retcode=="0"){
				//$.alert("本视频观看记录");
				$("#viewNum"+id).text(data.allDemandVolume);
				$("#viewName"+id).attr("style","color:#848484");
			}else{
				//$.alert(appVideo.errormsg);
			}
		}
		,error : function(xhr,status,error){
			//$.hideLoading();
		}
		,complete:function(xhr){
			//$.hideLoading();
		}
	});
}

// 观看成功
function successVideo(id){
	$.ajax({
		url : appVideo.updateVideoFee+"?code="+wxcode,
		type : 'POST',
		data : JSON.stringify({
			/*'userId':JSON.parse($.cookie("user")).userid,*/
			'videoId': id
		}),
		'content-Type':'application/json;charset=utf-8;',
		beforeSend: function(xhr) {
			//$.showLoading();
		},
		success : function(data) {
			if(data.retcode=="0"){
				// $.alert("本视频观看任务成功，已积分");
			}else{
				// $.alert(appVideo.errormsg);
			}
		}
		,error : function(xhr,status,error){
			//$.hideLoading();
		}
		,complete:function(xhr){
			//$.hideLoading();
		}
	});
}

appVideo.fillTemplate = function(tmpl,obj){
	var html = tmpl;
	for(var key in obj){
		var regexp = eval("/\{" + key + "\}/ig");
		html = html.replace(regexp,obj[key]);
	}
	return html;
};

//tab切换逻辑
$('#qiehuan span').click(function(){
	//tab标题切换
	$(this).attr('class','active');
	$(this).siblings().attr('class','');
	let itemId = $(this).attr('tabid');
	if(itemId=='1'){
		appVideo.secondVideoType = '1';
	}else if(itemId=='2'){
		appVideo.secondVideoType = '2';
	}else if(itemId=='3'){
		appVideo.secondVideoType = '3';
	};
	queryVideoList();
});

function share() {
	var content = appVideo.content;
	wx.ready(function(){
		wx.onMenuShareTimeline({
			title: '学习视频', // 分享标题
			link: window.location.href.split("/videoStudy/")[0] + "/videoStudy/index.html?type="+appVideo.id+"&content="+encodeURIComponent(content)+"&videoType="+appVideo.secondVideoType, // 分享链接
			imgUrl:window.location.href.split("/wxqy/")[0].split("/videoStudy/")[0]+"/wxqy/videoStudy/image/background_top.png" , // 分享图标
			success: function () {
			},
			cancel: function () {
			}
		});
		wx.onMenuShareAppMessage({
			title: '学习视频', // 分享标题
			desc: appVideo.content, // 分享描述
			link: window.location.href.split("/videoStudy/")[0] + "/videoStudy/index.html?type="+appVideo.id+"&content="+encodeURIComponent(content)+"&videoType="+appVideo.secondVideoType, // 分享链接
			imgUrl:window.location.href.split("/wxqy/")[0].split("/videoStudy/")[0]+"/wxqy/videoStudy/image/background_top.png" , // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () {
			},
			cancel: function () {
			}
		});
	})
}

function GetQueryStrings(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null)
		return (r[2]);
	return null;
}


// 查看观看人列表
function lookpepers(id) {
	$.ajax({
		url : appVideo.lookPepos,
		type : 'POST',
		data : JSON.stringify({
			'voideId':id
		}),
		'content-Type':'application/json;charset=utf-8;',
		beforeSend: function(xhr) {
			$.showLoading();
		},
		success : function(data) {
			console.log(data);
			if(data.retcode=="0"){
				let list = data.list;
				let str = '';
				for(let i=0;i<list.length;i++){
					str += `
						<div class="lis">
							<span>${list[i].name}</span><span>${list[i].departmentName}</span><span>${list[i].createTime}</span>
						</div>
					`
				}
				$('.main').append(str);
				$('#videoPage').hide();
				$('.page2').show();

			}else{
				$.alert(appVideo.errormsg);
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


//去分享
function toShare() {
	$('.zhezhao').show();
}

//取消分享
function delShare() {
	$('.zhezhao').hide();
}
