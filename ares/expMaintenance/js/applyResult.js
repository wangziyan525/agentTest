function action() {
    new Vue({
        el: '#app',
        data: {


            //接口
            getDetailUrl: 'certExpire/getCertExpireDetail.xa',  //详情接口

            tranSeq:'',

            status:-1,  //2-转办  1-同意  0-拒绝
            approvedInfos:{},

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

            this.tranSeq = this.getQueryString('tranSeq');



        },
        mounted() {
            
            //获取详情
            this.getInfos();

        },
        methods: {

            //获取详情
            getInfos(){
                let _this = this;
                let params = {};
                params.tranSeq = _this.tranSeq;
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.approvedInfos = res.data;
                            //是否已经审批 1-会计主管 
                            if(res.data.role == '1'){
                                if(res.data.handover){  //如果有，说明已经转办了
                                    _this.status = 2;
                                }else{
                                    _this.status = res.data.pass;  
                                };
                            }else{
                                _this.status = res.data.pass;  
                            };
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //完成
            over(){
                WeixinJSBridge.call('closeWindow');
            },
       
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },

        },
    });
};


