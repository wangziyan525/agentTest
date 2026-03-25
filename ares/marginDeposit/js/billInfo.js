function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl1: 'bail/findApproveInfo.xa',  //详情接口
            getDetailUrl2: 'bail/xd/queryBusinessApplication.xa',  //详情接口
            batchNo:'',
            type:'',
            billList:[],      //票据列表
            isShowDown:false,

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

            this.batchNo = this.getQueryString('batchNo');
            this.type = this.getQueryString('type');

        },
        mounted: function () {

            //获取详情
            if(this.type == '1'){
                //获取详情（开票）
                this.getDetail1();
            }else if(this.type == '2'){
                //获取详情（申请）
                this.getDetail2();
            }
            
        },
        methods: {


            //获取详情（开票）
            getDetail1(){
                let _this = this;
                let params = {};
                params.BATCH_NO = _this.batchNo;
                $http(_this.getDetailUrl1,true,params, true,60)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.billList = res.data.bussinessInfo.BILL_LIST;
                            _this.isShowDown = true;
                        }else{
                            _this.isShowDown = false;
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //获取详情（申请）
            getDetail2(){
                let _this = this;
                let params = {};
                params.FlwSeqNum = _this.batchNo;
                $http(_this.getDetailUrl2,true,params, true,60)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var data = res.data;
                            _this.billList = data.bussinessInfo.BILL_LIST; //开票信息
                            _this.isShowDown = true;
                        }else{
                            _this.isShowDown = false;
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
           

        }
    });

}

