var baseUrl = {
    submitHandover:"safetyCheck/submitHandover.xa",
    getPowerInfo: 'safetyCheck/getPowerInfo.xa'
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            maxDate:new Date(),
            userid:'',
            show: false,
            startTime:'',
            endTime:'',
            startTime1:'',
            endTime1:'',
            xuanzTime:'',
            popupStartTime: {
                show: false,
                title: '请选择',
                currentDate: '',
                startTime:''
            },

            popupEndTime: {
                show: false,
                title: '请选择',
                minTime: '',
                currentDate: '',
                minMinute: '',
                endTime:''
            },

        },
        created() {
        },
        mounted() {
            this.getRole();
        },
        methods: {
            /**
             * 权限判断
             */
            getRole() {
                var that = this;
                let params = {};

                $http(baseUrl.getPowerInfo,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data.includes('1') || res.data.includes('2')){

                            }else{
                                $.alert("","暂无权限",function () {
                                    WeixinJSBridge.invoke('closeWindow',{},function(res){
                                    });
                                    wx.closeWindow();
                                });
                            }
                        }else{
                            $.alert("",res.retmsg,function () {
                                WeixinJSBridge.invoke('closeWindow',{},function(res){
                                });
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            showTap(num) {
                if(num==1){
                    this.show = true;
                }else if(num==2){
                    this.popupStartTime.show = true;
                }else{
                    this.popupEndTime.show = true;
                }

            },
            /**
             * 开始时间
             */
            popupStartTimeConfirm (param) {
                console.log(param)
                console.log(param.split(':'))
                this.popupStartTime.startTime = param;
                this.popupEndTime.currentDate = param;
                this.popupEndTime.minTime = param.split(':')[0];
                this.popupEndTime.minMinute = param.split(':')[1];
                this.popupEndTime.endTime = '';
                this.popupStartTime.show = false;
            },

            /**
             * 结束时间
             */
            popupEndTimeConfirm (param) {
                this.popupEndTime.endTime = param;
                this.popupEndTime.show = false;
            },
            // 时间插件确定
            onConfirm(date){
                this.show = false;
                this.startTime = this.formatter4(date[0]);
                this.endTime = this.formatter4(date[1]);

                this.startTime1 = this.formatter3(date[0]);
                this.endTime1 = this.formatter3(date[1]);
                this.xuanzTime = this.formatter3(date[0])+'-'+this.formatter3(date[1]);
            },
            formatter4(time){
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                let day = time.getDate();
                if(month < 10){
                    month = '0' + month;
                };
                if(day< 10){
                    day = '0'+ day;
                };
                return year + '-' + month + '-' + day;
            },
            formatter3(time){
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                let day = time.getDate();
                if(month < 10){
                    month = '0' + month;
                };
                if(day< 10){
                    day = '0'+ day;
                };
                return year + '/' + month + '/' + day;
            },





            /**
             * 提交审批
             */
            async submitBindtap() {
                var that = this;
                let params = {};
                if (that.userid == '') {
                    $.alert('','请填写被授权同事员工号');
                    return;
                }
                if (that.startTime == '') {
                    $.alert('','请选择授权开始日期');
                    return;
                }
                if (that.endTime == '') {
                    $.alert('','请选择授权结束日期');
                    return;
                }

                if (that.popupStartTime.startTime == '') {
                    $.alert('','请选择授权结束日期');
                    return;
                }
                if (that.popupEndTime.endTime == '') {
                    $.alert('','请选择授权结束日期');
                    return;
                }

                params.humanCode = that.userid;
                params.handoverTime = that.startTime1+' '+that.popupStartTime.startTime+':00-'+that.endTime1+' '+that.popupEndTime.endTime+':00'

                vant.Dialog.confirm({
                    title: '请确认是否提交',
                    message: ""
                }).then(() => {
                    $http(baseUrl.submitHandover,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                $.alert("","提交成功",function () {
                                    window.location.href = "list.html";
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



