var baseUrl = {
    submitUrl: 'keyCard/saveKeyCard.xa',//申请接口
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            cardNumber:"",
        },
        created(){
            var that=this;
            
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            
            /**
             * 查询
             */
            async appltBtn(){
                var that=this;
                if(that.cardNumber==""){
                    vant.Toast('请输入密钥卡编号');
                    return; 
                }

                if(that.cardNumber.indexOf("A")==-1 && that.cardNumber.indexOf("B")==-1){
                    vant.Toast('请输入AB卡类型密钥卡编号');
                    return; 
                }
                if(that.cardNumber.indexOf("A")>-1 && that.cardNumber.indexOf("B")>-1){
                    vant.Toast('不能同时输入AB卡类型密钥卡编号');
                    return; 
                }
                var param={};
                param.cardNumber=that.cardNumber;
               
                const res = await $http(baseUrl.submitUrl, true,param, true);

                if (res.retcode === 'success'){
                    window.location.href="list.html?flag=1"

                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => { 
                    }); 
                }
                
            },

            
            
            
            


                
                
                
                

            }
            
           
           
           
            
            
    
    })
}





