var appVideo = {
    findType:base.context + "qywx/learnVideo/findTypeList.xa", //查询
    queryList:base.context + "qywx/learnVideo/findList.xa", // 查询视频列表
    initVideoRecord:base.context + "qywx/learnVideo/saveDemandVolume.xa", // 点击观看
    updateVideoFee:base.context + "qywx/learnVideo/saveFee.xa", // 完成观看任务
    queryFees:base.context + "qywx/learnVideo/findUserFee.xa", //查看积分列表
    lookPepos:base.context + "qywx/learnVideo/getVideoLookLogList.xa", //观看人数
    upload:base.context + "qywx/learnVideo/exports.xa", //数据导出
    shareVideo:base.context + "qywx/learnVideo/findVideoInfoById.xa", //分享的视频
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
let title = '学习视频';

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
    // console.log(window.location.href);
    initJSSDK();
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId : app.json.appId, // 必填，公众号的唯一标识
        timestamp: app.json.timestamp, // 必填，生成签名的时间戳
        nonceStr: app.json.nonceStr, // 必填，生成签名的随机串
        signature: app.json.signature,// 必填，签名，见附录1
        jsApiList: ['hideAllNonBaseMenuItem','chooseImage','uploadImage','previewImage','onMenuShareAppMessage','hideMenuItems','showMenuItems','hideOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function(){
        wx.hideAllNonBaseMenuItem();
    });

    //判断是否分享进入页面，如果是分享则直接跳转至分享视频位置
    let id = GetQueryString('voideId');
    lookpepers(id);
    queryVideoList1(id)
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


// 查看观看人列表
function lookpepers(id) {
    $.ajax({
        url : appVideo.lookPepos,
        type : 'POST',
        data : JSON.stringify({
            'voideId':id
        }),
        beforeSend: function(xhr) {
            // $.showLoading();
        },
        success : function(data) {
            console.log(data);
            if(data.retcode=="0"){
                let list = data.data;
                let str = '';
                for(let i=0;i<list.length;i++){
                    let times = list[i].createTime.split(" ");
                    let time0 = times[0];
                    let time1 = times[1];
                    str += `
						<div class="lis">
							<span>${list[i].departmentName ? list[i].departmentName : '--'}</span>
							<span>${list[i].name ? list[i].name : '--'}</span>
							<span>${list[i].share_name ? list[i].share_name : '--'}</span>
						</div>
					`
                }
                $('.main').append(str);

            }else{
                // $.alert(appVideo.errormsg);
                $.alert(data.retmsg);
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


function queryVideoList1(id){
    $.ajax({
        url : appVideo.shareVideo+"?code="+wxcode,
        type : 'POST',
        data : JSON.stringify({
            'videoId': id
        }),
        success : function(data) {
            if(data.retcode=="0"){
                title = data.data.title;
                document.title = title;
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

//数据导出
function upload() {
    $.ajax({
        url : appVideo.upload,
        type : 'POST',
        data : JSON.stringify({
            'videoId':GetQueryString('voideId')
        }),
        beforeSend: function(xhr) {
            $.showLoading();
        },
        success : function(data) {
            if(data.retcode=="0"){
               $.alert('导出成功','');
            }else{
                $.alert(data.retmsg,'');
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

function to(name) {
    if(name == ''){
        return '--';
    }
}

