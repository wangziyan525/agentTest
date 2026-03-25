var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getNextApproveDataUrl: 'qywx/zzhiCreditInformation/getNextApproveData.xa', // 获取下一步提交人接口
                getLoanAfterDataUrl: 'qywx/zzhiCreditInformation/getLoanAfterData.xa', // 洛南贷后详情数据查询
                getWanderDataUrl: 'qywx/zzhiCreditInformation/getWanderData.xa', // 流转信息
                submitDataUrl: 'qywx/zzhiCreditInformation/submitData.xa'
            },
            dataInfo: {
                // TaskSeqNum: '任务流水号',     // 任务流水号
                // LoanPrdct: '贷款产品',     // 贷款产品
                // ClitNum: '客户编号',     // 客户编号
                // CustNm: '客户名称',     // 客户名称
                // CkMo: '检查月份',     // 检查月份
                // CkRptTp: '检查报告类型',     // 检查报告类型
                // MkWay: '生成方式',     // 生成方式
                // MkDt: '生成日期',     // 生成日期
                // CkMan: '检查人',     // 检查人
                // PstLoanVidSraeUrl: '',     // 贷后音视频影像链接
                // CorpIncmIsNrl: '是',     // 经营/收入是否正常
                // BrwManMrgCcstIsChge: '是',     // 借款人婚姻状况是否发生变化
                // PesCdtnMgtCdtnIsImpl: '否',     // 前提条件/管理条件是否落实
                // PpsAndCtrIsAcdn: '是',     // 用途是否与合同一致
                // BrwManAndFamIsEcnmDspt: '否',     // 借款人及家庭是否卷入重大经济纠纷或诉讼
                // BrwManGnrCpBhCilBhvrCpyIsChg: '是',     // 借款人/保证人夫妻双方民事行为能力是否发生变化
                // IncmAndAdtnTmIsChg: '否',     // 收入与准入时是否发生变化
                // ClitRepymtAndIttStltIsNrl: '是',     // 客户还款和结息是否正常
                // GnrIncmCorpFncStIsNrl: '否',     // 保证人收入/经营和财务状况是否正常
                // CltlValIsSfrLos: '否',     // 抵质押物的价值是否受到损失
                // IsErlAttObjMoreMgt: '是',     // 是否列为关注对象加大管理力度
                // IsRqsRpcAddGryCpetCltl: '是',     // 是否要求更换或增加保证和补足抵质押物
                // IsAdncRtic: '否',     // 是否提前收回
                // IsErlBnkBadCrClit: '否',     // 是否列为行内不良信用客户
                // IsLawPsFrPytGnrJotRspl: '否',     // 是否依法追索保证人连带责任
                // IsLawDisplLoanCltl: '否',     // 是否依法处置贷款抵质押物
                // IsAplyLtgt: '否',     // 是否申请诉讼
                // Remark: '备注',    // 备注
                // AprvStatus: 'N',
                // FlowStatus: '2'
            },
            submitStatus: true,
            dataListInfoStatus: false,
            submitObj: {
                Opinion: '',
                PhaseAction: '', // 提交人员+ userid
                NxtAprvActn: '', // 提交动作
            },
            approveName: '',
            luyinbtnText: '',
            nodesList: [
            ], // 

            recodeblockStatus: false, // 暂时录音
            luyinbtnText: '开始说话',

            popupNodesShow: false,
            popupShow: false, // 选择审批节点
            nodesCheckedIndex: null,

            popupShow: false, // 选择审批人

            approveUserArr: [
            ],
            approveUserIndex: null,
            ifDue: 0,

            pointList: [
                
            ], // 审批流转信息
        },
        created() {
            this.getLoanAfterDataFun();
        },

        methods: {
            /**
             * 洛南贷后详情数据查询
             */

            getLoanAfterDataFun () {
                let params = {
                    TskTp: "AfterLoanCheck",
                    TaskSeqNum: GetQueryString('TaskSeqNum'),
                    FlwSeqNum: GetQueryString('FlwSeqNum')
                };
                $http(this.baseUrl.getLoanAfterDataUrl, true,params, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.dataInfo = {
                            ...res.data
                        }
                        // this.getCanSubmitNodes();
                        this.getWanderDataFun();
                    } else {
                        this.$dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                            wx.closeWindow();
                        });
                    }
                })
            },

            handleNodesChange () {
                this.getCanSubmitNodes();
            },

            /**
             * 获取下步审批人
             */
            getCanSubmitNodes () {
                let params = {
                    FlwSeqNum: GetQueryString('FlwSeqNum')
                };
                $http(this.baseUrl.getNextApproveDataUrl, true,params, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.popupNodesShow = true;
                        this.nodesList = res.data
                    }else {
                        that.$dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    }
                })
            },

            /**
             * 流转信息
             */

            getWanderDataFun () {
                let params = {
                    TskTp: "AfterLoanCheck",
                    TaskSeqNum: GetQueryString('TaskSeqNum')
                };
                $http(this.baseUrl.getWanderDataUrl, true,params, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.pointList = res.data.FlowTaskList;
                    }
                })
            },

            handleChange () {
                this.popupShow = true;
            },

            /**
             * 审批节点
             * @param {*} item 
             * @param {*} index 
             */

            handleNodesChecked (item, index) {
                this.nodesCheckedIndex = index;
            },

            handleApproveNodesChecked () {
                console.log(this.nodesCheckedIndex)

                if (this.nodesCheckedIndex == null) {
                    return vant.Toast('请选择提交动作')
                }
                this.submitObj.NxtAprvActn = this.nodesList[this.nodesCheckedIndex].NxtAprvActn;
                this.approveUserArr = this.nodesList[this.nodesCheckedIndex].UserInfo;
                console.log(this.approveUserArr)
                this.popupNodesShow = false
            },

            /**
             * 
             * @param {*} code 收起key
             */

            handleSlide (code) {
                console.log(code);
                this[code]= !this[code];
            },

            /**
             * 审批人选择
             */

            handleChecked (item, index) {
                this.approveUserIndex = index;
            },

            handleApproveUserChecked () {
                console.log(this.approveUserIndex)

                if (this.approveUserIndex == null) {
                    return vant.Toast('请选择人员')
                }
                this.approveName = this.approveUserArr[this.approveUserIndex].AprvManNm;
                this.submitObj.PhaseAction = `${this.approveUserArr[this.approveUserIndex].AprvManStaffNum}`;
                this.popupShow = false;
            },

            /**
             * 提交
             */
            submitBindtap () {

                if (this.submitObj.NxtAprvActn == '') return vant.Toast('请选择提交动作');
                if (this.submitObj.PhaseAction == ''  && this.approveUserArr.length > 0) return vant.Toast('请选择审批人员')
                if (this.submitObj.Opinion == '') return vant.Toast('请输入审批意见')


                let params = {
                    FlwSeqNum: GetQueryString('FlwSeqNum'),//	流程流水号
                    SubAction: this.submitObj.NxtAprvActn, //	提交动作
                    SubAprvPsnl: this.submitObj.PhaseAction, //	提交审批人员 //	提交审批人员
                    AprvRsn: this.submitObj.Opinion//	审批意见 
                };

                $http(this.baseUrl.submitDataUrl, true,params, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.$dialog.alert({
                            message: '审批完成'
                        }).then(() => {
                            wx.closeWindow();
                        });
                    } else {
                        this.$dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    }
                })
            },

            /**
             * 语音开始
             */

            showRecorddiv () {
                this.recodeblockStatus = true;
                this.luyinbtnText = '结束说话';
                wx.startRecord();
            },


            /**
             * 录音
             */
            startRecord () {
                let that = this;

                if (this.recodeblockStatus) {
                    this.recodeblockStatus = false;
                    this.luyinbtnText = '开始说话';
                } else {
                    this.recodeblockStatus = true;
                    this.luyinbtnText = '结束说话';
                }

                wx.stopRecord({
                    success: function (res) {
                        let localId = res.localId;
                        wx.translateVoice({
                            localId: localId,
                            isShowProgressTips: 1,
                            success: function (res) {
                                let result = res.translateResult;
                                result = result.substring(0,result.length - 1);
                                that.submitObj.Opinion = that.submitObj.Opinion+result;
                                that.$forceUpdate();
                            }
                        })
                    }
                });
            },
        }
    })
    
};



