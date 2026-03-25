function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'certExpire/getCertExpireDetail.xa',  //详情接口
            getApprovePeopleUrl: 'certExpire/getCertExpireHandoverUser.xa',  //下拉选择人
            toApprovalUrl: 'certExpire/certExpireApproval.xa',  //审批
            getPicUrl: 'faceExamineCheck/getMsgBase64.xa',  //获取照片

            tranSeq:'',  
            infos:{},
           
            refusePopup:false,  //拒绝弹框
            reason:'',         //拒绝理由
            showPicker:false,  //下拉选人
            chooseItem:-1,
            chooseList:[],
            choosePeopleList:[],
            choosePeopleListInfo:[],
            choosedName:'',
            isPassOn:'否',   //是否转办
            passOnPeople:'',  //转办人名称
            passOnPeopleCode:'',  //转办人id

            isApproved:false, //是否审批过了
            isController:false,  //是否是会计主管

            idCardPicPath1:'',   //身份证照片1
            isShowGif1:true,
            idCardPicPath2:'',   //身份证照片2
            isShowGif2:true,

            flowPopup:false,
 

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });


            this.tranSeq = this.getQueryString('tranSeq');

        },
        mounted: function () {

            //获取详情
            this.getInfos();


        },
        methods: {

            //获取详情
            getInfos(){
                let _this = this;
                let params = {};
                params.tranSeq = _this.tranSeq;
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.infos = res.data;
                            _this.getIdCardPics(res.data.idCardBack,1);
                            _this.getIdCardPics(res.data.idCardFront,2);
                            //是否已经审批 1-会计主管 
                            if(res.data.role == '1'){
                                _this.isController = true;
                                if(res.data.handover){  //如果有，说明已经转办了
                                    _this.isApproved = true;
                                }else{
                                    if(res.data.pass == '2'){  //2.未处理 1.通过 0.拒绝pass 
                                        _this.isApproved = false;
                                        _this.getApprovePeopl();
                                    }else{
                                        _this.isApproved = true;
                                    };
                                };
                            }else{
                                _this.isController = false;
                                if(res.data.pass == '2'){ 
                                    _this.isApproved = false;
                                }else{
                                    _this.isApproved = true;
                                };
                            };
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //获取审批人信息列表
            getApprovePeopl(){
                let _this = this;
                let params = {};
                $http(_this.getApprovePeopleUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.choosePeopleListInfo = res.data;
                            var arr = [];
                            for(var i=0;i<_this.choosePeopleListInfo.length;i++){
                                    arr.push(_this.choosePeopleListInfo[i].idcardname);
                            };
                            _this.choosePeopleList = arr;
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });

            },

            //选人下拉打开
            choosePicker(i){
                this.chooseItem = i;
                this.showPicker = true;
                if(i == 1){
                    this.chooseList = ['否','是'];
                }else if(i == 2){
                    this.chooseList = this.choosePeopleList;
                }
            },

            //选人确认
            onChooseConfirm(v,i){
                if(this.chooseItem == 1){
                    this.isPassOn = v;
                    this.passOnPeople = '';
                    this.passOnPeopleCode = '';
                }else if(this.chooseItem == 2){
                    this.passOnPeople = v; 
                    this.passOnPeopleCode = this.choosePeopleListInfo[i].userid;
                }
                this.showPicker = false;
                this.chooseItem = '-1';
            },

            //获取身份证照片
            getIdCardPics(name,i){
                let _this = this;
                let params = {};
                params.fileName = name;
                $http(_this.getPicUrl,false,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var path = 'data:image/jpg;base64,'+ res.data;
                            if(i== 1){
                                _this.idCardPicPath1 = 'data:image/png;base64,' + res.data;
                                _this.isShowGif1 = false;
                            }else if(i == 2){
                                _this.idCardPicPath2 = 'data:image/png;base64,' + res.data;
                                _this.isShowGif2 = false;
                            }
                            var path = 'data:image/jpg;base64,'+ res.data;
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //查看图片
            watchIdCardPics(i){
                var arr = [this.idCardPicPath1,this.idCardPicPath2];
                vant.ImagePreview({
                    images:arr,
                    startPosition:i,
                });
            },

            //拒绝
            toRefuse(){
                this.refusePopup = true;
            },
        
            //审批
            toApproval(i){
                let params = {};
                params.tranSeq = this.tranSeq;
                //2是转办
                if(i == 2){
                    if(this.passOnPeople == ''){
                        vant.Toast('请选择转办人');
                        return;
                    }else{
                        params.handoverHumancode = this.passOnPeopleCode;
                    }
                }else{
                    if(i == 0 && this.reason == ''){
                        vant.Toast('请输⼊您要拒绝的原因');
                        return;
                    };
                    params.pass = i + '';
                    params.refuseContent = this.reason; 
                };
                this.refusePopup = false;
                let _this = this;
                $http(_this.toApprovalUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var str = '';
                            if(i == 2){
                                str = '转办成功';
                            }else if(i == 0 || i == 1){
                                str = '审核成功';
                            };
                            $.alert('',str,function () {
                                window.location.href = './applyResult.html?tranSeq=' + _this.tranSeq;
                            })
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //返回
            back(){
                var fromUrl = document.referrer;
                // alert(fromUrl);
                // if(fromUrl == ''){
                //     WeixinJSBridge.call('closeWindow');
                // }else{
                //     window.history.back();
                // }
                if(fromUrl.includes('list')){
                    window.history.back();
                }else{
                    WeixinJSBridge.call('closeWindow');
                }
            },

            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            
            //添加千分位
            numFormat(n) {
                //将数字转化为字符串
                if(n == '' || n==undefined){
                    return '';
                }else{
                    let num = n.toString();
                    let isFu = false;
                    if (num < 0) {
                        isFu = true;
                        num = num.replace(/-/g, '');
                    }
                    //判断小数点截取小数点后面的数字
                    let after = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : '';
                    //如果存在小数点
                    let numArr = num.indexOf('.') > 0 ? num.substring(0, num.indexOf('.')).split('') : num.split('');
                    var str = '';//字符串累加
                    for (var i = numArr.length - 1, j = 1; i >= 0; i--, j++) {
                        if (j % 3 == 0 && i != 0) {//每隔三位加逗号，过滤正好在第一个数字的情况
                            str += numArr[i] + ",";//加千分位逗号
                            continue;
                        }
                        str += numArr[i];//倒着累加数字
                    }
                    if (isFu) {
                        return '-' + str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串

                    } else {
                        return str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串
                    }
                }
            },

        }
    });

}

