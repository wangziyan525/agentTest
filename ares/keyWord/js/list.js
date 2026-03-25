var baseUrl = {
    queryListUrl: 'keyCard/getPassCardList.xa',//查询
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            list:[],
            searchWord:{
                name:"",
                startTime:"",
                endTime:"",
            },
            //时间弹框
            popupDataShow:false,
            dateType:"",
            currentDate:new Date(),
            flag:"",
            cardStatusOpt:{
                "0":"待审核",
                "1":"审核成功",
                "2":"已归还",
                "3":"审核拒绝",
                "4":"待归还",
            }
    
        },
        created(){
            var that=this;
            var flag=GetQueryString("flag");
            that.flag=flag;
            that.queryList();
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
                that.queryList();

            },
            retrunTimes(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            },

            
            /**
             * 查询
             */
            async queryList(){
                var that=this;

                if(that.searchWord.startTime && that.searchWord.endTime){
                    if(that.searchWord.startTime>that.searchWord.endTime){
                        vant.Toast('结束时间大于开始时间，请重新选择');
                        return ;
                    }

                }
                
                var param={};
                param.name=that.searchWord.name;
                param.startTime=that.searchWord.startTime;
                param.endTime=that.searchWord.endTime;               
                const res = await $http(baseUrl.queryListUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.list=res.data;
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }
                
            },
            /**
             * 申请页面
             */
            applyBtn(){
                window.location.href="apply.html"
            },
            /**
             * 审核详情页面
             * @param {*} id 
             */
            goDetail(id){
                window.location.href="detail.html?id="+id;
            },
            
            
            


                
                
                
                

            }
            
           
           
           
            
            
    
    })
}





