function action() {
    new Vue({
        el: "#app",
        data: {
            detailUrl:'earlyRepayment/getDetail.xa',//详情基本信息
            userListUrl:"earlyRepayment/selectUsers.xa",//审核人员列表
            approvalRecordUrl:'earlyRepayment/selectCirculation.xa', //审批记录
            approvalUrl:'earlyRepayment/approve.xa',//审批
            id:'',
            detail:'',
            approvalRecord:[],
            approval_people: "",//审批人名称
            approval_people_no:"",//审批人员工编号
            approval_people_org:'',//审批人机构号
            approval_user_no:"",//审批人用户号
            popupObj: {
                title: '请选择审批人',
                showPickerPeople: false,  //下拉选人
                choosePeopleList: [],
            },
            approve: [
                { img: './image/check.png', text: '拒绝', checked:false,status:'2'},
                { img: './image/checked.png', text: '通过', checked:true,status:'1' }
            ],
            approveId:'1',
            disagreeVal: '',//拒绝原因
            successFlag:false
        },
        created: function () {
            this.id = getQueryString('id')?getQueryString('id'):'';
            this.getDetail();
            this.getApprovalRecord();
        },
        mounted: function () {
        },
        methods: {
            // 详情数据
            getDetail(){
                let that = this;
                var params = {
                    id:that.id
                }
                $http(that.detailUrl, true, params,true)
                .then(res => {
                    if(res.retcode=="success"){
                        that.detail = res.data;
                        if((that.detail.role==1||that.detail.role==2)&&that.detail.status==0){
                             that.getUserList()
                        }
                    }else if(res.retcode==-2){
                        wx.ready(function () {
                            wx.closeWindow();
                        });
                    }else{
                        $.alert("",res.retmsg);
                    }
                });
            },
            // 审核记录
            getApprovalRecord(){
                let that = this;
                var params = {
                    id:that.id
                }
                $http(that.approvalRecordUrl, true, params,false)
                .then(res => {
                    that.approvalRecord = res.data;
                });
            },
            // 审核人列表
            getUserList(){
                let that = this;
                var params = {
                    id:that.id
                }
                $http(that.userListUrl, true, params,false)
                .then(res => {
                    var propleList = this.handleType(res.data.NEXT_AUTH_LIST);
                    that.popupObj.choosePeopleList = propleList;
                });
            },
            handleType(param) {
                let list = param;
                param.map((val, index) => {
                    val['text']=val.AUTH_NAME;
                    val['val']=val.AUTH_NO
                })
                return list;
            },
            choosePickerPeople() {
                this.popupObj.showPickerPeople = true;
            },
            onPeopleConfirm(param) {
                this.approval_people = param.text;
                this.approval_people_no = param.AUTH_NO;
                this.approval_people_org = param.AUTH_ORG;
                this.approval_user_no = param.AUTH_USER_NO;
                this.popupObj.showPickerPeople = false;
            },
            // 审批选择
            approveTap(index) {
                var that = this;
                var list = that.approve;
                var checked = list[index].checked;
                that.approveId = list[index].status;
                that.disagreeVal = "";
                if (checked) { return; }
                list.map((val, i) => {
                    val.checked = false;
                    val.img = './image/check.png'
                })
                list[index].checked = true;
                list[index].img = './image/checked.png';
            },
            // 提交审批
            submitTap(){
                var that = this;
                if(that.approveId==2){
                    if(that.disagreeVal==""){
                        $.alert('',"请输入拒绝原因");
                        return;
                    }else if(that.disagreeVal.length>30){
                        $.alert('',"拒绝原因不能超过三十个字");
                        return;
                    }
                    that.approval_people = "";
                    that.approval_people_no = "";
                    that.approval_people_org = "";
                    that.approval_user_no = ""
                } 
                if((that.detail.role==1||that.detail.role==2)&&that.approval_people_no==""&&that.approveId==1){
                    $.alert('',"请选择下一审批人");
                    return;
                }
                var title = that.approveId==1?"确认审批通过？":'确认审批拒绝?';
                $.confirm("", title, function () {
                    var params = {
                        "id":that.id,
                        "status":that.approveId,
                        "NEXT_AUTH_AUTH_NAME":that.approval_people,
                        "NEXT_AUTH_NO":that.approval_people_no,
                        "NEXT_AUTH_ORG":that.approval_people_org,
                        "NEXT_AUTH_USER_NO":that.approval_user_no,
                        'handleDesc':that.disagreeVal
                    }
                    console.log(params,'params')
                    $http(that.approvalUrl,true,params, false)
                    .then(res => {
                        that.getDetail();
                        that.successFlag = true;
                    });
                })
            },
            // 点击完成
            finishedTap(){
                window.location.replace('./list.html')
            }
        }
    });

}

