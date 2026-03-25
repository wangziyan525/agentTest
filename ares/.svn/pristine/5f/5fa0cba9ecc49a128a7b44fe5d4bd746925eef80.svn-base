function action() {
    new Vue({
        el: "#app",
        data: {

            queryVisitStatusUrl:'NoAuthUser/accessControl/visit/findInfo.xa', //查询状态
            addVisitRecordUrl:'NoAuthUser/accessControl/visit/add.xa', //增加访客记录

            id:'',
            // resultPage:false,
            resultPage:false,
            visitedName:'',

            //拜访人信息
            name:'',
            gender:'1',
            tel:'',
            time:'',
            reason:'',
            identityPicPath:'',

            isCanSub:false, //是否可以提交

            //选择日期
            isShowChooseTime:false,
            minDate: '',
            maxDate: new Date(2050,12,30),


            //录音
            isShowRecord:false,


            //结果页面
            resultImg:'',
            resultText:'',
            resultText1:'',
            isShowText:true,

            //是否微信环境
            isweixin:false,

        },
        created: function () {

            this.id = this.getQueryString('id');

        },
        mounted: function () {


            //查询状态
            this.queryVisitStatus();

            //是否在微信或企业微信环境里
            this.isWeixin();


        },
        methods: {

            //是否在微信或企业微信环境里
            isWeixin(){
                var ua = navigator.userAgent.toLocaleLowerCase();
                console.log(ua)
                if(ua.includes('micromessenger')){
                    this.isweixin = true;
                }else{
                    this.isweixin = false;
                }   
            },

            //查询线下时间
            getNow(){
                var now = new Date();
                var futureTime = new Date(now.getTime() + 5*60*1000);
                this.minDate = futureTime;
            },

            //查询状态
            queryVisitStatus(){
                let _this = this;
                let params = {};
                params.id = _this.id;
                $http(_this.queryVisitStatusUrl,true,params, true)
                .then(res => {
                    if(res.retcode == 'success'){
                        _this.visitedName = res.data.visited_username;
                    }else if(res.retcode == '-4'){
                        //0:初始化(创建二维码) 1:拜访人员提交 2:拜访申请通过 3:申请作废
                        if(res.data == '1'){
                            _this.isShowText = true;
                            _this.resultImg = './image/subOver.png';
                            _this.resultText = '该二维码已使用';
                            _this.resultText1 = '信息审核中';
                        }else if(res.data == '2'){
                            _this.isShowText = true;
                            _this.resultImg = './image/subOver.png';
                            _this.resultText = '该二维码已使用';
                            _this.resultText1 = '信息审核通过';
                        }else if(res.data == '3'){
                            _this.isShowText = false;
                            _this.resultImg = './image/fail1.png';
                            _this.resultText = '该二维码已使用';
                            _this.resultText1 = '信息审核不通过';
                        }else if(res.data == '4'){
                            _this.isShowText = false;
                            _this.resultImg = './image/fail1.png';
                            _this.resultText = '该二维码已使用';
                            _this.resultText1 = '信息审核已失效';
                        };
                        _this.resultPage = true;
                    }else{
                        _this.isShowText = false;
                        _this.resultImg = './image/fail1.png';
                        _this.resultText = res.retmsg;
                        _this.resultText1 = '';
                        _this.resultPage = true;
                    }
                });
            },

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
                    that.identityPicPath = imgBase64Data;
                    that.canSBubTest();
                    $.hideLoading();

                };
                var ipt = document.querySelector('#file1');
                ipt.value = '';
            },

            //删除图片
            colseFaceImg(){
                this.identityPicPath = '';
                this.canSBubTest();
            },

            //预览图片
            watchFaceImg(){
                let photoArr = [];
                photoArr.push(this.identityPicPath);
                vant.ImagePreview({
                    images: photoArr,
                });
            },


            //选择时间
            choosedTime(){
                this.getNow();
                this.isShowChooseTime = true;
            },

            //格式化日期
            formatter(dateTime) {
                let year, month, day, hours, minutes;
                year = dateTime.getFullYear();
                if (dateTime.getMonth() + 1 > 9) {
                    month = dateTime.getMonth() + 1;
                } else {
                    month = '0' + (dateTime.getMonth() + 1);
                };
                if (dateTime.getDate() > 9) {
                    day = dateTime.getDate()
                } else {
                    day = '0' + dateTime.getDate()
                };
                if (dateTime.getHours() > 9) {
                    hours = dateTime.getHours();
                } else {
                    hours = '0' + dateTime.getHours();
                };
                if (dateTime.getMinutes() > 9) {
                    minutes = dateTime.getMinutes()
                } else {
                    minutes = '0' + dateTime.getMinutes()
                };
                return `${year}-${month}-${day} ${hours}:${minutes}`
            },


            debounce(fun,delay){
                return function(args){
                    let that = this;
                    let _args = args;
                    clearTimeout(fun.id);
                    fun.id = setTimeout(function(){
                        fun.call(that,_args);
                    },delay)
                }
            },

            //选择时间
            chooseTime(param){
                this.time = this.formatter(param);
                this.isShowChooseTime = false;
                this.canSBubTest();
            },


            //去录音
            toRecord(){
                this.isShowRecord = true;
                wx.startRecord();
                this.jianting();
            },

            //结束录音
            endRecord(){
                this.isShowRecord = false;
                let _this = this;
                console.log(wx.stopRecord)
                wx.stopRecord({
                    success:function (res) {
                        var localId = res.localId;
                        console.log(localId)
                        _this.identify(localId); //识别音频文件内容
                    }
                });
            },

            //监听录音时长，1分钟自动停止
            jianting(){
                wx.onVoiceRecordEnd({
                    complate:function (res) {
                        _this.isShowRecord = false;
                        var localId = res.localId;
                        _this.identify(localId); //识别音频文件内容
                    }
                });
            },

            //识别音频文件内容
            identify(localId){
                let _this = this;
                wx.translateVoice({
                    localId: localId,
                    isShowProgressTips:1,
                    success:function (res) {
                        _this.reason += res.translateResult;
                        _this.canSBubTest();
                    }
                });
            },


            ///是否可以提交
            canSBubTest(){
                if(this.name == ''){
                    // vant.Toast('请输入拜访人姓名');
                    this.isCanSub = false;
                    return false
                };
                if(this.tel == ''){
                    // vant.Toast('请输入拜访人联系电话');
                    this.isCanSub = false;
                    return false
                };
                var handPhoneRegexp = /^(13[0-9]|14[01456789]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
                if (!handPhoneRegexp.test(this.tel)) {
                    vant.Toast('请输入正确的拜访人联系电话');
                    this.tel = '';
                    this.isCanSub = false;
                    return;
                };
                if(this.time == ''){
                    // vant.Toast('请输入拜访时间');
                    this.isCanSub = false;
                    return false
                };
                if(this.reason == ''){
                    // vant.Toast('请输入拜访事由');
                    this.isCanSub = false;
                    return false
                };
                if(this.identityPicPath == ''){
                    // vant.Toast('请上传人脸照片');
                    this.isCanSub = false;
                    return false
                };
                this.isCanSub = true;
            },

            //提交访客信息
            subInfo(){
                if(this.tel == ''){
                    vant.Toast('请输入拜访人联系电话');
                    this.isCanSub = false;
                    return false
                };
                var handPhoneRegexp = /^(13[0-9]|14[01456789]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
                if (!handPhoneRegexp.test(this.tel)) {
                    vant.Toast('请输入正确的拜访人联系电话');
                    this.tel = '';
                    this.isCanSub = false;
                    return;
                };
                let _this = this;
                let params = {};
                var time =  _this.time;
                time = time.replace(/-/g, '');
                time = time.replace(/:/g, '');
                time = time.replace(/\s*/g, '');
                // base64去头
                var head = _this.identityPicPath.indexOf('4') + 2;
                var base64Data = _this.identityPicPath.substring(head,_this.identityPicPath.length - head);
                params.id = _this.id;
                params.name = _this.name;
                params.gender = _this.gender;
                params.telephone = _this.tel;
                params.visit_time = _this.time+':00';
                params.visit_reason = _this.reason;
                params.media_id = base64Data;
                $http(_this.addVisitRecordUrl,true,params, true)
                .then(res => {
                    if(res.retcode == 'success'){
                        _this.isShowText = true;
                        _this.resultImg = './image/subOver.png';
                        _this.resultText = '提交成功';
                        _this.resultText1 = '等待信息审核';
                        _this.resultPage = true;
                    }else{
                        $.alert('',res.retmsg,function(){
                            window.close();
                            history.back();
                            window.history.go(-1);
                            WeixinJSBridge.call('closeWindow');
                        });
                    }
                });
            },

            //结果页确定
            resultBtn(){
                window.close();
                history.back();
                window.history.go(-1);
                WeixinJSBridge.call('closeWindow');
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

