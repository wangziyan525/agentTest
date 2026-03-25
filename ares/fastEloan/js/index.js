function initFun () {
    new Vue({
        el: '#app',
        data: {
            baseUrl: {
                getListUrl: 'kuaiEloan/findList.xa',
                approvalUrl:'kuaiEloan/saveCustomerInfo.xa'
            },
            positionObj: {
                title: '请选择',
                positionShow: false,  //下拉选人
                positionList: [ {text:'职级',val:''},{text:'科级及以下',val:0},
                {text:'处级',val:1},
                {text:'局级及以上',val:2}],
            },
            positionText:'职级',
            statusObj: {
                title: '请选择',
                statusShow: false,  //下拉选人
                statusList: [ {text:'状态',val:''},{text:'已审批',val:'2'},
                {text:'审批中',val:'1'},
                {text:'已驳回',val:'-1'}],
            },
            // 1-审批中；2-已审批；-1-已驳回
            statusText:"状态",
            statusId:'',
            viewFlag:false,
            list:[],
            total:0,

        },
        created () {
           this.getList()
        },
        methods: {
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            // 数据重置
            resetData() {
                window.scrollTo(0, 0);
                this.viewFlag = false;
                this.list = [];
            },
            // 获取列表数据
            getList(){
                var that = this;
                var params = {
                    BsnTp:2,//录入人查询页面
                    AprvSt:that.statusId,
                    Pstn:that.positionText=="职级"?'':that.positionText
                }
                $http(that.baseUrl.getListUrl, true,params, false)
                .then(res => {
                    that.viewFlag = true
                    that.list = res.data
                });
            },
            // 选择状态
            statusConfirm(params){
                this.statusText = params.text;
                this.statusId = params.val;
                this.statusObj.statusShow = false;
                this.resetData();
                this.getList();
            },
            // 选择职位
            positionConfirm(params) {
                this.positionText = params.text;
                this.positionObj.positionShow = false;
                this.resetData();
                this.getList();
            },
            // 删除
            deleteTap(item,index){
                var that = this;
                var params = {
                    AprvlistIfn: [
                        {
                            BsnSeqNum:item.BsnSeqNum,
                            IdentNum:item.IdentNum,
                        }
                    ],
                    BsnTp:2,
                    AprvSt:2  //删除
                }
                $.confirm("", "确认删除该用户？", function () {
                    $http(that.baseUrl.approvalUrl, true,params, false)
                    .then(res => {
                        that.list.splice(index, 1);
                    });
                })
            },
            // 新增白名单
            addCustomerTap(){
               window.location.href = './edit.html?flag=add'
            },
            // 编辑白名单
            editCustomerTap(item) {
                window.location.href = './edit.html?flag=edit&custObj=' + encodeURIComponent(JSON.stringify(item))
            },
            // 跳转详情
            toDetail(item) {
                var obj = {
                    IdentNum: item.IdentNum,
                    ClientNm: item.ClientNm
                }
                window.location.href = './detail.html?customerObj=' + encodeURIComponent(JSON.stringify(obj))+'&viewFlag=0'
            }
        }
    })
};
