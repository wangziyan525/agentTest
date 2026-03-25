var baseUrl = {
    queryRoleUrl:'phjdData/phjdCheckGrant.xa',//查询角色
    queryListUrl:'phjdData/queryJdsbList.xa',//查询
    submitUrl:'phjdData/approveSbData.xa',//提交
    signUrl:'phjdData/signData.xa',//签署承诺书
    queryCheckBatchListUrl:'phjdData/phjdJdsbCheckBatchList.xa',//抽查批次列表
    phjdJdsbCheckBatchDetailListUrl:'phjdData/phjdJdsbCheckBatchDetailList.xa',//抽查批次详情列表
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            page:"",
            type:"2",//queryType 1已经提交 2 未提交
            checkStatus:"2",//1 抽查通过 2 抽查驳回
            year:"2025",
            typeshow:false,
            typeshowdate:"",
            typeList:[],
            checkStatusList:[
                {text:"抽查驳回",value:"2"},
                {text:"抽查通过",value:"1"},
                
            ],
            checkStatusOpt:{
                "1":"抽查通过",
                "2":"抽查驳回",
            },
            yearList:[
                {text:"2025年",value:"2025"},
                {text:"2026年",value:"2026"},
                {text:"2027年",value:"2027"},
                {text:"2028年",value:"2028"},
                {text:"2029年",value:"2029"},
                {text:"2030年",value:"2030"},
                {text:"2031年",value:"2031"},
                {text:"2032年",value:"2032"},
                {text:"2033年",value:"2033"},
                {text:"2034年",value:"2034"},
                {text:"2035年",value:"2035"},

            ],
            list:[
               
            ],
            ifAllChoose:false,
            id:"",

            submitList:[],

            ifShowBtn:false,

            // jdTypeOpt:{
            //     "1":"企业",
            //     "2":"个人",
            // },

            show:true,

            
            //抽查状态
            batchstatusOpt:{
                "0":"审查中",
                "1":"审查未通过",
                "2":"已抽查通过",
            },
            //批次列表状态
            checkstatusListOpt:{
                "0":"待抽查",
                "1":"抽查驳回",
                "2":"抽查通过",
                "4":"待抽查（驳回过）",
            },
            checkstatusListOptNew:{
                "0":"未抽查",
                "1":"抽查驳回",
                "2":"抽查通过",
                "4":"未抽查（驳回过）",
            },

            //抽查详情页面
            batchInfo:{},

            showSbWarn:false,
            
           
            
        },
        created(){
            var that=this;
            var currentDate=new Date();
            that.year=currentDate.getFullYear();
            that.queryRole();
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            /**
             * 切换tab
             * @param {*} param 
             */
            chooseType(param){
                var that=this;
                that.type=param;
                that.list=[];
                if(that.type=="1"){
                    that.checkStatus="2";
                    that.queryList();
                }else if(that.type=="2"){
                    that.queryList();
                }else if(that.type=="3"){
                    that.queryCheckBatchList();
                }
                that.submitList=[];
                
            },
            /**
             * 弹框选择
             * @param {*} type 
             */
            showChhose(type){
                this.typeshowdate=type;
                this.typeshow=true;
                this.typeList=this[type+"List"];
               
            },
            onTypeConfirm(param){
                this[this.typeshowdate]=param.value;
                this.list=[];
                if(this.typeshowdate=="year"){
                    this.queryCheckBatchList();
                }else if(this.typeshowdate=="checkStatus"){
                    this.queryList();
                }
                this.typeshowdate="";
                this.typeshow=false;
                this.typeList=[];
            },
            chooseTab(param){
                this.checkStatus=param;
                this.list=[];
                this.queryList();
            },
            /**
             * 查询权限
             */
            async queryRole(){
                var that=this;
                var param={};
                const res = await $http(baseUrl.queryRoleUrl, true,param, true);
                if (res.retcode === 'success'){
                    
                    if(res.data!='nopermisson'){//有权限，展示抽查按钮
                        that.ifShowBtn=true;
                        
                    }
                    that.queryList();
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
             * 查询申报列表
             */
            async queryList(){
                var that=this;
                var param={};
                param.queryType=that.type;
                if(that.type=="1"){//已申报
                    param.checkStatus=that.checkStatus;
                }
                const res = await $http(baseUrl.queryListUrl, true,param, true);
                if (res.retcode === 'success'){
                    var list=res.data;//基本信息
                    that.list=list.map(item =>{ return { ...item, dots: false } });
                    that.ifAllChoose=false;
                    that.page="page3";
                }
                else{//7  未办理此场考试活动   8 考试 成绩不合格  9 未签订承诺书
                    if(res.retcode === '7'){
                        that.page="page1";
                    }else if(res.retcode === '8'){
                        that.page="page1";
                    }else if(res.retcode === '9'){
                        that.page="page2";
                    }else{
                        vant.Dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        }); 
                    }
                    
                }
            },
            /**
             * 查询抽查情况
             */
            async queryCheckBatchList(){
                var that=this;
                var param={};
                if(that.year==""){
                    vant.Toast('请选择年份');
                    return; 
                }
                param.year=that.year;
                const res = await $http(baseUrl.queryCheckBatchListUrl, true,param, true);
                if (res.retcode === 'success'){
                    var list=res.data;//基本信息
                    that.list=list;
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
            },
           
             /**
             * 多选
             */
            multipleChoose(index){
                var that=this;
                that.list[index].dots=!that.list[index].dots;
                that.chooseHum();
                that.$forceUpdate();

            },
            /**
             * 全选/取消全选
             */
            allChoose(){
                var that=this;
                var list=that.list;
                if(!that.ifAllChoose){
                    list=list.map(item =>{ return { ...item, dots: true } });
                }else{
                    list=list.map(item =>{ return { ...item, dots: false } });
                }
                that.ifAllChoose=!that.ifAllChoose;
                that.list=list;
                that.chooseHum();
                that.$forceUpdate();
            },
            
            /**
             * 获取选择数据
             */
            chooseHum(){
                var that=this;
                var list=that.list;
                var personsList=[];
                for(var i=0;i<list.length;i++){
                    if(list[i].dots){
                        personsList.push(list[i]) 
                    }
                }
                that.submitList=personsList;
                
            },
            /**
             * 申报数据提交
             */
            submitsbtn(){
                var that=this;
                if(that.submitList && that.submitList.length==0){
                    vant.Toast('请选择申报的客户');
                    return; 
                }

                
                var  param={};
                param.data=that.submitList.map(item => item.phjdid);
                if(that.ifShowBtn){
                    vant.Dialog.confirm({
                        title: "",
                        message: "抽查人提交的建档申报无需审批，建档申报有效后将无法修改统一社会信用代码；若身份证号已填写，也无法进行修改，未填写仍可补充。请确认是否申报有效？"
                    }).then(() => {
                        that.subData(param)
                    }).catch(() => {
                    })
                }else{
                    vant.Dialog.confirm({
                        title: "",
                        message: "建档申报有效后将无法修改统一社会信用代码；若身份证号已填写，也无法进行修改，未填写仍可补充。请确认是否申报有效？"
                    }).then(() => {
                        that.subData(param)
                    }).catch(() => {
                    })
                }

                
                
                
            },

            async subData(param){
                var that=this;
                const res = await $http(baseUrl.submitUrl, true,param, true);
                if (res.retcode === 'success'){
                    vant.Dialog.alert({
                        message: "申报成功"
                    }).then(() => {
                        that.submitList=[];
                        that.queryList();
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
             * 考试跳转
             */
            gotest(){
                window.location.replace("../../wxqy/onlineTest1/index.html?examinationtype=188&page=answer")
            },
             /**
             * 查看详情
             * @param {} id 
             */
            goDetail(checkid,phjdid){
                var that=this;
                checkid=checkid?checkid:"";
                window.location.href=`views/details.html?checkid=${checkid}&phjdid=${phjdid}&flag=declare` 
                
            },
            /**
             * 驳回修改
             * @param {} id 
             */
            goEdit(flag,id,datatype){
                var that=this;
                if(flag=="1"){
                    window.location.href="companyDetail.html?flag="+that.flag+"&datatype="+datatype+"&id="+id+"&v=1";
                }else if(flag=="2"){
                    window.location.href="personDetail.html?flag="+that.flag+"&datatype="+datatype+"&id="+id+"&v=1";
                }
                
            },
            /**
             * 抽查页面
             */
            goChpage(){
                window.location.href="views/checkList.html"
            },
            /**
             * 取消退出当前页面
             */
            cancelBtn(){
                wx.closeWindow();
            },
            /**
             * 第一次进页面签署文件
             */
            async signBtn(){
                var that=this;
                
                var  param={};
                const res = await $http(baseUrl.signUrl, true,param, true);
                if (res.retcode === 'success'){
                    vant.Dialog.alert({
                        message: "签署成功"
                    }).then(() => {
                        that.page="page1";
                        that.queryList();
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
             * 查询批次详情及列表
             * @param {*} checkbatchnum 
             */
            async checkbatchnumPage(checkbatchnum){
                var that=this;
                var  param={};
                param.checkbatchnum=checkbatchnum;
                param.pagenum="1";
                param.pagesize="9999";
                const res = await $http(baseUrl.phjdJdsbCheckBatchDetailListUrl, true,param, true);
                if (res.retcode === 'success'){
                    that.batchInfo=res.data;
                    that.page="page4";
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
            },

            backBtn(){
                var that=this;
                that.page="page3";

            }
            

             
                

         }
            
           
           
           
            
            
    
    })
}





