var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getDataListUrl: 'tobaccoFarmer/getDataList.xa'
            },
            activeName: 'N',
            dataList: [
                // {
                //     "LoanPrdct":"惠农乐",
                //     "TaskSeqNum":"LN2024051500000007",
                //     "FlwSeqNum":"2024053000000002",
                //     "ClitNum":"LNkh2023122900000001",
                //     "CustNm":"李三",
                //     "CurrAprvInst":"250",
                //     "TskTp":"AfterLoanCheck",
                //     "FlwNm":"洛南村镇银行贷后管理流程",
                //     "CurrAprvStg":"协办客户经理",
                //     "CurrAprvMan":"001705"
                // }

            ]
        },

        created () {
            this.getDataListFun();
        },

        methods : {
            tabsHandle (key) {
                console.log(key);
                this.activeName = key;
                this.getDataListFun();
            },

            getDataListFun () {
                let params = {
                    TskTp: "FreezeCreditApply",
                    CompInd: this.activeName
                };
                $http(this.baseUrl.getDataListUrl, true,params, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.dataList = res.data
                    } else {
                        this.$dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                            wx.closeWindow();
                        });
                    }
                })
            },

            nextPage (key) {
                let { FlwSeqNum, TaskSeqNum } = key
                console.log(FlwSeqNum, TaskSeqNum)
                window.location.href = `./thawingDetails.html?FlwSeqNum=${FlwSeqNum}&TaskSeqNum=${TaskSeqNum}`;
            }
        }
    })
};

