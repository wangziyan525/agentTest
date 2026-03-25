function action() {
    new Vue({
        el: '#app',
        data: {


            //接口
            getFlowUrl: 'onlineCapital/getOnlineCapitalApprovalPersonList.xa',  //流转信息

            TRAN_SEQ:'',
            role:'',

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

            this.role = this.getQueryString('role');
            this.TRAN_SEQ = this.getQueryString('TRAN_SEQ');


        },
        mounted() {
            
            //获取流转信息
            this.getFlow();

        },
        methods: {

            //获取流转信息
            getFlow(){
                let _this = this;
                let params = {};
                params.TRAN_SEQ = _this.TRAN_SEQ;
                $http(_this.getFlowUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var arr = res.data.LIST;
                            for(var i=0;i<arr.length;i++){
                                if(arr[i].LEVEL == _this.role){
                                    _this.approvedInfos = arr[i];
                                    break;
                                }
                            }
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


