var vm;

function initFun() {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getFinacGuaranteeLetterDataListUrl: 'qywx/finacGuaranteeLetter/getFinacGuaranteeLetterDataList.xa',
            },
            searchList: {
                type: '0',
                pageNum: 1,
                pageSize: 10
            },
            tabIndex: 0,
            role: '',
            listLoading: false,
            listFinished: false,
            noList: false,
            operationText: '去处理',
            dataList: [
                // {
                //     acctBkName: '华阳科技有限公司',
                //     custSocCode: 'XH987656546',
                //     custStatus: '正常',
                //     custCorpTp: '私营企业',
                //     custTime: '2025-09-15 15:00:12'
                // },
                // {
                //     acctBkName: '浏阳文化传媒有限公司',
                //     custSocCode: 'XH987656546',
                //     custStatus: '正常',
                //     custCorpTp: '私营企业',
                //     custTime: '2025-09-15 15:00:12'
                // }
            ]
        },
        created() {
            this.getDateList();
        },
        methods: {
            onLoad() {
                this.loading = true;
                // this.getDateList()
            },
            getDateList() {
                this.dataList = [];
                $http(this.baseUrl.getFinacGuaranteeLetterDataListUrl, true, this.searchList, false)
                    .then(res => {
                        this.role =res.data.role

                        for (let i = 0; i < res.data.list.length; i++) {
                            this.dataList.push(res.data.list[i])
                        }

                        this.listLoading = false;

                        if (10 > res.data.list.length) {
                            this.listFinished = true;
                        } else {
                            this.searchList.pageNum++
                        }
                        if (this.searchList.pageNum == 1 && this.dataList.length == 0) {
                            this.noList = true;
                        }
                    });
            },

            handleTabs(index) {
                this.searchList.pageNum = 1;
                this.dataList = [];
                this.noList = false;
                this.searchList.type = index;
                this.listFinished = false;
                if (index == '0') {
                    this.operationText = '去处理'
                } else {
                    this.operationText = '详情'
                }
                this.getDateList()
            },
            //审批类型
            getQuestionTypeText(type) {
                const typeMap = {
                    '1': '投标保函',
                    '2': '履约保函',
                    '3': '预付款保函',
                    '4': '质量及维修保函',
                    '5': '付款（支付）保函',
                    '6': '其它非融资性保函',
                };
                return typeMap[type] || '未知';
            },
            toHandle(type, TRAN_SEQ) {
                window.location.href = '../views/signDetails.html?type=' + type + '&TRAN_SEQ=' + TRAN_SEQ + '&role=' + this.role;
            }

        }
    })
};
