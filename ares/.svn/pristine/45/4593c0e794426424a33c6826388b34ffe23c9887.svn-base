function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'consumablesIssuance/listIssuance.xa',//列表接口
            getDetailUrl:  'consumablesIssuance/queryIssuance.xa',//详情接口
            signForUrl:  'consumablesIssuance/signIssuance.xa',//签收

            active:0,
            isIos:false,

            list:[],
            haveList:true,
            noList:false,

            nowDay:new Date().getDate(),
            signState:'',  //领用表状态（0-已提交（待签收） 1-已签收 -1 -只能查看）



        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {

            //底部适配安全区域
            this.isIOsPad();

            //获取列表
            this.getList();

            //查询详情状态
            this.getDetail();

        },
        methods: {

            //获取列表
            getList(){
                this.list = [];
                this.noList = false;
                this.haveList = false;
                let _this = this;
                let params = {};
                params.signState = _this.active + '';
                $http(_this.getListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var arr = res.data;
                            if(arr && arr.length > 0){
                                _this.noList = false;
                                _this.haveList = true;
                                _this.list = arr;
                            }else {
                                _this.haveList = false;
                                _this.noList = true;
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //底部适配安全区域
            isIOsPad(){
                var u = navigator.userAgent;
                var isIOS = !!u.match(/\(i[^;]+;( u;)? CPU.+Mac OS X/);
                if(isIOS){
                    this.isIos = true;
                };
            },

            //查询详情状态
            getDetail(){
                let _this = this;
                let params = {};
                $http(_this.getDetailUrl,false,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.nowData = res.data;
                            if(res.data){
                                _this.signState = res.data.signState;
                            }
                        }else if(res.retcode == 'no.record'){

                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //状态枚举
            readType(i){
                if(i == '0'){
                    return '待签收';
                }else if(i == '1'){
                    return '已签收';
                }else if(i == '-1'){
                    return '只能查看';
                }
            },

            //签收
            toSignFor(){
                this.list = [];
                let _this = this;
                let params = {};
                $http(_this.signForUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.active = 1;
                            _this.list = [];
                            _this.getList();
                            _this.getDetail();
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //去往详情
            toApply(){
                window.location.href ='./apply.html';
            },




        }
    });

}

