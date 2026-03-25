var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                disFlotationInfoUrl: 'discount/disFlotationInfo.xa', // TranSt=02 交易成功 
                disDealInfoUrl: 'discount/disDealInfo.xa', // TranSt=!02 详情
                approveResultUrl: 'discount/approveResult.xa', // 拒绝  
                approverInfoUrl: 'discount/approverInfo.xa', // 固定人 + 通过
                disQuoteSignUrl:'discount/disQuoteSign.xa', // 分配人 + 通过
                cppDisQuoteUrl: 'discount/cppDisQuote.xa', // 记账接口
            },
            TranSt: GetQueryString('TranSt'),
            dataDetails: {
            },
            popupCenterShow: false,
            formData: {
                BsnTblOlyId: '', 
                DalPsnlId: '',
                DalPsnlNm: '',
                AudResult: '', // 01 通过 02 拒绝
                BsnTp: '02', // 01 签约  02 摘牌
                AudRfsCs: '', // 拒绝原因
            },
            btnStatus: false
        },
        created () {
            this.getDetails()
        },
        methods: {
            getDetails () {
                if (GetQueryString('TranSt') == '02') {
                    $http(this.baseUrl.disFlotationInfoUrl,true, {
                        QtnShdNur: GetQueryString('QtnShdNur')
                    }, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            let detailsList = res.data.Lists.length > 0 ? res.data.Lists[0] : {}
                            this.dataDetails = {
                                ...res.data,
                                ...detailsList
                            }
                        } else {
                            vant.Dialog.alert({
                                message: res.retmsg
                            }).then(() => {
                            });
                        }
                    })
                } else {
                    $http(this.baseUrl.disDealInfoUrl,true, {
                        QtnShdNur: GetQueryString('QtnShdNur'),
                        DsplPg: 1,
                        DsplNumRc: 1,
                        TranSt: GetQueryString('TranSt'),
                        DalSt: GetQueryString('DalSt')
                    }, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.dataDetails = {
                                ...res.data.Lists[0]
                            }
                        } else {
                            vant.Dialog.alert({
                                message: res.retmsg
                            }).then(() => {
                            });
                        }
                    })
                }
            },

            /**
             * 返回
             */
            backHandle () {
                window.location.href ='loanList.html'
            },
            /**
             * 拒绝
             */
            rejectHandle () {
                this.popupCenterShow = true;
                
            },

            confirmCenterHandle () {
                if (this.btnStatus) return
                if (this.formData.AudRfsCs == '') return vant.Toast('请输入拒绝原因');
                this.approveFun(this.baseUrl.approveResultUrl,{
                    BsnTp: '02',
                    AudResult: '02', // 01 通过 02 拒绝
                    AudRfsCs: this.formData.AudRfsCs,
                    BsnTblOlyId: this.dataDetails.ReQutBchId
                })
            },

            /**
             * 同意
             */

            submitHandle () {
                let that = this;
                if (that.dataDetails.IsFixAudFlg == '1') {
                    wx.invoke("selectEnterpriseContact", {
                        "fromDepartmentId": -1,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
                        "mode": "single",// 必填，选择模式，single表示单选，multi表示多选
                        "type": ["user"],// 必填，选择限制类型，指定department、user中的一个或者多个
                        "selectedDepartmentIds": [],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                        "selectedUserIds": that.formData.DalPsnlId// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                    }, function (res) {
                        if (res.err_msg == "selectEnterpriseContact:ok") {
                            if (typeof res.result == 'string') {
                                res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
                            }
                            var selectedUserList = res.result.userList; // 已选的成员列表
                            that.approveFun(that.baseUrl.approverInfoUrl,{
                                DalPsnlId: selectedUserList[0].id,
                                DalPsnlNm: selectedUserList[0].name,
                                BsnTp: '02',
                                BsnTblOlyId: that.dataDetails.ReQutBchId
                            })
                        }
                    });
                } else {
                    that.approveFun(that.baseUrl.disQuoteSignUrl,{
                        BsnTp: '02',
                        AudRst: 'SU00', // 审核结果  "SU01-拒绝;SU00-同意"
                        BsnTblOlyId: that.dataDetails.ReQutBchId,
                        QtnShdNur: that.dataDetails.QtnShdNur
                    })
                }
            },

            keepHandle () {
                this.approveFun(this.baseUrl.cppDisQuoteUrl,{
                    ReQutBchId: this.dataDetails.ReQutBchId
                })
            },

            approveFun (url, params) {
                this.btnStatus = true;
                $http(url,true, params, true)
                .then(res => {
                    this.btnStatus = false;
                    this.popupCenterShow = false;
                    if (res.retcode == 'success') {
                        window.location.href = `result.html?DtlRcrdId=${this.dataDetails.QtnShdNur}&TxnTm=${this.dataDetails.TxnTm}`;
                    } else {
                        vant.Dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    }
                });
            },
        }
    })
};
