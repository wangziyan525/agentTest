function action() {
    new Vue({
        el: "#app",
        data: {
            getListUrl: 'earlyRepayment/getList.xa',//列表接口
            tabs: [{ text: '待审批', id:"0" }, { text: '已审批', id:"3" }],
            tabIndex:'0',
            keyword: "",
            filterTimeText: '近一月',
            filterStatusText: '全部状态选择',

            list: [],
            viewFlag:false,
            callbacktest: false, //分页开关
            haveList: true,
            noList: false,

            showPickerStatus: false, //状态遮罩层
            chooseList: [{ text: '全部', val: '3' }, { text: '审批通过', val: '1' }, { text: '审批拒绝', val: '2' }],

            isshowChooseTime: false, //时间选择遮罩层
            chooseTimeShow: false,  //时间插件
            currentDate: new Date(),
            minDate:new Date(1970,0,1),
            maxDate: new Date(),
            todayTime: '',
            weekTime: '',
            monthTime1: '',
            monthTime3: '',
            monthTime6: '',

            chooseTimeDuan: 1, //时间段选择索引 0:一周 1:一月  2:三月  3:六月    
            diyTimeChooseItem: -1,  //手动选择索引

            // 列表请求参数
            pageNum: 1,
            pageSize:20,
            startTime: '',   //开始时间
            endTime: '',     //结束时间
            status:"0"
        },
        created: function () {

            // 获取时间段
            this.getTimeDuanStartTimes();

            //获取列表
            this.getList();
        },
        mounted: function () {
            this.getUp()
        },
        methods: {
            //初始化上拉加载
            getUp() {
                let that = this;
                console.log('滑动底部')// 触底判断
                $(window).scroll(function () {
                    var windowH = $(window).height();
                    var documentH = $(document).height();
                    var scrollH = $(window).scrollTop();
                    if (windowH + 80 + scrollH >= documentH) {
                        if (that.callbacktest == true) {
                            that.callbacktest = false
                            that.getList()
                        }
                    }
                })
            },
            // 数据重置
            resetData() {
                window.scrollTo(0, 0);
                this.viewFlag = false;
                this.list = [];
                this.pageNum = 1;
                this.callbacktest = false;
            },
            //tab切换
            tabTap(index, id) {
                let that = this;
                that.tabIndex = index;
                that.status = id;
                that.resetData();
                that.getList();
            },

            //获取列表
            getList() {
                let that = this;
                var params = {
                    "COMP_NAME":that.keyword,
                    "page_number": that.pageNum,
                    "page_size": that.pageSize,
                    "status": that.status,
                    "startDate": that.startTime,
                    "endDate": that.endTime
                }
                $http(that.getListUrl, true, params, true)
                    .then(res => {
                        that.viewFlag = true
                        if(res.retcode=='success'){
                            if (res.data.length > 0) {
                                if (res.data.length >= that.pageSize) {
                                    that.pageNum++;
                                    that.callbacktest = true;
                                } else {
                                    that.callbacktest = false;
                                }
                                that.list = that.list.concat(res.data)
                            }
                        }else{
                            $.alert("",res.retmsg);
                        }
                    });
            },
            searchTap(){
                let that = this;
                that.resetData();
                that.getList();
            },
            toDetail(id) {
                window.location.href = './detail.html?id='+id;
            },

            //---------------------------------------------------------------------时间筛选
            //获取时间段开始时间
            getTimeDuanStartTimes() {
                this.getNow();
                this.getWeekBefore();
                this.getMonthBefore1();
                this.getMonthBefore3();
                this.getMonthBefore6();
                this.changTimeDuan(1);
            },

            //打开时间选择
            showChooseTimeModel() {
                this.isshowChooseTime = true;
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

            //去筛选时间
            showDiyTime(i) {
                this.diyTimeChooseItem = i;
                this.chooseTimeShow = true;
                if (this.diyTimeChooseItem == '1') {
                    var times = this.startTime;
                    if (times == '') {
                        this.currentDate = new Date();
                    } else {
                        var arr = times.split('-');
                        this.currentDate = new Date(arr[0], arr[1] - 1, arr[2]);
                    }
                } else if (this.diyTimeChooseItem == '2') {
                    var times = this.endTime;
                    if (times == '') {
                        this.currentDate = new Date();
                    } else {
                        var arr = times.split('-');
                        this.currentDate = new Date(arr[0], arr[1] - 1, arr[2]);
                    }
                };
            },

            //插件时间选择确定
            chooseDate(val, index) {
                console.log(val,'9999999999999')
                var chooseTime = this.initDateTimer(val);
                if (this.diyTimeChooseItem == '1') {
                    this.startTime = chooseTime;
                } else if (this.diyTimeChooseItem == '2') {
                    this.endTime = chooseTime;
                };
                if (this.startTime != '' && this.endTime != '') {
                    if (this.startTime > this.endTime) {
                        vant.Toast('开始时间不能大于截止时间');
                        this.endTime = '';
                    }
                };
                this.chooseTimeShow = false;
                this.isInTimeDuan();
            },

            //是否是在时间段内
            isInTimeDuan() {
                if (this.endTime == this.todayTime) {
                    if (this.startTime == this.weekTime) {
                        this.chooseTimeDuan = '0';
                    } else if (this.startTime == this.monthTime1) {
                        this.chooseTimeDuan = '1';
                    } else if (this.startTime == this.monthTime3) {
                        this.chooseTimeDuan = '2';
                    } else if (this.startTime == this.monthTime6) {
                        this.chooseTimeDuan = '3';
                    } else {
                        this.chooseTimeDuan = '-1';
                    }
                } else {
                    this.chooseTimeDuan = '-1';
                }
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
                console.log(param,'00000')
                return param.getFullYear() + '-' + month + '-' + day;
            },

            //时间段选择
            changTimeDuan(i) {
                this.chooseTimeDuan = i;
                this.endTime = this.todayTime;
                if (i == 0) {
                    this.startTime = this.weekTime;
                } else if (i == 1) {
                    this.startTime = this.monthTime1;
                } else if (i == 2) {
                    this.startTime = this.monthTime3;
                } else if (i == 3) {
                    this.startTime = this.monthTime6;
                }
            },

            //时间选好后确定
            filterTimeSearch() {
                if (this.chooseTimeDuan == '0') {
                    this.filterTimeText = '近一周';
                } else if (this.chooseTimeDuan == '1') {
                    this.filterTimeText = '近一月';
                } else if (this.chooseTimeDuan == '2') {
                    this.filterTimeText = '近三月';
                } else if (this.chooseTimeDuan == '3') {
                    this.filterTimeText = '近半年';
                } else {
                    this.filterTimeText = this.startTime + ' 至 ' + this.endTime;
                };
                this.isshowChooseTime = false;
                this.resetData();
                this.getList();
            },
            // 重置时间段
            searchAgin(){
                this.chooseTimeDuan=1;
                this.changTimeDuan(1);
            },
            //--------------------------------------------------------------------- 状态筛选

            //下拉选择打开
            showChooseStatusModel() {
                this.showPickerStatus = true;
            },

            //下拉选择确定
            onConfirm(param) {
                this.filterStatusText = param.text;
                this.status = param.val;
                this.showPickerStatus = false;
                this.resetData();
                this.getList();
            },

            //------------------------------------------------------------------------------日期阶段
            //获取当前时间
            getNow() {
                //今天的日期
                let date = new Date;
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                month = (month < 10 ? '0' + month : month);
                day = (day < 10 ? '0' + day : day);
                this.todayTime = year.toString() + '-' + month.toString() + '-' + day.toString();
            },

            //获取前一周时间
            getWeekBefore() {
                let time = (new Date).getTime() - 7 * 24 * 60 * 60 * 1000;
                let yesday = new Date(time);
                let year = yesday.getFullYear();
                let month = yesday.getMonth() + 1;
                let day = yesday.getDate();
                month = (month < 10 ? '0' + month : month);
                day = (day < 10 ? '0' + day : day);
                this.weekTime = (year.toString() + '-' + month.toString() + '-' + day.toString());
                console.log(this.weekTime);
            },

            //获取前一月时间
            getMonthBefore1() {
                let end = new Date();
                let year = end.getFullYear();
                let month = end.getMonth() + 1;
                let day = end.getDate();
                let dateObj = {};
                dateObj.end = year + '-' + (month >= 1 && month <= 9 ? '0' : '') + month + '-' + (day >= 0 && day <= 9 ? '0' : '') + day;
                let endMonthDay = new Date(year, month, 0).getDate();  //当前月份的总天数
                if (month - 1 <= 0) {
                    //如果是1月 ，年数往前推一年
                    dateObj.strat = year - 1 + '-' + 12 + '-' + (day >= 0 && day <= 9 ? '0' : '') + day;
                } else {
                    let startMonthDay = new Date(year, parseInt(month) - 1, 0).getDate();
                    //1个月前所在的天数小于现在的天日期
                    if (startMonthDay < day) {
                        //当前日期小于当前总月数
                        if (day < endMonthDay) {
                            dateObj.strat = year + '-' + (month - 1 >= 1 && month - 1 <= 9 ? '0' : '') + (month - 1) + '-' +
                                (startMonthDay - (endMonthDay - day) >= 1 && startMonthDay - (endMonthDay - day) <= 9 ? '0' : '') + (startMonthDay - (endMonthDay - day));
                        } else {
                            dateObj.strat = year + '-' + (month - 1 >= 1 && month - 1 <= 9 ? '0' : '') + (month - 1) + '-' + (startMonthDay >= 0 && startMonthDay <= 9 ? '0' : '') + startMonthDay;
                        }

                    } else {
                        dateObj.strat = year + '-' + (month - 1 >= 1 && month - 1 <= 9 ? '0' : '') + (month - 1) + '-' + (day >= 0 && day <= 9 ? '0' : '') + day;
                    }
                }
                console.log(dateObj.strat);
                this.monthTime1 = dateObj.strat;
            },

            //获取前三月时间
            getMonthBefore3() {
                let end = new Date();
                let year = end.getFullYear();
                let month = end.getMonth() + 1;
                let day = end.getDate();
                let dateObj = {};
                dateObj.end = year + '-' + (month >= 1 && month <= 9 ? '0' : '') + month + '-' + (day >= 0 && day <= 9 ? '0' : '') + day;
                let endMonthDay = new Date(year, month, 0).getDate();  //当前月份的总天数
                if (month - 3 <= 0) {
                    //如果是1，2，3月 ，年数往前推一年
                    let startMonthDay = new Date(year - 1, 12 - (3 - parseInt(month)), 0).getDate();
                    if (startMonthDay < day) {
                        //3个月前所在月的总台念书小于现在的天日期
                        dateObj.strat = year - 1 + '-' + (12 - (3 - month) >= 1 && 12 - (3 - month) <= 9 ? '0' : '') + (12 - (3 - month)) + '-' + (startMonthDay >= 0 && startMonthDay <= 9 ? '0' : '') + startMonthDay;
                    } else {
                        dateObj.strat = year - 1 + '-' + (12 - (3 - month) >= 1 && 12 - (3 - month) <= 9 ? '0' : '') + (12 - (3 - month)) + '-' + (day >= 0 && day <= 9 ? '0' : '') + day;
                    }
                } else {
                    let startMonthDay = new Date(year, parseInt(month) - 3, 0).getDate();
                    if (startMonthDay < day) {
                        //3个月前所在的总天数小于现在的天数
                        if (day < endMonthDay) {
                            //当前天日期小于当月总数天数，2月份比较特殊的月份
                            dateObj.strat = year + '-' + (month - 3 >= 1 && month - 3 <= 9 ? '0' : '') + (month - 3) + '-' +
                                (startMonthDay - (endMonthDay - day) >= 1 && startMonthDay - (endMonthDay - day) <= 9 ? '0' : '') + (startMonthDay - (endMonthDay - day));
                        } else {
                            dateObj.strat = year + '-' + (month - 3 >= 1 && month - 3 <= 9 ? '0' : '') + (month - 3) + '-' +
                                (startMonthDay >= 0 && startMonthDay <= 9 ? '0' : '') + startMonthDay;
                        }
                    } else {
                        dateObj.strat = year + '-' + (month - 3 >= 1 && month - 3 <= 9 ? '0' : '') + (month - 3) + '-' + (day >= 0 && day <= 9 ? '0' : '') + day;
                    }
                }
                console.log(dateObj.strat);
                this.monthTime3 = dateObj.strat;
            },

            //获取前六月时间
            getMonthBefore6() {
                let end = new Date();
                let year = end.getFullYear();
                let month = end.getMonth() + 1;
                let day = end.getDate();
                let dateObj = {};
                dateObj.end = year + '-' + (month >= 1 && month <= 9 ? '0' : '') + month + '-' + (day >= 0 && day <= 9 ? '0' : '') + day;
                let endMonthDay = new Date(year, month, 0).getDate();  //当前月份的总天数
                if (month - 6 <= 0) {
                    //如果是1，2，3，4，5，6月 ，年数往前推一年
                    let startMonthDay = new Date(year - 1, 12 - (6 - parseInt(month)), 0).getDate();
                    if (startMonthDay < day) {
                        //3个月前所在月的总台念书小于现在的天日期
                        dateObj.strat = year - 1 + '-' + (12 - (6 - month) >= 1 && 12 - (6 - month) <= 9 ? '0' : '') + (12 - (6 - month)) + '-' + (startMonthDay >= 0 && startMonthDay <= 9 ? '0' : '') + startMonthDay;
                    } else {
                        dateObj.strat = year - 1 + '-' + (12 - (6 - month) >= 1 && 12 - (6 - month) <= 9 ? '0' : '') + (12 - (6 - month)) + '-' + (day >= 0 && day <= 9 ? '0' : '') + day;
                    }
                } else {
                    let startMonthDay = new Date(year, parseInt(month) - 6, 0).getDate();
                    if (startMonthDay < day) {
                        //3个月前所在的总天数小于现在的天数
                        if (day < endMonthDay) {
                            //当前天日期小于当月总数天数，2月份比较特殊的月份
                            dateObj.strat = year + '-' + (month - 6 >= 1 && month - 6 <= 9 ? '0' : '') + (month - 6) + '-' +
                                (startMonthDay - (endMonthDay - day) >= 1 && startMonthDay - (endMonthDay - day) <= 9 ? '0' : '') + (startMonthDay - (endMonthDay - day));
                        } else {
                            dateObj.strat = year + '-' + (month - 6 >= 1 && month - 6 <= 9 ? '0' : '') + (month - 6) + '-' +
                                (startMonthDay >= 0 && startMonthDay <= 9 ? '0' : '') + startMonthDay;
                        }
                    } else {
                        dateObj.strat = year + '-' + (month - 6 >= 1 && month - 6 <= 9 ? '0' : '') + (month - 6) + '-' + (day >= 0 && day <= 9 ? '0' : '') + day;
                    }
                }
                console.log(dateObj.strat);
                this.monthTime6 = dateObj.strat;
            },

        }
    });

}

