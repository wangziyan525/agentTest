var baseUrl = {
    queryList: "exemptionApply/applyExemptionList.xa",
    //getPowerInfo: 'safetyCheck/getPowerInfo.xa'
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
            tab:'0',
            pageNum: 1,
            pageSize: 10,
            moreStatus: false,
            noMoreStatus: false,
            keywords:'',
            emptyFlag:false,
            popupBottomShow1: false,
            popupObject1: {
                columns: [{text: '全部', val: ''},{text: '关闭', val: '1'},{text: '开启', val: '2'}],
                title: '优免状态',
            },
            ymType:'',
            ymTypeText:'全部'
        },
        created(){

        },
        mounted(){
            $('#app').show();
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
            checkNum(){
                this.$nextTick(()=>{
                    if(this.keywords.length>0){
                        this.emptyFlag=true
                    }else{
                        this.emptyFlag=false
                    }
                })
            },
            chooseTab(param){
                var that=this;
                that.tab=param;
                if(that.tab=='2'){
                    that.popupObject1.columns = [{text: '全部', val: ''},{text: '开启', val: '1'},{text: '关闭', val: '2'}]
                }else{
                    that.popupObject1.columns = [{text: '全部', val: ''},{text: '关闭', val: '1'},{text: '开启', val: '2'}]
                }
                this.tabsDataList = [];
                this.keywords = '';
                this.ymType='';
                this.ymTypeText='全部';
                this.pageNum = 1;
                this.getList();

            },
            showTap(num) {
                this.type = num;
                this['popupBottomShow' + num] = true;
            },
            closeOverlayBindtap() {
                let num = this.type;
                this['popupBottomShow' + num] = false;
            },
            onConfirm(param) {
                let num = this.type;
                this['popupBottomShow' + num] = false;
                if(num==1){
                    this.ymTypeText = param.text;
                    this.ymType = param.val;
                    this.tabsDataList = [];
                    this.pageNum = 1;
                    this.getList();
                }

            },
            search () {
                this.tabsDataList = [];
                this.pageNum = 1;
                this.getList()
            },
            empty (){
                this.keywords = '';
                this.emptyFlag=false;
                this.tabsDataList = [];
                this.pageNum = 1;
                this.getList()
            },
            addMore(){
                this.getList();
            },
            getList() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                let param = {
                    page: that.pageNum,
                    limit: that.pageSize,
                    search: that.keywords,
                    business_source:'1',
                    status:that.tab,
                    type:that.ymType
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
                        }else{
                            $.alert("",res.retmsg,function () {
                                that.nodata = true;
                            });
                        }
                    });
            },
            jump(item){
                if(this.tab=='0' || this.tab=='3'){
                    window.location.href = 'apply.html?mch_code='+item.mch_code+'&tab='+this.tab+'&id='+item.id
                }else{
                    window.location.href = 'detail.html?mch_code='+item.mch_code+'&tab='+this.tab+'&id='+item.id
                }

            }
        }
    })
}



