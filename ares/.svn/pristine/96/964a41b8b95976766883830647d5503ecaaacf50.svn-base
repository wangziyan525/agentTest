var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                combinationQueryUrl: 'qywx/investmentDeal/combinationQuery.xa',  // 投资交易管理查询组合信息
                endOfDayQueryUrl: 'qywx/investmentDeal/endOfDayQuery.xa' // 投资交易管理查询日终净值信息
            },
            listData: [
                //     {
                //     AcvBase: '',
                //     CmprhCost: ''
                // }
            ],
            slideList: [
                true
            ],
            combination: {
                show: false,
                list: []
            },
            popupTime: {
                show: false,
                currentDate: new Date()
            },
            searchData: {
                CmbCd: '',
                CmbNm: '',
                QryDt: formatDate(new Date())
            }
        },

        created () {
           this.endOfDayQuery();
        },

        methods: {

            combinationQuery () {
                $http(this.baseUrl.endOfDayQueryUrl,true, this.searchData, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.listData = res.data.ListIfn ? res.data.ListIfn.map(item => {
                            return {
                                ...item
                            }
                        }) : [];
                    } else {
                        $.alert("",res.retmsg, function () {
                            // wx.closeWindow();
                        });
                    }
                });
            },

            endOfDayQuery () {
                $http(this.baseUrl.combinationQueryUrl,true, {}, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.combination.list = res.data.ListIfn ? res.data.ListIfn.map(item => {
                            return {
                                ...item,
                                text: item.CmbNm,
                                code: item.CmbCd
                            }
                        }) : [];
                        this.searchData = {
                            ...this.searchData,
                            CmbCd: res.data.ListIfn[0].CmbCd,
                            CmbNm: res.data.ListIfn[0].CmbNm,
                        }
                        this.combinationQuery()
                    } else {
                        $.alert("",res.retmsg, function () {
                            wx.closeWindow();
                        });
                    }
                });
            },

            slideHandle (index) {
                this.slideList[index] = this.slideList[index] ? false : true;
                console.log(this.slideList);
                this.$forceUpdate();
            },

            searchHandle () {
                this.combination.show = true;
            },

            combinationConfirm (param) {
                this.searchData.CmbNm = param.text;
                this.searchData.CmbCd = param.code;
                this.combination.show = false;
                this.combinationQuery()
            },

            popupTimeConfirm (param) {
                this.searchData.QryDt = formatDate(param);
                this.popupTime.show = false;
                this.combinationQuery()
            },
        }
    })
};


function formatDate (param) {
    let year, month, date;
    year = param.getFullYear();
    if (param.getMonth() + 1 > 9) {
        month = param.getMonth() + 1;
    } else {
        month = '0' + (param.getMonth() + 1);
    }
    if (param.getDate() > 9) {
        date = param.getDate()
    } else {
        date = '0' + param.getDate()
    }
    return `${year}-${month}-${date}`;
};



