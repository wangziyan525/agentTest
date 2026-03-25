var baseUrl = {
    queryTaskNameUrl: 'rmbUpgradeTask/getTaskType.xa',
    queryTaskReportUrl:"rmbUpgradeTask/getTaskReport.xa",//查询任务报表
    getTaskList:"rmbUpgradeTask/getTaskList.xa",//查询任务列表
    getTaskById:"rmbUpgradeTask/getTaskById.xa",//查询任务详情
    finishTask:'rmbUpgradeTask/finishTask.xa',//完成任务
    insertRecord:'rmbUpgradeTask/insertRecord.xa',//插入埋点记录
    getMyTaskList:'rmbUpgradeTask/getMyTaskList.xa',//我的任务
    getBase64Url: 'rmbUpgradeTask/getBase64.xa',
    reviewerApproveUrl: 'rmbUpgradeTask/reviewerApprove.xa', // 复核审批
}
var vm;
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            tab:'1',
            oldWxqyPath:base.domain+"/wxqy/upload/rmbUpgradeTask/",
            pageId:1,
            noticeContent:'',// 公告内容
            countdown:10,  //倒计时
            report:{
                allTaskNum:0,//总任务数
                finishTaskNum:0,//已完成任务书
                allProcess:0,// 总进度
                supportNum:0,
                supportSum:0,
                process_bar:{
                    width:'0%'
                }
            },
            TaskreportList:[],

            taskList:[],//未完成-0;已完成-1
            taskMyList:[],//我的任务任务列表


            futurepageId:"",//详情前一页内容

            taskDetail:{},//任务详情,
            beforeTaskDetail:[],//前置任务详情
            beforeStatus:'',
            uploadImgLocalIds:[],//上传的图片localid
            uploadImgServerIds:[],
            remark:'',
            inputNum:0,
            allNum:600,
            bannerTitle: '',
            taskDetailImgs: [], // 新增详情图片展示  替换 页面  taskDetail.imgs
            humancode: $.parseJSON($.cookie("user")).humancode,
            ReviewerUser: '',
            ReviewerUserApprove: false
        },
        created(){
            // let that = this;
            // this.$nextTick(() => {
            //     that.getCharts('canvas1','100','#0CF06C','#08EDB1');
                
            // })
            this.bannerTitle = decodeURI(GetQueryString('sysNumber')).split('_')[1]
            var that=this;
            if (that.getQueryString('taskId')) {
                that.tab="4";
                that.getMyTaskList();
                that.getTaskById(that.getQueryString('taskId'));
            } else {
                var tab = that.getQueryString('tab');//跳转到我的任务
                if(tab=="2"){
                    that.tab="4";
                    that.getMyTaskList();
                }else{
                    that.queryTaskName();
                    
                }
                // that.insertRecord();
                that.toCountdown();
            }
            

            
           
           

            
        },
        mounted(){
            $("#app").show();
        },
        methods:{

             // 倒计时刷新
             toCountdown(){
                var that = this;
                setInterval(function(){
                    if(that.countdown == 1){
                        that.countdown = 10;
                        setTimeout(()=>{
                            if(that.tab=="1"){
                                that.queryTaskName();
                            }
                            if(that.tab=="4"){
                                that.getMyTaskList(true);
                            }
                        },1000)
                    }else{
                        that.countdown --
                    }
                },1000);
            },

            chooseTab(param){
                var that=this;
                that.tab=param;
                if(param=='1'){
                    that.queryTaskName();
                }else if(param=='2'){
                    that.getTaskList('0');
                }else if(param=='3'){
                    that.getTaskList('1');
                }else if(param=='4'){
                    that.getMyTaskList();
                }


            },
            refeshqueryTaskName(){
                var that=this;
                that.countdown=10;
                that.queryTaskName();
            },

            /* *
             * 查询任务列表
             * */
            getTaskList:function(taskStatus){
                var that = this;
                
                that.taskList =[];
                var param = {};
                param.sysNumber = decodeURI(GetQueryString('sysNumber'));
                param.taskStatus = taskStatus;
                $http(baseUrl.getTaskList, true,param, false)
                    .then(res => {
                        let taskList = res.data;
                        if(taskList == null || taskList.length < 1){
                            that.taskList = [];
                            return;
                        }
                        for(let i=0; i<taskList.length; i++){
                            let task = taskList[i];
                            task.startDate = that.formatDate(task.startDate);
                            task.endDate = that.formatDate(task.endDate);
                        }
                        that.taskList = taskList;
                    })
            },

            
            /* *
             * 查询我的任务列表
             * */
            getMyTaskList:function(flag){
                var that=this;
                var showLoading=false;
                if(!flag){
                    showLoading=true;
                }
                var param = {};
                param.sysNumber = decodeURI(GetQueryString('sysNumber'));
                var that = this;
                $http(baseUrl.getMyTaskList, showLoading,param, true)
                    .then(res => {
                        if (res.retcode === 'success'){
                            let taskList = res.data;
                            if(taskList == null || taskList.length < 1){
                                that.taskMyList = [];
                                return;
                            }
                            for(let i=0; i<taskList.length; i++){
                                let task = taskList[i];
                                task.startDate = that.formatDate(task.startDate);
                                task.endDate = that.formatDate(task.endDate);
                            }
                            that.taskMyList = taskList;
                        }else if( res.retcode != 'success' && showLoading){
                            vant.Dialog.alert({
                                title: res.retmsg
                            }).then(() => {
                            });
                        }
                        
                    })
            },

            /* *
             * 查询任务详情
             * */
            getTaskById:function(taskId){
                var param = {};
                param.taskId = taskId;
                var that = this;
                that.futurepageId = that.tab;
                param.sysNumber = decodeURI(GetQueryString('sysNumber'));
                $http(baseUrl.getTaskById, true,param, false)
                    .then(res => {
                        that.ReviewerUser = res.data.ReviewerUser;
                        that.ReviewerUserApprove = res.data.ReviewerUserApprove;
                        that.tab='5';
                        that.taskDetail = res.data.task;
                        if(that.taskDetail.imgs != null && that.taskDetail.imgs != ''){
                            // that.taskDetail.imgs = [];
                            // that.taskDetail.imgs = that.taskDetail.imgs.split(",");
                            that.getBase64(that.taskDetail.imgs.split(","))
                        } else {
                            that.taskDetailImgs = [];
                        }
                        that.taskDetail.startDate = that.formatDate(that.taskDetail.startDate);
                        that.taskDetail.endDate = that.formatDate(that.taskDetail.endDate);
    
                        that.beforeStatus = res.data.beforeStatus;
                        if(res.data.beforeTask.length>0){
                            res.data.beforeTask.map((val,index)=>{
                                val.startDate = that.formatDate(that.taskDetail.startDate);
                                val.endDate = that.formatDate(that.taskDetail.endDate);
                            })
                        }
                        that.beforeTaskDetail = res.data.beforeTask;
                    })
            },


            async getBase64 (imgs) {
                // imgs = imgs.split(',');
                let images = [];
                for (let i = 0; i < imgs.length; i++) {
                    let param = {};
                    param.imageName = imgs[i];
                    if (param.imageName != '') {
                        const res = await $http(baseUrl.getBase64Url, false,param, true);
                        if (res.retcode == 'success') {
                            images.push('data:image/png;base64,' + res.data);
                        } else {
                            vant.Dialog.alert({
                                title: res.retmsg
                            }).then(() => {
                            }); 
                        }
                    }
                }
                this.taskDetailImgs = images;
            },

            //任务类型查询
            async queryTaskName(){
                var that=this;
                var param={};
                param.sysNumber = decodeURI(GetQueryString('sysNumber'));
                const res2 = await $http(baseUrl.queryTaskNameUrl, false,param, false);
                let list = res2.data;
                that.TaskName=list;
                
                if(list && list.length>0){
                    that.getTaskReport();
                }else{
                    var report={
                        allTaskNum:0,//总任务数
                        finishTaskNum:0,//已完成任务书
                        allProcess:0,// 总进度
                        supportNum:0,
                        supportSum:0,
                        process_bar:{
                            width:'0%'
                        }
                    };
                    that.report=report;
                    that.TaskreportList=[];
                }
                
            },
            async getTaskReport(){
                var that=this;
                var param={};
                param.sysNumber = decodeURI(GetQueryString('sysNumber'));
                const res2 = await $http(baseUrl.queryTaskReportUrl, false,param, false);
                let list = res2.data.list;
                that.noticeContent = res2.data.content;
                that.report.supportNum = res2.data.supportNum?res2.data.supportNum:'0';
                that.report.supportSum = res2.data.supportSum?res2.data.supportSum:'0';
               
                var TaskreportList=[];
                if(list && list.length>0){
                    $("#app").show();
                    var TaskName=that.TaskName;
                    for(var i=0;i<TaskName.length;i++){
                        let opt={};
                        opt.taskGroup1=TaskName[i];
                        opt.taskNum=0;
                        opt.taskUnNum=0;
                        opt.processNum=0;
                        opt.id="canvas"+i;
                        for(var j=0;j<list.length;j++){
                            if(opt.taskGroup1==list[j].taskGroup1){
                                if(list[j].taskStatus == 0){//未完成
                                    opt.taskUnNum=parseInt(list[j].taskNum);
                                }else if(list[j].taskStatus == 1){//已完成
                                    opt.taskNum=parseInt(list[j].taskNum);
                                }
                            }

                        }
                        var percent = (opt.taskNum/(opt.taskUnNum+opt.taskNum)).toFixed(4)*100;
                        percent = percent >= 100 ? 100 : percent.toFixed(2);
                        opt.processNum=percent;//完成百分比
                        TaskreportList[i]=opt;
                    }
                };
                that.TaskreportList=TaskreportList;
                
                that.$forceUpdate();

                setTimeout(function(){
                    //获取总数和已完成数
                    var allTaskNum=0;//总任务数
                    var finishTaskNum=0;//已完成任务数
                    var allProcess=0;//进度
                    for(var k=0;k<TaskreportList.length;k++){
                        allTaskNum+=TaskreportList[k].taskUnNum+TaskreportList[k].taskNum;
                        finishTaskNum+=+TaskreportList[k].taskNum;
                        
                        
                        //allProcess+=parseInt(TaskreportList[k].processNum);

                        if(TaskreportList[k].processNum==100){
                            that.getCharts(TaskreportList[k].id,TaskreportList[k].processNum,'#1AFFEB','#00D1AD');
                        }else{
                            that.getCharts(TaskreportList[k].id,TaskreportList[k].processNum,'#6BC6FF','#1186FF');
                        }
                        
                    }
                    that.report.allTaskNum = allTaskNum;
                    that.report.finishTaskNum =finishTaskNum;

					allProcess = (finishTaskNum/allTaskNum * 100).toFixed(2);

                    //allProcess=(allProcess/TaskreportList.length).toFixed(2);
                    allProcess = allProcess >= 100 ? 100 : allProcess;
                    that.report.allProcess = allProcess;
                    that.report.process_bar.width = that.report.allProcess+'%';
                },500)

                

                
            },
            
            /* *
             * 画图表
             * */
            getCharts: function (idHtml, pressent, startColor, endColor) {
                var dom = document.getElementById(idHtml);
                //var myChart = echarts.init(dom, 'macarons');
                this.myChart = echarts.init(dom);
                this.myChart.clear();
                option = {
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            animationDuration: '3000',
                            animationEasing: 'cubicInOut',
                            radius: ['65%', '85%'],
                            avoidLabelOverlap: false,
                            silent:"true",
                            label: {
                                show: true,
                                position: 'center',
                                fontSize:'14',
                                formatter: pressent + "%"
                            },
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        var colorList = [
                                            {
                                                c1: startColor,  //管理
                                                c2: endColor
                                            }, {
                                                c1: '#EFEFEF',  //实践
                                                c2: '#EFEFEF'
                                            }]
                                        return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                            offset: 0,
                                            color: colorList[params.dataIndex].c1
                                        }, {
                                            offset: 1,
                                            color: colorList[params.dataIndex].c2
                                        }])
    
                                    }
                                }
                            },
                            
                            data: [
                                {value: pressent},
                                {value: 100 - pressent},
                            ]
                        }
                    ]
                };
                this.myChart.setOption(option,true);
            },

            

             /* *
             * 选择图片
             * */
            chooseImg:function(page) {
                var that = this;
                if(that.uploadImgLocalIds.length >=10){
                    vant.Toast('图片不能超过10张');
                    return;
                }
                var count = 10-that.uploadImgLocalIds.length;
                wx.chooseImage({
                    count: count,
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    success: function(res) {
                        that.uploadImage(res.localIds,0);
                    },
                    fail: function(res) {
                        vant.Dialog.alert({
                            title: res.errMsg
                        }).then(() => {
                        });   

                    }
                });
            },
            /**
             * 上传文件
             * */
            uploadImage:function(localIds,index){
                var that = this;
                wx.uploadImage({
                    localId: localIds[index], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function(res) {
                        that.getLocalImgData(localIds,index,res.serverId);
                    },
                    fail: function(res) {
                        vant.Dialog.alert({
                            title:"图片上传失败，请稍后再试"
                        }).then(() => {
                        }); 
                    }
                });
            },
            /* *
             * 获取本地图片地址
             * */
            getLocalImgData:function (localIds,index,serverId){
                var that = this;
                wx.getLocalImgData({
                    localId:localIds[index],
                    success:function(res){
                        var localData = res.localData;
                        if(!localData.startsWith('data:')){
                            localData = 'data:image/png;base64,'+localData;
                        }
                        that.uploadImgLocalIds.push(localData);
                        that.uploadImgServerIds.push(serverId);
                        that.$forceUpdate();
                        if(index < localIds.length-1){
                            index += 1;
                            that.uploadImage(localIds,index);
                        }
                    },fail: function(res) {
                        vant.Dialog.alert({
                            title: "获取本地图片出错!"
                        }).then(() => {
                            
                        });

                    }
                })
            },
            /**
             * 监听文本框输入
             * */
            textareaInput:function(){
                this.inputNum = this.remark.length;
            },
            /**
             * 语音录入
             * */
            showRecorddiv:function () {
                $('.luyinbtn').attr('start', 'yes');
                $('.recodeblock').addClass('showluyin');
                $('.luyinbtn').text('结束说话');
                wx.startRecord();
            },
            startRecord:function () {
                var that = this;
                var hasstart = $('.luyinbtn').attr('start');
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
                            var localId = res.localId;
                            wx.translateVoice({
                                localId: localId,
                                isShowProgressTips: 1,
                                success: function (res) {
                                    var result = res.translateResult;
                                    result = result.substring(0,result.length - 1);
                                    that.remark = that.remark+result;
                                    that.inputNum = that.remark.length;
                                    that.$forceUpdate();
                                }
                            })
                        }
                    });
                }
            },
            /* *
             * 完成任务
             * */
            finishTask:function (taskId,taskStatus) {
                
                if(this.inputNum > this.allNum){
                    vant.Toast("备注内容不能超过"+this.allNum+"字");
                    return;
                }
                var param = {};
                param.taskId = taskId;
                param.remark = this.remark;
                param.imgs = this.uploadImgServerIds;
               
                param.sysNumber = decodeURI(GetQueryString('sysNumber'));
                if(taskStatus == 0 && this.inputNum==0){
                    vant.Toast("请输入备注");
                    return;
                }
                if(taskStatus == 1 && param.imgs.length <1){
                    vant.Toast("请选择图片");
                    return;
                }
    
                var that = this;
                $http(baseUrl.finishTask, true,param, false)
                    .then(res => {
                        var tip = taskStatus == 0 ? "该任务已完成" : "补充图片已完成";
                        vant.Dialog.alert({
                            title: tip
                        }).then(() => {
                            that.inputNum=0;
                            that.remark = "";
                            that.uploadImgServerIds=[];
                            that.uploadImgLocalIds=[];
                            that.tab=that.futurepageId;
                            if (that.futurepageId == '4'){
                                that.getMyTaskList();
                                
                            } else {
                                that.getTaskList(taskStatus);
                            }
                        });
                    })
            },

            /**
             * 复核人审批
             */

            reviewerApprove (taskId, taskStatus) {
                var param = {};
                param.taskId = taskId;
                param.sysNumber = decodeURI(GetQueryString('sysNumber'));
                var that = this;
                $http(baseUrl.reviewerApproveUrl, true,param, false)
                .then(res => {
                    vant.Dialog.alert({
                        title: "复核完成"
                    }).then(() => {
                        that.tab=that.futurepageId;
                        if (that.futurepageId == '4'){
                            that.getMyTaskList();
                        } else {
                            that.getTaskList(taskStatus);
                        }
                    });
                })
            },

            /**
             * 返回
             * */
            back:function(){
                this.tab=this.futurepageId;
            },

            /* *
             * 删除图片
             * */
            deleteImg:function(index){
                this.uploadImgLocalIds.splice(index,1);
                this.uploadImgServerIds.splice(index,1);
            },

            /**
             * 预览图片
             * */
            previewImg:function (img) {
                // var arrayimg = new Array();
                // for (var k = 0; k < this.taskDetail.imgs.length - 1; k++) {
                //     var img = this.taskDetail.imgs[k];
                //     if(img != null && img != ''){
                //         var imgpath = this.oldWxqyPath + this.taskDetail.imgs[k];
                //         arrayimg.push(imgpath);
                //     }
                // }
                // wx.previewImage({
                //     current: arrayimg[index], // 当前显示的图片链接
                //     urls: arrayimg // 需要预览的图片链接列表
                // });
                var imageUrls = new Array();
                imageUrls.push(img);
                vant.ImagePreview(imageUrls);
            },

            /**
             * 格式化日期
             * */
            formatDate:function(date){
                if(date == null || date.length != 8){
                    return date;
                }
                return date.substring(4,6)+"月"+date.substring(6,8)+"日";
            },

            /* *
             * 埋点
             * */
            insertRecord:function () {
                var param = {};
                var that = this;
                param.sysNumber = decodeURI(GetQueryString('sysNumber'));
                $http(baseUrl.insertRecord,true, param, false)
                    .then(res => {
                       console.log(res)
                    })
            },
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
    
        }
    })
}



