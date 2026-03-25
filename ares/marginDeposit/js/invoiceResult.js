function action() {
    new Vue({
        el: '#app',
        data: {


            //接口
            getDetailUrl: 'bail/findApproveInfo.xa',  //详情接口

            batchNo:'',

            approvalInfo:{},   //审批信息

        },
        created() {

            // 调用水印
            __canvasWM({
                content: $.parseJSON($.cookie("user")).name,
            });

            //ios返回刷新
            window.addEventListener('pageshow', function (e) {
                if (e.persisted) {
                    window.location.reload();
                }
            });

            this.batchNo = this.getQueryString('batchNo');


        },
        mounted() {
            
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
                            _this.approvalInfo = res.data.approveInfo;
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //完成
            over(){
                window.history.back();
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
    });
};


