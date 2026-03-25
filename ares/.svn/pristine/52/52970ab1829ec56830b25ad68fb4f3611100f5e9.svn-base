var baseUrl = {
    getApplyDataUserUrl: 'insurancePractice/getApplyDataUser.xa',
    findExitiInsurancePracticeUrl: "insurancePractice/findExitiInsurancePractice.xa",
    // overdueDetailUrl: 'ticketEasyLoan/overdueDetail.xa',//西银票易贷-逾期明细
}
var vm;
function initFun() {
    vm = new Vue({
        el: '.container',
        data: {
            registStatus: 0,//0提交资料，1签名完成,2审核拒绝，3审核通过 
            registText: '备案',
            BAid: '',
            BGid: '',
            ZXid: '',

        },

        created() {

        },
        mounted() {
            localStorage.removeItem('hisUserInfo')
            this.findExitiInsurancePractice();
        },

        methods: {
            toApply(type) {
                if (type == 'BA') {
                                        
                    if ('BA' in this.hisUserInfo && this.hisUserInfo.BA.status != '3' && this.hisUserInfo.BA.status != '0') {
                        //查看审批记录
                        
                        window.location.href = "./review.html?id=" + this.BAid;
                    } else {
                        window.location.href = "./apply.html?type=BA";
                    }
                } else if (type == 'BG') {
                    if ('BG' in this.hisUserInfo && this.hisUserInfo.BG.status != '3') {
                        //查看审批记录
                        window.location.href = "./review.html?id=" + this.BGid;
                    } else {
                        window.location.href = "./apply.html?type=BG";
                    }

                } else if (type == 'ZX') {
                    if ('ZX' in this.hisUserInfo && this.hisUserInfo.ZX.status != '3') {
                        //查看审批记录
                        window.location.href = "./review.html?id=" + this.ZXid;
                    } else {
                        window.location.href = "./apply.html?type=ZX";
                    }

                }
            },
            //用户信息查询
            getApplyDataUser() {
                let params = {};
                $http(baseUrl.getApplyDataUserUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            localStorage.setItem("userInfo", JSON.stringify(res.data));
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //用户状态查询
            findExitiInsurancePractice() {
                let params = {};
                $http(baseUrl.findExitiInsurancePracticeUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.hisUserInfo = res.data
                            switch (res.data.role) {
                                case 'manager':
                                    window.location.href = "./scoreList.html";
                                    break;
                                case 'branch':
                                    window.location.href = "./logoutList.html";
                                    break;
                                default:
                                    if (res.data.BA != null && res.data.BA !== '') {
                                        this.registStatus = res.data.BA.status;
                                        this.BAid = res.data.BA.id;
                                        if (res.data.BG != null && res.data.BG !== '') {
                                            this.BGid = res.data.BG.id;
                                        }
                                        if (res.data.ZX != null && res.data.ZX !== '') {
                                            this.ZXid = res.data.ZX.id;
                                        }
                                        if (this.registStatus == '1') {
                                            this.registText = '审核中';

                                        } else if (this.registStatus == '3') {
                                            this.registText = '已备案'
                                            document.getElementById('registBtn').disabled = true
                                        }
                                        localStorage.setItem("hisUserInfo", JSON.stringify(res.data))

                                    } else {
                                        this.getApplyDataUser()
                                    }

                                    break;
                            }
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },

        }
    })
};
