function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'consumablesIssuance/queryIssuance.xa',//详情接口
            toSubUrl: 'consumablesIssuance/submitIssuance.xa',//提交领用表信息接口


            resultPage:false,
            isSub:true,       //是否是提交
            isCanSub:false,   //是否可以提交

            ATMNum:'',
            callNum:'',
            counterNum:'',

            signState:-2, //领用状态 （0-已提交（待签收） 1-已签收 -1 -只能查看）",
            nowData:{},

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {

            //查询详情状态
            this.getDetail();


        },
        methods: {

            //查询详情状态
            getDetail(){
                let _this = this;
                let params = {};
                params.cid = '';
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.nowData = res.data;
                            if(res.data){
                                _this.signState = res.data.signState;
                                _this.ATMNum = res.data.aTMQuantity;
                                _this.callNum = res.data.nCMQuantity;
                                _this.counterNum = res.data.sTMQuantity;
                                if(res.data.aTMQuantity !='' && res.data.nCMQuantity !='' && res.data.sTMQuantity !=''){
                                    _this.isSub = false;
                                }else {
                                    _this.isSub = true;
                                };
                                _this.changeFillIn();
                            }
                        }else if(res.retcode == 'no.record'){

                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //填写改变
            changeFillIn(){
                if(this.ATMNum == ''){
                    this.isCanSub = false;
                    return false
                };
                if(this.callNum == ''){
                    this.isCanSub = false;
                    return false
                };
                if(this.counterNum == ''){
                    this.isCanSub = false;
                    return false
                }else{
                    this.isCanSub = true;
                }
            },


            //提交
            toSub(){
                let _this = this;
                let params = {};
                params.ATMQuantity = _this.ATMNum;
                params.NCMQuantity = _this.callNum;
                params.STMQuantity = _this.counterNum;
                $http(_this.toSubUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                           _this.resultPage = true;
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },


            //切人成功
            subSucces(){
                window.location.replace('./list.html');
            }


        }
    });

}

