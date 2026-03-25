var baseUrl = {
    queryListUrl: '/commonsign/getSignRecordStatistic.xa',//查询
    exportUrl: '/commonsign/exportExcelSignRecord.xa',//导出
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            pageNum:1,
            pageSize:100,
            ifEnd:true,//分页下拉标志
            templatekey:"",
            status:"0",
            list:[
               
            ],
            
    
        },
        created(){
            var that=this;
            that.templatekey=GetQueryString("templatekey");
            that.queryList();
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            chooseTab(param){
                var that=this;
                that.status=param;
                that.pageNum=1;
                that.queryList();

            },
            async exportBtn(){
                
                var that=this;
                var param={};
                param.templateKey=that.templatekey;
                         
                const res = await $http(baseUrl.exportUrl, true,param, true);

                if (res.retcode === 'success'){
                    vant.Dialog.alert({
                        message: "导出成功"
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
            
            /**
             * 查询
             */
            async queryList(){
                var that=this;
                var param={};
                param.templateKey=that.templatekey;
                param.signStatus=that.status;
                param.pageNum=that.pageNum+"";
                param.pageSize=that.pageSize+"";
                         
                const res = await $http(baseUrl.queryListUrl, true,param, true);

                if (res.retcode === 'success'){
                    var datalist=res.data.list;
                    //一页的数据
                    if (!datalist) {
                        datalist = [];
                    }
                    if (that.pageNum == 1) {
                        that.list = datalist;
                    } else {
                        that.list = that.list.concat(datalist);
                    }
                    if (that.pageSize > datalist.length) {//多页页的数据
                        that.ifEnd = true;
                    } else {
                        that.pageNum++;
                        that.ifEnd = false;
                    }
                    $("#app").show();
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
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



