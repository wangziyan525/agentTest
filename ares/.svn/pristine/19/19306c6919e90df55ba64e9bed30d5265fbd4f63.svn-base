var baseUrl = {
    xczxCustacquDetailUrl: "xczxcustacqu/xczxCustacquDetail.xa", //详情接口
    xczxCustacquCustManagerListUrl: "xczxcustacqu/xczxCustacquCustManagerList.xa", //经理查询接口
    xczxCustacquLeaderAssignUrl: "xczxcustacqu/xczxCustacquLeaderAssign.xa", //经理分配接口
}
var vm;
function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            applyid: '',
            detailData: {},
            datastage: '',
            showPopup: false,
            selectedManager: '',
            managerList: {},
        },

        computed: {
            // 是否显示对接信息区块：-1和0不显示
            showDockingSection() {
                const stage = this.detailData.datastage;
                return stage !== '-1' && stage !== '0';
            },
            // 是否显示是否准入：2-7显示，1不显示
            showAdmission() {
                const stage = this.detailData.datastage;
                return ['2', '3', '4', '5', '6', '7'].includes(stage);
            },
            // 是否显示对接阶段：2-6显示，7不显示
            showDockingStage() {
                const stage = this.detailData.datastage;
                return ['2', '3', '4', '5', '6'].includes(stage);
            },
            // 是否隐藏下边框
            needHideBorder() {
                const stage = this.detailData.datastage;
                // 7不予准入且有原因时隐藏，或2-6有对接阶段时不需要隐藏
                return (stage === '7' || stage === '6') && this.detailData.refusereason;
            }
        },
        async mounted() {
            // 从URL获取客户ID
            const urlParams = new URLSearchParams(window.location.search);
            this.applyid = urlParams.get('applyid');
            await this.fetchDetail(this.applyid);
            if (this.datastage == '-1') {
                this.xczxCustacquCustManagerList(this.applyid);
            }
        },
        async created() {

        },
        methods: {
            goBack() {
                window.history.back();
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
            // 分配
            handleAssign() {
                this.selectedManager = '';
                this.showPopup = true;
            },
            // 确认分配
            confirmAssign() {
                if (!this.selectedManager) {
                    this.$toast('请选择客户经理');
                    return;
                }
                this.xczxCustacquLeaderAssign();
                this.showPopup = false;

            },

            // 获取客户详情
            async fetchDetail(applyid) {
                await $http(baseUrl.xczxCustacquDetailUrl, true, {
                    "applyid": applyid
                }, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.detailData = res.data;
                            this.datastage = res.data.datastage
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //经理查询
            async xczxCustacquCustManagerList() {
                await $http(baseUrl.xczxCustacquCustManagerListUrl, true, {}, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.managerList = res.data;
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //经理分配
            async xczxCustacquLeaderAssign() {
                let that = this;
                await $http(baseUrl.xczxCustacquLeaderAssignUrl, true, {
                    "applyid": that.applyid,
                    "humancode": that.selectedManager
                }, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            // 分配成功后返回上一页
                            setTimeout(() => {
                                $.alert("", '分配成功', function () {
                                    // window.location.href = "./customDetails.html?applyid=" + that.applyid;
                                    window.location.href = "./assignList.html"
                                });

                            }, 1500);
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            // 客户类型转换
            getCustType(type) {
                return DICT.CustType[type] || '-';
            },

            // 所属行业转换
            getIndustry(industry, custtype) {
                if (custtype === '3') {
                    return DICT.IndustryFarmer[industry] || '-';
                } else {
                    return DICT.IndustryPersonOrEnterprise[industry] || '-';
                }
            },

            // 经营年限转换
            getOperatingYears(years) {
                return DICT.OperatingYears[years] || '-';
            },

            // 资金需求转换
            getFundingRequ(funding, custtype) {
                if (custtype === '1') {
                    return DICT.FundingRequEnterprise[funding] || '-';
                } else if (custtype === '2') {
                    return DICT.FundingRequPerson[funding] || '-';
                } else if (custtype === '3') {
                    return DICT.FundingRequFarmer[funding] || '-';
                }
                return '-';
            },

            // 用途转换
            getPurpose(purpose, custtype) {
                if (custtype === '1') {
                    return DICT.PurposeEnterprise[purpose] || '-';
                } else if (custtype === '2') {
                    return DICT.PurposePerson[purpose] || '-';
                } else if (custtype === '3') {
                    return DICT.PurposeFarmer[purpose] || '-';
                }
                return '-';
            },

            // 渠道转换
            getChannel(channel) {
                return DICT.Channal[channel] || '-';
            },

            // 联络时间转换
            getContactTime(time) {
                return DICT.ContactTime[time] || '-';
            },

            // 数据阶段转换
            getDataStage(stage) {
                return DICT.DataStage[stage] || '-';
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
            }
        }
    })
};
