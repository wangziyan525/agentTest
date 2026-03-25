var baseUrl = {
    queryList: "xczxcustacqu/xczxCustacquMyDataList.xa",
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            tab:'0',
            nodata:false,
            tabsDataList:[
            ],
            pageNum: 1,
            pageSize: 10,
            moreStatus: false,
            noMoreStatus: false,
            show:false,
            entpname:''
        },
        created(){

        },
        mounted(){
            $('#app').show();
            if(this.GetQueryStrings('tab')){
                this.tab = this.GetQueryStrings('tab');
            }else{
                this.tab = '0';
            }

            this.getList();
        },
        methods:{
            jisuan(){
                //计算列表高度
                this.$nextTick(()=>{
                    var bodyHeight = $(window).height();
                    var topDiv = $('.topDiv').outerHeight();
                    $('.listScroll').css({'height':bodyHeight-topDiv-10+'px'});
                })

            },
            search(){
                var that=this;
                that.pageNum = 1;
                that.tabsDataList = [];
                that.getList();
            },
            chooseTab(param){
                var that=this;
                that.tab=param;
                that.pageNum = 1;
                that.entpname = '';
                that.tabsDataList = [];
                that.getList();
            },
            addMore(){
                this.getList();
            },
            getList() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                let param = {
                    pageNum: that.pageNum,
                    pageSize: that.pageSize,
                    datastatus:that.tab,
                    entpname:that.entpname
                }
                $http(baseUrl.queryList,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            that.jisuan();
                            if(res.data!='' && res.data!=null && res.data!=undefined){
                                that.nodata = false;

                                if(res.data.length<that.pageSize){
                                    that.noMoreStatus = true;
                                    that.moreStatus = false;
                                }else{
                                    that.noMoreStatus = false;
                                    that.moreStatus = true;
                                    that.pageNum++;
                                }
                                var newDataList = [];
                                var dataList=res.data;

                                newDataList = dataList ? dataList : [];
                                that.tabsDataList = that.tabsDataList.concat(newDataList);
                            }else{
                                if(that.pageNum>1){
                                    that.noMoreStatus = true;
                                    that.moreStatus = false;
                                    that.nodata = false;
                                }else{
                                    that.noMoreStatus = false;
                                    that.moreStatus = false;
                                    that.nodata = true;
                                }

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
            // 拨打电话
            callTap(tel){
                if(tel!='' && tel!=undefined){
                    window.location.href = 'tel:' + tel;
                }
            },
            // 敏感信息脱敏
            desensitizeIdNo(str, start, end) {
                if (!str && (start + end) >= str.length) {
                    return '';
                }
                let text1 = str.substring(0, start);
                let text3 = str.substring(end, str.length);
                let text2 = '';
                for (let i = 0; i < end - start; i++) {
                    text2 += "*";
                };
                return text1 + text2 + text3;
            },
            jump(id){
                window.location.href = 'detail.html?applyid='+id+'&tab='+this.tab

            },
            GetQueryStrings(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
        }
    })
}



