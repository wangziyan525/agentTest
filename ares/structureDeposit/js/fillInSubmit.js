function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'structuralDeposits/flexible/findDetail.xa',  //详情接口
            toSubParticipationUrl: 'structuralDeposits/submitRate.xa',   //提交参与率



            productCode:'',  //产品代码
            infos:{},
            participationRate:'',  //参与率
            isshowRateList:false,
            rateList:[],
            rateInfo:{},   //重置利率信息

            isshowListDetail:false,
            isshowListDetail1:false,
            currentDate:new Date(),
            minDate:new Date(),
            maxDate:new Date(),


        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

            this.productCode = this.getQueryString('productCode');

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
                params.productCode = _this.productCode;
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                           _this.infos = res.data;
                           _this.rateList =  res.data.rateList;
                            //处理利率日期
                            _this.getLilvDate();
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


            //保存参与率
            subParticipation(){
                if(this.participationRate == ''){
                    vant.Toast('请输入参与率');
                    return;
                };
                let _this = this;
                let params = {};
                params.participationRate = _this.participationRate;
                params.prouctCode = _this.productCode;
                $http(_this.toSubParticipationUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            $.alert('','保存成功',function(){
                                _this.getInfos();
                            });
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //参与率
            participationRateTest(event){
                var val = event.target.value;
                var ragex = /^([0-9]|[1-9][0-9]|100)$/;
                if(!ragex.test(val)){
                    vant.Toast('请输入0-100的整数');
                    this.participationRate = '';
                }else{
                    this.participationRate = val;
                }
            },

            //处理日历
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

            //日期转换
            readDate(data){
                if(!data || data == ''){
                    return '--';
                }else{
                    var str = String(data);
                    return str.slice(0,4) + '-' + str.slice(4,6) + '-' + str.slice(6,8);
                }
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

