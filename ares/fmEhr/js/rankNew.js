var baseUrl = {
    
    queryRoleUrl:'phjdData/phjdStatisticGrant.xa',//查询角色
    queryTotalUrl:'phjdData/phjdXNStatisticTotal.xa',//查看建档有效建档统计
    queryListUrl1:'phjdData/phjdXNStatisticBudescr.xa',//查看建档管理行数据统计
    queryListUrl2:'phjdData/phjdXNStatisticSsbm.xa',//查看建档经营行数据统计
    queryListUrl3:'phjdData/phjdXNStatisticEmployee.xa',//查看建档员工数据统计

}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            page:"page1",

            ifEnd:true,//分页下拉标志
            tabFlag:"1", 
            role:"",

            pagenum:1,
            pagesize:9999,
            cdate:'1',// 建档时间 1昨日 2本月 3自定义时间 4累计建档
            startdate:'',
            enddate:'',
            estbdocmnby:'0',//0全部 1.企业 2.个体  3.农户
            org_cls:'qh',

            DateRangeshow:false,
            maxRangeDate:new Date(),
            minRangeDate:new Date(1950,0,1),
            currentRangeDate:new Date(),

            total:"0",
            validtotal:"0",
            waitdeclared:"0",
            declared:"0",

            list:[],

            datatype:"",

            show:false,

            // popupDataShow:false,
            // currentDate:new Date(),
            // dateType:"",
            // data_dt:"",
            // data_dt2:"",


            bu_descr:"",//下钻一级机构名称
            ssbm:"",//下钻二级员工名称
            orgid:"",
            up_org_id:"",

            currentDate:"",

            topHeight:"",
            footHeight:"",

            
           
            
        },
        created(){
            var that=this;
            var datatype=GetQueryString("datatype");//datatype   1 普惠  2  服务站 
            that.datatype=datatype;
            that.queryRole();
            $("#app").show();
            
        },
        mounted(){
            var that=this;
            var date=new Date();
            date.setDate(date.getDate()-1);
            that.maxRangeDate=date;


            var height=$(".seachData").height();
            height=Number(height);
            var footHeight=$(".footDiv").height();
            footHeight=Number(footHeight)+4;
            that.topHeight=height;
            that.footHeight=footHeight;
            $(".topDiv").css("height",that.topHeight+"px");
            $(".footDiv").css("height",that.footHeight+"px")
            
    
        },
        methods:{
           
            /**
             * 查询方法
             * @param {*} param 
             */
            chooseTab(param){
                var that=this;
                that.tabFlag=param;
                if(param=="1"){
                    that.org_cls="qh";
                    that.pagesize=9999;//不需要分页
                }else if(param=="2"){
                    that.org_cls="quanhang";
                    that.pagesize=50;
                }else if(param=="3"){
                    that.org_cls="quanhang";
                    that.pagesize=50;
                }

                that.pagenum=1;
                that.queryList();
            },
            /**
             * 查询区域支行
             * @param {*} param 
             */
            chooseTyle(param){
                var that=this;
                that.org_cls=param;
                that.pagenum=1;
                that.queryList();
            },
            /**
             * 查询类型
             * @param {*} param 
             */
            chooseestbdocmnby(param){
                var that=this;
                that.estbdocmnby=param;
                that.queryData();
            },
            /**
             * 选择查询时间
             * @param {*} param 
             */
            choosecdate(param){
                var that=this;
                that.cdate=param;
                // that.startdate="";
                // that.enddate="";
               if(param=="3"){
                    that.DateRangeshow=true;
                }else{
                    that.queryData();
                }
                
            },
            
           
             formateDate(time){
                let year = time.getFullYear()
                let month = time.getMonth() + 1
                let day = time.getDate()
          
                if (month < 10) {
                  month = '0' + month
                }
          
                if (day < 10) {
                  day = '0' + day
                }
          
                return year + '-' + month + '-' + day ;
          
             },
             onDateRangeConfirm(date) {
                var that=this;
                console.log(date, "内容")
                const [start, end] = date;
                that.DateRangeshow = false;
                that.startdate = that.formateDate(start);
                that.enddate = that.formateDate(end);
                that.queryData();
                
            },
            onDateRangeCancel(){
                var that=this;
                that.DateRangeshow = false;
            },

            toPage(param){
                window.location.href="index.html?datatype=1&datasource=1";

            },
            toDeclarePage(){
                window.location.href="declare.html"
            },
            warnText(param){
                var warnText="";
                if(param=="1"){
                    warnText= "信息字段完整，自主申报后，经过抽查人认定后的建档。"
                }else if(param=="2"){
                    warnText= "达到系统认定标准，但还未进行申报的建档。"
                }else if(param=="3"){
                    warnText= "建档人已申报，但还未经过人工抽查或批量认定的建档。"
                }
                vant.Dialog.alert({
                    message:warnText
                }).then(() => {
                    
                }); 
            },
            /**
             * 查询角色
             */
            async queryRole(){
                var that=this;
                var param={};
                const res = await $http(baseUrl.queryRoleUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.role=res.data;//基本信息

                    if(that.role=="nopermisson"){
                        vant.Dialog.alert({
                            message: "暂无权限"
                        }).then(() => {
                            wx.closeWindow();
                        }); 
                    }else{
                        that.queryData();

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
             * 查询建档数
             */
            async queryData(){
                var that=this;
                if(that.cdate=="3"){
                    if(!that.startdate || !that.enddate){
                        return vant.Toast('请选择自定义时间');
                    }
                }
                var param={};
                param.cdate=that.cdate;
                param.startdate=that.startdate;
                param.enddate=that.enddate;
                param.estbdocmnby=that.estbdocmnby;
                const res = await $http(baseUrl.queryTotalUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.total=res.data.DatCnt.total;
                    that.validtotal=res.data.DatCnt.validtotal;
                    that.waitdeclared=res.data.DatCnt.waitdeclared;
                    that.declared=res.data.DatCnt.declared;
                    that.currentDate=res.data.DatCnt.data_date + " 23:59:59";

                    $(".topDiv").css("height",that.topHeight+"px");
                    $(".footDiv").css("height",that.footHeight+"px")

                    that.pagenum=1;
                    that.queryList();
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
            },
            /**
             * 查询
             */
            async queryList(){
                var that=this;
                var param={};
                param.cdate=that.cdate;
                param.startdate=that.startdate;
                param.enddate=that.enddate;
                param.estbdocmnby=that.estbdocmnby;
                param.pagenum=that.pagenum+"";
                param.pagesize=that.pagesize+"";
                param.org_cls=that.org_cls;

                var queryListUrl="";
                if(that.tabFlag=="1"){
                    queryListUrl=baseUrl.queryListUrl1;
                }else if(that.tabFlag=="2"){
                    queryListUrl=baseUrl.queryListUrl2;
                }else if(that.tabFlag=="3"){
                    queryListUrl=baseUrl.queryListUrl3;
                }

                if(that.pagenum=="1"){
                    that.list=[];
                }
                         
                const res = await $http(queryListUrl, true,param, true);

                if (res.retcode === 'success'){
                    var datalist=res.data;
                    //一页的数据
                    if (!datalist) {
                        datalist = [];
                    }
                    if (that.pagenum == 1) {
                        that.list = datalist;
                    } else {
                        that.list = that.list.concat(datalist);
                    }
                    if (that.pagesize > datalist.length) {//多页页的数据
                        that.ifEnd = true;
                    } else {
                        that.pagenum++;
                        that.ifEnd = false;
                    }
                    $("#app").show();
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
                
            },
            /**
             * 返回首页
             */
            backBu_descr(){
                var that=this;
                that.pagenum=1;
                that.pagesize=999;
                that.ifEnd=true;
                that.page="page1";
                
                that.queryList();

                $(".topDiv").css("height",that.topHeight+"px");
                $(".footDiv").css("height",that.footHeight+"px");
                
            },
            /**
             * 返回机构列表
             */
            backSsbm(){
                var that=this;
                that.pagenum=1;
                that.pagesize=50;
                that.ifEnd=true;
                that.page="page2";
                that.queryDownList("2",that.orgid);
            },

            /**
             * 跳转至机构列表
             * @param {} bu_descr 
             * @param {*} orgid 
             */
            goSsbm(bu_descr,orgid){
                var that=this;
                that.bu_descr=bu_descr;
                that.pagenum=1;
                that.pagesize=50;
                that.ifEnd=true;
                that.page="page2";
                that.orgid=orgid;
                that.queryDownList("2")

            },
            /**
             * 跳转至员工列表
             * @param {*} ssbm 
             * @param {*} orgid 
             */
            goemployeename(ssbm,up_org_id){
                var that=this;
                that.ssbm=ssbm;
                that.pagenum=1;
                that.pagesize=50;
                that.ifEnd=true;
                that.page="page3";
                that.up_org_id=up_org_id;
                that.queryDownList("3")

            },

             /**
             * 下钻查询
             */
            async queryDownList(flag){
                var that=this;
                var param={};
                param.cdate=that.cdate;
                param.startdate=that.startdate;
                param.enddate=that.enddate;
                param.estbdocmnby=that.estbdocmnby;
                param.pagenum=that.pagenum+"";
                param.pagesize=that.pagesize+"";
                param.org_cls="quanhang";
                

                var queryListUrl="";
                if(flag=="2"){
                    queryListUrl=baseUrl.queryListUrl2;
                    param.orgid=that.orgid;
                }else if(flag=="3"){
                    queryListUrl=baseUrl.queryListUrl3;
                    param.orgid=that.up_org_id;
                }

                if(that.pagenum=="1"){
                    that.list=[];
                }
                         
                const res = await $http(queryListUrl, true,param, true);

                if (res.retcode === 'success'){
                    var datalist=res.data;
                    //一页的数据
                    if (!datalist) {
                        datalist = [];
                    }
                    if (that.pagenum == 1) {
                        that.list = datalist;
                    } else {
                        that.list = that.list.concat(datalist);
                    }
                    if (that.pagesize > datalist.length) {//多页页的数据
                        that.ifEnd = true;
                    } else {
                        that.pagenum++;
                        that.ifEnd = false;
                    }
                    $("#app").show();
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
                
            },

            async downExport(){

                var that=this;
                if(that.cdate=="3"){
                    if(!that.startdate || !that.enddate){
                        return vant.Toast('请选择自定义时间');
                    }
                }
                var param={};
                param.cdate=that.cdate;
                param.startdate=that.startdate;
                param.enddate=that.enddate;
                // param.estbdocmnby=that.estbdocmnby;
                const res = await $http(baseUrl['downExportUrl'+that.tabFlag], true,param, true);

                if (res.retcode === 'success'){
                    vant.Dialog.alert({
                        message: "下载成功"
                    }).then(() => {
                    }); 
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
            },

            async downLoad(){

                var that=this;
                if(that.cdate=="3"){
                    if(!that.startdate || !that.enddate){
                        return vant.Toast('请选择自定义时间');
                    }
                }
                var param={};
                param.cdate=that.cdate;
                param.startdate=that.startdate;
                param.enddate=that.enddate;
                // param.estbdocmnby=that.estbdocmnby;
                const res = await $http(baseUrl.downLoadUrl, true,param, true);

                if (res.retcode === 'success'){
                    vant.Dialog.alert({
                        message: "下载成功"
                    }).then(() => {
                    }); 
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
            }

            
                
                
                

         }
            
           
            
    
    })
}




// //浏览器滚动部分高度
// function getScrollTop() {
//     var scrollTop = 0;
//     if (document.documentElement && document.documentElement.scrollTop) {
//         scrollTop = document.documentElement.scrollTop;
//     } else if (document.body) {
//         scrollTop = document.body.scrollTop;
//     }
//     return scrollTop;
// };

// //浏览器可视部分高度
// function getCilentHeight() {
//     var clientHeight = 0;

//     if (document.body.clientHeight && document.documentElement.clientHeight) {
//         clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
//     } else {
//         clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
//     }
//     return clientHeight;
// };

// //浏览器内容高度
// function getScrollHeight() {
//     return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
// }


// window.onscroll = function () {
//     if ((getScrollHeight() - (Math.ceil(getScrollTop() + getCilentHeight()))) < 10) {
        
//         if (!vm.ifEnd) {
//             vm.ifEnd = true;
//             vm.queryList();
//         }
//     }

// };
