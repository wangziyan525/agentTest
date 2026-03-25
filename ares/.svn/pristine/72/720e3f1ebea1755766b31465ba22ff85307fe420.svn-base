function action() {
    new Vue({
        el: "#app",
        data: {

            uploadPicUrl: 'canteen/getUserUnLoginKey.xa',//上传

        },
        created: function () {

        },
        mounted: function () {

            var code = GetQueryString("code");
            this.getPath(code);

        },
        methods: {

            
            //获取跳转链接
            getPath(code){
                $.showLoading('跳转中...');
                let _this = this;
                let params = {};
                params.code= code;  
                $http(_this.uploadPicUrl,false,params, true)
                .then(res => {
                    $.hideLoading();
                    if(res.retcode == 'success'){
                        if(res.data.unLoginURL && res.data.unLoginURL !=''){
                            window.location.replace(res.data.unLoginURL);
                        }else{
                            $.alert('','跳转失败，请重试',function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    }else if(res.retcode == 'wechat.exception'){
                        // _this.againGetPath();
                        // WeixinJSBridge.call('closeWindow');
                    }else{
                        $.alert('',res.retmsg,function(){
                            WeixinJSBridge.call('closeWindow');
                        });
                    }
                });
            }, 

            //重新获取code
            againGetPath(){
                var fromurl=location.href;
                fromurl = fromurl.split('?')[0];
                var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+base.appid+'&redirect_uri='+encodeURIComponent(fromurl)+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
                window.location.replace(url);
            },

          

        }
    });

}

