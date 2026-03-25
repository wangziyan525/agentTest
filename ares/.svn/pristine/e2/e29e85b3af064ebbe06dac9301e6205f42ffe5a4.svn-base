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
            },
            submitStatus: true,

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
                    TskTp: "FreezeCreditApply",
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
                        this.$dialog.alert({
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
                    TskTp: "FreezeCreditApply",
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
                if (this.submitObj.PhaseAction == '' && this.approveUserArr.length > 0) return vant.Toast('请选择审批人员')
                if (this.submitObj.Opinion == '' ) return vant.Toast('请输入审批意见')
                let params = {
                    FlwSeqNum: GetQueryString('FlwSeqNum'),//	流程流水号
                    SubAction: this.submitObj.NxtAprvActn, //	提交动作
                    SubAprvPsnl: this.submitObj.PhaseAction, //	提交审批人员
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



