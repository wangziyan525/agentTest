var baseUrl = {
    queryListUrl: 'phjdData/queryListData.xa',//查询
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            type:"0",
            searchWord:"",
            EstbDocTp:"1",
            flag:"",
            placetext:"",

            list:[
            ],
            typeshow:false,
            typeshowdate:"",
            typeList:[],
            EstbDocTpList:[//全部建档1 ，有效建档2  、待完善建档3  待申报建档4 、申报驳回建档 5、  已申报未抽查 6 
                {text:"全部建档",value:"1"},
                {text:"有效建档",value:"2"},
                {text:"待申报建档",value:"4"},
                {text:"已申报未抽查",value:"6"},
                {text:"申报驳回建档",value:"5"},
                {text:"待完善建档",value:"3"},
                {text:"已作废",value:"10"},
            ],
            EstbDocTpOpt:{
                "1":"全部建档",
                "2":"有效建档",
                "3":"待完善建档",
                "4":"待申报建档",
                "5":"申报驳回建档",
                "6":"已申报未抽查",
                "10":"已作废",
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
                "10":"已作废",
            },

            datatype:"",
        },
        created(){
            var that=this;
            var flag=GetQueryString("flag");//建档主体
            that.flag=flag;//1-企业;2-个体;3-农户
            //var datatype=GetQueryString("datatype");//datatype   1 普惠  2  服务站 
            that.datatype="2";
            if(flag=="1"){
                that.placetext="输入企业名称搜索";
                document.title="小微企业建档";
            }else if(flag=="2"){
                that.placetext="输入商户名称搜索";
                document.title="个体建档";
            }else if(flag=="3"){
                that.placetext="输入农户姓名/所属村镇搜索";
                document.title="农户建档";
                that.EstbDocTpList=[//全部建档1 ，有效建档2  、待完善建档3  待申报建档4 、申报驳回建档 5、  已申报未抽查 6 
                    {text:"全部建档",value:"1"},
                    {text:"有效建档",value:"2"},
                    {text:"待完善建档",value:"3"},
                ];
            }else{
                that.placetext="请输入"
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
                param.EstbDocMnBy=that.flag;
                param.EstbDocTp=that.EstbDocTp;
                param.datatype=that.datatype;
                if( that.flag=="1" ||  that.flag=="2"){
                    param.EntpNm =that.searchWord;
                }else if(that.flag=="3"){
                    param.EntpCtcManNm=that.searchWord;
                    param.AtchRural=that.searchWord;
                }
                param.pagenum=that.pagenum+"";
                param.pagesize=that.pagesize+"";
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
            goDetail(id){
                var that=this;
                var flag=that.flag;
                if(flag=="1"){
                    window.location.href="../fmEhr/companyDetail.html?flag="+that.flag+"&id="+id+"&datatype=2";
                }else if(flag=="2"){
                    window.location.href="../fmEhr/personDetail.html?flag="+that.flag+"&id="+id+"&datatype=2";
                }else if(flag=="3"){
                    window.location.href="../fmEhr/farmerDetail.html?flag="+that.flag+"&id="+id+"&datatype=2";
                }
                
                
            },
            /**
             * 新增
             */
            appltBtn(){
                var that=this;
                var flag=that.flag;
                if(flag=="1"){
                    window.location.href="../fmEhr/companyDetail.html?flag="+that.flag+"&ifAdd=1"+"&datatype=2";
                }else if(flag=="2"){
                    window.location.href="../fmEhr/personDetail.html?flag="+that.flag+"&ifAdd=1"+"&datatype=2";
                }else if(flag=="3"){
                    window.location.href="../fmEhr/farmerDetail.html?flag="+that.flag+"&ifAdd=1"+"&datatype=2";
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

