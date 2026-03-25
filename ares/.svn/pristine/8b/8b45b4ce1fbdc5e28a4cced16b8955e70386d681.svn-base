var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getNextApproveDataUrl: 'tobaccoFarmer/getNextApproveData.xa', // 获取下一步提交人接口
                getLoanAfterDataUrl: 'tobaccoFarmer/getLoanAfterData.xa', // 洛南贷后详情数据查询
                getWanderDataUrl: 'tobaccoFarmer/getWanderData.xa', // 流转信息
                submitDataUrl: 'tobaccoFarmer/submitData.xa'
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
            //金额格式化
            formatCurrency(n) {
                //将数字转化为字符串
                if(n==undefined || n == ''){
                    return '';
                }else{

                    //将数字转化为字符串
                    let num = n.toString();
                    let isFu = false;
                    if(num < 0){
                        isFu = true;
                        num = num.replace(/-/g,'');
                    }
                    //判断小数点截取小数点后面的数字
                    if(num.indexOf('.') > 0){
                        var afterNum = num.substr(num.indexOf('.')).substring(1);
                        if(afterNum.length == 0){
                            afterNum = '.00';
                        }else if(afterNum.length == 1){
                            afterNum = '.' + afterNum +'0';
                        }else{
                            afterNum = num.substr(num.indexOf('.')).substring(0,3);
                        }
                    }
                    let after = num.indexOf('.') > 0 ? afterNum : '.00';
                    //如果存在小数点
                    let numArr = num.indexOf('.') > 0 ? num.substring(0, num.indexOf('.')).split('') : num.split('');
                    var str = '';//字符串累加
                    for (var i = numArr.length - 1, j = 1; i >= 0; i--, j++) {
                        if (j % 3 == 0 && i != 0) {//每隔三位加逗号，过滤正好在第一个数字的情况
                            str += numArr[i] + ",";//加千分位逗号
                            continue;
                        }
                        str += numArr[i];//倒着累加数字
                    }
                    if(isFu){
                        return '-'+ str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串

                    }else {
                        return  '￥'+str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串
                    }
                }
            }
        }
    })
    
};



