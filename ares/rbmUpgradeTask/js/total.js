var baseUrl = {
    queryTaskNameUrl: 'rmbUpgradeTask/NoAuthUser/getTaskType.xa',
    queryTaskReportUrl: 'rmbUpgradeTask/NoAuthUser/getTaskReport.xa',
    ttsUrl: 'rmbUpgradeTask/NoAuthUser/tts.xa',
}
var vm
function initFun() {
    vm = new Vue({
        el:"#app",
        data:{
            report:{
                allTaskNum:0,//总任务数
                finishTaskNum:0,//已完成任务书
                allProcess:0,// 总进度
                process_bar:{
                    width:'0%'
                }
            },
            TaskName:[],
            TaskList:[],
            countdown:10,  //倒计时
          
           
    
        },
        created(){
            this.queryTaskName();
            this.toCountdown();
          
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
                            that.queryTaskName();
                        },1000)
                    }else{
                        that.countdown --
                    }
                },1000);
            },
            async queryTaskName(){
                var that=this;
                var param={};
                param.sysNumber = decodeURI(GetQueryString('sysNumber'));
                const res2 = await $http(baseUrl.queryTaskNameUrl, true,param, false);
                let list = res2.data;
                that.TaskName=list;
                if(list && list.length>0){
                    that.getTaskReport();
                }
                
            },
            async getTaskReport(){
                var that=this;
                var param={};
                param.sysNumber = decodeURI(GetQueryString('sysNumber'));
                const res2 = await $http(baseUrl.queryTaskReportUrl, true,param, false);
                let list = res2.data.list;
               
                var TaskList=[];
                if(list && list.length>0){
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
                        TaskList[i]=opt;
                    }
                };
                that.TaskList=TaskList;
                
                that.$forceUpdate();

                setTimeout(function(){
                    //获取总数和已完成数
                    var allTaskNum=0;//总任务数
                    var finishTaskNum=0;//已完成任务数
                    var allProcess=0;//进度
                    for(var k=0;k<TaskList.length;k++){
                        allTaskNum+=TaskList[k].taskUnNum+TaskList[k].taskNum;
                        finishTaskNum+=+TaskList[k].taskNum;
                        
                        
                        allProcess+=parseInt(TaskList[k].processNum);

                        if(TaskList[k].processNum==100){
                            that.getCharts(TaskList[k].id,TaskList[k].processNum,'#0CF06C','#08EDB1');
                        }else{
                            that.getCharts(TaskList[k].id,TaskList[k].processNum,'#0CC4F0','#08EDD5');
                        }
                        
                    }
                    that.report.allTaskNum = allTaskNum;
                    that.report.finishTaskNum =finishTaskNum;

                    allProcess=(allProcess/TaskList.length).toFixed(2);
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
                            radius: ['60%', '85%'],
                            avoidLabelOverlap: false,
                            silent:"true",
                            label: {
                                show: true,
                                position: 'center',
                                color: '#fff',
                                fontSize:'12',
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
                                                c1: '#021d32',  //实践
                                                c2: '#021d32'
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
            
    
        }
    })
}





