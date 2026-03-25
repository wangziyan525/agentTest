var baseUrl = {
    queryInfoUrl:'phjdData/queryLeaderDataList.xa',//查询
    queryOrgUrl:'phjdData/queryBudescrByOrgid.xa',//查询机构名称
    submitUrl:'phjdData/PhjdLeaderMain.xa',//提交
    
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            page:"page1",
            type:"0",//0新增 1 编辑
            info:{
                orgid:"",
                orgname:"",
                persons:[
                    {
                        datatype:"",
                        humancode:"",
                    },
                ]
            },

            typeshow:false,
            chooseIndex:0,
            typeList:[
                {text:"支行审批人员",value:"01"},
                {text:"管理行审批人员",value:"02"},
                {text:"总行管理人员",value:"1"},
                
            ],
            typeObj:{
                "01":"支行审批人员",
                "02":"管理行审批人员",
                "1":"总行管理人员",
            },

           
            orgid:"",
            
           
            
        },
        created(){
            var that=this;
            var type=GetQueryString("type");
            that.type=type?type:"0";
            
            if(type=="2"){//修改
                var orgid=GetQueryString("orgid");
                that.orgid=orgid?orgid:"";
                that.info.orgid=orgid?orgid:"";
                if(that.info.orgid=="001"){
                    that.typeList=[
                        {text:"支行审批人员",value:"01"},
                        {text:"管理行审批人员",value:"02"},
                        {text:"总行管理人员",value:"1"},
                        
                    ];
                }else{
                    that.typeList=[
                        {text:"支行审批人员",value:"01"},
                        {text:"管理行审批人员",value:"02"},
                    ];
                }
                that.queryInfo();
            }
            
            
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            choosePower(index){
                var that=this;
                that.chooseIndex=index;
                that.typeshow=true;

            },
            onTypeConfirm(param){
                var that=this;
                var index=that.chooseIndex;
                that.info.persons[index].datatype=param.value;

                that.typeshow=false;
                
            },
            async queryInfo(){
                var that=this;
                var param={};
                param.orgid=that.orgid;
                const res = await $http(baseUrl.queryInfoUrl, true,param, true);
                if (res.retcode === 'success'){
                    that.info=res.data?res.data[0]:{};//基本信息
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }
            },
            async getOrgName(){
                var that=this;
                if(!!!that.info.orgid){
                    vant.Toast('请输入机构号');
                    return; 
                }
                that.info.orgname="";
                var param={};
                param.orgid=that.info.orgid;
                const res = await $http(baseUrl.queryOrgUrl, true,param, true);
                if (res.retcode === 'success'){
                    that.info.orgname=res.data?res.data[0]:{};
                    if(that.info.orgid=="001"){
                        that.typeList=[
                            {text:"支行审批人员",value:"01"},
                            {text:"管理行审批人员",value:"02"},
                            {text:"总行管理人员",value:"1"},
                            
                        ];
                    }else{
                        that.typeList=[
                            {text:"支行审批人员",value:"01"},
                            {text:"管理行审批人员",value:"02"},
                        ];
                    }
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
            },
            /**
             * 删除
             */
            async deletetBtn(){
                var that=this;

                vant.Dialog.confirm({
                    title:"请确认是否删除",
                    cancelButtonText:"取消",
                    confirmButtonText:"确认",
                    message:""
                }).then(async()=>{
                    var param={};
                    param.orgid=that.info.orgid;
                    param.type="1";
                    const res = await $http(baseUrl.submitUrl, true,param, true);
                    if (res.retcode === 'success'){
                        vant.Dialog.alert({
                            message: "删除成功"
                        }).then(() => {
                            window.location.href="phjdLeaderMain.html";
                        });
                        
                    }
                    else{
                        vant.Dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        }); 
                    }
                    
                }).catch(()=>{
                    
    
                })

               
            },
            
            /**
             * 提交
             */
            async addtBtn(){
                var that=this;
                var dataJson=that.info;
                if(!!!dataJson.orgid){
                    vant.Toast('请输入机构号');
                    return; 
                }
                if(!!!dataJson.orgname){
                    vant.Toast('请输入正确的机构号');
                    return; 
                }
                var persons=dataJson.persons;
                if(!persons || persons.length==0){
                    vant.Toast('请至少添加一位人员');
                    return; 
                }
                for(var i=0;i<persons.length;i++){
                    if(!!!persons[i].humancode || !!!persons[i].datatype){
                        vant.Toast('请输入人员及权限');
                        return; 
                    }
                }
                var param=that.info;
                param.type=that.type;
                const res = await $http(baseUrl.submitUrl, true,param, true);
                if (res.retcode === 'success'){
                    vant.Dialog.alert({
                        message: "提交成功"
                    }).then(() => {
                        window.location.href="phjdLeaderMain.html";
                    });
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
            },

            addHuman(){
                var that=this;
                let OwnerInf=that.info.persons;
                
                var obj= {
                    datatype:"",
                    humancode:"",
                };
                OwnerInf.push(obj)
                that.info.persons=OwnerInf;
                that.$forceUpdate();
            },
             
            /**
             * 删除人员
             * @param {} index 
             */
            deleteHuman(index){
                var that=this;
                var persons=that.info.persons;
                persons.splice(index,1);
                that.info.persons=persons;
                that.$forceUpdate();
            },


         }
            
           
           
           
            
            
    
    })
}





