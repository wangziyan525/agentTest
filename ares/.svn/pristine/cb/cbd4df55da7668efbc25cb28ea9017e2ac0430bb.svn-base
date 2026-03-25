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

            common:{
                EntpEstbDocAcctNum:0,
                EntpEfftEstbDocAcctNum:0,
                IdvlEstbDocAcctNum:0,
                IdvlEfftEstbDocAcctNum:0,
                AgrcEstbDocAcctNum:0,
                AgrcEfftEstbDocAcctNum:0,
            },
            datasource:"2",
           
            
        },
        created(){
            var that=this;
            var datatype=GetQueryString("datatype")?GetQueryString("datatype"):"1";//datatype   1 普惠  2  服务站 
            var datasource=GetQueryString("datasource")?GetQueryString("datasource"):"2";//datasource  1 数据中心  2  企业微信 

            that.datatype=datatype;
            that.datasource=datasource;
            that.queryRole();
            
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            async queryRole(){
                var that=this;
                if(that.datatype=="2"){
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
                }
                
            },
            

            toPage(){
                
                var that=this;
                if(that.datatype=="1"){
                    if(that.datasource=="1"){
                        window.location.href="rankNew.html";
                    }else{
                        window.location.href="rank.html";
                    }
                    
                }else if(that.datatype=="2"){
                    window.location.href="rank2.html"
                }
                
            },
            

            /**
             * 新增
             */
            appltBtn(flag){
                var that=this;
                if(flag=="1"){
                    window.location.href="companyDetail.html?flag="+flag+"&datatype="+that.datatype+"&ifAdd=1"+"&v=1";
                }else if(flag=="2"){
                    window.location.href="personDetail.html?flag="+flag+"&datatype="+that.datatype+"&ifAdd=1"+"&v=1";
                }else if(flag=="3"){
                    window.location.href="farmerDetail.html?flag="+flag+"&datatype="+that.datatype+"&ifAdd=1"+"&v=1";
                }
            },

            goList(){
                window.location.href="list.html?datatype="+this.datatype+"&datasource="+this.datasource;
            },

            toDeclarePage(){
                window.location.href="declare.html?datasource="+this.datasource;
            }
            
            

            
            
            
            


                
                
                
                

         }
            
           
           
           
            
            
    
    })
}





