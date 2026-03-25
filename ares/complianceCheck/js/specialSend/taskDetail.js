var baseUrl = {
    getDetail: 'retailsalescheck/specialInspectionDetail.xa',//查询详情
    getList: 'retailsalescheck/specialInspectionFinishDetail.xa',//完成情况
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            tab:'1',
            detail:{},
            list:[],
            searchWord:{
                name:"",
                nametxt:'',
                startTime:"",
                endTime:"",
            },
            isBaseFlag:true,
            id:''
        },
        created(){
            var that=this;
            this.id=GetQueryString("id");
            that.getDetail();
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            jisuan(){
                //计算列表高度
                this.$nextTick(()=>{
                    var bodyHeight = $(window).height();
                    var topDiv = $('.topDiv').outerHeight();
                    var title = $('.title').outerHeight();
                    $('.listScroll').css({'height':bodyHeight-topDiv-title-10+'px'});
                    $('.taskDetailDiv').css({'height':bodyHeight-topDiv-10+'px'});
                })

            },
            chooseTab(param){
                var that=this;
                that.tab=param;
                if(param=='1'){
                    that.isBaseFlag = true
                    that.getDetail();
                }else{
                    that.isBaseFlag = false
                    that.list=[];
                    that.getList()
                }

            },
            
            /**
             * 查询详情
             */
            getDetail(){
                var that=this;
                var param={};
                param.id=GetQueryString("id");
                $http(baseUrl.getDetail, true,param, true)
                    .then(res => {
                        if (res.retcode == 'success'){
                            that.detail = res.data
                            $('.contentLine').css({'height':'auto'});
                        }else{
                            $.alert("",res.retmsg,function () {

                            });
                        }
                    });

            },
            getList() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                var param={};
                param.id=GetQueryString("id");
                $http(baseUrl.getList,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            that.jisuan();
                            if(res.data!='' && res.data!=null && res.data!=undefined){
                                that.nodata = false;
                                that.list = res.data.result
                            }else{
                                that.nodata = true;
                            }
                        }else if (res.retcode == 'user.no.permission') {
                            $.alert('', res.retmsg, function () {
                                wx.closeWindow();
                            })
                        }else{
                            $.alert("",res.retmsg,function () {
                                that.nodata = true;
                            });
                        }
                    });
            },

        }
    })
}





