var baseUrl = {
    summaryInquiry: 'retailsalescheck/summaryInquiry.xa',//查询
    queryFunctionUserRole: 'retailsalescheck/queryFunctionUserRole.xa',
    summaryInquiryExport: 'retailsalescheck/summaryInquiryExport.xa',
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            list:[],
            searchWord:{
                searchLevel:"",
                searchLeveltxt:'',
                startTime:"",
                endTime:"",
                pageNum: 1,
                pageSize: 500,
            },
            //时间弹框
            popupDataShow:false,
            dateType:"",
            currentDate:new Date(),
            flag:"",
            popupBottomShow1: false,
            popupObject1: {
                columns: [],
                title: '请选择层级',
            },
            isShow:true,
            downIsShow:false,
            totalNum:'',
            problemNum:'',
            rectificationsNum:'',
            searchLevel:'',
            firstShow:'1'
        },
        created(){
            var that=this;
            var flag=GetQueryString("flag");
            that.flag=flag;
            that.queryFunctionUserRole();
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{

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

                that.searchWord[that.dateType] =disposeTime;

                that.popupDataShow = false;
                //that.queryList();
                that.searchList()

            },
            retrunTimes(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            },
            showTap(num) {
                this.type = num;
                this['popupBottomShow' + num] = true;
            },
            closeOverlayBindtap() {
                let num = this.type;
                this['popupBottomShow' + num] = false;
            },
            onConfirm(param) {
                let num = this.type;
                this['popupBottomShow' + num] = false;
                if(num==1){
                    this.searchWord.searchLeveltxt = param.text;
                    this.searchWord.searchLevel = param.val;
                    if(param.text=='一级机构' || param.text=='总行'){
                        this.firstShow='1'
                    }else{
                        this.firstShow='2'
                    }
                    this.searchList()
                }

            },
            reset(){
                this.searchWord.searchLevel = this.searchLevel
                this.searchWord.searchLeveltxt = ''
                this.searchWord.startTime = ''
                this.searchWord.endTime = ''
                this.summaryInquiry()
            },
            searchList(){
                this.list = [];
                this.searchWord.pageNum = '1'
                this.summaryInquiry()
            },
            /**
             * 查询机构列表
             */
            queryFunctionUserRole() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                let param = {
                }
                $http(baseUrl.queryFunctionUserRole,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data=='headoffice'){
                                that.isShow = true
                                that.downIsShow = true
                                that.searchLevel = 'headoffice'
                                that.popupObject1.columns.push({text: '总行', val: 'headoffice'},{text: '一级机构', val: 'firstBranch'},{text: '经营支行', val: 'operateBranch'})
                                that.searchWord.searchLevel = 'headoffice'
                            }else if(res.data=='firstBranch'){
                                that.searchLevel = 'firstBranch'
                                that.isShow = true
                                that.downIsShow = false
                                that.popupObject1.columns.push({text: '一级机构', val: 'firstBranch'},{text: '经营支行', val: 'operateBranch'})
                                that.searchWord.searchLevel = 'firstBranch'
                            }else{
                                that.searchLevel = 'operateBranch'
                                that.isShow = false
                                that.downIsShow = false
                                that.searchWord.searchLevel = 'operateBranch'
                                that.firstShow='2'
                            }
                            that.summaryInquiry()
                        }else{
                            $.alert("",res.retmsg,function () {});
                        }
                    });
            },
            /**
             * 导出
             */
            summaryInquiryExport() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                if(that.searchWord.startTime && that.searchWord.endTime){
                    if(that.searchWord.startTime>that.searchWord.endTime){
                        vant.Toast('结束时间大于开始时间，请重新选择');
                        return ;
                    }

                }

                var param={};
                param.searchLevel=that.searchWord.searchLevel;
                param.startDate=that.searchWord.startTime;
                param.endDate=that.searchWord.endTime;
                param.pageNum=that.searchWord.pageNum;
                param.pageSize=that.searchWord.pageSize;
                $http(baseUrl.summaryInquiryExport,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            $.alert("","导出成功",function () {});
                        }else{
                            $.alert("",res.retmsg,function () {});
                        }
                    });
            },
            /**
             * 查询
             */
            async summaryInquiry(){
                var that=this;

                if(that.searchWord.startTime && that.searchWord.endTime){
                    if(that.searchWord.startTime>that.searchWord.endTime){
                        vant.Toast('结束时间大于开始时间，请重新选择');
                        return ;
                    }

                }
                
                var param={};
                param.searchLevel=that.searchWord.searchLevel;
                param.startDate=that.searchWord.startTime;
                param.endDate=that.searchWord.endTime;
                param.pageNum=that.searchWord.pageNum;
                param.pageSize=that.searchWord.pageSize;
                const res = await $http(baseUrl.summaryInquiry, true,param, true);

                if (res.retcode === 'success'){
                    that.list=res.data.list;
                    that.totalNum = res.data.totalNum
                    that.problemNum = res.data.problemNum
                    that.rectificationsNum = res.data.rectificationsNum
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }
                
            },

        }
    })
}





