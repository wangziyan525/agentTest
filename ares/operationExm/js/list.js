var baseUrl = {
    socreFindList: "examination/socreFindList.xa",
    getPowerInfo: 'safetyCheck/getPowerInfo.xa'
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            userid:'',
            batchId:'',
            nodata:false,
            tabsDataList:[/*{
                title:'广电运通股份有限公司',
                time:'3123123123123123',
                userTime:'2222222222222222',
                status:'0'
            },{
                title:'广电运通股份有限公司1',
                time:'3123123123123123',
                userTime:'3333333333333333',
                status:'1'
            }*/
            ],


        },
        created(){

        },
        mounted(){
            $('#app').show();
            this.batchId = this.getQueryString('batchId');
            this.getList();
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
            jisuan(){
                //计算列表高度
                this.$nextTick(()=>{
                    var bodyHeight = $(window).height();
                    var bottomButton = $('.bottomButton').outerHeight();
                    $('.listScroll').css({'height':bodyHeight-bottomButton-10+'px'});
                })

            },
            getList() {
                var that = this;
                let param = {}
                param.batchId = that.batchId
                $http(baseUrl.socreFindList,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            that.jisuan();
                            if(res.data!='' && res.data!=null && res.data!=undefined){
                                that.nodata = false;
                                that.tabsDataList = res.data
                            }else{
                                that.nodata = true;
                            }
                        }else{
                            $.alert("",res.retmsg,function () {
                                that.nodata = true;
                            });
                        }
                    });
            },
            secondsToMinutes(seconds){
                const minutes = Math.floor(seconds/60);
                const remainingSeconds = seconds%60;
                return `${minutes}分${remainingSeconds}秒`
            },
            jump(item){
                if(item.status=='1'){
                    window.location.href = 'detail.html?batchId='+this.batchId+'&userId='+item.userid
                }else{
                    window.location.href = 'mark.html?batchId='+this.batchId+'&userId='+item.userid
                }

            }
        }
    })
}



