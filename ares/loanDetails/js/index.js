var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getDataUrl: 'tobaccoFarmer/getData.xa'
            },
            dataInfo: {
            },
            highRiskList: [],
            mediumRiskList: []

        },

        created () {
            this.getDataFun();
        },

        methods: {
            getDataFun() {
                let params = {
                    identId: GetQueryString('identId')
                }
                $http(this.baseUrl.getDataUrl, true,params, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.dataInfo =
                        { 
                            ...res.data
                        };

                        // 高风险

                        // if (res.data.CntnsThrMoIsOdue == '是') {
                        //     this.highRiskList.push({
                        //         key: 'CntnsThrMoIsOdue',
                        //         value: res.data.CntnsThrMoIsOdue,
                        //         lable: '连续三个月逾期'
                        //     })
                        // };

                        if (res.data.odueUltMoBal == '是') {
                            this.highRiskList.push({
                                key: 'odueUltMoBal',
                                value: res.data.odueUltMoBal,
                                lable: '连续三个月有逾期（归还日在首次提款日之后）且当前存在逾期余额（个人+担保）'
                            })
                        };

                        if (res.data.exe_per == '是') {
                            this.highRiskList.push({
                                key: 'exe_per',
                                value: res.data.exe_per,
                                lable: '被法院列为失信被执行人'
                            })
                        };

                        if (res.data.small_loan == '是') {
                            this.highRiskList.push({
                                key: 'small_loan',
                                value: res.data.small_loan,
                                lable: '小额信贷公司是否有逾期'
                            })
                        };

                        // 中风险

                        if (res.data.CurrIsNdOdueBal == '是') {
                            this.mediumRiskList.push({
                                key: 'CurrIsNdOdueBal',
                                value: res.data.CurrIsNdOdueBal,
                                lable: '当前存在逾期余额（个人+担保）'
                            });
                        };

                        if (res.data.LastMoLoanAprvQryTms == '是') {
                            this.mediumRiskList.push({
                                key: 'LastMoLoanAprvQryTms',
                                value: res.data.LastMoLoanAprvQryTms,
                                lable: '最近1个月内的贷款审批查询机构数>=3'
                            });
                        };

                        if (res.data.Y1 == '是') {
                            this.mediumRiskList.push({
                                key: 'Y1',
                                value: res.data.Y1,
                                lable: '逾期31—60天未还本金大于0'
                            });
                        };

                        if (res.data.Y2 == '是') {
                            this.mediumRiskList.push({
                                key: 'Y2',
                                value: res.data.Y2,
                                lable: '逾期61－90天未还本金大于0'
                            });
                        };

                        if (res.data.Y3 == '是') {
                            this.mediumRiskList.push({
                                key: 'Y3',
                                value: res.data.Y3,
                                lable: '逾期91－180天未还本金大于0'
                            });
                        };

                        if (res.data.Y3Up == '是') {
                            this.mediumRiskList.push({
                                key: 'Y3Up',
                                value: res.data.Y3Up,
                                lable: '逾期180天以上未还本金大于0'
                            });
                        };

                        if (res.data.draw_amt == '是') {
                            this.mediumRiskList.push({
                                key: 'draw_amt',
                                value: res.data.draw_amt,
                                lable: '同一天提款金额<=2万元且笔数>=3笔'
                            });
                        };

                        if (res.data.new_credit == '是') {
                            this.mediumRiskList.push({
                                key: 'new_credit',
                                value: res.data.new_credit,
                                lable: '有新增展期/借新还旧的业务'
                            });
                        };

                        if (res.data.CtnsThrMoIsOdueUltMo == '是') {
                            this.mediumRiskList.push({
                                key: 'CtnsThrMoIsOdueUltMo',
                                value: res.data.CtnsThrMoIsOdueUltMo,
                                lable: '新增逾期记录（连续三个月逾期归还日在三个月以内）'
                            });
                        };

                        
                        
                    } else {
                        this.$dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                            wx.closeWindow();
                        });
                    }
                })
            },

            callPhoneHandle(phone){
                window.location.href= "tel:" + phone;
            },

            loanTpFun (param) {
                if (param == '322') {
                    return '工薪乐'
                }
            }
        }
    })
}