var vm;

function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            activeTab: 0,
            showFilterSheet: false,
            filterForm: {
                orgNo: '',
                quoteNo: '',
                minAmount: '',
                maxAmount: ''
            },
            cards: [
                {
                    billNo: '4040112223348255',
                    ticketType: '银票',
                    typeTheme: 'bank',
                    details: [
                        { label: '票据总数', value: '2' },
                        { label: '票据总金额', value: '￥19,200.00' },
                        { label: '利率', value: '3.0%' },
                        { label: '利息', value: '￥576.00' },
                        { label: '结算金额', value: '￥18,624.00' },
                        { label: '交易对手行名称', value: '西安银行高新科技路支行' }
                    ]
                },
                {
                    billNo: '4040112223348255',
                    ticketType: '商票',
                    typeTheme: 'business',
                    details: [
                        { label: '票据总数', value: '2' },
                        { label: '票据总金额', value: '￥19,200.00' },
                        { label: '利率', value: '3.0%' },
                        { label: '利息', value: '￥576.00' },
                        { label: '结算金额', value: '￥18,624.00' },
                        { label: '交易对手行名称', value: '西安银行高新科技路支行' }
                    ]
                }
            ]
        },
        computed: {
            tabLineStyle: function() {
                return {
                    left: this.activeTab === 0 ? '0' : '50%'
                };
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
                $.toast('签收结果查询页待接入', 'text');
            },
            toggleFilterSheet: function() {
                this.showFilterSheet = !this.showFilterSheet;
            },
            closeFilterSheet: function() {
                this.showFilterSheet = false;
            },
            resetFilter: function() {
                this.filterForm.orgNo = '';
                this.filterForm.quoteNo = '';
                this.filterForm.minAmount = '';
                this.filterForm.maxAmount = '';
            },
            confirmFilter: function() {
                this.showFilterSheet = false;
                $.toast('筛选条件已确认', 'text');
            },
            toSign: function(item) {
                $.toast('去签收：' + item.billNo, 'text');
            }
        }
    });
}
