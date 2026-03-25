var baseUrl = {
    queryList: "retailsalescheck/getApproveList.xa",
    //getPowerInfo: 'safetyCheck/getPowerInfo.xa'
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            tab:'1',
            nodata:false,
            tabsDataList:[
            ],
            checkDate:"",
            popupDataShow:false,
            dateType:"",
            currentDate:new Date(),
            pageNum: 1,
            pageSize: 10,
            moreStatus: false,
            noMoreStatus: false,
            show:false,
        },
        created(){

        },
        mounted(){
            $('#app').show();
            this.getList();
        },
        methods:{
            jisuan(){
                //计算列表高度
                this.$nextTick(()=>{
                    var bodyHeight = $(window).height();
                    var topDiv = $('.topDiv').outerHeight();
                    $('.listScroll').css({'height':bodyHeight-topDiv-10+'px'});
                })

            },

            chooseTab(param){
                var that=this;
                that.tab=param;
                this.pageNum = 1;
                this.getList();

            },
            pickerdate(dateType){
                this.dateType=dateType;
                this.popupDataShow = true;
            },
            closeTime(){
                this.dateType="";
                this.popupDataShow = false;
            },
            //确定时间
            getTime(a) {
                var that=this;
                var dateVal = that.retrunTimes(a);
                var year = dateVal.split('-')[0];
                var month = dateVal.split('-')[1];
                var day = dateVal.split('-')[2];
                if (month <= 9) {
                    month = '0' + month;
                }
                if (day <= 9) {
                    day = '0' + day;
                }
                var disposeTime = year + '-' + month + '-' + day;
                that.checkDate =disposeTime;

                that.popupDataShow = false;
                that.getList();

            },
            retrunTimes(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            },
            addMore(){
                this.getList();
            },
            getList() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                let param = {
                    pageNum: that.pageNum,
                    pageSize: that.pageSize,
                    approveFlag:that.tab,
                    checkDate:that.checkDate
                }
                $http(baseUrl.queryList,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            that.tabsDataList = [];
                            that.jisuan();
                            if(res.data!='' && res.data!=null && res.data!=undefined){
                                that.nodata = false;

                                if(res.data.length<that.pageSize){
                                    that.noMoreStatus = true;
                                    that.moreStatus = false;
                                }else{
                                    that.noMoreStatus = false;
                                    that.moreStatus = true;
                                    that.pageNum++;
                                }
                                var newDataList = [];
                                var dataList=res.data;

                                newDataList = dataList ? dataList : [];
                                that.tabsDataList = that.tabsDataList.concat(newDataList);
                            }else{
                                if(that.pageNum>1){
                                    that.noMoreStatus = true;
                                    that.moreStatus = false;
                                    that.nodata = false;
                                }else{
                                    that.noMoreStatus = false;
                                    that.moreStatus = false;
                                    that.nodata = true;
                                }

                            }
                        }else if (res.retcode == 'user.no.permission') {
                            $.alert('', res.retmsg, function () {
                                wx.closeWindow();
                            })
                        }else{
                            $.alert("",res.retmsg,function () {
                                that.nodata = true;
                            });
                        }
                    });
            },
            jump(item){
                if(this.tab=='1'){
                    window.location.href = 'checkRegisterApprove.html?id='+item.id+'&tab='+this.tab
                }else{
                    window.location.href = 'checkRegisterDetail.html?id='+item.id
                }

            }
        }
    })
}



