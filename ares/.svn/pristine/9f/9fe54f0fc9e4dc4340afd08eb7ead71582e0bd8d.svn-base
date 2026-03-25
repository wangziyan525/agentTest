var baseUrl = {
    getSafetyCheckOrgResultList: 'safetyCheck/getSafetyCheckOrgResultList.xa',
    getPowerInfo: 'safetyCheck/getPowerInfo.xa',
    exportSafetyCheckExcel: 'safetyCheck/exportSafetyCheckExcel.xa'

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
            formData:JSON.parse(localStorage.getItem('UserDetail')),
           
            tab:'1',
            monthShow:false,
            dayShow:false,
            maxDate: new Date(),
            currentDate:new Date(),

            day:'',//按日查询 提交
            day1:'',
            month:'',//按月查询 提交
            month1:''

        },
        created(){
            // $("#app").show();
        },
        mounted(){
            // this.$nextTick(()=>{
            //     this.jisuan();
            // });
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
            this.month = year+'-'+month;
            this.day = year+'-'+month+'-'+date;
            this.month1 = year+'/'+month;
            this.day1 = year+'/'+month+'/'+date;
            // this.getRole();
            // this.onload(year,month1)
        },
        methods:{
         
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
                this.list = [];
                if(this.tab==1){
                    this.day= '';
                    this.month = param.getFullYear() +'-'+ month;
                    this.month1 = param.getFullYear() +'/'+ month;
                    this.onload( param.getFullYear(),month1)
                }else{
                    this.month= '';
                    this.day = param.getFullYear() +'-'+month + '-'+date;
                    this.day1 = param.getFullYear() +'/'+month + '/'+date;
                    this.getOrgData(this.day1)
                }

            },
            /**
             * 查看机构日统计
             */
            getOrgData(time) {
                var that = this;
                let params = {};
                params.date=time;
                $http(baseUrl.getSafetyCheckOrgResultList,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            that.orgList = res.data
                        }else{
                            $.alert("",res.retmsg,function () {

                            });
                        }
                    });
            },
            onload(year,month) {
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
                window.location.href = 'orgList.html?time='+item.timeJump
            },
            
        }
    })
}



