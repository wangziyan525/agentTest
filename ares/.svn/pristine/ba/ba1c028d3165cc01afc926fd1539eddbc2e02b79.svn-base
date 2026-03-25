var baseUrl = {
    yqpowerFindUrl: 'ticketEasyLoan/yqpowerFind.xa',// 西银票易贷逾期-权限查询
    overdueCountUrl: "ticketEasyLoan/overdueCount.xa", //西银票易贷逾期统计接口
    overdueDetailUrl: 'ticketEasyLoan/overdueDetail.xa',//西银票易贷-逾期明细
}
var vm;
function initFun() {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {

            },
            formData: {

            },
            total0: 0,
            total1: 0,
            formatMonth:'',
            isShowTimeChoosed:false,
            nodata1: false,
            nodata2: false,
            monthShow: false,
            maxDate: new Date(),
            currentDate: new Date(),
            activeTab: 0,
            month:'' ,
            list1: [],
            list2: [],
            overDueList0: [],
            overDueList1: [],
            detailList0: [],
            detailList1: [],
            prmsnType: '',
            orgId: '',
        },


        created() {

        },
        mounted() {
            this.month = moment(new Date()).format('YYYYMMDD');
            //查询权限
             this.yqpowerFind();
             this.formatMonth =  moment(new Date()).format('YYYY年MM月DD日');
      
        },

        methods: {
           
            chooseDate(value) {
                this.formatMonth = this.initDateTimer(value);
         
                this.monthShow = false;
                this.initDateTimer(value);
                this.month = moment(value).format('YYYYMMDD');
           
                 //逾期明细
                 this.overdueDetail('0');
                 this.overdueDetail('1');
                 this.overdueCount('0');
                 this.overdueCount('1');
            },
            //切换标签
            onTabChange(index) {
                this.activeTab = index;
            },
            /**
             * 初始化时间格式
             * @param {*} param
             */

            initDateTimer(param) {
                var month = param.getMonth() + 1;
                var date = param.getDate();
                if (month < 10) {
                    month = '0' + month;
                }
                if (date < 10) {
                    date = '0' + date;
                }
                
                 return param.getFullYear() + '年' + month + '月' + date + '日';
                 

            },
            // 金额格式化
            formatMoney(amount){
                return new Intl.NumberFormat('zh-CN',{
                    minimumIntegerDigits:2,
                    maximumFractionDigits:2
                }).format(amount)
            },
            /**
             * 初始化时间格式
             * @param {*} param
             */

            formatter(type, val) {
                if (type == "year") {
                    return `${val}年`
                } else if (type == "month") {
                    return `${val}月`
                } else if (type == "day") {
                    return `${val}日`
                }
                return val;
            },
            //权限查询
             yqpowerFind() {
                let params = {};
                $http(baseUrl.yqpowerFindUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.prmsnType = res.data.prmsnType;
                            this.orgId = res.data.org_id;
                            if (res.data.prmsnType != 'bu_descr' && res.data.prmsnType != 'zonghang') {
                                $.alert("", "暂无权限 ", function () {
                                    wx.closeWindow();
                                });
                            } else {
                                //逾期明细
                                this.overdueDetail('0');
                                this.overdueDetail('1');
                                this.overdueCount('0');
                                this.overdueCount('1');
                            }
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //逾期明细
            overdueDetail(type) {
                this.nodata2 = false;
                this.detailList0 = [];
                this.detailList1 =[];
                this.total0 = 0;
                this.total1 = 0;
                let params = {};
                params.rundate = this.month;
                params.prmsnType = this.prmsnType;
                params.orgId = this.orgId;
                params.ovdeType = type;
                $http(baseUrl.overdueDetailUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            if(res.data!='' && res.data!=null && res.data!=undefined){
                                this.nodata2 = false;
                                if(type == 1){
                                    this.detailList0 = res.data;
                                    this.total0 = res.data.length
                                }else{
                                    this.detailList1 = res.data;
                                    this.total1 = res.data.length
                                }
                            }else{
                                this.nodata2 = true;
                            }
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },

            //逾期统计接口
            overdueCount(type) {
                this.nodata1 = false;
                this.overDueList0 = [];
                this.overDueList1 = [];
                let params = {};
                params.rundate = this.month;
                params.prmsnType = this.prmsnType;
                params.orgId = this.orgId;
                params.ovdeType = type
                $http(baseUrl.overdueCountUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            if(res.data!='' && res.data!=null && res.data!=undefined){
                                this.nodata1 = false;
                                if(type == 1){
                                    this.overDueList0 = res.data;
                                }else{
                                    this.overDueList1 = res.data;
                                }
                            }else{
                                this.nodata1 = true;
                            }
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
        }
    })
};
