function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'bail/xd/queryBusinessApplication.xa',  //详情接口
            toSubmitUrl: 'bail/xd/submitApprove.xa',  //提交接口
            getApplyPeopleListUrl: 'bail/xd/queryNextAction.xa',  //获取提交人接口


            batchNo:'',
            tabActive:0,

            infos:{},
            invoiveInfo:{},    //开票信息
            busInfos:{},       //业务信息
            guaranteeInfos:{},  //担保信息
            collateralInfos:{},  //押品信息


            subType:'',
            showPickerType:false,  //下拉审批人选人
            applyTypeInfoList:[], //审批动作列表信息
            applyTypeList:[],

            isShowkerPeopleDom:false, //是否展示审批人选项
            showPickerPeople:false,  //下拉审批人选人
            choosePeopleListInfo:[], 
            choosePeopleList:[],
            subPeople:'',
          
            reason:'', 

            flowPopup:false,  //流转信息弹框
            flowList:[],

            isApproved:false, //是否审批过了
          
            approveTime:'',  //审批时间
            approveReason:'',  //审批意见
            approveStatus:'',  //审批状态

            
            showMain1:false,  // 票据承兑信息-查看详情
            showMain2:false,  // 业务基础信息-查看详情
            showMain3:false,  // 统计指标-查看详情
            showMain4:false,  // 其他信息-查看详情

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

            //获取提交人列表接口
            getApplyPeopleList(){
                let _this = this;
                let params = {};
                params.FlwSeqNum = _this.batchNo;
                $http(_this.getApplyPeopleListUrl,true,params, true,60)
                    .then(res => {
                        if(res.retcode == 'success'){
                            //审批动作
                            _this.applyTypeInfoList = res.data.PhaseActionList;
                            var arr = [];
                            for(var i=0;i<_this.applyTypeInfoList.length;i++){
                                arr.push(_this.applyTypeInfoList[i].SubAction);
                            }
                            _this.applyTypeList = arr;
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //获取详情
            getDetail(){
                let _this = this;
                let params = {};
                params.FlwSeqNum = _this.batchNo;
                $http(_this.getDetailUrl,true,params, true,60)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var data = res.data;
                            _this.invoiveInfo = data.bussinessInfo; //开票信息
                            _this.busInfos = data.BsInf[0];    //业务信息
                            _this.guaranteeInfos = data.GrInf[0];   //担保信息
                            _this.collateralInfos = data.AstInf[0];    //押品信息
                            _this.flowList = data.FlowTaskList;   //审批流转信息
                            if(data.AprvSt == ''){
                                _this.isApproved = false; //没审批
                                //获取提交人列表接口
                                _this.getApplyPeopleList();
                            }else{
                                _this.isApproved = true; //已审批
                            };
                            _this.approveTime = data.EmnAprvTm;     //审批时间
                            _this.approveReason = data.AprvCs;  //审批意见
                            _this.approveStatus = data.AprvSt;   //审批状态
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //顶部tab切换
            changeTabActive(i){
                if(this.tabActive != i){
                    this.tabActive = i;
                    this.$refs.main.scrollTop = 0;
                }
            },

            //提交
            toSub(){
                if(this.subType == ''){
                    vant.Toast('请选择审批方式');
                    return;
                };
                if(this.choosePeopleListInfo.length >0  && this.subPeople == ''){
                    vant.Toast('请选择审批人员');
                    return;
                };
                if(this.reason == ''){
                    vant.Toast('请输入审批意见');
                    return;
                }
                this.toSub1();
            },
            toSub1(){
                this.isClicked = true;
                var params = {};
                params.FlwSeqNum = this.batchNo;
                params.AprvRsn = this.reason;
                params.SubAction = this.subType;
                var id = '';
                var name ='';
                for(var i=0;i<this.choosePeopleListInfo.length;i++){
                    if(this.choosePeopleListInfo[i].SubManName == this.subPeople){
                        id = this.choosePeopleListInfo[i].SubMan;
                        name = this.choosePeopleListInfo[i].SubManName;
                    }
                };
                params.NextAprv = id;
                params.NextAprvNm = name;
                let _this = this;
                $http(_this.toSubmitUrl,true,params, true,60)
                    .then(res => {
                        if(res.retcode == 'success'){
                            $.alert('','提交成功',function () {
                                window.location.href = './applyResult.html?batchNo=' + _this.batchNo;
                            })
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },
            
            //选择审批节点确认
            onTypeConfirm(v,i){
                this.subType = v;
                this.showPickerType = false;
                this.subPeople = '';

                if(this.applyTypeInfoList[i].LIST){
                    var arr = this.applyTypeInfoList[i].LIST;
                    this.choosePeopleListInfo = arr;
                    var nameArr = [];
                    for(var j=0;j<arr.length;j++){
                        nameArr.push(arr[j].SubManName);
                    };
                    this.choosePeopleList = nameArr;
                    this.isShowkerPeopleDom = true;
                }else{
                    this.choosePeopleListInfo = [];
                    this.choosePeopleList = [];
                    this.isShowkerPeopleDom = false;
                };
            },

            //选审批人确认
            onPeopleConfirm(v,i){
                this.subPeople = v;
                this.showPickerPeople = false;
            },

            //查看更多详情
            toAppendixDetail(i){
                if(i == 1){
                    this.showMain1 = true;
                    document.title = '票据承兑信息';
                }else if(i == 2){
                    this.showMain2 = true;
                    document.title = '业务基础信息';
                }else if(i == 3){
                    this.showMain3 = true;
                    document.title = '统计指标';
                }else if(i == 4){
                    this.showMain4 = true;
                    document.title = '其他信息';
                }
                this.$refs.appendixMain.scrollTop = 0;
            },

            //查看更多返回
            appendixBack(){
                this.showMain1 = false;
                this.showMain2 = false;
                this.showMain3 = false;
                this.showMain4 = false;
                document.title = '银⾏承兑汇票业务申请审批';
            },

            //状态颜色
            readStatus(str){
                if(str){
                    if(str.includes('否决') || str.includes('拒绝')){
                        return 'status2'
                    }else if(str.includes('再议')){
                        return 'status3'
                    }else{
                        return 'status1'
                    }
                }else{
                    return 'status1' 
                }
                
            },

             //去往票据详情
             toBillDetail(){
                window.location.href = './billInfo.html?batchNo=' + this.batchNo + '&type=2';
            },

            //返回
            back(){
                var fromUrl = document.referrer;
                if(fromUrl.includes('applyList')){
                    window.history.back();
                }else{
                    WeixinJSBridge.call('closeWindow');
                }
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

        }
    });

}

