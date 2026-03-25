var baseUrl = {
    marketingDataAnalysisUrl: "loan/marketingDataAnalysis.xa", //统计接口
}
var vm;
function initFun() {
    vm = new Vue({
        el: '.container',
        data: {
            DateRangeshow: false,
            maxRangeDate: new Date(),
            date: '',
            totalDataList: {},
            currentDate: moment().subtract(1,'day').toDate(),
            nodata:false,
        },

        created() {

        },
        mounted() {
            this.marketingDataAnalysis();
            this.date = moment(this.currentDate).format('YYYYMMDD');
        },
        methods: {
            onDateRangeConfirm(date) {
                var that = this;
                console.log(date, "内容")
                that.DateRangeshow = false;
                that.date = moment(date).format('YYYYMMDD');
                this.marketingDataAnalysis()
            },
            //统计接口查询
            marketingDataAnalysis() {
                this.totalDataList = {};
                let params = {};
                params.fileDate = moment(this.currentDate).format('YYYYMMDD'),
                    $http(baseUrl.marketingDataAnalysisUrl, true, params, true)
                        .then(res => {
                            if (res.retcode == 'success') {
                                if(res.data == '' || res.data == null){
                                    this.nodata = true
                                }else{
                                    this.nodata = false;
                                    this.totalDataList = res.data;
                                    
                                }
                                
                            } else {
                                $.alert("", res.retmsg, function () {
                                    wx.closeWindow();
                                });
                            }
                        });
            },
            //跳转详情
            toDetails(item) {
                window.location.href = './details.html?orgId=' + item.orgId + '&fileDate=' + this.date;
            }
        }
    })
};
