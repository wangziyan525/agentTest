var baseUrl = {
    queryListUrl: 'misconduct/getMisconductList.xa',//查询
    exportUrl: 'misconduct/exportMisconductList.xa',//导出
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            completeStatus:"0",
            list:[
                
            ],
            
            statusOpt:{
                "0":"驳回",
                "1":"通过",
                "2":"待确认",
            },
            batch:"",
    
        },
        created(){
            var that=this;
            var batch=GetQueryString("batch")?GetQueryString("batch"):"";
            that.batch=batch;
            that.queryList();
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            chooseTab(param){
                this.completeStatus=param;
                this.queryList();
            },
            async exports(){
                var that=this;
                var param={};
                param.batch=that.batch;
                const res = await $http(baseUrl.exportUrl, true,param, true);

                if (res.retcode === 'success'){
                    vant.Dialog.alert({
                        message: "已推送至企业微信，请耐心等待",
                    }).then(() => {
                    }); 
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                       
                    }); 
                }
            },
            
            /**
             * 查询
             */
            async queryList(){
                var that=this;
                var param={};
                param.completeStatus=that.completeStatus;
                param.batch=that.batch;
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
             * 审核详情页面
             * @param {*} id 
             */
            goDetail(id){
                window.location.href="detail.html?ifEditFlag=1&id="+id+"&batch="+this.batch;
            },

            /**
             * 查看签名
             * @param {*} userId 
             */
            goView(userId){
                if(this.batch=="202501"){
                    window.location.href="../../newwxqy/misconductSign/index.html?flag=1&humancode="+userId;

                }else{
                    
                    window.location.href="sign.html?batch="+this.batch+"&humancode="+userId;

                }

            },
            
            
            


                
                
                
                

            }
            
           
           
           
            
            
    
    })
}





