function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'structuralDeposits/flexible/findList.xa',//列表接口(一期)
            getApproveListUrl: 'structuralDeposits/findList.xa',//列表审批接口(二期)
            getCollectListUrl: 'structuralDeposits/collect/findList.xa',//募集列表接口(一期)

            active:0,
            list:[],
            pagenum:1,//页码
            callbacktest: false, //分页开关
            isHaveList:false,
            noList:false,


        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {

            //获取一期列表
            this.getList();

        },
        methods: {

            //监听元素滚动高度
            handleScroll(){
                var mainH1 = this.$refs.main.scrollTop; //元素滚动高度
                var mainH2 = this.$refs.main.scrollHeight;//元素高度
                var windowH = $(window).height();  //可视
                if (windowH + 50 + mainH1 >= mainH2) {
                    if (this.callbacktest == true) {
                        this.callbacktest = false;
                        this.getList();
                    }
                }
            },

            //顶部tab切换
            activeChange(i,v){
                this.list = [];
                this.pagenum = 1;
                this.callbacktest = false; //分页开关
                this.haveList = false;
                this.noList = false;
                if(i == '0'){
                    //获取一期列表
                    this.getList();
                }if(i == '1'){
                    //获取募集列表
                    this.getCollectList();
                }else if(i == '2'){
                    //获取二期审批列表
                    this.getApproveList(1);
                }else if(i == '3'){
                    //获取二期审批列表
                    this.getApproveList(2);
                }
            },

            //-------------------------------------------------------------------------------------------- 一期

            //获取列表(一期)
            getList(){
                let _this = this;
                let params = {};
                params.queryType = '0';
                params.pageNum = _this.pagenum;
                params.pageSize = 10;
                $http(_this.getListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data){
                                var arr = res.data.productList;
                                if(arr.length == 0){
                                    if(_this.pagenum == 1){
                                        _this.isHaveList = false;
                                        _this.noList = true;
                                        _this.callbacktest = false;
                                    }
                                }else{
                                    _this.isHaveList = true;
                                    _this.noList = false;
                                    for (let i = 0; i < arr.length; i++) {
                                        _this.list.push(arr[i]);
                                    };
                                    if (arr.length >= 10) {
                                        _this.pagenum++;
                                        _this.callbacktest = true;
                                    } else {
                                        _this.callbacktest = false;
                                    };
                                };
                            }else{
                                _this.isHaveList = false;
                                _this.noList = true;
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //点击详情（一期）
            toFillDetail(productCode){
                window.location.href = './fillInSubmit.html?productCode=' + productCode;
            },

            //-------------------------------------------------------------------------------------------- 二期审批
            //获取二期审批列表
            getApproveList(i){
                let _this = this;
                let params = {};
                params.queryType = i + '';
                params.flowType = '';
                params.pageNum = _this.pagenum;
                params.pageSize = 10;
                $http(_this.getApproveListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data){
                                var arr = res.data.productList;
                                if(arr.length == 0){
                                    if(_this.pagenum == 1){
                                        _this.isHaveList = false;
                                        _this.noList = true;
                                        _this.callbacktest = false;
                                    }
                                }else{
                                    _this.isHaveList = true;
                                    _this.noList = false;
                                    for (let i = 0; i < arr.length; i++) {
                                        _this.list.push(arr[i]);
                                    };
                                    if (arr.length >= 10) {
                                        _this.pagenum++;
                                        _this.callbacktest = true;
                                    } else {
                                        _this.callbacktest = false;
                                    };
                                };
                            }else{
                                _this.isHaveList = false;
                                _this.noList = true;
                            }
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
                    return '';
                }else{
                    var str = String(data);
                    return str.slice(0,4) + '-' + str.slice(4,6) + '-' + str.slice(6,8);
                }
            },

            //点击审批（二期）加权
            toWeight(productCode,flowNo){
                window.location.href = './weighting.html?productCode=' + productCode + '&flowNo=' + flowNo;
            },
            //点击审批（二期）到期
            toBecome(productCode,flowNo){
                window.location.href = './becoming.html?productCode=' + productCode + '&flowNo=' + flowNo;
            },

            //审批
            toApproved(productCode,i){
                window.location.href = './approved.html?productCode=' + productCode + '&type=' + i;
            },

            // ------------------------------------------------------------------获取募集列表
            getCollectList(){
                let _this = this;
                let params = {};
                params.pageNum = _this.pagenum;
                params.pageSize = 10;
                $http(_this.getCollectListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data){
                                var arr = res.data.productList;
                                if(arr.length == 0){
                                    if(_this.pagenum == 1){
                                        _this.isHaveList = false;
                                        _this.noList = true;
                                        _this.callbacktest = false;
                                    }
                                }else{
                                    _this.isHaveList = true;
                                    _this.noList = false;
                                    for (let i = 0; i < arr.length; i++) {
                                        _this.list.push(arr[i]);
                                    };
                                    if (arr.length >= 10) {
                                        _this.pagenum++;
                                        _this.callbacktest = true;
                                    } else {
                                        _this.callbacktest = false;
                                    };
                                };
                            }else{
                                _this.isHaveList = false;
                                _this.noList = true;
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //募集详情
            toCollect(productCode){
                window.location.href = './collect.html?productCode=' + productCode;
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

