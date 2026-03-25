var baseUrl = {
    queryList: "retailsalescheck/selectRegistrationList.xa",
    //getPowerInfo: 'safetyCheck/getPowerInfo.xa'
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            nodata:false,
            tabsDataList:[/*{
                time:'2025-09-09',
                type:'检查类型：常规性检查',
                status:'1'
            },{
                time:'2025-09-10',
                type:'检查类型：专项检查',
                status:'2'
            },{
                time:'2025-09-11',
                type:'检查类型：专项检查',
                status:'3'
            }*/
            ],
            popupDataShow:false,
            dateType:"",
            currentDate:new Date(),
            checkDate:"",
            maxDate: new Date(),
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
            this.getList()
        },
        methods:{
            jisuan(){
                //计算列表高度
                this.$nextTick(()=>{
                    var bodyHeight = $(window).height();
                    var topDiv = $('.topDiv').outerHeight();
                    var regBtn = $('.regBtn').outerHeight();
                    $('.listScroll').css({'height':bodyHeight-topDiv-regBtn-30+'px'});
                })

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

                that[that.dateType] =disposeTime;

                that.popupDataShow = false;
                that.tabsDataList = [];
                that.pageNum=1;
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
                    checkDate:that.checkDate,
                    checkType:"1",
                }
                $http(baseUrl.queryList,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
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
            jump1(item){
                if(item.status=='03'){
                    window.location.href = 'checkRegisterReback.html?id='+item.id
                }else{
                    window.location.href = 'checkRegisterDetail.html?id='+item.id
                }
            },
            jump(){
                window.location.href = 'checkRegister.html'
            }
        }
    })
}



