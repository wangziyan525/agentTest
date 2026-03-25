var baseUrl = {
    loanpGetQrcode:'loanproduct/loanpGetQrcode.xa',
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            tab:'0',
            timeLeft:'180',
            timer:'',
            imgPath1:'',
            imgPath2:'',
            channal:"mbank",
            imageBase64: "data:image/png;base64,",
            overFlag:false,
            timeSt:''
        },
        created() {
        },
        mounted() {
            this.loanpGetQrcode();

        },
        methods: {

            chooseTab(param){
                clearInterval(this.timeSt);
                var that=this;
                that.tab=param;
                if(param=='0'){
                    that.channal="mbank"
                }else{
                    that.channal="miniapp"
                }
                this.loanpGetQrcode();

            },
            updateTimerDisplay(){
                const minutes = Math.floor(this.timeLeft/60)
                const seconds = this.timeLeft%60
                this.timer = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`

            },
            async loanpGetQrcode(){
                var that=this;
                that.overFlag = false;
                var param={};
                param.channal=that.channal;
                const res = await $http(baseUrl.loanpGetQrcode, true,param, true);
                if (res.retcode === 'success'){
                    that.timeLeft = '180'
                        this.timeSt=setInterval(()=>{
                        this.timeLeft--;
                        if(this.timeLeft<=0){
                            clearInterval(this.timeSt);
                            that.overFlag = true;
                            vant.Dialog.confirm({
                                title: '二维码已失效，点击确定刷新二维码',
                                cancelButtonText:"取消",
                                confirmButtonText:"确认",
                                message: ""
                            }).then(() => {
                                that.loanpGetQrcode()

                            }).catch(() => {

                            })
                        }
                    },1000)
                    if(that.tab=='0'){
                        that.imgPath1 = res.data
                    }else{
                        that.imgPath2 = res.data
                    }

                }else{
                    $.alert("",res.retmsg,function () {

                    });
                }
            },
            refreshQr(){
                clearInterval(this.timeSt);
                this.loanpGetQrcode();
            }


        }
    })
}



