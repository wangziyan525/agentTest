function initFun() {
    new Vue({
        el: '#app',
        data: {
            addUrl: "qywx/clinic/docInfoAdd.xa",
            editUrl:'qywx/clinic/docInfoEdit.xa',
            positionObj: {
                title: '请选择',
                positionShow: false,  //下拉选人
                positionList: [{ text: '主任医师', val: 0 },
                { text: '副主任医师', val: 1 },
                { text: '主治医师', val: 2 },
                { text: '住院医师', val: 3 }
                ],
            },
            positionVal: '',
            positionText: '',
            dateObj: {
                dateShow: false,
                currentDate: new Date(),
                minDate: new Date(),
            },
            timeObj: {
                timeShow: false,
            },
            endTime: "",
            startDate: "",
            endDate: "",
            startDateText: "",
            endDateText: "",
            dataFlag: '',
            markValue: "",
            doctorName: "",
            viewFlag: 'add',
            id:"",
        },
        created(){
            this.viewFlag = this.getQueryString('viewFlag');
            if(this.viewFlag=="edit"){
                var itemObj = JSON.parse(localStorage.getItem('itemObj'));
                console.log(itemObj.startTime.split('-'))
                this.id = itemObj.id;
                this.startDate = itemObj.startTime1;
                this.endDate = itemObj.endTime1;
                this.doctorName = itemObj.docName;
                this.positionText = itemObj.docRank;
                this.positionVal = this.positionTranslate(itemObj.docRank);
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
            positionTranslate(text) {
                var that = this;
                switch (text) {
                    case "主任医师":
                        that.positionVal = 0;
                        break;
                    case "副主任医师":
                        that.positionVal = 1;
                        break;
                    case "主治医师":
                        that.positionVal = 2;
                        break;
                    case "住院医师":
                        that.positionVal = 3;
                        break;     
                    default:
                        that.positionVal = 0;
                        break;
                }
            },
            // 选择职位
            positionConfirm(params) {
                this.positionText = params.text;
                this.positionObj.positionShow = false;
            },
            handleType(param) {
                let list = param;
                param.map((val, index) => {
                    val['text'] = val.AprvManNm;
                    val['val'] = val.AprvManId
                })
                return list;
            },
            dateShow(flag) {
                this.dateObj.dateShow = true;
                this.dataFlag = flag;
            },
            // 时间选择
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
                let regName = /^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/;
                if (!that.doctorName || that.doctorName == undefined || that.doctorName == "") {
                    $.alert('', '请输入医师姓名');
                    return false;
                } else if (that.doctorName.length == 1) {
                    $.alert('', '姓名至少为两位数');
                    return false;
                }else if (!regName.test(that.doctorName)) {
                    $.alert('', '请输入正确格式的客户姓名');
                    return false;
                }else if (that.positionText == "") {
                    $.alert('', '请选择医师头衔');
                    return false;
                } else if (that.startDate == "") {
                    $.alert('', '请选择起始时间');
                    return false;
                } else if (that.endDate == "") {
                    $.alert('', '请选择终止时间');
                    return false;
                } else if (that.endTime == "") {
                    $.alert('', '请选择每日问诊时间段截止时间');
                    return false;
                } else if (that.markValue == "") {
                    $.alert('', '请输入医师简介内容');
                    return false;
                }else if (that.markValue.length>500) {
                    $.alert('', '医师简介不能超过500字');
                    return false;
                }
                var title = '';
                var url = "";
                var params = {
                    docName: that.doctorName,
                    docRank: that.positionText,
                    introduction: that.markValue,
                    startTime: that.startDateText,
                    endTime: that.endDateText,
                    dailyDeadLine: that.endTime
                }
                if (that.viewFlag == 'edit') {
                    title = '确认修改该医师信息？';
                    params['id'] = that.id;
                    url = that.editUrl;
                } else if (that.viewFlag == 'add') {
                    title = '确认新增医师信息？';
                    url = that.addUrl;
                }
                $.confirm("", title, function () {
                    $http(url, true, params, false)
                        .then(res => {
                            $.alert('', '保存成功', function () {
                                localStorage.removeItem('itemObj');
                                window.location.replace('./doctorList.html')
                            });
                        });
                })
            },
        }
    })
};
