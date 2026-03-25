var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getMeetingInfoByIdUrl: 'qywx/newMeet/getMeetingInfoById.xa', // 会议详情
                cancleMeetingUrl: 'qywx/newMeet/cancleMeeting.xa' // 取消会议
            },
            ewmFlag:'none',
            ewmShow:false,
            signCode:'',
            meetingInfoId:'',
            currentUserCode:$.parseJSON($.cookie("user")).humancode,
            dataInfo: {

            }
        },
        created () {
            this.meetingInfoId = GetQueryString('meetingInfoId')?GetQueryString('meetingInfoId'):''
            this.getMeetingInfoById();
        },
        methods: {
            getMeetingInfoById () {
                var that = this;
                $http(that.baseUrl.getMeetingInfoByIdUrl,true, {
                    meetingInfoId:that.meetingInfoId
                }, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        console.log(res.data,'00000')
                        that.dataInfo = res.data;
                    } else {
                        $.alert("",res.retmsg, function () {
                            if (res.retcode == '-1') {
                                wx.closeWindow();
                            }
                            
                        });
                    }
                });
            },

            cancleHandle () {
                let that = this;
                // let meetingInfoId = BigInt(that.dataInfo.meetingInfoId).toString()
                $.confirm("", "确认取消", function () {
                    $http(that.baseUrl.cancleMeetingUrl,true, {
                        meetingInfoId: that.dataInfo.meetingInfoId
                    }, false)
                    .then(res => {
                        $.alert("",res.retmsg, function () {
                            wx.closeWindow();
                        });
                    });
                })
            },

            // 去修改
            toEditTap() {
                if (this.dataInfo.status == '未开始') {
                    window.location.href = '../index.html?meetingInfoId=' + this.meetingInfoId;
                } else if (this.dataInfo.status == '正在进行') {
                    $.alert("", '会议正在进行中，请勿修改')
                } else if (this.dataInfo.status == '已结束') {
                    $.alert("", '会议结束')
                }
            },
            //签到
            scanQRCode() {
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        window.location.href = result;
                    },
                    error:function(res){
                        if(res.errMsg.indexOf('function_not_exist')>0){
                            $.alert('','版本过低请升级')
                        }
                    }
                });
            },
            ewmShowTap(){
                var that = this;
                that.ewmFlag = 'block';
                that.ewmShow = true;
                setTimeout(function(){
                    that.createQrcode();
                },500);
            },
            closeTap(){
                this.ewmShow = false;
                this.ewmFlag = 'none';
            },
            // 二维码
            createQrcode() {
                let that = this;
                let hdcode = base.domain + base.prefix + 'meeting/views/signIn.html?meetingInfoId=' + this.meetingInfoId+'&meetingtype='+that.dataInfo.meetingType;
                $(".ewm_img_box").html('');
                $(".ewm_img_box").qrcode({
                    render: "canvas",
                    width: 250, //宽度 
                    height: 250, //高度 
                    typeNumber: -1,//计算模式
                    background: '#ffffff',
                    foreground: "#000000",
                    text:that.utf16to8(hdcode)
                });
                var myCanvas = document.getElementsByTagName('canvas')[0];
                var img = that.canvasToImg(myCanvas);
                that.signCode = img.src;
            },
            /*在canvas中提取图片img*/
            canvasToImg(canvas) {
                let that = this;
                var img = new Image();
                img.src = canvas.toDataURL("image/png");
                return img;
            },
            utf16to8(str) {
                var out, i, len, c;
                out = "";
                len = str.length;
                for (i = 0; i < len; i++) {
                    c = str.charCodeAt(i);
                    if ((c >= 0x0001) && (c <= 0x007F)) {
                        out += str.charAt(i);
                    } else if (c > 0x07FF) {
                        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    } else {
                        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                }
                return out;
            }
        }
    })
}
