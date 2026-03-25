var baseUrl = {
    queryList: base.context + 'credit-market/financial_station_performance/queryMarkingVolume',
    getPowerInfo: 'safetyCheck/getPowerInfo.xa',
    safetyCheckWork: 'safetyCheck/safetyCheckWork.xa',
    submitSafetyCheckWork: 'safetyCheck/submitSafetyCheckWork.xa'
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            /*paging: {
                loading: false,
                finished: false,
                text: '没有更多了',
                page: 1,
                pageSize: 10,
            },*/
            list:[
            ],
            tab:'1',
            monthShow:false,
            dayShow:false,
            maxDate: new Date(),
            currentDate:new Date(),

            day:'',//按日查询 提交
            day1:'',
            month:'',//按月查询 提交

        },
        created(){
        },
        mounted(){
            $("#app").show();
            var bodyHeight = $(window).height();
            var tab = $('.tab').outerHeight();
            var selectDate = $('.selectDate').outerHeight();
            var listScroll = bodyHeight-tab-selectDate-50+'px';

            $('.listScroll').css({'max-height':listScroll});
            var year = new Date().getFullYear();
            var month = new Date().getMonth() + 1;
            var month1 = new Date().getMonth() + 1;
            var date = new Date().getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (date < 10) {
                date = '0' + date;
            }
            this.month = year+'-'+month
            this.day = year+'-'+month+'-'+date

            this.getRole();
            this.onload(year,month1)
        },
        methods:{
            /**
             * 权限判断
             */
            getRole() {
                var that = this;
                let params = {};

                $http(baseUrl.getPowerInfo,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data.includes('1') || res.data.includes('2')){
                                //that.isWork()
                            }else{
                                $.alert("","暂无权限",function () {
                                    WeixinJSBridge.invoke('closeWindow',{},function(res){
                                    });
                                    wx.closeWindow();
                                });
                            }
                        }else{
                            $.alert("",res.retmsg,function () {
                                WeixinJSBridge.invoke('closeWindow',{},function(res){
                                });
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //判断节假日是否上班
            isWork() {
                var that = this;
                let params = {};

                $http(baseUrl.safetyCheckWork,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data=='0'){
                                vant.Dialog.confirm({
                                    title: '请确认今天网点是否营业',
                                    message: "",
                                    confirmButtonText:'营业',
                                    cancelButtonText:'不营业',
                                    confirmButtonColor:'#4675C9'
                                }).then(() => {
                                    that.subIsWork('1')
                                }).catch(() => {
                                    that.subIsWork('0')
                                })
                            }else if(res.data=='2'){
                                $.alert("","今天为非工作日",function () {
                                    wx.closeWindow();
                                    WeixinJSBridge.invoke('closeWindow',{},function(res){
                                    });
                                });
                            }


                        }else{
                            $.alert("",res.retmsg,function () {

                            });
                        }
                    });
            },
            //判断节假日是否上班
            subIsWork(flag) {
                var that = this;
                let params = {};
                params.workStatus = flag
                $http(baseUrl.submitSafetyCheckWork,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(flag=='1'){
                                $.alert("","提交成功，请继续进行安全检查",function () {

                                });
                            }
                        }else{
                            $.alert("",res.retmsg,function () {

                            });
                        }
                    });
            },
            chooseTab(param){
                var that=this;
                that.tab=param;
                that.currentDate=new Date();
                if(param==0){
                    that.monthShow = false;
                    that.dayShow = true;
                }else if(param==1){
                    that.monthShow = true;
                    that.dayShow = false;
                }
            },
            /**
             * 初始化时间格式
             * @param {*} param
             */

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
            chooseDate(value) {
                this.monthShow=false;
                this.dayShow=false;
                this.initDateTimer(value);
            },
            /**
             * 初始化时间格式
             * @param {*} param
             */

            initDateTimer (param) {
                var month = param.getMonth() + 1;
                var month1 = param.getMonth() + 1;
                var date = param.getDate();
                if (month < 10) {
                    month = '0' + month;
                }
                if (date < 10) {
                    date = '0' + date;
                }
                if(this.tab==1){
                    this.day= '';
                    this.month = param.getFullYear() +'-'+ month;
                    this.onload( param.getFullYear(),month1)
                }else{
                    this.month= '';
                    this.day = param.getFullYear() +'-'+month + '-'+date;
                    this.day1 = param.getFullYear() +'/'+month + '/'+date;
                    window.location.href = 'detail.html?time='+this.day1
                }

            },
            onload(year,month) {
                this.list = [];
                var nowMonth = new Date().getMonth()+1;
                var lastday = '';
                if(month == nowMonth){
                    lastday = new Date().getDate()
                }else{
                    lastday = new Date(year,month,0).getDate()
                }
                if (month < 10) {
                    month = '0' + month;
                }
                for(var i=0 ;i<lastday;i++){
                    var day = i+1
                    if (day < 10) {
                        day = '0' + day;
                    }
                    this.list.push({'time':year+'-'+month+'-'+day,'timeJump':year+'/'+month+'/'+day})
                }
                this.list =  this.list.reverse();
            },
            /**
             * 查询条件重置
             */
            reset() {
                let that = this;
                that.list = [];
                /*that.paging.page = 1;
                that.paging.finished = false;
                that.paging.loading = true;*/
            },
            /**
             * 获取当前日期
             */
            getToday(){
                var myDate=new Date();
                var mm=myDate.getMonth()+1;
                var dd=myDate.getDate();
                if(myDate.getMonth()<9){
                    mm="0"+mm;
                }
                if(myDate.getDate()<10){
                    dd="0"+dd;
                }
                return myDate.getFullYear()+'-'+mm+'-'+dd;
            },
            /**
             * 日期加减days天数
             */
            changeDate(date,days,flag){
                if(days==undefined || days ==''){
                    days=1;
                }
                var date=new Date(date);
                if(flag=="add"){
                    date.setDate(Number(date.getDate())+Number(days));
                }else if(flag=="minus"){
                    date.setDate(Number(date.getDate())-Number(days));
                }
                var mm=date.getMonth()+1;
                var dd=date.getDate();
                if(date.getMonth()<9){
                    mm="0"+mm;
                }
                if(date.getDate()<10){
                    dd="0"+dd;
                }
                this.day = date.getFullYear()+''+mm+''+dd ;
                return date.getFullYear()+'年'+mm+'月'+dd +'日';
            },
            jump(item){
                window.location.href = 'detail.html?time='+item.timeJump
            },
            toApply(){
                window.location.href = 'apply.html'
            },
            /**
             * 添加千分位
             */
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
                    console.log(n,'n')
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
    })
}



