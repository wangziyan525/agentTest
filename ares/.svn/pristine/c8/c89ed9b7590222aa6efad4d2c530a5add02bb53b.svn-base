function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'structuralDeposits/flexible/findList.xa',//列表接口
            
            list:[],
            pagenum:1,//页码
            callbacktest: false, //分页开关
            haveList:true,
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

            //获取列表
            getList(){
                if(this.pagenum == 1){
                    this.list = [];
                };
                let _this = this;
                let params = {};
                params.queryType = '0';
                params.pageNum = _this.pagenum;
                params.pageSize = 10;
                $http(_this.getListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var arr = res.data.productList;
                            if(arr){
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

            //点击详情
            toFillDetail(productCode){
                window.location.href = './fillInSubmit.html?productCode=' + productCode;
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


        }
    });

}

