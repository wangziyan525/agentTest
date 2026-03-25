var baseUrl = {
    queryRole:'/phjdData/checkPower.xa',//查询是否有权限
    queryListUrl:'/phjdData/queryTJData.xa',//查询
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            datatype:"",
            page:"page1",
            chooseDate:"0",

            StatStrtTm:"",
            StatEndTm:"",
            DateRangeshow:false,
            maxRangeDate:new Date(),
            minRangeDate:new Date(1950,0,1),
            currentRangeDate:new Date(),
            EstbDocMnBy:"",//1-企业;2-个体;3-农户

            
            datasource:"2",
           
            
        },
        created(){
            var that=this;
            //var datatype=GetQueryString("datatype")?GetQueryString("datatype"):"1";//datatype   1 普惠  2  服务站 

            that.datatype="2";
            that.queryRole();
            
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            async queryRole(){
                var that=this;
                var param={};
                param.datatype="2";
                const res = await $http(baseUrl.queryRole, true,param, true);

                if (res.retcode === 'success'){
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }
                
            },
            

            toPage(){
                window.location.href="rank2.html"
                
            },
            

            
            goList(flag){
                window.location.href="list.html?flag="+flag;
            },

            
            
            

            
            
            
            


                
                
                
                

         }
            
           
           
           
            
            
    
    })
}





