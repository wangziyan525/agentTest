function initFun () {
    new Vue({
        el: '#app',
        data: {
            sendRateUrl:'bankAcceptanceBill/sendBankLevelBillRate.xa', //银承票据手动推送档位利率信息
            sendLevelUrl:'bankAcceptanceBill/sendBankLevel.xa',//银银承票据手动推送银行档位信息
            status:''
        },
        created () {
            this.status = getQueryString('status')?getQueryString('status'):""
        },
        methods: {
            sendRateTap(){
                var that = this;
                $.confirm('','确认推送档位利率信息？', function () {
                    $http(that.sendRateUrl, true,{}, true)
                        .then(res => {
                            $.alert('', res.retmsg)
                        });
                }); 
            },
            sendLevelTap(){
                var that = this;
                $.confirm('','确认推送银行档位信息？', function () {
                    $http(that.sendLevelUrl, true,{}, true)
                        .then(res => {
                            $.alert('', res.retmsg)
                        });
                }); 
            },
            finishedTap(){
                window.location.replace('./index.html')
            }
        }
    })
};
