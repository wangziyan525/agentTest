var baseUrl = {
    // 顶部 4 个统计卡片共用该接口，跟列表分开请求，避免翻页时重复刷新统计值。
    getStats: 'depositPerformance/getStats.xa',
    // 表格按分页加载，切换日期 / 主 Tab / 分组时统一重新拉第一页。
    getList: 'depositPerformance/getList.xa',
};

var vm;

function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            // 日期筛选：
            // dateType 传给后端作为查询维度，默认展示“昨日”口径；
            // 自定义日期时仍传单日范围，所以 startDate 和 endDate 会保持同一天。
            dateType: 'yesterday',
            showStartPicker: false,
            selectedDate: new Date(),
            currentPickerDate: new Date(),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(),

            // 统计卡片数据。先用占位符兜底，避免接口返回前页面闪出空白。
            stats: {
                customerCount: '--',
                newCustomer: '--',
                balance: '--',
                yearlyNew: '--',
            },

            // 主 Tab 对应后端 tabType 枚举：
            // 0 = 一级机构，1 = 经营支行，2 = 员工。
            activeMainTab: 0,

            // 一级机构视角下的二级筛选，索引值直接作为 groupType 传给后端。
            groups: ['区行组', '分行组', '直属行组'],
            activeGroup: 0,

            // 列表区状态。van-list 依赖 loading / finished 控制滚动加载节奏。
            list: [],
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 20,
            noData: false,
        },

        computed: {
            // 页面上的自定义日期展示文案，同时复用给接口参数。
            selectedDateStr: function () {
                return this.formatDate(this.selectedDate);
            },
        },

        mounted: function () {
            // 设计稿和业务都要求默认展示“昨日”数据，不允许选择今天。
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            this.selectedDate = yesterday;
            this.maxDate = yesterday;
            this.getStats();
            this.getList();
        },

        methods: {
            // 统一输出 YYYY-MM-DD，兼容接口入参和按钮文案展示。
            formatDate: function (date) {
                var y = date.getFullYear();
                var m = String(date.getMonth() + 1).padStart(2, '0');
                var d = String(date.getDate()).padStart(2, '0');
                return y + '-' + m + '-' + d;
            },

            getQueryParam: function (name) {
                var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                var r = window.location.search.substr(1).match(reg);
                return r ? decodeURIComponent(r[2]) : null;
            },

            // ---- 日期筛选 ----
            setDateType: function (type) {
                if (type === 'custom') {
                    // 每次打开日期面板时，回显当前已选日期，避免用户误以为被重置。
                    this.currentPickerDate = new Date(this.selectedDate);
                    this.showStartPicker = true;
                } else {
                    this.dateType = 'yesterday';
                    var yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    this.selectedDate = yesterday;
                    this.refreshData();
                }
            },

            onStartDateConfirm: function (value) {
                this.selectedDate = new Date(value);
                this.showStartPicker = false;
                this.dateType = 'custom';
                this.refreshData();
            },

            // ---- 主Tab切换 ----
            setMainTab: function (index) {
                if (this.activeMainTab === index) return;
                this.activeMainTab = index;
                // 只有一级机构页签显示分组，切走后先归零，避免旧 groupType 串到别的视角。
                this.activeGroup = 0;
                this.refreshData();
            },

            // ---- 分组切换 ----
            setGroup: function (index) {
                if (this.activeGroup === index) return;
                this.activeGroup = index;
                this.refreshData();
            },

            // ---- 刷新数据 ----
            refreshData: function () {
                // 所有筛选项变化后都按“重新查第一页”处理，避免旧分页数据混入新条件结果。
                this.pageNum = 1;
                this.list = [];
                this.finished = false;
                this.noData = false;
                this.loading = false;
                this.getStats();
                this.getList();
            },

            // ---- 获取统计数据 ----
            getStats: function () {
                var that = this;
                var params = {
                    dateType: that.dateType,
                    startDate: that.selectedDateStr,
                    endDate: that.selectedDateStr,
                };
                $http(baseUrl.getStats, false, params, false)
                    .then(function (res) {
                        that.stats = res.data || that.stats;
                    });
            },

            // ---- 获取列表 ----
            getList: function () {
                var that = this;
                if (that.loading || that.finished) return;
                that.loading = true;
                var params = {
                    dateType: that.dateType,
                    startDate: that.selectedDateStr,
                    endDate: that.selectedDateStr,
                    // tabType / groupType 都按索引传值，跟页面文案解耦，避免文案调整影响接口。
                    tabType: that.activeMainTab,
                    groupType: that.activeGroup,
                    page: that.pageNum,
                    limit: that.pageSize,
                };
                $http(baseUrl.getList, true, params, false)
                    .then(function (res) {
                        var data = res.data || [];
                        // 列表使用追加模式，配合 van-list 实现上拉加载更多。
                        that.list = that.list.concat(data);
                        if (data.length < that.pageSize) {
                            // 返回条数不足一页时视为到底，防止 van-list 持续触发 load。
                            that.finished = true;
                        } else {
                            that.pageNum++;
                        }
                        that.noData = that.list.length === 0;
                        that.loading = false;
                    }).catch(function () {
                        that.loading = false;
                    });
            },

            onLoad: function () {
                this.getList();
            },

            // ---- 跳转详情 ----
            toDetail: function (item) {
                window.location.href = 'detail.html?id=' + item.id;
            },
        },
    });
}
