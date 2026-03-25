var baseUrl = {
    signDetailUrl: "ticketEasyLoan/signDetail.xa", //西银票易贷-签约信息 
    enterpriseFindUrl: "ticketEasyLoan/enterpriseFind.xa", //西银票易贷-企业信息查询的 
    signPowerFindUrl: "/ticketEasyLoan/signPowerFind.xa", //西银票易贷-企业信息查询的 


}
var vm;
function initFun() {
    vm = new Vue({
        el: '.container',
        data: {
            formData: {
                theme: ''
            },
            page: '1',
            nodata: '',
            nodata2: '',
            searchWord: '',
            prmsnType: '',
            orgId: '',
            companyList: [],
            signList: [],
            companyName: '',
            statusShow: false,
            selectedKey: 'all',
            total: 0,
            activeTab: 'start',
            signStatusMap: {
                0: '审核中',
                1: '已签约',
                2: '已解约',
                3: '已失效',
                4: '未签约'
            },
            chooseSignStatusMap: {
                'all': '全部',
                '1': '已签约',
                '4': '未签约',
            },
            showData: {
                companyName: '企业名称',
                signDate: '签约时间',
                signStatus: '签约状态',
            },
            searchData: {
                custNo: '',
                signDate: '',
                signStatus: 'all',
            },
            //时间组件相关
            showPickerStatus: false, //状态遮罩层
            isshowChooseTime: false, //时间选择遮罩层
            chooseTimeShow: false,  //时间插件
            currentDate: new Date(),
            minDate: new Date(2010, 0, 1),
            maxDate: new Date(),
            startTime: moment(new Date()).format('YYYYMM'),//开始时间
            startTimeShow: moment(new Date()).format('YYYY年MM月'),//开始时间
            endTime: moment(new Date()).format('YYYYMM'),//结束时间
            endTimeShow: moment(new Date()).format('YYYY年MM月'),//结束时间
        },

        created() {

        },
        mounted() {
            this.signPowerFind();
        },
        // watch: {
        //     tempDate(newVal) {
        //         if (activeTab == 'start') {
        //             this.startTime = newVal;
        //         } else {
        //             this.endTime = newVal;
        //         }
        //     }
        // },
        methods: {
            //---------------------------------------------------------------------时间筛选
            filterTimeSearch() {
                this.showData.signDate = `${this.startTime}-${this.endTime}`;
                this.isshowChooseTime = false;
                this.signDetail('0'); 
            },
            formatDate(date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0')
                return `${year}/${month}`
            },
            switchTab(tab) {

                this.activeTab = tab;
                this.currentDate = tab === 'start' ? this.startTime : this.endTime;
                this.tempDate = this.currentDate;
            },
            handleDateChange(value) {
                // value = new Date(value)
                //更新临时值
                this.tempDate = value;
                //更新实际值
                let dateObj =  this.formatDateIn(this.currentDate)
                let curDateShow = dateObj.year+"年"+dateObj.month+"月";
                let curDate = ""+dateObj.year+dateObj.month;
                if (this.activeTab == 'start') {
                    this.startTimeShow = curDateShow;
                    this.startTime = curDate;
                    
                    if (this.startTime > this.endTime) {
                        this.endTimeShow = curDateShow;
                        this.endTime = curDate;
                    }
                } else {
                    this.endTimeShow = curDateShow;
                        this.endTime = curDate;
                    if (this.endTime < this.startTime) {
                        this.startTimeShow = curDateShow;
                    this.startTime = curDate;
                    }
                }

            },

            //打开时间选择
            showChooseTimeModel() {
                this.isshowChooseTime = true;
            },
            enterChooseCompany(){
                this.searchWord = '';
                this.companyList = [];
                this.page = '2';
                
            },
            //时间样式处理
            readFilterTime(str) {
                if (str.includes('至')) {
                    var arr = str.split('至');
                    return `
                        <span>${arr[0]}至</span>
                        </br>
                        <span>${arr[1]}</span>
                    `
                } else {
                    return str;
                }
            },

            //时间格式化
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
            // 格式化年月日

            formatDateIn(param) {
                let year, month;
                year = param.getFullYear();
                if (param.getMonth() + 1 > 9) {
                    month = param.getMonth() + 1;
                } else {
                    month = '0' + (param.getMonth() + 1);
                }

                return {year,month};
            },


            exportData() {
                this.signDetail('1');
            },
            //选择状态
            chooseStatus(item, key) {
                this.statusShow = false;
                this.showData.signStatus = item;
                this.searchData.signStatus = key;
                this.selectedKey = key;
                this.signDetail('0'); 
            },
            // 格式化签约状态
            formatStatus(val) {
                return this.signStatusMap[val];

            },
            //公司选择
            chooseCompany(value) {
                this.showData.companyName = value.DataCntnt.firmName;
                this.searchData.custNo = value.DataCntnt.custNo;
                this.page = '1';
                this.signDetail('0'); 
            },
            closeSearchPage() {
                this.page = '1';
            },
            submitHandle() { },
            //签约信息查询
            signDetail(type) {
                this.total = 0;
                this.signList = [];
                this.nodata2 = false;
                let params = {};
                params.isExport = type;
                params.custNo = this.searchData.custNo;
                params.prmsnType = this.prmsnType;
                params.signStatus = this.searchData.signStatus;
                params.signTimeSt = this.startTime;
                params.signTimeEt = this.endTime;
                $http(baseUrl.signDetailUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            if (res.data != '' && res.data != null && res.data != undefined) {
                                this.signList = res.data;
                                this.total = res.data.length
                            } else {
                                this.nodata2 = true;
                            }
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //企业信息查询
            enterpriseFind() {
                this.companyList = [];
                this.nodata = false;
                let params = {};
                params.firmName = this.searchWord;
                params.prmsnType = this.prmsnType;
                $http(baseUrl.enterpriseFindUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            if (res.data != '' && res.data != null && res.data != undefined) {
                                this.companyList = res.data;
                            } else {
                                this.nodata = true;
                            }
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //权限查询
            signPowerFind() {
                let params = {};
                $http(baseUrl.signPowerFindUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.prmsnType = res.data.prmsnType;
                            this.orgId = res.data.org_id;
                            if (res.data.prmsnType != 'bu_descr' && res.data.prmsnType != 'zonghang') {
                                $.alert("", "暂无权限 ", function () {
                                    wx.closeWindow();
                                });
                            } else {
                                this.signDetail('0');
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
