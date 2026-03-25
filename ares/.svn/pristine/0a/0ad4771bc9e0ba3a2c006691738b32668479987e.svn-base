var baseUrl = {
    xczxCustacquLeaderDataListUrl: "xczxcustacqu/xczxCustacquLeaderDataList.xa", //乡村振兴获客-领导查询列表数据
}
var vm;
function initFun() {
    vm = new Vue({
        el: '.container',
        data: {
            searchText: '',
            activeTab: 'pending', // pending: 待分配, assigned: 已分配
            pageNum: 1,
            pageSize: 10,
            loading: false,
            finished: false,
            refreshing: false,
            //列表
            dataList: [],
        },

        created() {
            
        },
        mounted() {
            this.qrCodeDetection('0');
        },

        methods: {
            // 上拉加载
            onLoad() {
                this.loading = true;
                const type = this.activeTab == 'pending' ? '0' : '1'
                this.qrCodeDetection(type);
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
            //领导查询列表数据  0-待分配  1-已分配
            async qrCodeDetection(type) {
                await $http(baseUrl.xczxCustacquLeaderDataListUrl, true, {
                    "pageNum": this.pageNum,
                    "pageSize": "10",
                    "datastatus": type,
                    "entpname": this.searchText
                }, true)
                    .then(res => {
                        this.loading = false;
                        if (res.retcode == 'success') {
                            // 处理列表数据
                            const list = res.data.map(item => ({
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
                                datastage:item.datastage,
                                createtime : item.createtime,
                                custtype : DICT.CustType[item.custtype],
                            }));
                            // 判断是否加载完成
                            if (list.length < 10) {
                                this.finished = true;
                            }

                            this.dataList = this.dataList.concat(list);
                            this.pageNum++;

                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            // 搜索
            handleSearch() {
                this.pageNum = 1;
                this.dataList = [];
                this.finished = false;
                this.onLoad();
            },
            // 切换Tab
            switchTab(tab) {
                this.activeTab = tab;
                this.pageNum = 1;
                this.dataList = [];
                this.finished = false;
                this.onLoad();
            },
            // 查看详情
            goDetail(item) {
                window.location.href = `customDetails.html?applyid=${encodeURIComponent(item.id)}`;
            },
            // 进入待分配详情页
            goAssignDetail(item) {
                window.location.href = `customDetails.html?applyid=${encodeURIComponent(item.id)}`;
            },

            // 客户经理对接情况
            goManagerStatus() {
                window.location.href = 'branchMangerList.html';
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
        }
    })
};
