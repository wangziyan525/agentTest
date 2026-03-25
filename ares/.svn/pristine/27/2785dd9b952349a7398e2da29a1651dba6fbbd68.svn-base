var baseUrl = {
    queryList: "safetyCheck/handoverList.xa",
    getPowerInfo: 'safetyCheck/getPowerInfo.xa'
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            nodata:false,
            tabsDataList:[/*{
                customer:'广电运通股份有限公司',
                createTime:'3123123123123123',
                status:'1'
            },{
                customer:'广电运通股份有限公司1',
                createTime:'3123123123123123',
                status:'2'
            }*/
            ],


        },
        created(){

        },
        mounted(){
            $('#app').show();
            this.getRole();
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
                                that.getList();
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
                $http(baseUrl.queryList,true,param, true)
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
            jump(){
                window.location.href = 'selectPerson.html'
            }
        }
    })
}



