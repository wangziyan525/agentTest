var baseUrl = {
    xczxCustacquCustBudescrStatisticUrl: "xczxcustacqu/xczxCustacquCustBudescrStatistic.xa", //统计接口
}
var vm;
function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            // 时间筛选标签
            timeTabs: ['按日', '按月', '按年', '累计'],
            activeTab: 0,

            // 日期选择
            showDatePicker: false,
            showMonthPicker: false,
            showYearPicker: false,
            currentDate: new Date(),
            maxDate: new Date(),
            selectedDate: '',
            selectedMonth: '',
            selectedYear: '',

            // 加载状态
            loading: false,

            // 汇总数据
            summaryData: {
                waitAssign: 0,
                doAssign: 0,
                waitDock: 0,
                doDock: 0,
                notAccess: 0,
                canAccess: 0
            },

            // 表格数据
            tableData: []
        },

        created() {
            // 默认设置当天日期
            this.initDefaultDate();
            // 默认查询当天数据
            this.fetchData();
        },
        computed: {
            // 显示的日期文本
            displayDate() {
                switch (this.activeTab) {
                    case 0: // 按日
                        return this.selectedDate || '请选择';
                    case 1: // 按月
                        return this.selectedMonth || '请选择';
                    case 2: // 按年
                        return this.selectedYear || '请选择';
                    case 3: // 累计
                        return '累计';
                    default:
                        return '请选择';
                }
            },
            // 年份列表
            yearColumns() {
                const currentYear = new Date().getFullYear();
                const years = [];
                for (let i = currentYear; i >= currentYear - 20; i--) {
                    years.push(i + '年');
                }
                return years;
            },
            // 默认年份索引
            defaultYearIndex() {
                if (this.selectedYear) {
                    const year = parseInt(this.selectedYear);
                    const currentYear = new Date().getFullYear();
                    return currentYear - year;
                }
                return 0;
            }
        },
        methods: {
            // 敏感信息脱敏
            desensitizeIdNo(str, start, end) {
                if (!str && (start + end) >= str.length) {
                    return '';
                }
                let text1 = str.substring(0, start);
                let text3 = str.substring(end, str.length);
                let text2 = '';
                for (let i = 0; i < end - start; i++) {
                    text2 += "*";
                };
                return text1 + text2 + text3;
            },
            // 返回上一页
            goBack() {
                window.history.back();
            },

            // 打开日期选择器
            openDatePicker() {
                switch (this.activeTab) {
                    case 0: // 按日
                        this.showDatePicker = true;
                        break;
                    case 1: // 按月
                        this.showMonthPicker = true;
                        break;
                    case 2: // 按年
                        this.showYearPicker = true;
                        break;
                    case 3: // 累计 - 不弹出选择器
                        break;
                }
            },

            // 日期确认
            onDateConfirm(date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                this.selectedDate = `${year}-${month}-${day}`;
                this.showDatePicker = false;
                this.fetchData();
            },

            // 月份确认
            onMonthConfirm(date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                this.selectedMonth = `${year}-${month}`;
                this.showMonthPicker = false;
                this.fetchData();
            },

            // 年份确认
            onYearConfirm(value) {
                this.selectedYear = value.replace('年', '');
                this.showYearPicker = false;
                this.fetchData();
            },

            // 跳转到支行详情页
            goToDetail(item) {
                let selectedTimes = ''
                switch (this.activeTab) {
                    case 0: // 按日
                        selectedTimes = this.selectedDate;
                        break;
                    case 1: // 按月
                        selectedTimes = this.selectedMonth;
                        break;
                    case 2: // 按年
                        selectedTimes = this.selectedYear;
                        break;
                    case 3: // 累计
                        selectedTimes = '';
                        break;
                }
                window.location.href = `headOfficeManagerList.html?orgid=${encodeURIComponent(item.orgid)}&name=${encodeURIComponent(item.budescr)}&activeTab=${encodeURIComponent(this.activeTab)}&selectedTimes=${encodeURIComponent(selectedTimes)}`;
            },

            // 初始化默认日期
            initDefaultDate() {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                this.selectedDate = `${year}-${month}-${day}`;
                this.selectedMonth = `${year}-${month}`;
                this.selectedYear = `${year}`;
            },

            // 获取请求参数
            getRequestParams() {
                const params = {
                    datetype: String(this.activeTab + 1),
                    date: '',
                    role: '1',
                };

                switch (this.activeTab) {
                    case 0: // 按日
                        params.date = this.selectedDate;
                        break;
                    case 1: // 按月
                        params.date = this.selectedMonth;
                        break;
                    case 2: // 按年
                        params.date = this.selectedYear;
                        break;
                    case 3: // 累计
                        params.date = '';
                        break;
                }

                return params;
            },
            //总行查机构
            async fetchData() {
                const params = this.getRequestParams();
                await $http(baseUrl.xczxCustacquCustBudescrStatisticUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            // 赋值汇总数据
                            this.summaryData = {
                                waitAssign: res.data.waitAssign,
                                doAssign: res.data.doAssign,
                                waitDock: res.data.waitDock,
                                doDock: res.data.doDock,
                                notAccess: res.data.notAccess,
                                canAccess: res.data.canAccess
                            };

                            // 赋值表格数据
                            this.tableData = res.data.data;

                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },

            // 切换时间类型
            onTabChange(index) {
                this.activeTab = index;
                this.fetchData();
            }
        }
    })
};
