var baseUrl = {
    xczxCustacquCustManagerStatisticUrl: "xczxcustacqu/xczxCustacquCustManagerStatistic.xa", //统计接口
    xczxCustacquDownloadCustDetailUrl: "xczxcustacqu/xczxCustacquDownloadCustDetail.xa", //下载
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
                    case 0:
                        return this.selectedDate || '请选择';
                    case 1:
                        return this.selectedMonth || '请选择';
                    case 2:
                        return this.selectedYear || '请选择';
                    case 3:
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
                    case 0:
                        this.showDatePicker = true;
                        break;
                    case 1:
                        this.showMonthPicker = true;
                        break;
                    case 2:
                        this.showYearPicker = true;
                        break;
                    case 3:
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

            // 跳转到详情
            goToDetail(item) {
                window.location.href = `branchMangerAssignList.html?humancode=${encodeURIComponent(item.humancode)}`;
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
                    role: '2',
                };

                switch (this.activeTab) {
                    case 0:
                        params.date = this.selectedDate;
                        break;
                    case 1:
                        params.date = this.selectedMonth;
                        break;
                    case 2:
                        params.date = this.selectedYear;
                        break;
                    case 3:
                        params.date = '';
                        break;
                }
                return params;
            },
            async fetchData() {
                const params = this.getRequestParams();
                await $http(baseUrl.xczxCustacquCustManagerStatisticUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            // 赋值汇总数据
                            this.summaryData = {
                                waitDock: res.data.waitDock,
                                doDock: res.data.doDock,
                                notAccess: res.data.notAccess,
                                canAccess: res.data.canAccess,
                                waitAssign: res.data.waitAssign,
                                doAssign: res.data.doAssign,
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
            async downloadData(){
                const params = this.getRequestParams();
                delete params.role;
                await $http(baseUrl.xczxCustacquDownloadCustDetailUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.$toast('下载成功');
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
