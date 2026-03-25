function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'structuralDeposits/collect/findDetail.xa',//详情接口


            productCode:'',   //产品代码
            flowNo:'',       //流水号
            infos:{},       //详情信息
            rateList:[],   //重置利率列表
            rateInfo:{},   //重置利率信息
            isshowRateList:false,
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
            this.getDetail();

        },
        methods: {

            //获取详情
            getDetail(){
                let _this = this;
                let params = {};
                params.productCode = _this.productCode;
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.infos = res.data;
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
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
                    console.log(n,'n')
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

