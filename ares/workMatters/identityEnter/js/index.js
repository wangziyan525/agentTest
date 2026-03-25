function action() {
    new Vue({
        el: "#app",
        data: {

            uploadPicUrl: 'face/addFace.xa',//上传

            resultPage:false,
            resultPic:'',
            resultText:'',
            resultBtnText:'',

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {
            

        },
        methods: {

            //选中图片
            getPhone(){
                var _this = this;
                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType:['camera'],
                    camera:'front',
                    success: function (res) {
                        var localIds = res.localIds;
                        wx.uploadImage({
                            localId: localIds.toString(),
                            isShowProgressTips: 1,
                            success: function (res) {
                                //上传照片
                                _this.uploadPic(res.serverId);
                            },
                            fail:function(res){
                                console.log(res);
                                $.alert('上传图片失败!','');
                            }
                        });
                    },
                    fail:function(res){
                        console.log(res)
                        $.alert('上传图片失败!','');
                    }
                });
            },

            //上传照片
            uploadPic(serverId){
                let _this = this;
                let params = {};
                params.media_id = serverId;  
                $http(_this.uploadPicUrl,true,params, true)
                .then(res => {
                    if(res.retcode == '0'){
                        _this.resultPic = './image/success.png';
                        _this.resultText = '提交成功';
                        _this.resultBtnText = '确认';
                    }else{
                        _this.resultPic = './image/fail.png';
                        _this.resultText = '人脸核验失败';
                        _this.resultBtnText = '重新拍照';
                    }
                    _this.resultPage = true;
                });
            },


            //结果按钮
            resultBtn(){
                if(this.resultBtnText == '确认'){
                    WeixinJSBridge.call('closeWindow');
                }else{
                    this.resultPic = '';
                    this.resultText = '';
                    this.resultBtnText = '';
                    this.resultPage = false;
                }
            },
          

        }
    });

}

