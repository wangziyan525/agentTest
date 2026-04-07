// 买入详情页 JS

var baseUrl = {
    getDetail: 'discount/buyDetail.xa',
    sign: 'discount/sign.xa',
    reject: 'discount/reject.xa',
};

var vm; // 暴露实例，方便外部调试

function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            // ---- 接口地址 ----
            getDetailUrl: baseUrl.getDetail,

            // ---- 详情数据 ----
            detailData: {
                quoteNo: '',          // 报价单编号
                billType: '',         // 票据类型
                billCount: '',        // 票据总数量
                totalAmount: '',      // 票据总金额
                settleAmount: '',     // 结算金额
                rate: '',             // 利率
                interestAmount: '',   // 利息
                orgNo: '',            // 机构号
                orgName: '',          // 机构名称
                traderNo: '',         // 交易员编号
                traderName: '',       // 交易员名称
                bills: []             // 票据明细列表
            },

            // ---- 当前选中的票据 ----
            currentBill: {},

            // ---- 加载状态 ----
            loading: false,
        },

        created: function() {
            // 读取 URL 参数
            this.id = this.getQueryParam('id');
        },

        mounted: function() {
            // 静态预览模式使用模拟数据
            if (window.__ARES_STATIC_PREVIEW__) {
                this.loadMockData();
            } else {
                this.getDetail();
            }
        },

        methods: {
            // ---- 工具方法 ----
            getQueryParam: function(name) {
                var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                var r = window.location.search.substr(1).match(reg);
                return r ? decodeURIComponent(r[2]) : null;
            },

            goBack: function() {
                window.history.back();
            },

            // ---- 获取详情 ----
            getDetail: function() {
                var that = this;
                var params = {
                    id: that.id || ''
                };
                
                $http(baseUrl.getDetail, true, params, false)
                    .then(function(res) {
                        if (res.data) {
                            that.detailData = res.data;
                            // 设置当前选中的票据（默认第一个）
                            if (that.detailData.bills && that.detailData.bills.length > 0) {
                                that.currentBill = that.detailData.bills[0];
                            }
                        }
                    });
            },

            // ---- 查看票据详情 ----
            showBillDetail: function(bill) {
                this.currentBill = bill;
                $.toast('已切换到该票据', 'text');
            },

            // ---- 拒绝 ----
            handleReject: function() {
                var that = this;
                $.confirm('', '确认拒绝该笔买入申请？', function() {
                    var params = {
                        id: that.id
                    };
                    
                    $http(baseUrl.reject, true, params, true)
                        .then(function(res) {
                            if (res.retcode === 'success') {
                                $.toast('已拒绝', 'text');
                                setTimeout(function() {
                                    window.history.back();
                                }, 1500);
                            } else {
                                $.alert('', res.retmsg || '拒绝失败');
                            }
                        });
                });
            },

            // ---- 签收 ----
            handleSign: function() {
                var that = this;
                $.confirm('', '确认签收该笔买入申请？', function() {
                    var params = {
                        id: that.id
                    };
                    
                    $http(baseUrl.sign, true, params, true)
                        .then(function(res) {
                            if (res.retcode === 'success') {
                                $.toast('签收成功', 'text');
                                setTimeout(function() {
                                    window.history.back();
                                }, 1500);
                            } else {
                                $.alert('', res.retmsg || '签收失败');
                            }
                        });
                });
            },

            // ---- 加载模拟数据 ----
            loadMockData: loadMockData,
        },

        watch: {
            // 监听当前选中票据变化
            currentBill: {
                handler: function(newVal) {
                    console.log('当前选中票据:', newVal);
                },
                deep: true
            }
        }
    });
}

// 加载模拟数据（用于静态预览）
function loadMockData() {
    vm.detailData = {
        quoteNo: '765434568765434556789',
        billType: '银票',
        billCount: '2',
        totalAmount: '16,300.00',
        settleAmount: '746,100.00',
        rate: '3.0',
        interestAmount: '23,894.00',
        orgNo: '1234567456',
        orgName: '西安银行科技路支行',
        traderNo: 'A002',
        traderName: '刘倩',
        bills: [
            {
                billNo: '404011222334825',
                subTicketRange: '000000000001,000060000000',
                billAmount: '10,000.00',
                interest: '596.00',
                settleAmount: '19,404.00',
                maturityDate: '2025-08-11'
            },
            {
                billNo: '404011222334825',
                subTicketRange: '000000000001,000060000000',
                billAmount: '10,000.00',
                interest: '298.00',
                settleAmount: '9,702.00',
                maturityDate: '2025-10-30'
            }
        ]
    };
    vm.currentBill = vm.detailData.bills[0];
    vm.loading = false;
}
