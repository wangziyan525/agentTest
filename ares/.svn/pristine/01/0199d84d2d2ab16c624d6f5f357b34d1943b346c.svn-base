function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'onlineCapital/getOnlineCapitalApprovalDetail.xa',  //详情接口
            getApprovePeopleUrl: 'onlineCapital/getOnlineCapitalApprovalPerson.xa',  //下拉选择人
            toApprovalUrl: 'onlineCapital/onlineCapitalApproval.xa',  //审批
            getFlowUrl: 'onlineCapital/getOnlineCapitalApprovalPersonList.xa',  //流转信息
            getPdfUrl: 'generalFileDownload/onlineCapital/getOnlineCapitalPDF.xa',  //查看pdf


            TRAN_SEQ:'',
            LEVEL:'',  //1-经办人 2.复核 3.会计主管
            infos:{},
           
            isApproval:true, //是否是审批
            refusePopup:false,  //拒绝弹框
            showPickerPeople:false,  //下拉选人
            choosePeopleList:[],
            choosePeopleListInfo:[],
            choosedName:'',

            flowPopup:false,  //流转信息弹框
            flowList:[],
            approvedInfos:{},  //审批信息

            reason:'', 


            isApproved:false, //是否审批过了

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });


            this.TRAN_SEQ = this.getQueryString('TRAN_SEQ');

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
                params.TRAN_SEQ = _this.TRAN_SEQ;
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                           _this.infos = res.data;
                           _this.LEVEL = res.data.LEVEL;
                           _this.isApproved = res.data.APPROVE_AUTH; //是否审批过了 0-没有审批 1-审批过了
                            if(res.data.APPROVE_FLAG == 'Y'){
                                _this.isApproval = true;
                                if(_this.LEVEL == '1' || _this.LEVEL == '2'){
                                    _this.getApprovePeopl();
                                }
                            }else if(res.data.APPROVE_FLAG == 'N'){
                                _this.isApproval = false;
                                _this.getFlow();
                            }
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
            choosePickerPeople(i){
                this.showPickerPeople = true;
            },

            //选人确认
            onPeopleConfirm(v,i){
                this.showPickerPeople = false;
                this.choosedName = v;
            },

            //获取流转信息
            getFlow(){
                let _this = this;
                let params = {};
                params.TRAN_SEQ = _this.TRAN_SEQ;
                $http(_this.getFlowUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.flowList = res.data.LIST;
                            for(var i=0;i<_this.flowList.length;i++){
                                if(_this.flowList[i].LEVEL == _this.LEVEL){
                                    _this.approvedInfos = _this.flowList[i];
                                    break;
                                }
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },
            
            //拒绝
            toRefuse(){
                this.refusePopup = true;
            },

            //展示流转信息
            showFlow(){
                this.flowPopup = true;
            },

            //审批
            toApproval(i){
                if(i == 0 && this.choosedName == '' && (this.LEVEL == '1' || this.LEVEL == '2')){
                    vant.Toast('请选择审批人');
                    return;
                }
                if(i == 1 && this.reason == ''){
                    vant.Toast('请输入驳回理由');
                    return;
                }
                let _this = this;
                let params = {};
                params.TRAN_SEQ = _this.TRAN_SEQ;
                if(i == 0){
                    params.ISPASS = 'Y';
                    params.REFUSED_MSG = '';
                }else{
                    params.ISPASS = 'N';
                    params.REFUSED_MSG = _this.reason;
                };
                for(var j=0;j<_this.choosePeopleListInfo.length;j++){
                    if(_this.choosePeopleListInfo[j].idcardname == _this.choosedName){
                        params.NEXT_TELNO = _this.choosePeopleListInfo[j].userid;
                        break;
                    }
                };
                _this.refusePopup = false;
                $http(_this.toApprovalUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var str = '';
                            if(i == '0'){
                                str = '审核成功';
                            }else if(i == '1'){
                                str = '已驳回';
                            };
                            $.alert('',str,function () {
                                window.location.href = './applyResult.html?TRAN_SEQ=' + _this.TRAN_SEQ + '&role=' + _this.LEVEL;
                            })
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //查看pdf
            wactchPdf(i){
                var type;
                if(i == 1){
                    type = 'MLH';
                }else if(i == 2){
                    type = 'SQS';
                }else if(i == 3){
                    type = 'ZKPZ';
                };
                var url = base.context + this.getPdfUrl + '?TRAN_SEQ=' + this.TRAN_SEQ + '&FILE_TYPE=' + type;
                var pdfUrl = './assets/web/viewer.html?file=' + encodeURIComponent(url) +'&fileType=' + type + '&id=' + this.TRAN_SEQ;
                window.location.href = pdfUrl;
            },

            //产品状态
            readTranStatus(str){
                switch (str) {
                    case '1':return '交易提交,待发送';
                    case '10':return '交易未知';
                    case '11':return '银行处理中';
                    case '12':return '处理中';
                    case '13':return '认证增强';
                    case '14':return '交易通过,待发送';
                    case '16':return '银行落地处理中,请联系开户行';
                    case '3':return '银行已受理';
                    case '4':return '交易成功';
                    case '5':return '交易失败';
                    case '6':return '银行落地处理中,请联系开户行';
                    case '7':return '交易被拒绝';
                    case '8':return '部分成功';
                    case '9':return '落地作废';
                    default:break;
                }
            },

            //返回
            back(){
                var fromUrl = document.referrer;
                if(fromUrl == ''){
                    WeixinJSBridge.call('closeWindow');
                }else{
                    window.history.back();
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

