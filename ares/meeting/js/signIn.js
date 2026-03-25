var vm;
function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            baseUrl: {
                isSignUrl: "qywx/newMeet/isOkUserSign.xa",
                updateSignUrl:"qywx/newMeet/userSign.xa",
                meetingDetailUrl:'qywx/newMeet/getMeetingInfoById.xa'
            },
            meetingInfoId: '',
            meetingtype:'',
            loactionindex: 0,
            viewFlag:false,
            successFlag:null,
            signInNum:0,
            personList:[],
            signInTitleFlag:false,
            signInTextFlag:false,
            signIn_title: '签到失败', //抱歉，您不是此次会议的参与人员。  查不到该会议信息。 签到失败，请稍后再试
            signIn_text: '' //未到或已过签到时间，签到时间为会议开始时间前2小时到会议结束后2小时。
        },
        created() {
            this.meetingInfoId = GetQueryString('meetingInfoId')?GetQueryString('meetingInfoId'):'';
            this.meetingType = GetQueryString('meetingtype')?GetQueryString('meetingtype'):"";
            console.log(this.meetingType,'this.meetingtype')
            this.getIsSign();
        },
        methods: {
            // 是否可以签到
            getIsSign(){
                var that = this;
                $http(that.baseUrl.isSignUrl,true,{ 'meetingInfoId': that.meetingInfoId},true)
                .then(res => {
                    if (res.retcode == 'success') {
                        if (that.meetingType == '1') {
                            that.updateSign('', '');
                        } else {
                            that.getLocation();
                        }
                    } else if(res.retcode=='10051'){  //已签到不能重复操作
                        that.successFlag = false;
                        that.viewFlag = true;
                        that.signInTextFlag = true;
                        that.signIn_text = res.retmsg;
                        that.getMeetingDetail(); //需要展示当前人是第几个签到   未签到人
                    }else{
                        that.successFlag = false;
                        that.viewFlag = true;
                        that.signInTitleFlag = true;
                        that.signIn_title = res.retmsg;
                        // $.alert('',res.retmsg)
                    }
                    
                });
            },
            getLocation() {
                var that = this;
                wx.ready(function () {
                    wx.getLocation({
                        type: 'gcj02',
                        success: function (res) {
                            let latitude = res.latitude;
                            let longitude = res.longitude;
                            that.updateSign(latitude, longitude);
                        }, fail: function (res) {
                            if (that.loactionindex < 3) {
                                that.loactionindex++;
                                that.getLocation();
                            }
                        }
                    });
                });
            },
            // 签到
            updateSign(lat,lng){
                var that = this;
                var params = {
                    "signplace":'',
                    "signtype":'0',
                    "meetingInfoId":that.meetingInfoId,
                    "meetingType":that.meetingType,
                    "type":'sign',
                    "image":'',
                    "location_x":lat,
                    "location_y":lng
                }
                $http(that.baseUrl.updateSignUrl,true,params,true)
                .then(res => {
                    that.successFlag = false;
                    that.viewFlag = true;
                    if (res.retcode == 'success') {
                        that.successFlag = true;
                        that.getMeetingDetail();
                    } else if(res.retcode==-6){
                        that.signInTextFlag = true;
                        that.signIn_text = '未在签到范围，请到会议现场签到。';
                        that.getMeetingDetail();
                    }else{
                        that.signInTitleFlag = true;
                        that.signIn_title = res.retmsg;
                    //    $.alert('',res.retmsg)
                    }
                });
            },
            // 获取未签到已签到人
            getMeetingDetail(){
                var that = this;
                $http(that.baseUrl.meetingDetailUrl,true,{ 'meetingInfoId': that.meetingInfoId}, false)
                .then(res => {
                    var userCodeList = res.data.signedUserCodeList;
                    for (var i = 0; i < userCodeList.length; i++) {
                        if (userCodeList[i] == JSON.parse($.cookie("user")).humancode) {  //判断当前人是第几个签到的
                            that.signInNum = i + 1;
                        }
                    }
                    that.personList = res.data.unSignedUser?res.data.unSignedUser:[];
                });
            },
        }
    })
}
