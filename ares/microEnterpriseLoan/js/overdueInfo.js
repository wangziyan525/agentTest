var baseUrl = {
    getDynmicLinkUrl: 'webank/getDynmicLink.xa',//二维码获取
}
var vm;
function initFun() {
    vm = new Vue({
        el: '.container',
        data: {
            formData: {

            },
            QRCodeURL: '',
        },


        created() {

        },
        mounted() {
            this.getDynmicLink();

        },

        methods: {
            //二维码获取
            getDynmicLink() {
                let params = {};
                $http(baseUrl.getDynmicLinkUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.QRCodeURL = res.data;
                          
                            this.getQRCode();
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            getQRCode(){
                const container = document.getElementById('qrcode');
                container.innerHTML = '';
                 new QRCode(container,{
                    text:this.QRCodeURL,
                    width:150,
                    height:150,
                    colorDark:'#000000',
                    colorLight:'#FFFFFF',
                })
            }

        }
    })
};
