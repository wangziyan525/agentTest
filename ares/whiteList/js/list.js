var baseUrl = {
    queryListUrl: 'whiteList/whiteListDrawInfoQueryByWX.xa',//查询
    tobankUrl: 'whiteList/whiteListWxReceiveToMbank.xa',//同步
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            list:[],
            statusOpt:{
                "0":"未抽奖",
                "1":"已抽奖未抽中",
                "2":"已抽中选择邮寄",
                "3":"已抽中选择自取未取",
                "4":"已抽中选择自取已取",
                "5":"已中奖请线下联系领取方式",
                "6":"已抽中未选择领取方式",
            },
            getOpt:{
                "":"线下联系",
                "0":"邮寄",
                "1":"网点自取",
            },
            
    
        },
        created(){
            var that=this;
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
                const res = await $http(baseUrl.queryListUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.list=res.data;
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg?res.retmsg:"系统异常"
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }
                
            },
            
            async goDetail(id){
                var that=this;

                var param={};
                param.TRANS_ID=id;  
                const res = await $http(baseUrl.tobankUrl, true,param, true);

                if (res.retcode === 'success'){
                    vant.Dialog.alert({
                        message: "通知成功"
                    }).then(() => {
                       that.queryList();
                    }); 
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg?res.retmsg:"系统异常"
                    }).then(() => {
                       
                    }); 
                }
            },
            bindPhone(phone){
                console.log(phone);
                window.location.href = 'tel:'+phone;
            },
            hidePhoneNum(phone){
                if(!phone){
                    return "";
                }
                return phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2');
            },
            hideName(name){
                if(!name){
                    return "";
                }
                var nameList=name.split("");
                var strName="";
                for(var i=0;i<nameList.length;i++){
                    if(i==0){
                        strName=nameList[i];
                    }else{
                        strName=strName+"*";
                    }
                }
                return strName;
            },
            
            
            


                
                
                
                

            }
            
           
           
           
            
            
    
    })
}





