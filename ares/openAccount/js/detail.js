function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'qykhCentralizedJob/getQykhCentralizedJobDetail.xa',  //详情接口
            toSubmitUrl: 'qykhCentralizedJob/qykhCentralizedJobApproval.xa',  //提交接口



            appNo:'',
            infos:{},
            
            refusePopup:false,  //拒绝弹框
            reason:'',
            isPass:true, //是否同意
            isApproved:false, //是否审批过了

            flowList:[],

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

            this.appNo = this.getQueryString('appNo');

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
                params.appNo = _this.appNo;
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.infos = res.data;
                            if(res.data.approvalStatus == '2'){
                                 _this.isApproved = false;
                            }else{
                                _this.isApproved = true;
                            };
                            _this.flowList = JSON.parse(res.data.autoResults);
                            console.log(_this.flowList)
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
        
            //审批
            toApproval(i){
                var str = '';
                if(i=='0' && this.reason == ''){
                    vant.Toast('请输入拒绝理由');
                    return false
                }; 
                let _this = this;
                let params = {};
                if(i=='1'){
                    params.approvalStatus = '1';
                    str = '审批通过';
                    params.refuseContent = '';
                }else{
                    params.approvalStatus = '0';
                    str = '审批拒绝';
                    params.refuseContent = _this.reason;
                }
                params.appNo = _this.appNo;
                _this.refusePopup = false;
                $http(_this.toSubmitUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            $.alert('',str,function(){
                               //获取详情
                               _this.getDetail();
                            });
                        }else if(res.retcode == 'param.error'){
                            $.alert('',res.retmsg);
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
                console.log(fromUrl);
                if(fromUrl.includes('list')){
                    window.history.back();
                }else{
                    WeixinJSBridge.call('closeWindow');
                }
            },

         

            //时间戳转化
            readTime(str){
                var times = new Date(str);
                var year = times.getFullYear();
                var month = times.getMonth() + 1;
                if(month < 10){
                    month = '0' + month;
                };
                return year + '-' + month;
            },

            //账户类型
            readLegalMobile(str){
                if(str == '1'){
                    return '基本账户';
                }else if(str == '2'){
                    return '一般账户';
                }else if(str == '3'){
                    return '专用账户';
                }else if(str == '4'){
                    return '临时账户';
                }else{
                    return '';
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

