var baseUrl = {
    queryListUrl: 'dwDate/queryList.xa',//查询
    getRole: "dwDate/checkPow.xa",
}
var vm
function initFun() {
    vm = new Vue({
        el: "#app",
        data: {
            type: "0",
            searchWord: "",
            EstbDocTp: "1",
            flag: "",
            placetext: "",
            list: [],
            listLoading: false,
            listFinished: false,
            moreStatus: false,
            noMoreStatus: false,
            nodata: false,
            searchList: {
                pageIndex: 1,
                pageSize: 10,
                qwKeyword: '',//非必传 条件搜索时可传    --预约人姓名（录入时自动带出）
                registrationMeetingTime: '', // 非必传 条件搜索时可传  --预约接待日期（录入时手动选择： 只能选择月份
            },
            ifEnd: true,//分页下拉标志
            
            datatype: "",
            tab: '1',
            monthShow: false,
            dayShow: false,
            minDate:new Date(2020,0,1),
            maxDate:new Date(3970,10,1),
            currentDate: new Date(),
            day: '',//按日查询 提交
            day1: '',
            month: '',//按月查询 提交
            currentDateTime:''
        },
        created() {
            $("#app").show();
            this.getRole();
        },
        mounted() {
            var year = new Date().getFullYear();
            var month = new Date().getMonth() + 1;
            var month1 = new Date().getMonth() + 1;
            var date = new Date().getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (date < 10) {
                date = '0' + date;
            }
            this.month = year + '-' + month
            this.day = year + '-' + month + '-' + date
            this.month = this.GetQueryStrings('registrationMeetingTime') ? this.GetQueryStrings('registrationMeetingTime'):''
            const defaultDate = this.GetQueryStrings('registrationMeetingTime')
            const [defaultYear,defaultMonth] =  defaultDate.split('-').map(Number)
            this.currentDateTime = new Date(defaultYear,defaultMonth-1,1)
            this.query();
        },
        methods: {
            onLoad() {
                // this.loading = true;
                this.query()
            },
            getRole() {
                // var that = this;
                let params = {};

                $http(baseUrl.getRole, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            //管理员权限true
                            //  res.data = true;
                            if (res.data == true) {
                                // window.location.href = "./list.html";
                            } else {
                                $.alert("", '此功能暂不对您开放', function () {
                                    wx.closeWindow();
                                });
                            }
                        } else {
                            $.alert("", ret.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },

            chooseTab(param) {
                var that = this;
                that.tab = param;
                that.currentDate = new Date();
                if (param == 0) {
                    that.monthShow = false;
                    that.dayShow = true;
                } else if (param == 1) {
                    that.monthShow = true;
                    that.dayShow = false;
                }
            },
            addMore() {
                this.query();
            },
            /**
             * 初始化时间格式
             * @param {*} param
             */

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
            chooseDate(value) {
                this.list = []
                this.searchList.pageIndex = 1;
                // this.listFinished = false;
                this.monthShow = false;
                this.dayShow = false;
                this.initDateTimer(value);


                this.query();
            },
            search() {
                this.list = []
                this.searchList.pageIndex = 1;
                // this.listFinished = false;
                this.query();
            },
            /**
             * 初始化时间格式
             * @param {*} param
             */

            initDateTimer(param) {
                var month = param.getMonth() + 1;
                var month1 = param.getMonth() + 1;
                var date = param.getDate();
                if (month < 10) {
                    month = '0' + month;
                }
                if (date < 10) {
                    date = '0' + date;
                }
                if (this.tab == 1) {
                    this.day = '';
                    this.month = param.getFullYear() + '-' + month;
                    // this.onload( param.getFullYear(),month1)
                } else {
                    this.month = '';
                    this.day = param.getFullYear() + '-' + month + '-' + date;
                    this.day1 = param.getFullYear() + '/' + month + '/' + date;
                    window.location.href = 'detail.html?time=' + this.day1
                }

            },
            //查询
            query() {
                this.noList = false;
                this.searchList.qwKeyword = this.placetext,
                    this.searchList.registrationMeetingTime = this.month,
                    $http(baseUrl.queryListUrl, true, this.searchList, false)
                        .then(res => {
                            if (res.data != '' && res.data != null && res.data != undefined) {
                                this.nodata = false;

                                if (res.data.length < this.searchList.pageSize) {
                                    this.noMoreStatus = true;
                                    this.moreStatus = false;
                                } else {
                                    this.noMoreStatus = false;
                                    this.moreStatus = true;
                                    this.searchList.pageIndex++;
                                }
                                var newDataList = [];
                                var dataList = res.data;

                                newDataList = dataList ? dataList : [];
                                this.list = this.list.concat(newDataList);
                            } else {
                                if (this.searchList.pageIndex > 1) {
                                    this.noMoreStatus = true;
                                    this.moreStatus = false;
                                    this.nodata = false;
                                } else {
                                    this.noMoreStatus = false;
                                    this.moreStatus = false;
                                    this.nodata = true;
                                }

                            }
                        }
                        )
            },
            //跳转详情页
            toDetail(item) {
                localStorage.setItem('UserDetail', JSON.stringify(item));
                window.location.href = "./statement.html";
            },
            GetQueryStrings(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
        }







    })
}



//浏览器滚动部分高度
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
};

//浏览器可视部分高度
function getCilentHeight() {
    var clientHeight = 0;

    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    }
    return clientHeight;
};

//浏览器内容高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}


window.onscroll = function () {
    if ((getScrollHeight() - (Math.ceil(getScrollTop() + getCilentHeight()))) < 10) {

        if (!vm.ifEnd) {
            vm.ifEnd = true;
            vm.queryList();
        }
    }

};

