function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'onlineCapital/getOnlineCapitalApprovalList.xa',//列表接口

            active:0,
            searchName:'',
            list:[],
            pagenum:1,//页码
            callbacktest: false, //分页开关
            isHaveList:false,
            noList:false,

            filterTimeText:'近一月',
            filterStatusText:'全部',

            showPickerStatus:false, //状态遮罩层
            chooseList:['全部','审批通过','审批拒绝','等待复核'],


            isshowChooseTime:false, //时间选择遮罩层
            chooseTimeShow:false,  //时间插件
            currentDate: new Date(),
            minDate: null,
            maxDate: new Date(),
            todayTime:'',
            weekTime:'',
            monthTime1:'',
            monthTime3:'',
            monthTime6:'',

            chooseTimeDuan:1, //时间段选择索引 0:一周 1:一月  2:三月  3:六月    
            diyTimeChooseItem:-1,  //手动选择索引
            startTime:'',   //开始时间
            endTime:'',     //结束时间

            dataOver:false, //是否到最底部了


        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {  

            //获取时间段
            this.getTimeDuanStartTimes();

             //获取列表（未审批）
             this.getList();

        },
        methods: {

            //监听元素滚动高度
            handleScroll(){
                var mainH1 = this.$refs.main.scrollTop; //元素滚动高度
                var mainH2 = this.$refs.main.scrollHeight;//元素高度
                var windowH = $(window).height();  //可视
                if (windowH + 50 + mainH1 >= mainH2) {
                    if (this.callbacktest == true) {
                        this.callbacktest = false;
                        this.getList();
                    }
                }
            },

            //初始化分页
            newList(){
                this.list = [];
                this.pagenum = 1;
                this.callbacktest = false; //分页开关
                this.haveList = false;
                this.noList = false;
                this.dataOver = false;
            },

            //顶部tab切换
            changeActive(){
                this.searchName = '';
                this.filterStatusText = '全部';
                this.newList();
                this.getList();
            },

            //搜索
            toSearch(){
                this.newList();
                this.getList();
            },

            //获取列表
            getList(){
                let _this = this;
                let params = {};
                if(_this.active == 0){
                    params.APPROVE_FLAG = 'a';
                    params.START_DATE = '';
                    params.END_DATE = '';
                    params.APPROVE_STAT = '';
                }else{
                    params.APPROVE_FLAG = 'b';
                    params.START_DATE = _this.startTime;
                    params.END_DATE = _this.endTime;
                    if(_this.filterStatusText == '全部'){
                        params.APPROVE_STAT = '';
                    }else if(_this.filterStatusText == '审批通过'){
                        params.APPROVE_STAT = '4';
                    }else if(_this.filterStatusText == '审批拒绝'){
                        params.APPROVE_STAT = '3';
                    }else if(_this.filterStatusText == '等待复核'){
                        params.APPROVE_STAT = '2';
                    }
                };
                params.NEXT_KEY = _this.pagenum + '';
                params.PAGE_SIZE = '10';
                params.CUST_NAME = _this.searchName;
                
                $http(_this.getListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data.LIST){
                                var arr = res.data.LIST;
                                if(arr.length == 0){
                                    if(_this.pagenum == 1){
                                        _this.isHaveList = false;
                                        _this.noList = true;
                                        _this.callbacktest = false;
                                    }else{
                                        // vant.Toast('已经到底了');
                                        _this.dataOver = true;
                                    }
                                }else{
                                    _this.isHaveList = true;
                                    _this.noList = false;
                                    for (let i = 0; i < arr.length; i++) {
                                        _this.list.push(arr[i]);
                                    };
                                    if (arr.length >= 10) {
                                        _this.pagenum++;
                                        _this.callbacktest = true;
                                    } else {
                                        _this.callbacktest = false;
                                        _this.dataOver = true;
                                    };
                                };
                            }else{
                                _this.isHaveList = false;
                                _this.noList = true;
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //--------------------------------------------------------------------- 跳转
            toDetail(TRAN_SEQ){
                window.location.href = './detail.html?TRAN_SEQ=' + TRAN_SEQ;
            },

            //---------------------------------------------------------------------时间筛选
            //获取时间段开始时间
            getTimeDuanStartTimes(){
                //获取一年前的年月日
                this.getLastYear();
                //获取时间段时间
                this.getNow();
                this.getWeekBefore();
                this.getMonthBefore1();
                this.getMonthBefore3();
                this.getMonthBefore6();
                this.changTimeDuan(1);
            },

            //打开时间选择
            showChooseTimeModel(){
                this.isshowChooseTime = true;
            },

            //时间样式处理
            readFilterTime(str){
                if(str.includes('至')){
                    var arr = str.split('至');
                    return `
                        <span>${arr[0]}至</span>
                        </br>
                        <span>${arr[1]}</span>
                    `
                }else {
                    return str;
                }
            },

            //时间格式化
            formatter(type,val) {
                if(type=="year"){
                    return `${val}年`
                }else if(type=="month"){
                    return `${val}月`
                }else if(type=="day"){
                    return `${val}日`
                }
                return val;
            },

            //去筛选时间
            showDiyTime(i){
                this.diyTimeChooseItem = i;
                this.chooseTimeShow = true;
                if(this.diyTimeChooseItem == '1'){
                    var times = this.startTime;
                    if(times == ''){
                        this.currentDate = new Date();
                    }else {
                        var arr = times.split('-');
                        this.currentDate = new Date(arr[0],arr[1]-1,arr[2]);
                    }
                }else if(this.diyTimeChooseItem == '2'){
                    var times = this.endTime;
                    if(times == ''){
                        this.currentDate = new Date();
                    }else {
                        var arr = times.split('-');
                        this.currentDate = new Date(arr[0],arr[1]-1,arr[2]);
                    }
                };
            },

            //插件时间选择确定
            chooseDate(val,index){
                var chooseTime = this.initDateTimer(val);
                if(this.diyTimeChooseItem == '1'){
                    this.startTime = chooseTime;
                }else if(this.diyTimeChooseItem == '2'){
                    this.endTime = chooseTime;
                };
                if(this.startTime !='' && this.endTime !=''){
                    if(this.startTime > this.endTime){
                        vant.Toast('开始时间不能大于截止时间');
                        this.endTime = '';
                    }
                };
                this.chooseTimeShow = false;
                this.isInTimeDuan();
            },

            //是否是在时间段内
            isInTimeDuan(){
                if(this.endTime == this.todayTime){
                    if(this.startTime == this.weekTime){
                        this.chooseTimeDuan = '0';
                    }else if(this.startTime == this.monthTime1){
                        this.chooseTimeDuan = '1';
                    }else if(this.startTime == this.monthTime3){
                        this.chooseTimeDuan = '2';
                    }else if(this.startTime == this.monthTime6){
                        this.chooseTimeDuan = '3';
                    }else{
                        this.chooseTimeDuan = '-1';
                    }
                }else{   
                    this.chooseTimeDuan = '-1';
                }
            },

            //时间格式化
            initDateTimer (param) {
                var month = param.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }
                var day = param.getDate();
                if (day < 10) {
                    day = '0' + day;
                }
                return param.getFullYear() + '-' + month + '-' + day;
            },

            //时间段选择
            changTimeDuan(i){
                this.chooseTimeDuan = i;
                this.endTime = this.todayTime;
                if(i == 0){
                    this.startTime = this.weekTime;
                }else if(i == 1){
                    this.startTime = this.monthTime1;
                }else if(i == 2){
                    this.startTime = this.monthTime3;
                }else if(i == 3){
                    this.startTime = this.monthTime6;
                }
            },

            //重置
            searchAgin(){
                this.chooseTimeDuan = 1;
                this.changTimeDuan(1);
            },

            //时间选好后确定
            filterTimeSearch(){
                if(this.chooseTimeDuan == '0'){
                    this.filterTimeText = '近一周';
                }else if(this.chooseTimeDuan == '1'){
                    this.filterTimeText = '近一月';
                }else if(this.chooseTimeDuan == '2'){
                    this.filterTimeText = '近三月';
                }else if(this.chooseTimeDuan == '3'){
                    this.filterTimeText = '近半年';
                }else{
                    this.filterTimeText = this.startTime + ' 至 ' + this.endTime;
                };
                this.isshowChooseTime = false;
                this.newList();
                this.getList();
            },

            //--------------------------------------------------------------------- 状态筛选

            //下拉选择打开
            showChooseStatusModel(){
                this.showPickerStatus = true;
            },

            //下拉选择确定
            onConfirm(v,i){
                this.filterStatusText = v;
                this.showPickerStatus = false;
                this.newList();
                this.getList();
            },

            //------------------------------------------------------------------------------日期阶段
            //获取当前时间
            getNow(){
                //今天的日期
                let date=new Date;
                let year=date.getFullYear();
                let month=date.getMonth()+1;
                let day=date.getDate();
                month =(month<10 ? '0'+month:month);
                day =(day<10 ? '0'+day:day);
                this.todayTime = year.toString()+'-'+month.toString()+'-'+day.toString();
            },

            //获取前一周时间
            getWeekBefore(){
                let time = (new Date).getTime() - 7*24*60*60*1000;
                let yesday = new Date(time);
                let year=yesday.getFullYear();
                let month=yesday.getMonth()+1;
                let day=yesday.getDate();
                month =(month<10 ? '0'+month:month);
                day =(day<10 ? '0'+day:day);
                this.weekTime = (year.toString()+'-'+month.toString()+'-'+day.toString());
            },

            //获取前一月时间
            getMonthBefore1(){
                let end = new Date();
                let year = end.getFullYear();
                let month = end.getMonth() + 1;
                let day = end.getDate();
                let dateObj = {};
                dateObj.end  = year + '-' + (month >= 1 && month <= 9 ?'0': '') + month + '-' + (day >= 0 && day <= 9 ?'0':'') + day;
                let endMonthDay = new Date(year,month,0).getDate();  //当前月份的总天数
                if(month - 1 <= 0){
                    //如果是1月 ，年数往前推一年
                    dateObj.strat = year-1 + '-' + 12 + '-' + (day >=0 && day <=9 ?'0':'') + day;
                }else {
                    let startMonthDay = new Date(year,parseInt(month)-1,0).getDate();
                    //1个月前所在的天数小于现在的天日期
                    if(startMonthDay < day){
                        //当前日期小于当前总月数
                        if(day < endMonthDay){
                            dateObj.strat = year + '-' + (month-1 >= 1 && month-1 <= 9?'0':'') + (month-1) + '-' +
                                (startMonthDay - (endMonthDay -day) >= 1 && startMonthDay - (endMonthDay -day) <= 9?'0':'') + (startMonthDay - (endMonthDay -day));
                        }else {
                            dateObj.strat = year + '-' + (month-1 >= 1 && month-1 <= 9?'0':'') + (month-1) + '-' + (startMonthDay >= 0 && startMonthDay <= 9?'0':'') + startMonthDay;
                        }

                    }else {
                        dateObj.strat = year + '-' + (month-1 >= 1 && month-1 <= 9?'0':'') + (month-1) + '-' + (day >=0 && day <=9 ?'0':'') + day;
                    }
                }
                this.monthTime1 = dateObj.strat;
            },

            //获取前三月时间
            getMonthBefore3(){
                let end = new Date();
                let year = end.getFullYear();
                let month = end.getMonth() + 1;
                let day = end.getDate();
                let dateObj = {};
                dateObj.end  = year + '-' + (month >= 1 && month <= 9 ?'0': '') + month + '-' + (day >= 0 && day <= 9 ?'0':'') + day;
                let endMonthDay = new Date(year,month,0).getDate();  //当前月份的总天数
                if(month - 3 <= 0){
                    //如果是1，2，3月 ，年数往前推一年
                    let startMonthDay = new Date(year-1,12-(3-parseInt(month)),0).getDate();
                    if(startMonthDay < day){
                        //3个月前所在月的总台念书小于现在的天日期
                        dateObj.strat = year-1 + '-' + (12-(3-month)>=1 && 12-(3-month)<=9?'0':'')+(12-(3-month))+'-'+ (startMonthDay>=0 && startMonthDay<=9?'0':'')+startMonthDay;
                    }else {
                        dateObj.strat = year-1+'-'+(12-(3-month)>=1 && 12-(3-month)<=9?'0':'')+(12-(3-month))+'-'+(day>=0 && day<=9?'0':'')+ day;
                    }
                }else {
                    let startMonthDay = new Date(year,parseInt(month)-3,0).getDate();
                    if(startMonthDay < day){
                        //3个月前所在的总天数小于现在的天数
                        if(day < endMonthDay){
                            //当前天日期小于当月总数天数，2月份比较特殊的月份
                            dateObj.strat = year+'-'+(month-3>=1 && month-3<=9?'0':'')+(month-3)+'-'+
                                (startMonthDay -(endMonthDay-day)>=1 && startMonthDay-(endMonthDay-day)<=9?'0':'')+(startMonthDay-(endMonthDay-day));
                        }else {
                            dateObj.strat = year+'-'+(month-3>=1&&month-3<=9?'0':'')+(month-3)+'-'+
                                (startMonthDay>=0 && startMonthDay<=9?'0':'')+startMonthDay;
                        }
                    }else {
                        dateObj.strat = year + '-' + (month -3>= 1 && month-3 <=9?'0':'')+(month-3) + '-' + (day>=0 && day<=9?'0':'')+day;
                    }
                }
                this.monthTime3 = dateObj.strat;
            },

            //获取前六月时间
            getMonthBefore6(){
                let end = new Date();
                let year = end.getFullYear();
                let month = end.getMonth() + 1;
                let day = end.getDate();
                let dateObj = {};
                dateObj.end  = year + '-' + (month >= 1 && month <= 9 ?'0': '') + month + '-' + (day >= 0 && day <= 9 ?'0':'') + day;
                let endMonthDay = new Date(year,month,0).getDate();  //当前月份的总天数
                if(month - 6 <= 0){
                    //如果是1，2，3，4，5，6月 ，年数往前推一年
                    let startMonthDay = new Date(year-1,12-(6-parseInt(month)),0).getDate();
                    if(startMonthDay < day){
                        //3个月前所在月的总台念书小于现在的天日期
                        dateObj.strat = year-1 + '-' + (12-(6-month)>=1 && 12-(6-month)<=9?'0':'')+(12-(6-month))+'-'+ (startMonthDay>=0 && startMonthDay<=9?'0':'')+startMonthDay;
                    }else {
                        dateObj.strat = year-1+'-'+(12-(6-month)>=1 && 12-(6-month)<=9?'0':'')+(12-(6-month))+'-'+(day>=0 && day<=9?'0':'')+ day;
                    }
                }else {
                    let startMonthDay = new Date(year,parseInt(month)-6,0).getDate();
                    if(startMonthDay < day){
                        //3个月前所在的总天数小于现在的天数
                        if(day < endMonthDay){
                            //当前天日期小于当月总数天数，2月份比较特殊的月份
                            dateObj.strat = year+'-'+(month-6>=1 && month-6<=9?'0':'')+(month-6)+'-'+
                                (startMonthDay -(endMonthDay-day)>=1 && startMonthDay-(endMonthDay-day)<=9?'0':'')+(startMonthDay-(endMonthDay-day));
                        }else {
                            dateObj.strat = year+'-'+(month-6>=1&&month-6<=9?'0':'')+(month-6)+'-'+
                                (startMonthDay>=0 && startMonthDay<=9?'0':'')+startMonthDay;
                        }
                    }else {
                        dateObj.strat = year + '-' + (month -6>= 1 && month-6 <=9?'0':'')+(month-6) + '-' + (day>=0 && day<=9?'0':'')+day;
                    }
                }
                this.monthTime6 = dateObj.strat;
            },

            //获取前一年时间
            getLastYear(){
                let end = new Date();
                let year = end.getFullYear();
                let month = end.getMonth() + 1;
                let day = end.getDate();
                let dateObj = {};
                dateObj.end  = year + '-' + (month >= 1 && month <= 9 ?'0': '') + month + '-' + (day >= 0 && day <= 9 ?'0':'') + day;
                let endMonthDay = new Date(year,month,0).getDate();  //当前月份的总天数
                let startMonthDay = new Date(year-1,parseInt(month),0).getDate(); //上一年这个月的总天数
                if(startMonthDay < day){
                    //1个年前所在月的总台念书小于现在的天日期
                    dateObj.strat = year-1 + '-' + (month>=1 && month<=9?'0':'')+month+'-'+ (startMonthDay>=0 && startMonthDay<=9?'0':'')+startMonthDay;
                }else {
                    dateObj.strat = year-1 + '-' + (month>=1 && month<=9?'0':'')+month+'-'+ (day>=0 && day<=9?'0':'')+ day;
                }
                let minArr = dateObj.strat.split('-');
                this.minDate = new Date(minArr[0],minArr[1]-1,minArr[2]);
            },

            //产品状态
            readTranStatus(str){
                switch (str) {
                    case '1':return '交易提交,待发送';
                    case '10':return '交易未知';
                    case '11':return '银行处理中';
                    case '12':return '处理中';
                    case '13':return '认证增强';
                    case '14':return '交易通过,待发送';
                    case '16':return '银行落地处理中,请联系开户行';
                    case '3':return '银行已受理';
                    case '4':return '交易成功';
                    case '5':return '交易失败';
                    case '6':return '银行落地处理中,请联系开户行';
                    case '7':return '交易被拒绝';
                    case '8':return '部分成功';
                    case '9':return '落地作废';
                    default:break;
                }
            },

            //添加千分位
            numFormat(n) {
                //将数字转化为字符串
                if(n == '' || n==undefined){
                    return '';
                }else{
                    let num = n.toString();
                    let isFu = false;
                    if (num < 0) {
                        isFu = true;
                        num = num.replace(/-/g, '');
                    }
                    //判断小数点截取小数点后面的数字
                    let after = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : '';
                    //如果存在小数点
                    let numArr = num.indexOf('.') > 0 ? num.substring(0, num.indexOf('.')).split('') : num.split('');
                    var str = '';//字符串累加
                    for (var i = numArr.length - 1, j = 1; i >= 0; i--, j++) {
                        if (j % 3 == 0 && i != 0) {//每隔三位加逗号，过滤正好在第一个数字的情况
                            str += numArr[i] + ",";//加千分位逗号
                            continue;
                        }
                        str += numArr[i];//倒着累加数字
                    }
                    if (isFu) {
                        return '-' + str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串

                    } else {
                        return str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串
                    }
                }
            },


        }
    });

}

