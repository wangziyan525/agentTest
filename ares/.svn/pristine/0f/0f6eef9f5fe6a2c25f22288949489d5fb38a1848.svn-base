function initFun() {
    new Vue({
        el: '#app',
        data: {
            baseUrl: {
                listUrl: 'qywx/clinic/docApointQuery.xa', //医师列表接口
                deviceListUrl: 'qywx/clinic/deviceApointQuery.xa',//设备列表接口
                userInfoUrl: 'qywx/clinic/queryUserInfo.xa',//获取员工信息
            },
            userInfo: '',
            doctorList: [],
            deviceList: [],
            flag: ''
        },
        created() {
            localStorage.removeItem('detailObj');
            this.flag = this.getQueryString('flag') ? this.getQueryString('flag') : '';
            if (this.flag == "doctor") {
                document.title = '问诊预约'
            } else if (this.flag == 'device') {
                document.title = '理疗设备预约'
            }
            this.getUserInfo();
            setTimeout(() => {
                this.getList()
            }, 1000)
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
            // 获取员工信息
            getUserInfo() {
                var that = this;
                $http(that.baseUrl.userInfoUrl, true, {}, false)
                    .then(res => {
                        that.userInfo = res.data.userMap;
                    });
            },
            // 获取列表数据
            getList() {
                var that = this;
                var url = '';
                if (that.flag == 'doctor') {
                    url = that.baseUrl.listUrl;
                } else if (that.flag == 'device') {
                    url = that.baseUrl.deviceListUrl;
                }
                $http(url, true, { 'flag': 'staff' }, true)
                    .then(res => {
                        if (res.retcode == 'fail') {
                            $.alert('', res.retmsg, function () {
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                        if (that.flag == 'doctor') {
                            that.doctorList = res.data.docInfos;
                        } else if (that.flag == 'device') {
                            that.deviceList = res.data.deviceInfos;
                        }
                    });
            },
            // 去预约
            toDetailTap(item) {
                localStorage.setItem('detailObj', JSON.stringify(item))
                window.location.href = './detail.html?flag=' + this.flag;
            }
        }
    })
};
