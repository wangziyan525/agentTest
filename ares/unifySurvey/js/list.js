function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'bankTycheck/queryList.xa',//列表接口



            active:0,
            list:[],
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


             //获取列表（未审批）
             this.getList();

        },
        methods: {

        
            //顶部tab切换
            changeActive(){
                this.isHaveList = false;
                this.noList = false;
                this.list = [];
                this.getList();
            },
        

            //获取列表
            getList(){
                let _this = this;
                let params = {};
                if(_this.active == 0){
                    params.type = '0';
                }else if(_this.active == 1){
                    params.type = '3';
                }else if(_this.active == 2){
                    params.type = '9';
                };
                $http(_this.getListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data){
                                var arr = res.data;
                                if(arr.length > 0){
                                    _this.noList = false;
                                    _this.isHaveList = true;
                                    _this.list = arr;
                                }else{
                                    _this.isHaveList = false;
                                    _this.noList = true;
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

            //--------------------------------------------------------------------- 跳转
            toDetail(id){
                window.location.href = './detail.html?transeq=' + id;
            },

            //--------------------------------------------------------------------- 状态筛选

            //下拉选择打开
            showChooseStatusModel(){
                this.showPickerStatus = true;
            },

            //下拉选择确定
            onConfirm(v,i){
                this.filterStatusText = v;
                this.showPickerStatus = false;
                this.newList();
                this.getList();
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

