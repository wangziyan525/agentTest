var baseUrl = {
    queryListUrl: "lsteData/queryDataByManage.xa", // 列表查询
};

var vm;

function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            // 搜索关键字
            keyword: '',
            // 列表数据
            list: [],
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 10,
            channel: '',

            // 筛选弹窗
            showFilterPopup: false,

            // 日期选择器
            showDatePicker: false,
            currentDate: new Date(),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2030, 11, 31),
            datePickerType: '', // 'start' 或 'end'

            // 筛选条件
            startDate: '',
            endDate: '',
            selectedStatus: '',

            // 状态列表
            // 0-待审核;2-审核未通过;3-审核通过待审核;1-已完成;9-已失效;10-被驳回
            statusList: [
                { name: '待审核', value: '0' },
                { name: '审核通过待办理', value: '3' },
                { name: '未通过', value: '2' },
                { name: '被驳回', value: '10' },
                { name: '已完成', value: '1' },
                { name: '已失效', value: '9' },
            ],
        },
        created() {
            // 从URL获取来源
            const urlParams = new URLSearchParams(window.location.search);
            this.channel = urlParams.get('channel');
        },
        mounted() {
            this.query()
        },
        methods: {
            // 搜索
            handleSearch() {
                this.list = [];
                this.pageNum = 1;
                this.finished = false;
                this.loadData();
            },
            loadData() {
                this.loading = true;
                this.query()
            },
            // 加载数据
            query() {
                that = this
                $http(baseUrl.queryListUrl, true, {
                    CurPg: that.pageNum,
                    PerPgNumRc: that.pageSize,
                    ClientNm: that.keyword,
                    StrtDt: that.startDate.replace(/\//g, ""),
                    TmtDt: that.endDate.replace(/\//g, ""),
                    BkgSt: that.selectedStatus,
                }
                    , true)
                    .then(res => {
                        this.loading = false;
                        if (res.retcode == 'success') {
                            // 判断是否加载完成
                            if (res.data.length < 10) {
                                that.finished = true;
                            }
                            that.list = that.list.concat(res.data);
                            that.pageNum++;
                        } else {
                            that.finished = true;
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },

            // 点击列表项
            handleItemClick(item) {
                window.location.href = `detail.html?primKeyId=${encodeURIComponent(item.primKeyId)}`;
            },

            // 打开日期选择器
            openDatePicker(type) {
                this.datePickerType = type;
                if (type === 'start') {
                    this.minDate = new Date(2020, 0, 1);
                    this.maxDate = new Date();
                } else if (type === 'end') {
                    if (this.startDate) {
                        this.minDate = new Date(this.startDate.replace(/\//g, '-'));
                    } else {
                        this.minDate = new Date(2020, 0, 1);
                    }
                    this.maxDate = new Date();
                }

                // 设置当前日期
                if (type === 'start' && this.startDate) {
                    this.currentDate = new Date(this.startDate.replace(/\//g, '-'));
                } else if (type === 'end' && this.endDate) {
                    this.currentDate = new Date(this.endDate.replace(/\//g, '-'));
                } else {
                    this.currentDate = new Date();
                }
                this.showDatePicker = true;
            },

            // 日期选择确认
            onDateConfirm(value) {
                const year = value.getFullYear();
                const month = String(value.getMonth() + 1).padStart(2, '0');
                const day = String(value.getDate()).padStart(2, '0');
                const dateStr = `${year}/${month}/${day}`;
                if (this.datePickerType === 'start') {
                    this.startDate = dateStr;
                } else {
                    this.endDate = dateStr;
                }
                this.showDatePicker = false;
            },

            // 切换状态选择
            toggleStatus(value) {
                if (this.selectedStatus == value) {
                    this.selectedStatus = '';
                } else {
                    this.selectedStatus = value;
                }
            },

            // 重置筛选条件
            handleReset() {
                this.startDate = '';
                this.endDate = '';
                this.selectedStatus = '';
            },

            // 确认筛选
            handleConfirm() {
                this.showFilterPopup = false;
                this.list = [];
                this.pageNum = 1;
                this.finished = false;
                this.loadData();
            },
        }
    });
}
