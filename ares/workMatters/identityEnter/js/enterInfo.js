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


            // 上传图片
            upload(obj) {
                let that = this;
                $.showLoading("上传图片...")
                var file = obj.target.files[0];
                if(file){
                    var formdata = new FormData();
                    var fileTypes = file.type.split('/')[0];
                    if(fileTypes != 'image'){
                        $.hideLoading();
                        $.alert("",'只支持jpg、png、jpeg格式');
                        return;
                    };
                    if (file) {
                        smallPhoto(file,formdata,function (formdata) {
                                that.uploadFile(formdata);
                        });
                    } else {
                        $.hideLoading();
                    }
                }else{
                    $.hideLoading();
                }
            },

            // 上传图片到服务器
            uploadFile(formdata) {
                let that = this;
                var mess = {};
                let imgType = formdata.get("file").name.split('.');
                mess['PIC_TYPE'] = imgType[imgType.length - 1];
                let typeFlag = mess.PIC_TYPE=='JPG'||mess.PIC_TYPE=='jpg'||mess.PIC_TYPE=='PNG'||mess.PIC_TYPE=='png'||mess.PIC_TYPE=='jpeg'||mess.PIC_TYPE=='JPEG'||mess.PIC_TYPE=='webp'||mess.PIC_TYPE=='WEBP';
                if(!typeFlag){
                    $.hideLoading();
                    $.alert("",'只支持jpg、png、jpeg、webp格式');
                    return;
                }
                var ready = new FileReader();
                ready.readAsDataURL(formdata.get("file"));
                ready.onload = function () {
                    var imgBase64Data = this.result;
                    // base64去头
                    var head = imgBase64Data.indexOf('4') + 2;
                    var base64Data = imgBase64Data.substring(head, imgBase64Data.length - head);
                    that.uploadPic(base64Data);
                };

                var ipt = document.querySelector('#file1');
                ipt.value = '';
            },

            //上传照片
            uploadPic(serverId){
                let _this = this;
                let params = {};
                params.media_id = serverId;  
                $http(_this.uploadPicUrl,true,params, true)
                .then(res => {
                    if(res.retcode == 'success'){
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

