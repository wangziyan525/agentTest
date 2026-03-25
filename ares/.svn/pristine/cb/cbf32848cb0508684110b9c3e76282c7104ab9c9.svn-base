var baseUrl = {
    getCancelInsuranceApplyDataUrl: "insurancePractice/getCancelInsuranceApplyData.xa", //查询支行行长获取能发起注销的员工 
    saveBranchInsuranceApplyDataUrl: "insurancePractice/saveBranchInsuranceApplyData.xa",//注销接口 
}
var vm
function initFun() {
    vm = new Vue({
        el: "#app",
        data: {
            nodata: false,
              
        tabsDataList:[],
        noMoreStatus:'',
        moreStatus:'',
        placetext:'',
        userInfo:{},
        
        },
      
        created() {

        },
        mounted() {
            this.getList();
        },
        methods: {
            
            search() {
                
                this.getList();
            },
            jisuan() {
                //计算列表高度
                this.$nextTick(() => {
                    var bodyHeight = $(window).height();
                    var bottomButton = $('.bottomButton').outerHeight();
                    $('.listScroll').css({ 'height': bodyHeight - bottomButton - 10 + 'px' });
                })

            },
            //注销
            logout(item) {

                
                var that = this;
                let param = {};
                param = item;
                param.type = 2;
                $http(baseUrl.saveBranchInsuranceApplyDataUrl, true, param, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            vant.Toast('注销成功');
                            this.getList();
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
              //获取员工注销列表
              getList() {
                this.tabsDataList = [];
                var that = this;
                let param = {};
                param.name = that.placetext;
                $http(baseUrl.getCancelInsuranceApplyDataUrl, true, param, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            that.jisuan();
                            if (res.data != '' && res.data != null && res.data != undefined) {
                                that.nodata = false;
                                that.tabsDataList = res.data
                            } else {
                                that.nodata = true;
                            }
                        } else {
                            $.alert("", res.retmsg, function () {
                                that.nodata = true;
                            });
                        }
                    });
            },
        }
    })
}



