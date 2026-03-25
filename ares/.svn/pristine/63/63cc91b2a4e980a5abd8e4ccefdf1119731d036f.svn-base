var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getOnLineCustomerSignInfoUrl: 'discount/onLineCustSignInfo.xa', // 查询签约列表
            },
            searchList: {
                DalSt: '00',
                DsplPg: 1,
                DsplNumRc: 10,
                SgnSt: '',
                ReplyDtStrt: formatDate(new Date()),
                ReplyDtEnd: formatDate(new Date()),

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

            popupSign: {
                show: false,
                list: [
                    {
                        code: '',
                        text: '全部签约状态'
                    },
                    {
                        code: 'ST02',
                        text: '已签约'
                    },
                    {
                        code: 'ST03',
                        text: '已驳回'
                    },
                    {
                        code: 'ST04',
                        text: '已清退'
                    },
                    {
                        code: 'ST05',
                        text: '已作废'
                    },
                    {
                        code: 'ST06',
                        text: '审核中'
                    },
                    {
                        code: 'ST07',
                        text: '已通过其他渠道签约'
                    },
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
                    this.searchList.ReplyDtEnd = formatDate(new Date());
                    this.searchList.ReplyDtStrt = formatDate(new Date());
                }
                if (index == 2) {
                    startDate.setDate(endDate.getDate() - 6);
                    this.searchList.ReplyDtStrt = formatDate(startDate)
                }
                if (index == 3) {
                    startDate.setMonth(endDate.getMonth() - 1);
                    this.searchList.ReplyDtStrt = formatDate(startDate)
                }
                if (index == 4) {
                    startDate.setMonth(endDate.getMonth() - 3);
                    this.searchList.ReplyDtStrt = formatDate(startDate)
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
                this.searchList.ReplyDtStrt = formatDate(new Date());
                this.searchList.ReplyDtEnd = formatDate(new Date());
            },

            popupConfirmHandle () {
                if (this.searchList.ReplyDtStrt > this.searchList.ReplyDtEnd) return vant.Toast('起始日期不能大于结束日期');
                this.popupMask.show = false;
                this.searchList.DsplPg = 1;
                this.dataList = [];
                this.noList = false;
                this.onLoad();
            },

            popupSignConfirm (param) {
                if (this.searchList.ReplyDtStrt > this.searchList.ReplyDtEnd) return vant.Toast('起始日期不能大于结束日期');
                this.searchList.SgnSt = param.code;
                this.popupSign.show = false;
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
                    ReplyDtStrt: this.searchList.DalSt == '01' ? this.searchList.ReplyDtStrt : '',
                    ReplyDtEnd: this.searchList.DalSt == '01' ? this.searchList.ReplyDtEnd : '',
                }
                $http(this.baseUrl.getOnLineCustomerSignInfoUrl,true, params, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        for (let i = 0; i < res.data.Lists.length; i ++) {
                            this.dataList.push(res.data.Lists[i])
                        }
                        this.listLoading = false;
                        this.listFinished = false;
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
                this.searchList.SgnSt = '';
                this.searchList.ReplyDtStrt = formatDate(new Date());
                this.searchList.ReplyDtEnd = formatDate(new Date());
                this.popupMask.checked = '1'
                this.searchList.SgnStName = '全部';
                this.dataList = [];
                this.noList = false;
                this.onLoad();
            },

            detailsHandle (params) {
                window.location.href = `signDetails.html?DtlRcrdId=${params.DtlRcrdId}`;
            },

            backHandle () {
                window.location.href = `signList.html`;
            }
        }
    })
};
