var baseUrl = {
    queryListUrl: 'phjdData/phjdMyDataList.xa',//查询

}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            page:"page1",
            type:"0",
            searchWord:"",
            status:"1",
            tag:"1",
            flag:"",
            estbdocmnby:"",

            list:[
                
            ],
            typeshow:false,
            typeshowdate:"",
            typeList:[],
            estbdocmnbyList:[
                {text:"全部类型",value:""},
                {text:"小微企业",value:"1"},
                {text:"个体",value:"2"},
            ],
            estbdocmnbyOpt:{
                "":"全部类型",
                "1":"小微企业",
                "2":"个体",
                "3":"农户",
                
            },
            statusList:[//全部建档1 ，有效建档2  、待完善建档3  待申报建档4 、申报驳回建档 5、  已申报未抽查 6
                {text:"全部状态",value:"1"},
                {text:"有效建档",value:"2"},
                {text:"待申报",value:"4"},
                {text:"已申报未抽查",value:"6"},
                {text:"申报驳回",value:"5"},
                {text:"待完善",value:"3"},
                {text:"已作废",value:"10"},

            ],
            statusOpt:{//0无效 1有效 7 已申报未抽查  8已申报驳回建档  9 待申报
                "1":"全部状态",
                "2":"有效建档",
                "3":"待完善",
                "4":"待申报",
                "5":"申报驳回",
                "6":"已申报未抽查",
                "10":"已作废",
            },
            // * 标签    1 全部
            // *        2-0未开卡 2-1已开卡
            // *        3-0未开户 3-1已开户
            // *        4-0未交叉营销 4-1已交叉营销
           tagList:[
                {text:"全部标签",value:"1"},
                {text:"未开卡",value:"2-0"},
                {text:"已开卡",value:"2-1"},
                {text:"未开户",value:"3-0"},
                {text:"已开户",value:"3-1"},
                // {text:"未交叉营销",value:"4-0"},
                // {text:"已交叉营销",value:"4-1"},

            ],
            tagOpt:{
                "1":"全部标签",
                "2-0":"未开卡",
                "2-1":"已开卡",
                "3-0":"未开户",
                "3-1":"已开户",
                // "4-0":"未交叉营销",
                // "4-1":"已交叉营销",
            },
            pagenum:1,
            pagesize:30,
            ifEnd:true,//分页下拉标志

            listStatusOpt:{//0无效 1有效 8申报拒绝 9 待申报
                "1":"有效建档",
                "0":"待完善建档",
                "9":"待申报建档",
                "8":"申报驳回建档",
                "7":"已申报未抽查",
                // "10":"已作废",
            },
            listopencardOpt:{
                "0":"未开卡",
                "1":"已开卡",
                "9":"已销卡",

            },
            listopenacctOpt:{
                "0":"未开户",
                "1":"已开户",
                "9":"已销户",

            },
            estbdocmnbyListOpt:{
                "1":"小微企业",
                "2":"个体",
            },

            datatype:"",
            datasource:"",
        },
        created(){
            var that=this;
            var datatype=GetQueryString("datatype");//datatype   1 普惠  2  服务站
            that.datatype=datatype?datatype:"1";
            var datasource=GetQueryString("datasource")?GetQueryString("datasource"):"2";//datasource  1 数据中心  2  企业微信 
            that.datasource=datasource;

            if(datatype=="2"){
                that.estbdocmnbyList=[
                    {text:"全部类型",value:""},
                    {text:"小微企业",value:"1"},
                    {text:"个体",value:"2"},
                    {text:"农户",value:"3"},
                ];
            }

           

            that.queryList();
            $("#app").show();
            

        },
        mounted(){


        },
        methods:{

            /**
             * 切换tab
             * @param {*} type
             */
            chooseType(type){
                this.typeshowdate=type;
                this.typeshow=true;
                this.typeList=this[type+"List"];

            },
            onTypeConfirm(param){
                this[this.typeshowdate]=param.value;
                this.typeshowdate="";
                this.typeshow=false;
                this.typeList=[];
                this.pagenum=1;
                this.queryList();
            },
            queryLists(){
                this.pagenum=1;
                this.queryList();
            },

            /**
             * 查询列表
             */
            async queryList(){

                var that=this;
                var param={};
                
                param.pagenum=that.pagenum+"";
                param.pagesize=that.pagesize+"";
                param.keyword=that.searchWord;
                param.status=that.status;
                param.tag=that.tag;
                param.estbdocmnby=that.estbdocmnby;
                param.datatype=that.datatype;


                if(that.pagenum=="1"){
                    that.list=[];
                }

                const res = await $http(baseUrl.queryListUrl, true,param, true);

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
             * 查看详情
             * @param {} id
             */
            goDetail(id,EstbDocMnBy,ifEdit){
                if(EstbDocMnBy=="3"){
                    window.location.href="farmerDetail.html?flag="+EstbDocMnBy+"&id="+id;
                }else{
                    window.location.href="phdetail.html?flag="+EstbDocMnBy+"&datatype="+this.datatype+"&id="+id+"&ifEdit="+ifEdit+"&v=1";
                }

            },
            

            goIndex(){
                window.location.href="index.html?datasource="+this.datasource+"&datatype="+this.datatype;
            },

            toDeclarePage(){
                window.location.href="declare.html"
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




            }







    })
}



//浏览器滚动部分高度
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
};

//浏览器可视部分高度
function getCilentHeight() {
    var clientHeight = 0;

    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    }
    return clientHeight;
};

//浏览器内容高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}


window.onscroll = function () {
    if ((getScrollHeight() - (Math.ceil(getScrollTop() + getCilentHeight()))) < 10) {

        if (!vm.ifEnd) {
            vm.ifEnd = true;
            vm.queryList();
        }
    }

};

