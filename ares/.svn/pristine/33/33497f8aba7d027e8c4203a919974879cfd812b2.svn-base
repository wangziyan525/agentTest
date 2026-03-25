function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'bail/findApproveInfo.xa',  //详情接口
            toSubmitUrl: 'bail/approve.xa',  //提交接口

            batchNo:'',

            infos:{},      //基础信息
            approvalInfo:{},   //审批信息
            showPickerType:false,  //下拉选人
            chooseTypeList:[
                {name:'按季计息',isChoose:false},
                {name:'销户结息',isChoose:false},
            ],
            approveInfo:{
                OPEN_ACCT_RATE:'',     //保证金账户利率
                PAY_TYPE:'',           //保证金账户付息方式
                ACCP_NAME:'',          //承兑人名称
                ACCP_LEGAL_NAME:'',    //承兑人法定代表人
                ACCP_ADDR:'',          //承兑人通讯地址
                ACCP_MOBILE:'',        //承兑人联系电话
                ACCP_ZIP_CODE:'',      //承兑人邮编
                ACCP_FAX:'',           //承兑人传真
                
                REQ_NAME:'',           //申请人名称
                REQ_LEGAL_NAME:'',     //申请人法定代表人
                REQ_ADDR:'',           //申请人通讯地址
                REQ_MOBILE:'',         //申请人联系电话
                REQ_ZIP_CODE:'',       //申请人邮编
                REQ_FAX:'',            //申请人传真
                
            },
            isApproved:false, //是否审批过了
            refusePopup:false,  //拒绝弹框
            reason:'', 
 
            mobileTimer:null,  //联系方式的防抖
            accpZipCodeTimer:null,  //邮编的防抖
            accpFaxTimer:null,  //传真的防抖

            contenteditable:true,

            isClicked:false,  //是否点击


        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

            this.batchNo = this.getQueryString('batchNo');

        },
        mounted: function () {

            //获取详情
            this.getDetail();


        },
        methods: {


            //获取详情
            getDetail(){
                let _this = this;
                let params = {};
                params.BATCH_NO = _this.batchNo;
                $http(_this.getDetailUrl,true,params, true,60)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.infos = res.data.bussinessInfo;
                            _this.approvalInfo = res.data.approveInfo;
                            if(_this.approvalInfo.STATUS == '0'){
                                    _this.isApproved = false;
                            }else if(_this.approvalInfo.STATUS == '1'){
                                _this.isApproved = true;
                                document.title = '审批详情';
                            }else if(_this.approvalInfo.STATUS == '5'){
                                var tipText = '该笔业务已过期作废';
                                $.alert('',tipText,function(){
                                    WeixinJSBridge.call('closeWindow');
                                });
                            }else{
                                _this.isApproved = true;
                                document.title = '审批详情';
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //选计息方式(废弃)
            choosePickerType(){
                this.showPickerType = true;
            },

            //选择计息方式确认(废弃)
            onTypeConfirm(v,i){
                this.showPickerType = false;
                this.approveInfo.PAY_TYPE = v;
            },

            //选择计息方式
            selectStatus(i){
                for(var j=0;j<this.chooseTypeList.length;j++){
                    this.$set(this.chooseTypeList[j],'isChoose',false);
                };
                this.$set(this.chooseTypeList[i],'isChoose',true);
                this.approveInfo.PAY_TYPE = this.chooseTypeList[i].name;
                this.showPickerType = false;
            },

            //选中计息方式


            //监听输入
            
            //承兑⼈名称1
            handleAccpNameInput(){
                // if(this.$refs.ACCP_NAME.textContent.length > 6){
                //     this.$refs.ACCP_NAME.textContent = this.$refs.ACCP_NAME.textContent.substring(0,6);
                //     this.approveInfo.ACCP_NAME = this.$refs.ACCP_NAME.textContent;
                //     this.setCurso(this.$refs.ACCP_NAME);
                // }else{
                    this.approveInfo.ACCP_NAME = this.$refs.ACCP_NAME.textContent;
                // }
            },
            //通讯地址1
            handleAccpAddrInput(){
                this.approveInfo.ACCP_ADDR = this.$refs.ACCP_ADDR.textContent;
            },
         
            //通讯地址2
            handleReqAddrInput(){
                this.approveInfo.REQ_ADDR = this.$refs.REQ_ADDR.textContent;
            },


            //限制最多4位小数点
            openAcctRateLength(){
                this.approveInfo.OPEN_ACCT_RATE = this.approveInfo.OPEN_ACCT_RATE.match(/^\d*(?:\.\d{0,4})?/g)[0] || '';
                if(this.approveInfo.OPEN_ACCT_RATE < 0 || this.approveInfo.OPEN_ACCT_RATE > 2 ){
                    vant.Toast('利率应在0%-2%之间');
                    this.approveInfo.OPEN_ACCT_RATE = '';
                }
            },

            //联系方式正则（防抖）
            mobileTest(i){
                // if(this.mobileTimer){
                //     clearTimeout(this.mobileTimer);
                // }
                // this.mobileTimer = setTimeout(()=>{
                //     this.mobileTest1(i);
                // },2000)
            },
            mobileTest1(i){
                if(i == 1){
                    if(!this.callTest(this.approveInfo.ACCP_MOBILE)){
                        vant.Toast('请输入正确的承兑⼈联系方式');
                    }
                }else if(i == 2){
                    if(!this.callTest(this.approveInfo.REQ_MOBILE)){
                        vant.Toast('请输入正确的承兑申请⼈联系方式');
                    }
                }
            },

            //邮编的正则（防抖）
            accpZipCodeTest(i){
                // if(this.accpZipCodeTimer){
                //     clearTimeout(this.accpZipCodeTimer);
                // };
                // this.accpZipCodeTimer = setTimeout(()=>{
                //     this.accpZipCodeTest1(i);
                // },2000)
            },
            accpZipCodeTest1(i){
                let accpZipCodeRegex = /^[1-9]\d{5}$/;
                if(i == 1){
                    if(!accpZipCodeRegex.test(this.approveInfo.ACCP_ZIP_CODE)){
                        vant.Toast('请输入正确的承兑⼈邮编');
                    }
                }else if(i == 2){
                    if(!accpZipCodeRegex.test(this.approveInfo.REQ_ZIP_CODE)){
                        vant.Toast('请输入正确的承兑申请⼈邮编');
                    }
                }
                
            },

            //传真的正则
            accpFaxTest(i){
                // if(this.accpFaxTimer){
                //     clearTimeout(this.accpFaxTimer);
                // };
                // this.accpFaxTimer = setTimeout(()=>{
                //     this.accpFaxTest1(i);
                // },1000)
            },
            accpFaxTest1(i){
                // let faxRegex = /^((\+\d{1,3}[\s-]?)?\(?\d{3,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4})|((\+\d{1,3}[\s-]?)?(\d{3,4}[\s-]?){2,3}\d{3,4})(?:[\s-]*(?:ext|分机|#)\s*\d{1,5})?$/;
                let faxRegex = /^0\d{2,3}-?\d{7,8}$/;
                if(i == 1){
                    if(!faxRegex.test(this.approveInfo.ACCP_FAX)){
                        vant.Toast('请输入正确的承兑⼈传真');
                    }
                }else if(i == 2){
                    if(!faxRegex.test(this.approveInfo.REQ_FAX)){
                        vant.Toast('请输入正确的承兑申请⼈传真');
                    }
                }
                
            },

            //拒绝
            toRefuse(){
                this.refusePopup = true;
            },
               
            //同意
            toApproval(i){
                if(i == 0 && this.approveInfo.OPEN_ACCT_RATE == ''){
                    vant.Toast('请输入保证金账户利率');
                    return;
                };
                if(i == 0 && this.approveInfo.PAY_TYPE == ''){
                    vant.Toast('请选择保证金账户付息方式');
                    return;
                };
                var str = this.approveInfo.ACCP_NAME;
                if(i == 0 && this.approveInfo.ACCP_NAME == ''){
                    vant.Toast('请输入承兑人名称');
                    return;
                };
                if(i == 0 && this.approveInfo.ACCP_NAME.length > 60){
                    vant.Toast('承兑人名称不能超过60字');
                    return;
                };
                if(i == 0 && this.approveInfo.ACCP_LEGAL_NAME == ''){
                    vant.Toast('请输入承兑人法定代表人');
                    return;
                };
                if(i == 0 && this.approveInfo.ACCP_LEGAL_NAME.length > 25){
                    vant.Toast('承兑人法定代表人不能超过25字');
                    return;
                };
                if(i == 0 && this.approveInfo.ACCP_ADDR == ''){
                    vant.Toast('请输入承兑人通讯地址');
                    return;
                };
                if(i == 0 && this.approveInfo.ACCP_ADDR.length > 80){
                    vant.Toast('承兑人通讯地址不能超过80字');
                    return;
                };
                if(i == 0 && this.approveInfo.ACCP_MOBILE == ''){
                    vant.Toast('请输入承兑人联系电话');
                    return;
                };
                if(i == 0 && !this.callTest(this.approveInfo.ACCP_MOBILE)){
                    vant.Toast('请输入正确的承兑⼈联系电话');
                    return;
                }
                // if(i == 0 && this.approveInfo.ACCP_ZIP_CODE == ''){
                //     vant.Toast('请输入承兑人邮编');
                //     return;
                // };
                let accpZipCodeRegex = /^[1-9]\d{5}$/;
                if(i == 0 && this.approveInfo.ACCP_ZIP_CODE != '' && !accpZipCodeRegex.test(this.approveInfo.ACCP_ZIP_CODE)){
                    vant.Toast('请输入正确的承兑⼈邮编');
                    return;
                }
                // if(i == 0 && this.approveInfo.ACCP_FAX == ''){
                //     vant.Toast('请输入承兑人传真');
                //     return;
                // }; 
                // let faxRegex = /^((\+\d{1,3}[\s-]?)?\(?\d{3,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4})|((\+\d{1,3}[\s-]?)?(\d{3,4}[\s-]?){2,3}\d{3,4})(?:[\s-]*(?:ext|分机|#)\s*\d{1,5})?$/;
                let faxRegex = /^0\d{2,3}-?\d{7,8}$/;
                if(i == 0 && this.approveInfo.ACCP_FAX != '' && !faxRegex.test(this.approveInfo.ACCP_FAX)){
                    vant.Toast('请输入正确的承兑⼈传真');
                    return;
                }          
                if(i == 0 && this.infos.DRWR_NAME == ''){
                    vant.Toast('请输入承兑申请人名称');
                    return;
                };
                if(i == 0 && this.approveInfo.REQ_LEGAL_NAME == ''){
                    vant.Toast('请输入承兑申请人法定代表人');
                    return;
                };
                if(i == 0 && this.approveInfo.REQ_LEGAL_NAME.length > 25){
                    vant.Toast('承兑申请人法定代表人不能超过25字');
                    return;
                };
                if(i == 0 && this.approveInfo.REQ_ADDR == ''){
                    vant.Toast('请输入承兑申请人通讯地址');
                    return;
                };
                if(i == 0 && this.approveInfo.REQ_ADDR.length > 80){
                    vant.Toast('承兑申请人通讯地址不能超过80字');
                    return;
                };
                if(i == 0 && this.approveInfo.REQ_MOBILE == ''){
                    vant.Toast('请输入承兑申请人联系电话');
                    return;
                };
                if(i == 0 && !this.callTest(this.approveInfo.REQ_MOBILE)){
                    vant.Toast('请输入正确的承兑申请人联系电话');
                    return;
                }
                // if(i == 0 && this.approveInfo.REQ_ZIP_CODE == ''){
                //     vant.Toast('请输入承兑申请人邮编');
                //     return;
                // };
                if(i == 0 && this.approveInfo.REQ_ZIP_CODE != '' && !accpZipCodeRegex.test(this.approveInfo.REQ_ZIP_CODE)){
                    vant.Toast('请输入正确的承兑申请⼈邮编');
                    return;
                }
                // if(i == 0 && this.approveInfo.REQ_FAX == ''){
                //     vant.Toast('请输入承兑申请人传真');
                //     return;
                // };
                if(i == 0 && this.approveInfo.REQ_FAX != '' && !faxRegex.test(this.approveInfo.REQ_FAX)){
                    vant.Toast('请输入正确的承兑申请人传真');
                    return;
                }  
                if(i == 1 && this.reason == ''){
                    vant.Toast('请输入驳回理由');
                    return;
                }
                this.toSubmit(i);
            },

            toSubmit(i){
                this.isClicked = true;
                var params = {};
                params.BATCH_NO = this.batchNo;
                params.OPEN_ACCT_RATE = this.approveInfo.OPEN_ACCT_RATE;
                if(this.approveInfo.PAY_TYPE == '按季计息'){
                    params.PAY_TYPE = '2';
                }else if(this.approveInfo.PAY_TYPE == '销户结息'){
                    params.PAY_TYPE = '5';
                }else{
                    params.PAY_TYPE = '';
                };
                params.ACCP_NAME = this.approveInfo.ACCP_NAME;
                params.ACCP_LEGAL_NAME = this.approveInfo.ACCP_LEGAL_NAME;
                params.ACCP_ADDR = this.approveInfo.ACCP_ADDR;
                params.ACCP_MOBILE = this.approveInfo.ACCP_MOBILE;
                params.ACCP_ZIP_CODE = this.approveInfo.ACCP_ZIP_CODE;
                params.ACCP_FAX = this.approveInfo.ACCP_FAX;
                params.REQ_NAME = this.infos.DRWR_NAME;
                params.REQ_LEGAL_NAME = this.approveInfo.REQ_LEGAL_NAME;
                params.REQ_ADDR = this.approveInfo.REQ_ADDR;
                params.REQ_MOBILE = this.approveInfo.REQ_MOBILE;
                params.REQ_ZIP_CODE = this.approveInfo.REQ_ZIP_CODE;
                params.REQ_FAX = this.approveInfo.REQ_FAX;
                
                if(i == 3){
                    params.AUTH_FLAG = 1;
                }else{
                    params.AUTH_FLAG = i;
                }
                
                params.REJECT_REASON = this.reason;

                this.refusePopup = false;
                let _this = this;

                console.log(params);
                $http(_this.toSubmitUrl,true,params, true,60,'')
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(i == '0'){
                                $.alert('','审核成功',function () {
                                    window.location.href = './invoiceResult.html?batchNo=' + _this.batchNo;
                                })
                            }else if(i == '1'){
                                $.alert('','已驳回',function () {
                                    window.location.href = './invoiceResult.html?batchNo=' + _this.batchNo;
                                })
                            }else if(i == '3'){
                                $.alert('','已拒绝',function () {
                                    WeixinJSBridge.call('closeWindow');
                                })
                            };
                            
                        }else if(res.retcode == 'bzj.auth_id_mismatch'){
                            var tip = '客户管户经理已变更，该笔交易将被拒绝';
                            $.alert('',tip,function(){
                                _this.reason = tip;
                                _this.toSubmit(3);
                            });
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
                if(fromUrl.includes('invoiceList')){
                    window.history.back();
                }else{
                    WeixinJSBridge.call('closeWindow');
                }
            },


            //去往票据详情
            toBillDetail(){
                window.location.href = './billInfo.html?batchNo=' + this.batchNo + '&type=1';
            },

            //超过限制长度，光标会跑到前面去
            setCurso(el){
                const rang = document.createRange();
                const selection = window.getSelection();
                rang.selectNodeContents(el);
                rang.collapse(false);
                selection.removeAllRanges();
                selection.addRange(rang);
                //移动端
                el.focus();
                //ios特殊处理
                if(/iPhone|iPad|iPod/.test(navigator.userAgent)){
                    setTimeout(()=>el.focus(),10);
                }
            },


            //电话正则（手机和座机）
            callTest(tel){
                let mobileRegex = /^1[3-9]\d{9}$/;
                let telRegex = /^0\d{2,3}-?\d{7,8}$/;
                return mobileRegex.test(tel) || telRegex.test(tel);
            },

            //页面回到原处
            scrollBank(){
                window.scrollTo(0,0);
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
           

        },
        beforeDestroy () {
            if(this.accpZipCodeTimer){
                clearTimeout(this.accpZipCodeTimer);
            };
        },
    });

}

