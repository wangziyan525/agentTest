function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'accessControl/visited/findInfo.xa',  //获取详情
            approveUrl: 'accessControl/visited/approve.xa',  //审批

            id:'',

            //拜访人信息
            info:{},
            faceImgPath:'', 
        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

            this.id = this.getQueryString('id');

        },
        mounted: function () {

            this.getDetail();

        },
        methods: {

            //预览图片
            watchFaceImg(){
                let photoArr = [];
                photoArr.push(this.faceImgPath);
                vant.ImagePreview({
                    images: photoArr,
                });
            },

            //获取详情
            getDetail(){
                let _this = this;
                let params = {};
                params.id = _this.id;
                $http(_this.getDetailUrl,true,params, true)
                .then(res => {
                    if(res.retcode == 'success'){
                       _this.info = res.data.accessControlVisit;
                       _this.faceImgPath = "data:image/png;base64," + res.data.accessControlVisit.faceData;
                    }else{
                        $.alert('',res.retmsg,function(){
                            WeixinJSBridge.call('closeWindow');
                        });
                    }
                });
            },

            //审批i
            subInfo(i){
                let _this = this;
                if(i == '0'){
                    _this.subInfo1(i);
                }else{
                    $.confirm('','是否驳回？',function(){
                        _this.subInfo1(i);
                    });
                }
            },
            subInfo1(i){
                let _this = this;
                let params = {};
                params.id = _this.id;
                params.approveResult  = i+'';
                $http(_this.approveUrl,true,params, true)
                .then(res => {
                    if(res.retcode == 'success'){
                        var path = './visitRecord.html';
                        if(i == '0'){
                            $.alert('','已同意',function(){
                                window.location.replace(path);
                            })
                        }else{
                            $.alert('','已驳回',function(){
                                window.location.replace(path); 
                            })
                        }
                    }else{
                        $.alert('',res.retmsg,function(){
                            WeixinJSBridge.call('closeWindow');
                        });
                    }
                });
            },

            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },

        }
    });

}

