function initFun() {
    new Vue({
        el: '#app',
        data: {
            peopleUrl: 'kuaiEloan/findApproveUser.xa',
            checkUrl: 'kuaiEloan/check.xa',
            addUrl: 'kuaiEloan/saveCustomerInfo.xa',
            textH: '22px',
            custObj: {
                IdentNum: '',
                ClientNm: '',
                UtNm: '',
            },
            positionList: [{ text: '科级及以下', val: 0 },
            { text: '处级', val: 1 },
            { text: '局级及以上', val: 2 }],
            positionVal: 0,
            positionText: '科级及以下',
            peopleObj: {
                title: '请选择',
                peopleShow: false,  //下拉选人
                peopleList: [],
            },
            peopleText: '',
            flag: "add"

        },
        created() {
            this.flag = this.getQueryString('flag') ? this.getQueryString('flag') : "add";
            console.log(this.flag)
            if (this.flag == 'edit') {
                document.title = '编辑白名单客户信息'
                this.custObj = JSON.parse(decodeURIComponent(this.getQueryString('custObj')));
                this.positionText = this.custObj.Pstn;
            } else {
                document.title = '新增白名单客户信息'
            }
            this.$nextTick(() => {
                this.textH = $('.edit_textarea').scrollHeight()+'px';
            })
            this.getUserList();
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
            positionTranslate(text) {
                var that = this;
                switch (text) {
                    case "科级及以下":
                        that.positionVal = 0;
                        break;
                    case "处级":
                        that.positionVal = 1;
                        break;
                    case "局级及以上":
                        that.positionVal = 2;
                        break;
                    default:
                        that.positionVal = 0;
                        break;
                }
            },
            // 选择职位级别
            selectPosition(item) {
                this.positionVal = item.val;
                this.positionText = item.text;
            },
            handleTextH(e) {
                this.textH = e.target.scrollHeight + "px"
            },
            // 审核人列表
            getUserList() {
                let that = this;
                var params = {
                    AprvNodeId: 0
                }
                $http(that.peopleUrl, true, params, false)
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
            // 审批人选择
            peopleConfirm(params) {
                var that = this;
                that.peopleText = params.text;
                that.peopleObj.peopleShow = false;
                var submitParams = {
                    AprvlistIfn: [
                        {
                            IdentNum: that.custObj.IdentNum,
                            ClientNm: that.custObj.ClientNm,
                            UtNm: that.custObj.UtNm,
                            Pstn: that.positionText
                        }
                    ],
                    NxtNodeAprvManId: params.val,
                    NxtNodeAprvManNm: params.text,
                    AprvNodeId:0
                }
                if(that.flag=='edit'){
                    submitParams['BsnTp'] = 3;
                    submitParams.AprvlistIfn[0]['BsnSeqNum'] = that.custObj.BsnSeqNum;
                }else{
                    submitParams['BsnTp'] = 1;
                }
                that.submitTap(submitParams);
            },
            peopleShowTap() {
                var that = this;
                var name = that.custObj.ClientNm;
                var idNo = that.custObj.IdentNum;
                var company = that.custObj.UtNm;
                if (!name || name == undefined || name == "") {
                    $.alert('', '请输入客户姓名');
                    return false;
                }
                if (name.length == 1) {
                    $.alert('', '姓名至少为两位数');
                    return false;
                };
                let regName = /^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/;
                if (!regName.test(name)) {
                    $.alert('', '请输入正确格式的客户姓名');
                    return false;
                }
                if (idNo && !checkIdcard(idNo)) {
                    $.alert('', '请输入有效身份证号码');
                    return false;
                }
                if (!company || company == undefined || company == "") {
                    $.alert('', '请输入单位名称');
                    return false;
                }
                that.getCheck()
            },
            // 查询客户是否重复
            getCheck() {
                let that = this;
                var params = {
                    IdentNum: that.custObj.IdentNum,
                    ClientNm: that.custObj.ClientNm,
                }
                $http(that.checkUrl, true, params, false)
                    .then(res => {
                        if (res.data.RsltNum == 2) { //未查询到重复的客户
                            that.peopleObj.peopleShow = true;
                        } else if (res.data.RsltNum == 1) { //有重复的客户
                            $.alert('', '客户已存在');
                            return false;
                        } else {
                            $.alert('', res.retmsg);
                        }
                    });
            },
            // 提交客户
            submitTap(params) {
                let that = this;
                var title = '';
                if(that.flag=='edit'){
                    title = '确认修改该客户信息？'
                }else if(that.flag=='add'){
                    title = '确认新增客户信息？'
                }
                $.confirm("",title, function () {
                    $http(that.addUrl, true, params, false)
                        .then(res => {
                            $.alert('', '提交成功', function () {
                                window.location.replace('./index.html')
                            });
                        });
                })
            },
            // 取消
            cancelTap() {
                history.back();
            }
        }
    })
};
