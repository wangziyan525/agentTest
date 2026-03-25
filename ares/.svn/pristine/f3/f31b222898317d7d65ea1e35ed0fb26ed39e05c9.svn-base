var baseUrl = {
    queryDetail:"safetyCheck/handoverDetails.xa",
    confirmHandover:"safetyCheck/confirmHandover.xa",
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            detail:{

            }


        },
        created() {
        },
        mounted() {
            this.queryDetail()
        },
        methods: {

            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },

            /**
             * 查询详情
             */
            queryDetail() {
                var that = this;
                let params = {};

                params.safetyCheckHandoverId = that.getQueryString('id');

                $http(baseUrl.queryDetail,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            that.detail = res.data
                        }else{
                            $.alert("",res.retmsg,function () {

                            });
                        }
                    });
            },

            /**
             * 提交审批
             */
            submitBindtap(type) {
                var that = this;
                let params = {};
                var tips='';
                var tips1='';
                if (type=='0'){
                    tips = '请确认是否拒绝'
                    tips1 = '已拒绝'
                }else{
                    tips = '请确认是否接收'
                    tips1 = '已接收'
                }
                params.status = type;
                params.safetyCheckHandoverId = that.getQueryString('id');

                vant.Dialog.confirm({
                    title: tips,
                    message: ""
                }).then(() => {
                    $http(baseUrl.confirmHandover,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                $.alert("",tips1,function () {
                                    window.location.reload();
                                });
                            }else{
                                $.alert("",res.retmsg,function () {

                                });
                            }
                        });
                }).catch(() => {

                })
            },
        }
    })
}



