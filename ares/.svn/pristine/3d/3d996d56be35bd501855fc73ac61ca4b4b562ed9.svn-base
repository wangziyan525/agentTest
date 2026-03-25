var baseUrl = {
    queryListUrl: 'misconduct/getUserApprovalList.xa',//查询
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            status:"",//是否可以申请
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

           

            
            /**
             * 查询
             */
            async queryList(){
                var that=this;

                var param={};
                param.batch=that.batch;
                const res = await $http(baseUrl.queryListUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.list=res.data.resultApprovalRecordListVOs;
                    that.status=res.data.status;
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
                window.location.href="detail.html?id="+id+"&batch="+this.batch;
                
            },
            /**
             * 重新申请
             * @param {*} id 
             */
            reapply(id){
                window.location.href="apply.html?id="+id+"&batch="+this.batch;
                
            },
            /**
             * 发起申请
             */
            applyBtn(){
                window.location.href="apply.html?batch="+this.batch;
            }
            
            
            


                
                
                
                

            }
            
           
           
           
            
            
    
    })
}





