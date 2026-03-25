var baseUrl = {
    queryList: "retailsalescheck/specialInspectionList.xa",
    //getPowerInfo: 'safetyCheck/getPowerInfo.xa'
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            tab:'0',
            nodata:false,
            tabsDataList:[
            ],
            checkname:'',
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
                    var sendBtn = $('.sendBtn').outerHeight();
                    $('.listScroll').css({'height':bodyHeight-topDiv-sendBtn-10+'px'});
                })

            },

            chooseTab(param){
                var that=this;
                that.tab=param;
                this.pageNum = 1;
                this.moreStatus = false
                this.noMoreStatus = false
                this.getList();

            },
            search(){
                this.pageNum = 1;
                this.tabsDataList = [];
                this.moreStatus = false
                this.noMoreStatus = false
                this.getList();
            },
            //选时间
            showDate(){
                this.show = true;
            },
            // 时间插件确定
            onConfirm(date){
                this.searchDate1 = this.formatDate(date);
                this.searchDate2 = this.formatDate1(date);
                this.show = false;
                this.getList();
            },
            formatDate(date){
                let month = date.getMonth()+1;
                let day = date.getDate();
                if(month < 10){
                    month = '0'+ month;
                };
                if(day< 10){
                    day = '0'+ day;
                };
                return `${date.getFullYear()}年${month}月${day}日`;
            },
            formatDate1(date){
                let month = date.getMonth()+1;
                let day = date.getDate();
                if(month < 10){
                    month = '0'+ month;
                };
                if(day< 10){
                    day = '0'+ day;
                };
                return `${date.getFullYear()}${month}${day}`;
            },
            /**
             * 获取当前日期
             */
            getToday(){
                var myDate=new Date();
                var mm=myDate.getMonth()+1;
                var dd=myDate.getDate();
                if(myDate.getMonth()<9){
                    mm="0"+mm;
                }
                if(myDate.getDate()<10){
                    dd="0"+dd;
                }
                return myDate.getFullYear()+'-'+mm+'-'+dd;
            },
            /**
             * 日期加减days天数
             */
            changeDate(date,days,flag){
                if(days==undefined || days ==''){
                    days=1;
                }
                var date=new Date(date);
                if(flag=="add"){
                    date.setDate(Number(date.getDate())+Number(days));
                }else if(flag=="minus"){
                    date.setDate(Number(date.getDate())-Number(days));
                }
                var mm=date.getMonth()+1;
                var dd=date.getDate();
                if(date.getMonth()<9){
                    mm="0"+mm;
                }
                if(date.getDate()<10){
                    dd="0"+dd;
                }
                this.searchDate1 = date.getFullYear()+'年'+mm+'月'+dd +'日';
                this.searchDate2 = date.getFullYear()+''+mm+''+dd;
                //this.getList();
            },
            /**
             * 日期加减days天数
             */
            changeDate1(date,days,flag){
                if(days==undefined || days ==''){
                    days=1;
                }
                var date=new Date(date);
                if(flag=="add"){
                    date.setDate(Number(date.getDate())+Number(days));
                }else if(flag=="minus"){
                    date.setDate(Number(date.getDate())-Number(days));
                }
                var mm=date.getMonth()+1;
                var dd=date.getDate();
                if(date.getMonth()<9){
                    mm="0"+mm;
                }
                if(date.getDate()<10){
                    dd="0"+dd;
                }
                return date.getFullYear()+'-'+mm+'-'+dd;
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
                    checkname:that.checkname
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
                window.location.href = 'taskDetail.html?id='+item.id
            },
            jump(){
                window.location.href = 'taskSend.html'
            }
        }
    })
}



