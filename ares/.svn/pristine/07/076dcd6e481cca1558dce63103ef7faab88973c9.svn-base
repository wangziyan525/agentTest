var baseUrl = {

    getInsuranceApplyDataUrl: 'insurancePractice/getInsuranceApplyData.xa',   //获取数据
    insuranceDownPhotoUrl: 'insurancePractice/insuranceDownPhoto.xa',   //下载照片
    checkInsuranceApplyDataUrl: 'insurancePractice/checkInsuranceApplyData.xa',   //保存当前考试试题
}
var vm;
function initFun() {
    vm = new Vue({
        el: '.container',
        data: {
            ban:true,
            radio: '1',
            userinfo: {},
            role: '',
            registStatus: false,
            btmShow: false,
            btmText: '',
            cnsBase64: '',
            idImgBase64: '',
            type:''
        },

        created() {

        },
        mounted() {
            this.getInsuranceApplyData();
            this.type = this.getQueryString('type')
        },

        methods: {
            //查看图片
            bigImg(imgSrc) {
                var imageUrls = new Array();
                imageUrls.push(imgSrc);
                vant.ImagePreview(imageUrls);

            },
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            //审批类型
            getQuestionTypeText(type) {
                const typeMap = {
                    '1': '备案',
                    '2': '注销',
                    '3': '变更'
                };
                return typeMap[type] || '未知';
            },
            //获取数据
            getInsuranceApplyData() {
                let params = {};
                params.id = this.getQueryString('id');
                $http(baseUrl.getInsuranceApplyDataUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.type = res.data.type;
                            this.userinfo = res.data;
                            this.role = res.data.role;
                            //判断底部审批按钮是否显示内容
                            if ('chengNuoshu' in res.data) {
                                this.initImageFun(res.data.chengNuoshu, 'cns');
                            }
                            if ('idPicture' in res.data) {
                                this.initImageFun(res.data.idPicture, 'idImg');
                            }
                            if (this.role == 'branch') {
                                if (this.userinfo.leaderStatus == '0') {
                                    this.registStatus = true;
                                    this.btmShow = true;
                                    this.btmText = '送零售部审核';
                                    this.ban = false;
                                } else {
                                    this.radio = this.userinfo.leaderStatus
                                }
                            } else if (this.role == 'manager') {
                                if (this.userinfo.managerStatus == '0') {
                                    this.registStatus = true;
                                    this.btmShow = true;
                                    this.btmText = '完成';
                                    this.ban = false;
                                } else {
                                    this.radio = this.userinfo.managerStatus
                                }
                            }
                               
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //审批
            checkInsuranceApplyData() {
                let params = {};
                params.id = this.getQueryString('id');
                params.status = this.radio;
                $http(baseUrl.checkInsuranceApplyDataUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            vant.Toast('审核完成');
                            window.location.reload();
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //下载照片
            initImageFun(images, id) {
                $http(baseUrl.insuranceDownPhotoUrl, false, {
                    filename: images,
                }, false)//idImg cns
                    .then(res => {
                        if (id == 'idImg') {
                            this.idImgBase64 = 'data:image/jpeg;base64,' + res.data;
                        } else if (id == 'cns') {
                            this.cnsBase64 = 'data:image/jpeg;base64,' + res.data;
                        }

                        document.getElementById(id).src = 'data:image/jpeg;base64,' + res.data;
                    })

            },
        }
    })
};
