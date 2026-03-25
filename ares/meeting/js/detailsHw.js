var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getMeetingInfoByIdUrl: 'qywx/newMeet/getMeetingInfoById.xa', // 会议详情
                cancleMeetingUrl: 'qywx/newMeet/cancleMeeting.xa', // 取消会议
                queryFwPersonUrl: 'qywx/newMeet/queryFwPerson.xa', // 查询服务人员
                updateServiceUrl: 'qywx/newMeet/updateService.xa'
            },
            dataInfo: {

            },
            serviceLoginId: '',
            serviceLoginIds: '',
            popupServiceLogin: {
                show: false,
                list: [
                    
                ]
            },
            submitStatus: false
        },
        created () {
            this.getMeetingInfoById();
        },
        methods: {
            getMeetingInfoById () {
                $http(this.baseUrl.getMeetingInfoByIdUrl,true, {
                    meetingInfoId: GetQueryString('meetingInfoId')
                }, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.dataInfo = res.data;
                    } else {
                        $.alert("",res.retmsg, function () {
                            if (res.retcode == '-1') {
                                wx.closeWindow();
                            }
                            
                        });
                    }
                });
            },

            popupHandle (key) {
                $http(this.baseUrl.queryFwPersonUrl,true,{}, false)
                .then(res => {
                    this.popupServiceLogin.list = res.data.map(item => {
                        return {
                            text: item.userName,
                            value: item.loginId,
                            status: false
                        }
                    })
                    this[key].show = true;
                });
            },

            /**
             * 服务人员选择
             */

            popupServiceLoginConfirm (param) {
                this.serviceLoginId = param.text;
                this.serviceLoginIds = param.value;
                this.popupServiceLogin.show = false
            },


            submitHandle () {
                if (this.submitStatus) return;
                this.submitStatus = true;
                $http(this.baseUrl.updateServiceUrl,true, {
                    // meetingInfoId: BigInt(this.dataInfo.meetingInfoId).toString(),
                    meetingInfoId: this.dataInfo.meetingInfoId,
                    serviceLoginId: this.serviceLoginIds
                }, true)
                .then(res => {
                    this.submitStatus = false;
                    $.alert("",res.retmsg, function () {
                        if (res.retcode == 'success') {
                            wx.closeWindow();
                        }
                    });
                    
                });
                
            },

            /**
             * 服务人员选择
             */
            handleChecked (index) {
                this.popupServiceLogin.list[index].status = !this.popupServiceLogin.list[index].status;
            },

            /**
             * 确定人员选择
             */

            handleApproveUserChecked () {
                let checkedServiceLogin = this.popupServiceLogin.list.filter(item => {
                    if (item.status) return item;
                })
                this.serviceLoginIds = checkedServiceLogin.map(item => {
                    return item.value
                }).join();
                this.serviceLoginId = checkedServiceLogin.map(item => {
                    return item.text
                }).join()

                this.popupServiceLogin.show = false;
            },
        }
    })
}
