function initFun() {
    new Vue({
        el: '#app',
        data: {
            addUrl: "qywx/clinic/deviceInfoAdd.xa",
            editUrl:'qywx/clinic/deviceInfoEdit.xa',
            dateObj: {
                dateShow: false,
                currentDate: new Date(),
                minDate:new Date(),
            },
            timeObj: {
                timeShow:false,
            },
            startDate:"",
            startDateText:"",
            endDate:"",
            endDateText:"",
            endTime:"",
            dataFlag:'',
            markValue:"",
            deviceName:"",
            viewFlag:'add',
            id:""
        },
        created() {
            this.viewFlag = this.getQueryString('viewFlag');
            if(this.viewFlag=="edit"){
                var itemObj = JSON.parse(localStorage.getItem('itemObj'));
                this.id = itemObj.id;
                this.startDate = itemObj.startTime1;
                this.endDate = itemObj.endTime1;
                this.deviceName = itemObj.deviceName;
                this.markValue = itemObj.introduction;
                this.startDateText = itemObj.startTime;
                this.endDateText = itemObj.endTime;
                this.endTime = itemObj.dailyDeadLine;
            }
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
            dateShow(flag){
                this.dateObj.dateShow = true;
                this.dataFlag = flag;
            },
            chooseTime(val) {
                this.timeObj.timeShow = false;
                var hour = val.split(':')[0];
                console.log(hour > 22)
                var minute = val.split(':')[1];
                if (hour > 22 || (hour == 22 && minute > 0)) {
                    this.endTime = "";
                    $.alert('', '最晚不超过22:00');
                    return;
                }
                this.endTime = val;
            },
            //插件时间选择确定
            chooseDate(val) {
                var chooseDate = this.initDateTimer(val);
                if (this.dataFlag == 1) {
                    this.startDate = chooseDate[1];
                    this.startDateText = chooseDate[0];
                    this.dateObj.minDate = val;
                } else if (this.dataFlag == 2) {
                    this.endDate = chooseDate[1];
                    this.endDateText = chooseDate[0];
                }
                if (this.startDate != '' && this.endDate != '') {
                    if (this.startDate > this.endDate) {
                        vant.Toast('开始时间不能大于截止时间');
                        this.endDate = '';
                        this.endDateText = '';
                    }
                };

                this.dateObj.dateShow = false;
            },
            //时间格式化
            initDateTimer(param) {
                var month = param.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }
                var day = param.getDate();
                if (day < 10) {
                    day = '0' + day;
                }
                var list = [param.getFullYear() + '-' + month + '-' + day, param.getFullYear() + '年' + month + '月' + day + '日']
                return list;
            },

            //时间格式化
            formatter(type, val) {
                if (type == "year") {
                    return `${val}年`
                } else if (type == "month") {
                    return `${val}月`
                } else if (type == "day") {
                    return `${val}日`
                }
                return val;
            },
            formatterTime(type, val) {
                if (type == "hour") {
                    return `${val}时`
                } else if (type == "minute") {
                    return `${val}分`
                }
                return val;
            },
            // 提交客户
            submitTap() {
                let that = this;
                if (!that.deviceName || that.deviceName == undefined || that.deviceName == "") {
                    $.alert('', '请输入理疗设备名称');
                    return false;
                }else if(that.startDate==""){
                    $.alert('', '请选择开始日期');
                    return false;
                }else if(that.endDate==""){
                    $.alert('', '请选择结束日期');
                    return false;
                }else if(that.endTime==""){
                    $.alert('','请选择每日设备预约时间段截止时间');
                    return false;
                }else if(that.markValue==""){
                    $.alert('','请输入理疗设备功能');
                    return false;
                }else if(that.markValue.length>500){
                    $.alert('','理疗设备功能不能超过500字');
                    return false;
                }
                var params = {
                    deviceName:that.deviceName,
                    introduction:that.markValue,
                    startTime:that.startDateText,
                    endTime:that.endDateText,
                    dailyDeadLine:that.endTime
                }
                var url = '';
                var title = '';
                if (that.viewFlag == 'edit') {
                    title = '确认修改该理疗设备信息？';
                    params['id'] = that.id;
                    url = that.editUrl;
                } else if (that.viewFlag == 'add') {
                    title = '确认新增理疗设备信息？';
                    url = that.addUrl;
                }
                $.confirm("", title, function () {
                    $http(url, true, params, false)
                        .then(res => {
                            $.alert('', '保存成功', function () {
                                localStorage.removeItem('itemObj');
                                window.location.replace('./deviceList.html')
                            });
                        });
                })
            },
        }
    })
};
