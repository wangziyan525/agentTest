var vm;

function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            activeTab: 1,
            selectedDate: '当日',
            statusFilter: '全部',
            showDateSheet: false,
            showStatusSheet: false,
            dateActions: [
                { name: '当日' },
                { name: '近一周' },
                { name: '近半年' }
            ],
            statusActions: [
                { name: '全部' },
                { name: '签收成功' },
                { name: '拒绝签收' }
            ],
            list: [
                {
                    billNo: '4040112223348255',
                    ticketType: '银票',
                    typeTheme: 'bank',
                    batchStatus: '签收成功',
                    details: [
                        { label: '报价单编号', value: '87654345678909876' },
                        { label: '票据总数', value: '2' },
                        { label: '票据总金额', value: '￥19,200.00' },
                        { label: '结算金额', value: '￥18,624.00' },
                        { label: '应付利息', value: '￥576.00' },
                        { label: '交易日期', value: '2025-06-12' },
                        { label: '批次状态', value: '签收成功', color: '#66C102' }
                    ]
                },
                {
                    billNo: '4040112223348255',
                    ticketType: '商票',
                    typeTheme: 'business',
                    batchStatus: '拒绝签收',
                    details: [
                        { label: '报价单编号', value: '2345678654356782' },
                        { label: '票据总数', value: '2' },
                        { label: '票据总金额', value: '￥19,200.00' },
                        { label: '结算金额', value: '￥18,624.00' },
                        { label: '应付利息', value: '￥576.00' },
                        { label: '交易日期', value: '2025-06-12' },
                        { label: '批次状态', value: '拒绝签收', color: '#FF573F' }
                    ]
                }
            ]
        },
        computed: {
            tabLineStyle: function() {
                return {
                    left: this.activeTab === 1 ? '50%' : '0'
                };
            },
            filteredList: function() {
                var that = this;
                return this.list.filter(function(item) {
                    if (that.statusFilter === '全部') {
                        return true;
                    }
                    return item.batchStatus === that.statusFilter;
                });
            }
        },
        methods: {
            goBack: function() {
                window.history.back();
            },
            switchTab: function(index) {
                if (index === this.activeTab) {
                    return;
                }
                if (index === 0) {
                    $.toast('待签收页面待接入', 'text');
                    return;
                }
                this.activeTab = index;
            },
            openDateSheet: function() {
                this.showDateSheet = true;
            },
            openStatusSheet: function() {
                this.showStatusSheet = true;
            },
            onDateSelect: function(action) {
                this.selectedDate = action.name;
                this.showDateSheet = false;
            },
            onStatusSelect: function(action) {
                this.statusFilter = action.name;
                this.showStatusSheet = false;
            }
        }
    });
}
