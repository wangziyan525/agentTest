var baseUrl = {
    marketingDataDetailInfoUrl: "loan/marketingDataDetailInfo.xa", //统计接口
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
            currentDate: '',
            orgId: '',
            nodata: false,
        },

        created() {

        },
        mounted() {
            this.orgId = this.getQueryString('orgId');
            // this.currentDate = this.getQueryString('fileDate');
            this.date = this.getQueryString('fileDate');
            this.currentDate = moment(this.getQueryString('fileDate'),'YYYYMMDD').toDate(); 
            this.marketingDataDetailInfo();
        },
        methods: {
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            onDateRangeConfirm(date) {
                var that = this;
                console.log(date, "内容")
                that.DateRangeshow = false;
                that.date = moment(date).format('YYYYMMDD');
                this.marketingDataDetailInfo()
            },
            //统计接口查询
            marketingDataDetailInfo() {
                this.totalDataList = {};
                let params = {};
                params.orgId = this.orgId,
                    params.fileDate = this.date,
                    $http(baseUrl.marketingDataDetailInfoUrl, true, params, true)
                        .then(res => {
                            if (res.retcode == 'success') {
                                if (res.data == '' || res.data == null) {
                                    this.nodata = true;
                                }
                                else {
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
        }
    })
};
