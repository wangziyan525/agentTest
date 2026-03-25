var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getOnLineCustomerSignInfoUrl: 'discount/disDealInfo.xa', // 查询审批列表
            },
            searchList: {
                DalSt: '01',
                DsplPg: 1,
                DsplNumRc: 10,
                TranSt: '',
                QryStDt: formatDate(new Date()),
                QryEndDt: formatDate(new Date()),

            },
            listLoading: false,
            listFinished: false,
            noList: false,
            dataList: [
                
            ],
            popupMask: {
                show: false,
                checked: '1',
                key: ''
            },

            popupTime: {
                show: false,
                maxDate: new Date(),
                currentDate: new Date()
            },

            popupTranSt: {
                show: false,
                list: [
                    {
                        code: '',
                        text: '全部'
                    },
                    // {
                    //     code: '',
                    //     text: '全部交易状态'
                    // },
                    // {
                    //     code: '00',
                    //     text: '未处理'
                    // },
                    {
                        code: '02',
                        text: '交易成功'
                    },
                    {
                        code: '01',
                        text: '审核拒绝'
                    },
                    {
                        code: '03',
                        text: '交易失败'
                    }
                ]
            }
        },
        created () {
            // this.onLineCustomerSignInfo();
        },
        methods: {

            popupTimerHandle (index) {
            
                this.popupMask.checked = index;
                let endDate = new Date();
                let startDate = new Date(endDate);
                if (index == 1) {
                    this.searchList.QryEndDt = formatDate(new Date());
                    this.searchList.QryStDt = formatDate(new Date());
                }
                if (index == 2) {
                    startDate.setDate(endDate.getDate() - 6);
                    this.searchList.QryStDt = formatDate(startDate)
                }
                if (index == 3) {
                    startDate.setMonth(endDate.getMonth() - 1);
                    this.searchList.QryStDt = formatDate(startDate)
                }
                if (index == 4) {
                    startDate.setMonth(endDate.getMonth() - 3);
                    this.searchList.QryStDt = formatDate(startDate)
                }
            },
            
            popupSelectTimerHandle (key) {
                this.popupMask.key = key;
                this.popupTime.show = true;
            },
            
            popupTimeConfirm (param) {
                this.searchList[this.popupMask.key] = formatDate(param);
                this.popupMask.checked = '';
                this.popupTime.show = false;
            },
            
            popupResetHandle () {
                this.popupMask.checked = 1;
                this.searchList.QryStDt = formatDate(new Date());
                this.searchList.QryEndDt = formatDate(new Date());
            },

            popupConfirmHandle () {
                if (this.searchList.QryStDt > this.searchList.QryEndDt) return vant.Toast('起始日期不能大于结束日期')
                this.popupMask.show = false;
                this.searchList.DsplPg = 1;
                this.dataList = [];
                this.noList = false;
                this.onLoad();
            },

            popupTranStConfirm (param) {
                if (this.searchList.QryStDt > this.searchList.QryEndDt) return vant.Toast('起始日期不能大于结束日期')
                this.searchList.TranSt = param.code;
                this.popupTranSt.show = false;
                this.searchList.DsplPg = 1;
                this.dataList = [];
                this.noList = false;
                this.onLoad();
            },

            onLoad () {
                this.listLoading = true;
                this.onLineCustomerSignInfo()
            },

            onLineCustomerSignInfo () {
                let params = {
                    ...this.searchList,
                    QryStDt: this.searchList.DalSt == '01' ? this.searchList.QryStDt : '',
                    QryEndDt: this.searchList.DalSt == '01' ? this.searchList.QryEndDt : '',
                }
                $http(this.baseUrl.getOnLineCustomerSignInfoUrl,true, params, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        for (let i = 0; i < res.data.Lists.length; i ++) {
                            this.dataList.push(res.data.Lists[i])
                        }
                        this.listFinished = false;
                        this.listLoading = false;
    
                        if (10 > res.data.Lists.length) {
                            this.listFinished = true;
                        } else {
                            this.searchList.DsplPg++
                        }
                        if (this.searchList.DsplPg == 1 && this.dataList.length == 0) {
                            this.noList = true;
                        }
                    } else {
                        if (this.searchList.DsplPg == 1 && this.dataList.length == 0) {
                            this.noList = true;
                        }
                        this.listFinished = true;
                        vant.Dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        }); 
                    }
                });
            },
            handleTabs(index) {
                this.searchList.DalSt = index;
                this.searchList.DsplPg = 1;
                this.searchList.TranSt = index == '01' ? '' : '00';
                this.searchList.QryStDt = formatDate(new Date());
                this.searchList.QryEndDt = formatDate(new Date());
                this.popupMask.checked = '1'
                this.dataList = [];
                this.noList = false;
                this.onLoad();
            },
            formatTranStClass(param) {
                if (param == '00') return 'colorF5A623';
                if (param == '02') return 'color66C102';
                if (param == '01' || param == '03') return 'colorFF0000';
                return 'color272727';
            },
            formatResultTranSt(param) {
                if (param == '00') return '待签收';
                if (param == '01') return '审核拒绝';
                if (param == '02') return '签收成功';
                if (param == '03') return '交易失败';
                return formatTranSt(param);
            },
            formatBillTag(param) {
                if (param == 'AC01') return '银票';
                if (param == 'AC02') return '商票';
                return '';
            },
            formatBillTagClass(param) {
                return param == 'AC02' ? 'header_D09F4C' : 'header_1482FF';
            },

            detailsHandle (params) {
                window.location.href = `loanDetails.html?QtnShdNur=${params.QtnShdNur}&TranSt=${params.TranSt}&DalSt=${this.searchList.DalSt}`;
            }
        }
    })
};
