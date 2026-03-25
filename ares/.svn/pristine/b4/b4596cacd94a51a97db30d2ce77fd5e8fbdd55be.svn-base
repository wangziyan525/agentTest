var baseUrl = {
    
    queryTotalUrl:'phjdData/xczxjdStatisticTotal.xa',//查看建档有效建档统计
    queryListUrl:'phjdData/xczxjdStatisticStation.xa',//统计服务站数据
    queryListUrl2:'phjdData/xczxjdStatisticStationEmployee.xa',//统计服务站员工数据
    queryListUrl22:'phjdData/xczxjdStatisticStationCustomer.xa',//统计服务站客户数据
    queryListUrl3:'phjdData/xczxjdStatisticStationBuDescr.xa',//统计服务站管理行建档数据
    queryListUrl4:'phjdData/xczxjdStatisticStationSsbm.xa',//统计经营支行建档数据
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            page:"page1",
           
            ifEnd:true,//分页下拉标志
            ifEnd2:true,//分页下拉标志
            ifEnd3:true,//分页下拉标志
            tabFlag:"3", 
            role:"",

            pagenum:1,
            pagesize:50,
            cdate:'1',// 建档时间 1昨日 2本月 3自定义时间 4累计建档
            startdate:'',
            enddate:'',
            estbdocmnby:'0',//0全部 1.企业 2.个体  3.农户

            orgtype:'区域支行',

            DateRangeshow:false,
            maxRangeDate:new Date(),
            minRangeDate:new Date(1950,0,1),
            currentRangeDate:new Date(),

            total:"0",
            validtotal:"0",

            list:[],
            list2:[],
            list3:[],

            datatype:"",

            pagenum2:1,
            pagesize2:50,

            pagenum3:1,
            pagesize3:50,

            stationid:"",
            stationname:"",

            employeename:"",
            humancode:"",

            estbdocmnbyObj:{//1.企业 2.个体 3.农户
                "1":"企业",
                "2":"个体",
                "3":"农户",
            }

            
           
            
        },
        created(){
            var that=this;
            that.queryData();
            $("#app").show();
            
        },
        mounted(){

            var datatype=GetQueryString("datatype");//datatype   1 普惠  2  服务站 
            this.datatype=datatype;
    
        },
        methods:{
            /**
             * 查询方法tab切换
             * @param {*} param 
             */
            chooseTab(param){
                var that=this;
                that.tabFlag=param;
                if(param=="3"){
                    that.orgtype="区域支行";
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
                that.orgtype=param;
                that.pagenum=1;
                that.queryList();
            },
            
            /**
             * 查询商户类型
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
            /**
             * 返回首页
             */
            toPage(){
                var that=this;
                window.location.href="index.html?datatype=2";

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
                    that.total=res.data.total;
                    that.validtotal=res.data.validtotal;

                    var height=$(".seachData").height();
                    height=Number(height)+4;
                    $(".scrollPart").css("margin-top",height+"px")

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
             * 首页列表信息查询
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

                var queryListUrl="";
                if(that.tabFlag=="1"){//服务站排名
                    queryListUrl=baseUrl.queryListUrl;
                }else if(that.tabFlag=="2"){//员工排名
                    queryListUrl=baseUrl.queryListUrl2;
                }else if(that.tabFlag=="3"){//一级机构
                    param.orgtype=that.orgtype;
                    queryListUrl=baseUrl.queryListUrl3;
                }else if(that.tabFlag=="4"){//经营支行
                    queryListUrl=baseUrl.queryListUrl4;
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
             * 返回首页列表
             */
            backStation(){
                var that=this;
                that.page="page1";
                that.ifEnd=true;
                that.ifEnd1=true;
                that.ifEnd2=true;
                that.pagenum=1;
                that.queryList();
            },
            /**
             * 返回首页员工列表或单独员工列表
             */
            
            backEmployeename(){
                var that=this;
               
                that.ifEnd=true;
                that.ifEnd1=true;
                that.ifEnd2=true;

                if(that.stationname){//站点下的员工列表
                    that.page="page2";
                    that.pagenum2=1;
                    that.queryList2();
                }else{//首页员工列表
                    that.page="page1";
                    that.pagenum=1;
                    that.queryList();
                }
            },

            /**
             * 跳转到员工列表
             * @param {*} stationid 
             * @param {*} stationname 
             */
            goemployeename(stationid,stationname){
                var that=this;
                that.pagenum2="1";
                that.page="page2";
                that.ifEnd=true;
                that.ifEnd1=true;
                that.ifEnd2=true;
                that.stationid=stationid;
                that.stationname=stationname;
                that.queryList2();


            },

            /**
             * 查询
             */
            async queryList2(){
                var that=this;
                var param={};
                param.cdate=that.cdate;
                param.startdate=that.startdate;
                param.enddate=that.enddate;
                param.estbdocmnby=that.estbdocmnby;
                param.pagenum=that.pagenum2+"";
                param.pagesize=that.pagesize2+"";

                param.stationid=that.stationid;

               

                if(that.pagenum2=="1"){
                    that.list2=[];
                }
                         
                const res = await $http(baseUrl.queryListUrl2, true,param, true);

                if (res.retcode === 'success'){
                    var datalist=res.data;
                    //一页的数据
                    if (!datalist) {
                        datalist = [];
                    }
                    if (that.pagenum2 == 1) {
                        that.list2 = datalist;
                    } else {
                        that.list2 = that.list2.concat(datalist);
                    }
                    if (that.pagesize2 > datalist.length) {//多页页的数据
                        that.ifEnd2 = true;
                    } else {
                        that.pagenum2++;
                        that.ifEnd2 = false;
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
             * 跳转到客户列表
             * @param {*} stationname 
             * @param {*} stationid 
             * @param {*} employeename 
             * @param {*} humancode 
             */

            goCustomer(stationname,stationid,employeename,humancode){
                var that=this;
                that.pagenum3="1";
                that.page="page3";
                that.ifEnd=true;
                that.ifEnd1=true;
                that.ifEnd2=true;
                that.stationname=stationname;
                that.stationid=stationid;
                that.employeename=employeename;
                that.humancode=humancode;
                that.queryList3();
            },
                
             /**
             * 查询
             */
            async queryList3(){
                var that=this;
                var param={};
                param.cdate=that.cdate;
                param.startdate=that.startdate;
                param.enddate=that.enddate;
                param.estbdocmnby=that.estbdocmnby;
                param.pagenum=that.pagenum3+"";
                param.pagesize=that.pagesize3+"";

                param.stationid=that.stationid;
                param.humancode=that.humancode;

                if(that.pagenum3=="1"){
                    that.list3=[];
                }
                         
                const res = await $http(baseUrl.queryListUrl22, true,param, true);

                if (res.retcode === 'success'){
                    var datalist=res.data;
                    //一页的数据
                    if (!datalist) {
                        datalist = [];
                    }
                    if (that.pagenum3 == 1) {
                        that.list3 = datalist;
                    } else {
                        that.list3 = that.list3.concat(datalist);
                    }
                    if (that.pagesize3 > datalist.length) {//多页页的数据
                        that.ifEnd3 = true;
                    } else {
                        that.pagenum3++;
                        that.ifEnd3 = false;
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
