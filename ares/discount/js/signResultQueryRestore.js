var vm;

function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            loading: false,
            finished: true,
            activeTab: 1,
            dateLabel: '当日',
            statusLabel: '筛选',
            selectedStatus: '',
            showDateSheet: false,
            showStatusSheet: false,
            statusClassMap: {
                pending: 'is-pending',
                success: 'is-success',
                refused: 'is-refused'
            },
            dateActions: [
                { name: '当日', code: 'today' },
                { name: '近七天', code: 'last7' },
                { name: '近一月', code: 'last30' },
                { name: '近三月', code: 'last90' }
            ],
            statusActions: [
                { name: '全部', code: '' },
                { name: '签收成功', code: 'success' },
                { name: '拒绝签收', code: 'refused' },
                { name: '待签收', code: 'pending' }
            ],
            pendingList: [
                {
                    billNo: '4040112223348255',
                    billType: 'bank',
                    quoteNo: '87654345678909876',
                    billCount: '2',
                    billAmount: '￥19,200.00',
                    settleAmount: '￥18,624.00',
                    interestAmount: '￥576.00',
                    tradeDate: '2025-06-12',
                    statusCode: 'pending',
                    statusText: '待签收'
                }
            ],
            resultList: [
                {
                    billNo: '4040112223348255',
                    billType: 'bank',
                    quoteNo: '87654345678909876',
                    billCount: '2',
                    billAmount: '￥19,200.00',
                    settleAmount: '￥18,624.00',
                    interestAmount: '￥576.00',
                    tradeDate: '2025-06-12',
                    statusCode: 'success',
                    statusText: '签收成功'
                },
                {
                    billNo: '4040112223348255',
                    billType: 'commercial',
                    quoteNo: '2345678654356782',
                    billCount: '2',
                    billAmount: '￥19,200.00',
                    settleAmount: '￥18,624.00',
                    interestAmount: '￥576.00',
                    tradeDate: '2025-06-12',
                    statusCode: 'refused',
                    statusText: '拒绝签收'
                }
            ]
        },
        computed: {
            displayList: function() {
                var list;
                var selectedStatus;

                if (this.activeTab === 0) {
                    return this.pendingList;
                }

                list = this.resultList.slice();
                selectedStatus = this.selectedStatus;
                if (!this.selectedStatus) {
                    return list;
                }

                return list.filter(function(item) {
                    return item.statusCode === selectedStatus;
                });
            }
        },
        methods: {
            switchTab: function(tab) {
                this.activeTab = tab;
                if (tab === 0) {
                    this.statusLabel = '筛选';
                    this.selectedStatus = '';
                }
            },
            handleDateSelect: function(action) {
                this.dateLabel = action.name;
            },
            handleStatusSelect: function(action) {
                this.selectedStatus = action.code;
                this.statusLabel = action.code ? action.name : '筛选';
            },
            goBack: function() {
                window.history.back();
            }
        }
    });
}
