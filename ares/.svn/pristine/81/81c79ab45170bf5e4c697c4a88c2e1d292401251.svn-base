function initFun () {
    new Vue({
        el: '#app',
        data: {
           getImgUrl:'retailCertificate/getCertificateInformation.xa',
           type:'',
           zsImgSrc:'',
           viewFlag:false
        },
        created () {
            this.type = this.getQueryString('type')?this.getQueryString('type'):'';
            if(this.type=="S"){
                this.zsImgSrc = './images/sg.png?v=1.0.0'
                document.title = '零售上岗证书'
            }else if(this.type=='Q'){
                this.zsImgSrc = './images/zg.png?v=1.0.0'
            }
            this.getImg()
        },
        methods: {
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            // 获取证书图片
            getImg(){
                let that = this;
                var token = localStorage.getItem("X-Token");
                $.ajax({
                    url: base.context + that.getImgUrl,
                    type: 'POST',
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('X-Token', token);
                        $.showLoading("证书制作中...");
                    },
                    contentType: 'application/json;charset=utf-8;',
                    data: JSON.stringify({
                        'flag':that.type
                    }),
                    success: function(res) {
                        if (typeof (res) == 'string') {
                            res = JSON.parse(res);
                        }
                        if (res.retcode == "success") {
                            that.zsImgSrc = base.domain + "/wxqy/upload/" + res.data+'?v='+(new Date).getTime();
                            console.log(that.zsImgSrc)
                        } else if (res.retcode == "user.no.permission") {
                            that.zsImgSrc = '';
                            that.viewFlag = true;
                            $.alert("", res.retmsg, function () {
                                wx.ready(function () {
                                    WeixinJSBridge.invoke('closeWindow', {}, function (res) {
                                    });
                                    wx.closeWindow();
                                });
                            });
                        } else {
                            that.zsImgSrc = '';
                            that.viewFlag = true;
                            // $.alert("",res.retmsg)
                        }
                    },
                    error: function(xhr, status, error) {
                        $.alert('','网络错误，请稍后再试');
                    },
                    complete: function(xhr) {
                        $.hideLoading();
                    }
                });
            },
        }
    })
};
