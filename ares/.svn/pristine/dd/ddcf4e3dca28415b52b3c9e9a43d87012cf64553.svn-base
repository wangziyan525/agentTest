var baseUrl = {
    queryListUrl:'phjdData/queryLeaderDataList.xa',//查询
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            page:"page1",
            searchWord:"",
            list:[
                
            ],
            
           
            
        },
        created(){
            this.queryList();
            $("#app").show();
        },
        mounted(){
    
        },
        methods:{
            async queryList(){
                var that=this;
                var param={};
                param.orgid=that.searchWord;
                const res = await $http(baseUrl.queryListUrl, true,param, true);
                if (res.retcode === 'success'){
                    var list=res.data;//基本信息
                    for(var i=0;i<list.length;i++){
                        var person=list[i].persons;
                        if(person && person.length>0){
                            var datatype01=[];
                            var datatype02=[];
                            var datatype03=[];
                            for(j=0;j<person.length;j++){//1总行机关 01支行审批人员 02 管理行审批人员
                                if(person[j].datatype == "01"){
                                    datatype01.push(person[j].username)
                                }
                                if(person[j].datatype == "02"){
                                    datatype02.push(person[j].username)
                                }

                                if(person[j].datatype == "1"){
                                    datatype03.push(person[j].username)
                                }
                            }
                            list[i].datatype01=datatype01 && datatype01.length>0?datatype01.join(","):"";
                            list[i].datatype02=datatype02 && datatype02.length>0?datatype02.join(","):"";
                            list[i].datatype03=datatype03 && datatype03.length>0?datatype03.join(","):"";
                        }
                        
                    }

                    console.log(list);
                    that.list=list;
                    
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }
            },

            addtBtn(){
                window.location.href="addPhjdLeaderMain.html?type=0";
            },

            editBtn(orgid){
                window.location.href="addPhjdLeaderMain.html?type=2&orgid="+orgid;
            },

            

             
                

         }
            
           
           
           
            
            
    
    })
}





