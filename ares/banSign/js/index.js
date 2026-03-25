var templatekey="";
$(function() {
     templatekey=GetQueryString("templatekey");

    $('#page2 .sureSign').on('click', function() {
        saveImageInfo();
    });
    $('#page2 .back').on('click', function() {
        toPage(1);
        document.title = '西安银行';
    });
	$('#page1 .btn').on('click', function() {
        toPage(2);
        document.title = '请正楷手写签名';
    });
    $('.footApply').on('click', function() {
        toPage(2);
        document.title = '请正楷手写签名';
    });
	//$("#page1 .mid1").css({"max-height":$(window).height()-110+"px"});
    initJSSDK();
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId : app.json.appId, // 必填，公众号的唯一标识
        timestamp: app.json.timestamp, // 必填，生成签名的时间戳
        nonceStr: app.json.nonceStr, // 必填，生成签名的随机串
        signature: app.json.signature,// 必填，签名，见附录1
        jsApiList: ['chooseImage','uploadImage','previewImage','onMenuShareTimeline','onMenuShareAppMessage','hideMenuItems','showMenuItems','hideAllNonBaseMenuItem','closeWindow','startRecord', 'stopRecord', 'translateVoice', 'onVoiceRecordEnd','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function(){
        wx.hideAllNonBaseMenuItem();
    });
    templatekey=GetQueryString("templatekey");


});

function initDate(){
	var date = new Date();
	var formatdate = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
	$('.date').html(formatdate);

}
function queryImginfo(){
    var token = localStorage.getItem("X-Token");
    $.ajax({
        url: base.context + "commonsign/getSignRecord.xa",
        type: 'POST',
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('X-Token', token);
            $.showLoading();
        },
        contentType: 'application/json;charset=utf-8;',
        data: JSON.stringify({
            templatekey:templatekey
        }),
        success: function(res) {
            if (typeof (res) == 'string') {
                res = JSON.parse(res);
            }
            if (res.retcode == 'success') {
                $('#signId').html(res.data.id);
                var imgpath = res.data.record;
                if(imgpath){
                    $('#page1').hide();
                    $('#page3 img').attr('src', "data:image/jpeg;base64," + res.data.record);
                    toPage(3);
                    document.title = '西安银行';
                }else{
                    $('#page1').show();
                    $('#contentBox').html(res.data.template.signhtmltemp);
                }
            }else{
                $.alert('',res.retmsg,function(){
                    wx.closeWindow();
                })
            }
        },
        error: function(xhr, status, error) {
            $.alert('','网络错误，请稍后再试');
        },
        complete: function(xhr) {
            $.hideLoading();
        }
    });
}



function toPage(num) {
    window.scrollTo(0, 0);
    $('#page' + num).show().siblings('.page').hide();
}
