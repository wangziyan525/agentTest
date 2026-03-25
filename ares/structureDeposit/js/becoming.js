function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'structuralDeposits/findDetail.xa',//详情接口
            toSubUrl: 'structuralDeposits/approve.xa',//审批接口


            productCode:'',   //产品代码
            flowNo:'',       //流水号
            infos:{},       //详情信息
            role:'',       //'审批阶段  10：零售部初审 20：零售部复审 30：金融部初审 40：金融部复审';
            approvedInfos:{}, //审批回显状态 0为待审批 1为审批成功 3：审批驳回'
            weightedRate:'',  //输入的产品加权平均利率
            rateList:[],   //重置利率列表
            rateInfo:{},   //重置利率信息
            isshowRateList:false,
            currentDate:new Date(),
            minDate:new Date(),
            maxDate:new Date(),

            isApproval:true, //是否是审批
            refusePopup:false,  //拒绝弹框
            flowPopup:false,  //流转信息弹框
            flowList:[],
            isFirstApprove:true, //是否是第一个人审批
            reason:'',  //驳回原因

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

            this.productCode = this.getQueryString('productCode');
            this.flowNo = this.getQueryString('flowNo');

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
                params.flowNo = _this.flowNo;
                params.productCode = _this.productCode;
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.role = res.data.roleFlag;
                            _this.infos = res.data.product;
                            if(res.data.approveInfoList.length == 1){
                                _this.flowList = [];
                                _this.isFirstApprove = true;
                            }else {
                                _this.flowList = res.data.approveInfoList;
                                _this.isFirstApprove = false;
                            };
                            _this.rateList = res.data.product.rateList;
                            if(res.data.approveFlag == '1'){
                                _this.isApproval = true;
                            }else {
                                _this.isApproval = false;
                            };
                            //处理已审批
                            _this.approvedInfo();
                            //处理利率日期
                            _this.getLilvDate();
                            console.log(_this.flowList);
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //截取小数点后4位
            toFixeda(num){
                num = new Decimal(num).times(100);
                var str = num.toString();
                var match = str.match(/^-?\d+(?:\.\d{0,4})?/);
                return match ? parseFloat(match[0]) : 0;
            },

            //处理已审批
            approvedInfo(){
                for(var i=0;i<this.flowList.length;i++){
                    if(this.flowList[i].approveState == this.role){
                        this.approvedInfos = this.flowList[i];
                        break;
                    }
                };
            },


            //展示流转信息
            showFlow(){
                this.flowPopup = true;
            },

            //处理利率日期
            getLilvDate(){
                var min = this.rateList[0].quotationDate;
                var max = this.rateList[this.rateList.length - 1].quotationDate;
                this.minDate = new Date(min.slice(0,4),min.slice(4,6)-1,min.slice(6,8));
                this.maxDate = new Date(max.slice(0,4),max.slice(4,6)-1,max.slice(6,8));
                this.rateInfo = this.rateList[0];
            },


            //日历查看
            getRateDate(val){
                var year = val.getFullYear();
                var month = val.getMonth() + 1;
                let day = val.getDate();
                if(month < 10){
                    month = '0'+ month;
                };
                if(day< 10){
                    day = '0'+ day;
                };
                var time = year.toString() + month.toString() + day.toString();
                for(var i=0;i<this.rateList.length;i++){
                    if(this.rateList[i].quotationDate == time){
                        this.rateInfo = this.rateList[i];
                        break;
                    }
                };
            },

            //审批
            tosubInfo(i){
                if(i == '2' && this.reason == ''){
                    vant.Toast('请输入驳回理由');
                    return;
                };
                let _this = this;
                let params = {};
                params.flowNo = _this.flowNo;
                params.approveStatus = i+'';
                params.content = _this.reason;
                if(i == '1' && this.approvedInfos.rebackFlag == 1){
                    params.weightedRate = _this.infos.weightedRate;
                }
                $http(_this.toSubUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var str = '';
                            if(i == '1'){
                                str = '审核成功';
                            }else if(i == '2'){
                                str = '已驳回';
                            };
                            _this.refusePopup = false;
                            _this.reason = '';
                            $.alert('',str,function () {
                                //获取详情
                                _this.getDetail();
                            })
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

            //日期转换
            readDate(data){
                if(!data || data == ''){
                    return '--';
                }else{
                    var str = String(data);
                    return str.slice(0,4) + '-' + str.slice(4,6) + '-' + str.slice(6,8);
                }
            },

            //返回
            back(){
                history.back();
            },

            //产品状态
            readProductStatus(str){
                switch (str) {
                    case '0':return '开放期';
                    case '1':return '募集期';
                    case '2':return '发行成功';
                    case '3':return '发行失败';
                    case '4':return '停止交易';
                    case '5':return '停止申购';
                    case '6':return '停止赎回';
                    case '7':return '权益登记';
                    case '8':return '红利发放';
                    case '9':return '产品封闭期';
                    case 'a':return '产品终止';
                    case 'b':return '预约认购期';
                    default:break;
                }
            },

            //时间格式处理
            readMyTime(str){
                var arr = str.split('.') ;
                return arr[0]
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

