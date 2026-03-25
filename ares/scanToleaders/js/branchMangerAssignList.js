var baseUrl = {
    xczxCustacquCustListByCustManagerUrl: "xczxcustacqu/xczxCustacquCustListByCustManager.xa", //统计接口
}
var vm;
function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            // 客户经理信息
            managerName: '',
            managerPhone: '',

            // 状态Tab
            statusTab: 0, // 0: 待对接, 1: 已对接

            // 分页
            page: 1,
            pageSize: 10,
            loading: false,
            finished: false,
            refreshing: false,
            totalCount: 0,
            humancode: '',

            // 列表数据
            listData: []
        },

        created() {
            // 从URL获取客户经理信息
            const urlParams = new URLSearchParams(window.location.search);
            this.humancode = urlParams.get('humancode')
            this.onLoad();
        },
        methods: {
            goBack() {
                window.history.back();
            },

            callPhone() {
                window.location.href = `tel:${this.managerPhone}`;
            },

            onStatusChange(status) {
                this.statusTab = status;
                this.page = 1;
                this.listData = [];
                this.finished = false;
                this.onLoad();
            },

            // 下拉刷新
            onRefresh() {
                this.page = 1;
                this.finished = false;
                this.listData = [];
                this.onLoad();
            },

            // 上拉加载
            onLoad() {
                this.loading = true;
                // 构建请求参数
                const params = {
                    pageNum: String(this.page),
                    pageSize: '10',
                    datastatus: this.statusTab === 0 ? '0' : '1',
                    entpname: '',
                    humancode: this.humancode
                };

                console.log('请求参数:', JSON.stringify(params, null, 2));

                // 模拟接口请求
                this.fetchListData(params);
            },
            //格式化经营内容
            formatIndustry(type, val) {
                if (type == '1' || type == '2') {
                    return DICT.IndustryPersonOrEnterprise[val]
                } else {
                    return DICT.IndustryFarmer[val]
                }
            },
            //格式化资金需求
            formatFundingrequ(type, val) {
                if (type == '1') {
                    return DICT.FundingRequEnterprise[val]
                } else if (type == '2') {
                    return DICT.FundingRequPerson[val]
                } else if (type == '3') {
                    return DICT.FundingRequFarmer[val]
                }
            },
            //用途
            formatPurpose(type, val) {
                if (type == '1') {
                    return DICT.PurposeEnterprise[val]
                } else if (type == '2') {
                    return DICT.PurposePerson[val]
                } else if (type == '3') {
                    return DICT.PurposeFarmer[val]
                }
            },
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
            // 模拟接口请求
            async fetchListData(params) {
                await $http(baseUrl.xczxCustacquCustListByCustManagerUrl, true, params, true)
                    .then(res => {
                        this.loading = false;
                        if (res.retcode == 'success') {
                            // 处理列表数据
                            const list = res.data.data.map(item => ({
                                companyName: item.entpname,
                                statusText: DICT.DataStage[item.datastage],
                                statusClass: this.statusTab === 0 ? 'wait' : item.statusClass,
                                address: item.address,
                                industry: this.formatIndustry(item.custtype, item.industry),
                                operatingyears: DICT.OperatingYears[item.operatingyears],
                                fundingrequ: this.formatFundingrequ(item.custtype, item.fundingrequ),
                                purpose: this.formatPurpose(item.custtype, item.purpose),
                                phone: item.phone,
                                id: item.id,
                                datastage: item.datastage,
                                createtime : item.createtime,
                                custtype : DICT.CustType[item.custtype],
                            }));
                            this.managerName = res.data.name;
                            this.managerPhone = res.data.phone;
                            this.totalCount = res.data.num
                            // 判断是否加载完成
                            if (list.length < 10) {
                                this.finished = true;
                            }

                            this.listData = this.listData.concat(list);
                            this.page++;


                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            goToDetail(item) {
                window.location.href = `customDetails.html?applyid=${encodeURIComponent(item.id)}`;
            },
             // 状态样式
             getStatusClass(stage) {
                const classMap = {
                    '-1': 'warning',
                    '0': 'warning',
                    '1': 'processing',
                    '2': 'success',
                    '3': 'success',
                    '4': 'success',
                    '5': 'success',
                    '6': 'success',
                    '7': 'fail'
                };
                return classMap[stage] || '';
            },
        }
    })
};
