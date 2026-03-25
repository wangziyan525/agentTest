var baseUrl = {
    queryInfoUrl: 'customerVoice/selectDepartmentList.xa',//查询部门
    queryListUrl: 'customerVoice/selectFeedbackList.xa',//查询
    addCommentUrl: 'customerVoice/addComment.xa',//回复
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            //时间弹出框
            popupDataShow:false,
            minDate:new Date(1950,0,1),
            maxDate:new Date(),
            currentDate:new Date(),
            //选择下拉框
            popupShow:false,
            dataType:"",
            popupList:[
            
            ],

            submitTime:"",
            deptId:"",
            deptName:"",
            list:[
                
                
            ],
            pageNum:1,
            pageSize:10,
            ifEnd: true,

            popupMessageShow:false,
            refuseMessage:"",
            isxb:"",//是否消保人员
            basewxqy:base.domain+"/wxqy/upload/customerVoice/",

            index:'',
            indexChild:'',

    
        },
        created(){
            var that=this;
            that.queryDept();
            that.queryList();
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            changeMore(index){
                var that=this;
                that.list[index].ifclose=!that.list[index].ifclose;
                that.$forceUpdate();
            },
            /**
             * 回复
             */
            async addComment(){
                var that=this;
                if(that.refuseMessage==""){
                    vant.Toast('请输入回复内容');
                    return; 
                }

                var index=that.index;
                var indexChild=that.indexChild;
                var obj=that.list[index];
                var param={};
                if(indexChild===''){
                    param.feedbackCommentContent=that.refuseMessage;
                    param.feedBackId=obj.feedBackId;
                   
                }else{
                    param.feedbackCommentContent=that.refuseMessage;
                    param.feedBackId=obj.feedBackId;
                    param.to_name=obj.feedBackComments[indexChild].name;
                    param.to_ssbm=obj.feedBackComments[indexChild].ssbm;
                    param.to_userid=obj.feedBackComments[indexChild].userId;

                }
                const res = await $http(baseUrl.addCommentUrl, true,param, true);
                if (res.retcode === 'success'){
                    that.popupMessageShow=false;
                    that.refuseMessage="";
                    that.index="";
                    that.indexChild="";
                    that.pageNum=1;
                    that.queryList();
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg?res.retmsg:"系统异常"
                    }).then(() => { 
                    }); 
                }
            },
            /**
             * 查询部门
             */
            async queryDept(){
                var that=this;
                const res1 = await $http(baseUrl.queryInfoUrl, true,{}, true);
                if (res1.retcode === 'success'){
                    var list=res1.data;
                    var popupList=list.map(obj=>({
                        text:obj.ssbm,
                        value:obj.deptid
                    }))
                   that.popupList=popupList;

                }
                else{
                    vant.Dialog.alert({
                        message: res1.retmsg?res1.retmsg:"系统异常"
                    }).then(() => { 
                    }); 
                }
            },
            reAnswer(index,indexChild){
                var that=this;
                that.index=index;
                that.indexChild=indexChild
                that.popupMessageShow=true;
                that.refuseMessage="";
                
            },
            choosePicker(){
                var that=this;
                that.popupDataShow=true;
            },
            //确定时间
            getTime(a) {
                var that=this;
                that.dateVal = that.retrunTimes(a);
                var year = that.dateVal.split('-')[0];
                var month = that.dateVal.split('-')[1];
                var day = that.dateVal.split('-')[2];

                if (month <= 9) {
                    month = '0' + month;
                }
                if (day <= 9) {
                    day = '0' + day;
                }
                var disposeTime = year + '-' + month + '-' + day;

                that.submitTime=disposeTime;
                that.popupDataShow = false;
                that.pageNum=1;
                that.queryList();

            },
            retrunTimes(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            },
            showPopup(param){
                var that=this;
                that.popupShow=true;
                that.dataType=param;
               
            },
            cancelPopup(){
                var that=this;
                that.popupShow=false;
                that.dataType="";
            },
            onConfirm(param){
                var that=this;
                if(that.dataType=="deptId"){
                    that.deptId=param.value;
                    that.deptName=param.text;
                }
                that.popupShow=false;
                that.pageNum=1;
                that.queryList();
            },
            
            
            /**
             * 查询列表
             */
            async queryList(){
                var that=this;
                var param={};
                param.pageNum=that.pageNum;
                param.pageSize=that.pageSize;
                param.deptId=that.deptId;
                param.submitTime=that.submitTime;
                const res = await $http(baseUrl.queryListUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.isxb=res.data.isxb;
                    var datalist=res.data.list;
                    datalist.forEach(obj=>{
                        obj.ifclose=true;
                        obj.imgs=obj.feedbackImage?obj.feedbackImage.split(","):[];
                    })

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
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }
                
            },
            //查看图片
            bigImg(img){
                var imageUrls = new Array();
                imageUrls.push(img);
                vant.ImagePreview(imageUrls);
            },
            goApply(){
                window.location.href="apply.html"
            },
            
            /**
             * 开始录音
             */
            showRecorddiv () {
                $('.luyinbtn').attr('start', 'yes');
                $('.recodeblock').addClass('showluyin');
                $('.luyinbtn').text('结束说话');
                wx.startRecord();
            },
             /**
             * 开始录音
             */

            startRecord () {
                let that = this;
                let hasstart = $('.luyinbtn').attr('start');
                if (hasstart == 'no') {
                    $('.luyinbtn').attr('start', 'yes');
                    $('.luyinbtn').text('结束说话');
                    wx.startRecord();
                } else {
                    $('.luyinbtn').attr('start', 'no');
                    $('.luyinbtn').text('开始说话');
                    $('.recodeblock').removeClass('showluyin');
                    wx.stopRecord({
                        success: function (res) {
                            let localId = res.localId;
                            wx.translateVoice({
                                localId: localId,
                                isShowProgressTips: 1,
                                success: function (res) {
                                    let result = res.translateResult;
                                    result = result.substring(0,result.length - 1);
                                    that.refuseMessage = that.refuseMessage+result;
                                    that.$forceUpdate();
                                },
                                fail: function (res) {
                                    $.alert(JSON.stringify(res),"");
                                }
                            })
                        },
                        fail: function (res) {
                            $.alert(JSON.stringify(res),"");
                        }
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