var baseUrl = {
    queryListUrl: '/wxqy/runOpenCard/getOrgPresidentList.xa',//查询
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            list:[
                
            ],
            
    
        },
        created(){
            var that=this;
            that.queryList();
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{

            callPhone(mobile){
                if(mobile){
                    window.location.href="tel:"+mobile;
                }
                
            },
            
            /**
             * 查询
             */
            async queryList(){
                var that=this;
                var param={};
                         
                const res = await $http(baseUrl.queryListUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.list=res.data.listData;
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





