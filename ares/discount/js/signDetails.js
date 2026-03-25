var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                custSignInfoDetailUrl: 'discount/custSignInfoDetail.xa', // 查看详情接口
                approveResultUrl: 'discount/approveResult.xa', // 最终
                approverInfoUrl: 'discount/approverInfo.xa', // 签约
                attachmentPreviewPdfUrl: 'generalFileDownload/discount/attachmentPreview.xa', // pdf
                attachmentDownloadUrl: 'discount/attachmentDownload.xa',
                userListByOrgUrl: 'user/userListByOrg.xa', // 查询审批人
            },
            dataDetails: {
            },
            popupCenterShow: false,
            formData: {
                BsnTblOlyId: '', 
                DalPsnlId: '',
                DalPsnlNm: '',
                AudResult: '', // 01 通过 02 拒绝
                BsnTp: '01', // 01 签约  02 摘牌
                AudRfsCs: '', // 拒绝原因
            },
            fileList: [], // 附件信息
            btnStatus: false,
            popupApprove: {
                show: false,
                list: []
            }
        },
        created() {
            this.custSignInfoDetail()
        },
        methods: {
            custSignInfoDetail () {
                let params = {
                    DtlRcrdId: GetQueryString('DtlRcrdId'),
                }
                $http(this.baseUrl.custSignInfoDetailUrl,true, params, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.dataDetails = {
                            ...res.data
                        }
                        // if (this.dataDetails.List && this.dataDetails.List.length > 0) {
                        //     // this.fileList = this.dataDetails.List.map((item) => {
                        //     //     if (item.DlyFileNm.split(',')[0] == 'pdf') {
                        //     //         return item
                        //     //     } else {
                        //     //         return this.attachmentPreview(item)
                        //     //     }
                        //     // })
                        //     // this.attachmentPreview(this.dataDetails.List)
                        // }
                        this.formData.BsnTblOlyId = res.data.DtlRcrdId;
                    } else {
                        vant.Dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    }
                });
            },

            

            attachmentPreviewPdf (param) {
                var url = `${base.context}${this.baseUrl.attachmentPreviewPdfUrl}?AsyBchNum=${param.AsyBchNum}&DlyFileNm=${param.DlyFileNm}`;
                var pdfUrl = '../assets/web/viewer.html?file=' + encodeURIComponent(url);
                window.location.href = pdfUrl;
            },

            /**
             *
             * @param {*} imgListKey 图片
             */

            previewHandle (allList) {
                var imgList = allList.filter(item => {
                    if (item.DlyFileNm.split('.')[1] != 'pdf') {
                        return item
                    }
                }).map(param => {
                    return param.ImageURL
                })
                vant.ImagePreview({
                    images: imgList,
                    startPosition: 0
                })
            },

            backHandle() {
                window.location.href ='signList.html'
            },
            submitHandle() {
                let that = this;
                if (this.btnStatus) return
                this.formData.AudResult = '01';
                this.formData.AudRfsCs = ''
                if (this.dataDetails.IsFixAudFlg == '1') {
                    // wx.invoke("selectEnterpriseContact", {
                    //         "fromDepartmentId": -1,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
                    //         "mode": "single",// 必填，选择模式，single表示单选，multi表示多选
                    //         "type": ["user"],// 必填，选择限制类型，指定department、user中的一个或者多个
                    //         "selectedDepartmentIds": [that.dataDetails.DeptId],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                    //         "selectedUserIds": that.formData.DalPsnlId// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                    //     }, function (res) {
                    //         if (res.err_msg == "selectEnterpriseContact:ok") {
                    //             if (typeof res.result == 'string') {
                    //                 res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
                    //             }
                    //             var selectedUserList = res.result.userList; // 已选的成员列表
                    //             that.formData.DalPsnlId = selectedUserList[0].id;
                    //             that.formData.DalPsnlNm = selectedUserList[0].name;
                    //             that.approveFun()
                    //         }
                    //     }
                    // );
                    $http(this.baseUrl.userListByOrgUrl,true, { OrgId: this.dataDetails.CoreInstNum  }, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.popupApprove.list = res.data.List ? res.data.List.map(item => {
                                return {
                                    code: item.userid,
                                    text: item.idcardname
                                }
                            }) : [];
                            if (res.data.List.length > 0) {
                                this.popupApprove.show = true;
                            } else {
                                vant.Dialog.alert({
                                    message: '未查询到审核人员'
                                }).then(() => {
                                });
                            }
                        } else {
                            vant.Dialog.alert({
                                message: res.retmsg
                            }).then(() => {
                            });
                        }
                    })
                } else {
                    that.approveFun()
                }
            },

            popupApproveConfirm (param) {
                this.formData.DalPsnlId = param.code;
                this.formData.DalPsnlNm = param.text;
                this.popupApprove.show = false;
                this.approveFun()
            },

            rejectHandle () {
                this.popupCenterShow = true;
            },

            downPdfHandle () {
                let paramsList = this.dataDetails.List.map(item => {
                    return {
                        AsyTp: item.AsyTp,
                        AsyBchNum: item.AsyBchNum,
                        DlyFileNm: item.DlyFileNm
                    }
                })
                $http(this.baseUrl.attachmentDownloadUrl,true, { List: paramsList  }, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        vant.Dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    } else {
                        vant.Dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    }
                });
            },

            approveFun () {
                this.btnStatus = true;
                $http(this.dataDetails.IsFixAudFlg == '1' && this.formData.AudResult == '01' ? this.baseUrl.approverInfoUrl : this.baseUrl.approveResultUrl,true, this.formData, true)
                .then(res => {
                    this.btnStatus = false;
                    this.popupCenterShow = false;
                    if (res.retcode == 'success') {
                        // vant.Dialog.alert({
                        //     message: res.retmsg
                        // }).then(() => {
                        //     wx.closeWindow();
                        // });
                        window.location.href = `result.html?DtlRcrdId=${this.dataDetails.DtlRcrdId}&TxnTm=${this.dataDetails.TxnTm}`;
                    } else {
                        vant.Dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    }
                });
            },
            confirmCenterHandle () {
                if (this.btnStatus) return
                if (this.formData.AudRfsCs == '') return vant.Toast('请输入拒绝原因');
                this.formData.AudResult = '02'
                this.approveFun()
            }
        }
    })
};
