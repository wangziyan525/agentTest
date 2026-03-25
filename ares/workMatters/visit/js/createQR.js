function action() {
    new Vue({
        el: "#app",
        data: {

            createQRUrl: 'accessControl/visited/createQrcode.xa',//生成二维码

            arPicPath:'./image/create.png', //二维码图片链接
            btnText:'生成访客二维码',
            loseTime:'',

            canvasImg:'',

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {

            //查看权限
            this.getRole();

        },
        methods: {

            //生成二维码(作为权限查看)
            getRole(){
                let _this = this;
                let params = {};
                $http(_this.createQRUrl,true,params, true)
                .then(res => {
                    if(res.retcode == 'success'){
                        console.log('有权限');
                    }else{
                        $.alert('',res.retmsg,function(){
                            WeixinJSBridge.call('closeWindow');
                        });
                    }
                });
            },
            
          
            //生成二维码
            subInfo(){
                $.showLoading('图片生成中...');
                let _this = this;
                let params = {};
                $http(_this.createQRUrl,false,params, true)
                .then(res => {
                    if(res.retcode == 'success'){
                        _this.arPicPath = 'data:image/png;base64,' + res.data.qrCode;
                        _this.loseTime = res.data.loseTime;
                        _this.btnText = '重新生成';
                        setTimeout(()=>{
                            html2canvas(document.querySelector('#qrPic')).then(
                                canvas=>{
                                    var imgUrl = canvas.toDataURL('image/png');
                                    _this.canvasImg = imgUrl;
                                    $.hideLoading();
                                });
                        },500)
                    }else{
                        $.hideLoading();
                        $.alert('',res.retmsg,function(){
                            WeixinJSBridge.call('closeWindow');
                        });
                    }
                });
            },

            //预览图片
            watchFaceImg(){
                if(this.arPicPath != './image/create.png'){
                    let photoArr = [];
                    photoArr.push(this.canvasImg);
                    vant.ImagePreview({
                        images: photoArr,
                    });
                };
            },


        }
    });

}

