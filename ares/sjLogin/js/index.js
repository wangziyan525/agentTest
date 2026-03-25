var baseUrl = {
    submitUrl: 'smUpdate/UpdateSJPassWord.xa ',//查询
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
    
        },
        created(){
            var that=this;
            var key=GetQueryString("key");
            var id=GetQueryString("id");
            that.key=key;
            that.id=id;
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            
            /**
             * 查询
             */
            async confirm(){
                var that=this;
                
                var param={};
                param.key=that.key;
                param.id=that.id;
               
                const res = await $http(baseUrl.submitUrl, true,param, true);

                if (res.retcode === '1'){
                    vant.Dialog.alert({
                        message: "确认成功"
                    }).then(() => {
                        wx.closeWindow();
                    });
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }
                
            },

            cancel(){
                wx.closeWindow();
            }
            
            
            


                
                
                
                

            }
            
           
           
           
            
            
    
    })
}





