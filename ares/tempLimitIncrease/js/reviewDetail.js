var baseUrl = {
    downPhotoDataUrl: "lsteData/downPhotoData.xa", //
    queryDetailUrl: "lsteData/queryDetail.xa", //列表查询
    approveDataUrl: "lsteData/approveData.xa", //
};
var vm;
function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            //客户信息展开状态
            customerInfoExpand: true,
            //客户经理信息展开状态
            managerInfoExpand: true,
            //弹窗显示状态
            showPopup: false,
            //弹窗标题
            popupTitle: '',
            //弹窗类型 refuse-拒绝 reject-驳回
            popupType: '',
            //原因输入
            reasonInput: '',
            tempUpgdLmtCsMap: {
                1: "购房需要",
                2: "购车需要",
                3: "就医需要",
                4: "其他需要",
            },
            isAudPassMap: {
                1: "是",
                0: "否"
            },
            //详情数据
            detailData: {
            },
            primKeyId: '',
            showList: [],
        },
        created: function () {
            // 从URL获取来源
            const urlParams = new URLSearchParams(window.location.search);
            this.primKeyId = urlParams.get('primKeyId')
            this.queryDetail();
        },
        mounted: function () {

        },
        methods: {
            //2 拒绝 3同意  10驳回  
            async  approveData(type) {
                //TODO: 调用接口获取数据
                await $http(baseUrl.approveDataUrl, true, {
                    "PrimKeyId": this.primKeyId,
                    "appstatus": type,
                    "msg": this.reasonInput
                }, true)
                    .then(async res => {
                        if (res.retcode == 'success') {
                            vant.Toast({message:'审批成功',duration:5000});
                            window.location.href = `appointment.html?channel=2`
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            async  queryDetail() {
                //TODO: 调用接口获取数据
                await $http(baseUrl.queryDetailUrl, true, {
                    "PrimKeyId": this.primKeyId
                }, true)
                    .then(async res => {
                        if (res.retcode == 'success') {
                            this.detailData = res.data;
                            if (res.data.prvMtr) {
                                const arr = res.data.prvMtr.split(',').map(item => item.trim())
                                this.showList = await this.getFileBase64(arr)
                            }

                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //查看图片
            bigImg(imgSrc) {
                var imageUrls = new Array();
                imageUrls.push(imgSrc);
                vant.ImagePreview(imageUrls);
            },
            //遍历查询base64
            async getFileBase64(fileArray) {
                const result = [];
                for (const file of fileArray) {
                    let params = {};
                    params.filename = file;
                    const res = await $http(baseUrl.downPhotoDataUrl, true, params, true);
                    if (res.retcode == 'success') {
                        result.push({ ...file, 'base64': res.data })
                    } else {
                        $.alert("", res.retmsg, function () {
                            if (res.retcode == '-1') {
                                wx.closeWindow();
                            }

                        });
                    }
                }
                return result
            },
            //返回上一页
            handleBack: function () {
                window.history.back();
            },
            //切换客户信息展开状态
            toggleCustomerInfo: function () {
                this.customerInfoExpand = !this.customerInfoExpand;
            },
            //切换客户经理信息展开状态
            toggleManagerInfo: function () {
                this.managerInfoExpand = !this.managerInfoExpand;
            },
            //拒绝
            handleRefuse: function () {
                this.popupType = 'refuse';
                this.popupTitle = '请输入拒绝原因';
                this.reasonInput = '';
                this.showPopup = true;
            },
            //驳回
            handleReject: function () {
                this.popupType = 'reject';
                this.popupTitle = '请输入驳回原因';
                this.reasonInput = '';
                this.showPopup = true;
            },
            //关闭弹窗
            closePopup: function () {
                this.showPopup = false;
                this.reasonInput = '';
            },
            //确认弹窗
            confirmPopup: function () {
                if (!this.reasonInput.trim()) {
                    vant.Toast('请输入原因');
                    return;
                }
                var _this = this;
                if (this.popupType === 'refuse') {
                    this.approveData('2');
                    //提交拒绝
                } else if (this.popupType === 'reject') {
                    this.approveData('10');
                    //提交驳回
                }
                this.closePopup();
            },
            //同意
            handleApprove: function () {
                this.approveData('3');
            }
        }
    });
}
