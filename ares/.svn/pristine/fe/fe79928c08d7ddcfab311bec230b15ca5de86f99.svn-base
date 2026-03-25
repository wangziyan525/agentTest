var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getMeetingInfoByIdUrl: 'qywx/newMeet/getMeetingInfoById.xa', // 会议详情
                pushIsStartMeetingUrl: 'qywx/newMeet/pushIsStartMeeting.xa', // 取消会议
            },
            dataInfo: {

            },
            isStart: '',
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

            isStartHandle (param) {
                this.isStart = param;
            },

            submitHandle () {
                if (this.submitStatus) return;
                if (this.isStart == '') return vant.Toast('请选择');
                this.submitStatus = true;
                $http(this.baseUrl.pushIsStartMeetingUrl,true, {
                    // meetingInfoId: BigInt(this.dataInfo.meetingInfoId).toString(),
                    meetingInfoId: this.dataInfo.meetingInfoId,
                    isStart: this.isStart
                }, true)
                .then(res => {
                    this.submitStatus = false;
                    
                    
                    $.alert("",res.retmsg, function () {
                        if (res.retcode == 'success') {
                            wx.closeWindow();
                        }
                        
                    });
                    
                });
                
            }
        }
    })
}
