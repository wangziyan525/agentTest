var baseUrl = {
    getSafetyCheckOrganList: 'safetyCheck/getSafetyCheckOrganList.xa',
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            time:'',
            /*paging: {
                loading: false,
                finished: false,
                text: '没有更多了',
                page: 1,
                pageSize: 10,
            },*/

            list:[],


        },
        created(){
        },
        mounted(){
            $("#app").show();

            var bodyHeight = $(window).height();
            var listScroll = bodyHeight-10+'px';

            $('.listScroll').css({'max-height':listScroll});
            this.time = this.getQueryString('time');
            this.getSafetyCheckOrganList()
        },
        methods:{
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            /**
             * 获取机构列表
             */
            getSafetyCheckOrganList() {
                var that = this;
                let params = {};

                $http(baseUrl.getSafetyCheckOrganList,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            that.list = res.data
                        }else{
                            $.alert("",res.retmsg,function () {
                                wx.closeWindow();
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
                    this.list.push({'time':year+'-'+month+'-'+day})
                }
            },
            jump(item){
                window.location.href = 'detail.html?buDescr='+item.buDescr+'&dfFlag=1'+'&ssbm='+item.ssbm+'&time='+this.time
            },
        }
    })
}



