$(function(){
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
})

function initDate(){
	var date = new Date();
	var formatdate = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
	$('.date').html(formatdate);

}
function queryImginfo(){
    var token = localStorage.getItem("X-Token");
    $.ajax({
        url: base.context + "misconduct/getGenerateSignPDF.xa",
        type: 'POST',
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('X-Token', token);
            $.showLoading();
        },
        contentType: 'application/json;charset=utf-8;',
        data: JSON.stringify({
            "batch": batch,
            "humancode":humancode
        }),
        success: function(res) {
            if (typeof (res) == 'string') {
                res = JSON.parse(res);
            }
            if (res.retcode == 'success') {
                $('#signId').html(res.data.id);
                var flag = res.data.flag;

                if(batch=="202501"){
                    if(flag=="1"){
                        window.location.href="../../newwxqy/misconductSign/index.html"
                    }else{
                        if(humancode){
                            vant.Dialog.alert({
                                message:"请确认此人是否签名"
                            }).then(() => {
                                
                            });
                        }else{
                            $('#page1').show();
                        }
                        
                    }
                }else{
                    
                    if(flag=="1"){
                        $('#page1').hide();
                        $('#page3 img').attr('src', 'data:image/png;base64,' +res.data.imgbase64);
                        toPage(3);
                    }else{
                        if(humancode){
                            vant.Dialog.alert({
                                message:"请确认此人是否签名"
                            }).then(() => {
                                
                            });
                        }else{
                            $('#page1').show();
                        }
                    }
                }
                
                
                // if(imgbase64){
                //     $('#page1').hide();
                //     $('#page3 img').attr('src', imgbase64);
                //     toPage(3);
                // }else{
                //     $('#page1').show();
                // }
            } else{
                
                vant.Dialog.alert({
                    message:res.retmsg
                }).then(() => {
                    wx.closeWindow();
                });
            }
        },
        error: function(xhr, status, error) {
            vant.Dialog.alert({
                message:'网络错误，请稍后再试'
            }).then(() => {
            });
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
