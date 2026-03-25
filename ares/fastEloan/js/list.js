function initFun() {
    new Vue({
        el: '#app',
        data: {
            baseUrl: {
                getListUrl: 'kuaiEloan/findList.xa',
                peopleUrl: 'kuaiEloan/findApproveUser.xa',
                approvalUrl: 'kuaiEloan/saveCustomerInfo.xa',
            },
            viewFlag: false,
            tabs: [{ text: '待审批', id: "1" }, { text: '已审批', id: "2" }],
            status:1,
            tabIndex: 0,
            list: [],
            disagreeFlag: false,
            disagreeVal: '',
            peopleObj: {
                title: '请选择',
                peopleShow: false,  //下拉选人
                peopleList: [],
            },
            peopleText: '',
            peopleVal:'',
            checkedList:[],
            checkAllFlag:false,
            detail:"",
            approvalRecord: []
        },
        created() {
            if(sessionStorage.getItem('tabIndex')){
                this.tabIndex = sessionStorage.getItem('tabIndex')?sessionStorage.getItem('tabIndex'):0;
                sessionStorage.removeItem('tabIndex')
                if(this.tabIndex==1){
                    this.status = 2
                }
            }
            this.getList();
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
                this.checkAllFlag = false;
                this.checkedList = [];
                this.list = [];
            },
            // 获取列表数据
            getList() {
                var that = this;
                var params = {
                    AprvSt:that.status,
                    BsnTp:1//审批列表
                }
                $http(that.baseUrl.getListUrl, true,params, false)
                    .then(res => {
                        that.viewFlag = true;
                        console.log(res,'----')
                        if (res.data.length > 0) {
                            res.data.map((v,i)=>{
                                v['check'] = false
                            });
                        }
                        that.list = res.data;
                        that.getUserList();
                    });
            },
            tabTap(index, id) {
                this.tabIndex = index;
                this.status = id;
                this.resetData();
                this.getList();
            },
            // 全选
            selectAllTap() {
                let that = this;
                that.checkedList = [];
                let allFlag = that.checkAllFlag;
                if (allFlag) {
                    that.checkAllFlag = false;
                    that.checkText = '全选';
                    that.list.map((v, i) => {
                        v.check = false;
                    })
                } else {
                    that.checkAllFlag = true;
                    that.checkText = '取消全选';
                    that.list.map((v, i) => {
                        v.check = true;
                        var obj = { BsnSeqNum: v.BsnSeqNum, IdentNum: v.IdentNum,
                             ClientNm: v.ClientNm, UtNm: v.UtNm,Pstn:v.Pstn,AprvNodeId:v.CurAprvNodeId }
                        that.checkedList.push(obj);
                    })
                }
                console.log(that.checkedList)
            },
            // 多选
            selectTap(index) {
                let that = this;
                that.list[index].check = !that.list[index].check;
                that.watchSelect()
            },
            // 检测选择数量
            watchSelect() {
                let that = this;
                let list = that.list;
                let checkedList = [];
                for (var i = 0; i < list.length; i++) {
                    if (list[i].check) {
                        var obj = { BsnSeqNum: list[i].BsnSeqNum, IdentNum: list[i].IdentNum,
                            ClientNm:list[i].ClientNm, UtNm:list[i].UtNm,Pstn:list[i].Pstn,AprvNodeId:list[i].CurAprvNodeId}
                        checkedList.push(obj)
                    };
                    if (list.length == checkedList.length) {
                        that.checkAllFlag = true;
                        that.checkText = '取消全选';
                    } else {
                        that.checkAllFlag = false;
                        that.checkText = '全选';
                    }
                    that.checkedList = checkedList
                }
                console.log(that.checkedList)
            },
            // 审核
            approvalTap(){
                var that = this;
                if(that.checkedList.length==0){
                    $.alert('','至少选择一个客户');
                    return false;
                }
                var params = {
                    AprvlistIfn:that.checkedList,
                    AprvNodeId:that.checkedList[0].AprvNodeId,
                    BsnTp:2,
                    AprvSt:1,//0-驳回，1-同意，
                }
                if(that.checkedList[0].AprvNodeId!=6){
                    params['NxtNodeAprvManId'] = that.peopleVal;
                    params['NxtNodeAprvManNm'] = that.peopleText;
                    title = ''
                }
                $.confirm("", "审核并提交所选客户及信息 ？", function () {
                    sessionStorage.setItem('tabIndex',1)
                    $http(that.baseUrl.approvalUrl, true, params, false)
                    .then(res => {
                        window.location.replace('./finished.html?flag=1')
                    });
                })
               
            },
            // 驳回
            disagreeShowTap(){
                var that = this;
                if(that.checkedList.length==0){
                    $.alert('','至少选择一个客户');
                    return false;
                }
                that.disagreeFlag = true;
            },
            disagreeTap() {
                var that = this;
                if(that.checkedList.length==0){
                    $.alert('','至少选择一个客户');
                    return false;
                }
                if (that.disagreeVal == "") {
                    $.toast("请先填写驳回意见", "text");
                    return false;
                }
                that.disagreeFlag = false;
                var params = {
                    AprvlistIfn:that.checkedList,
                    AprvNodeId:that.checkedList[0].AprvNodeId,
                    BsnTp:2,
                    AprvSt:0,//0-驳回，1-同意，
                    AprvRsn:that.disagreeVal
                }
                $.confirm("", "确认驳回？", function () {
                    sessionStorage.setItem('tabIndex',1)
                    $http(that.baseUrl.approvalUrl, true, params, false)
                    .then(res => { 
                        window.location.replace('./finished.html?flag=0')
                    });
                })  
            },
            // 审批人选择并提交
            // 审核人列表
            getUserList() {
                let that = this;
                var params = {
                    AprvNodeId:that.list[0].CurAprvNodeId
                }
                $http(that.baseUrl.peopleUrl, true, params, false)
                    .then(res => {
                        var propleList = this.handleType(res.data.Data);
                        that.peopleObj.peopleList = propleList;
                    });
            },
            handleType(param) {
                let list = param;
                param.map((val, index) => {
                    val['text'] = val.AprvManNm;
                    val['val'] = val.AprvManId
                })
                return list;
            },
            peopleShowTap() {
                if(this.checkedList.length==0){
                    $.alert('','至少选择一个客户');
                    return false;
                } 
                if(this.checkedList[0].AprvNodeId==6){
                    this.approvalTap();
                }else{
                    this.peopleObj.peopleShow = true;
                }
            },
            peopleConfirm(params) {
                this.peopleText = params.text;
                this.peopleVal = params.val;
                this.peopleObj.peopleShow = false;
                this.approvalTap();
            },
            // 跳转详情
            toDetail(item){
                sessionStorage.setItem('tabIndex',this.tabIndex)
                var obj = {
                    IdentNum:item.IdentNum,
                    ClientNm:item.ClientNm
                }
                window.location.href = './detail.html?customerObj=' + encodeURIComponent(JSON.stringify(obj))+'&viewFlag=1'
            }
        }
    })
};
