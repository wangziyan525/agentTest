var baseUrl = {
    queryDetailUrl: "lsteData/queryDetail.xa", //列表查询
    downPhotoDataUrl: "lsteData/downPhotoData.xa",
    approveDataUrl: "lsteData/approveData.xa",

};
var vm;

//状态枚举
var STATUS = {
    REVIEWING: 'reviewing',           //审核中
    PENDING_HANDLE: 'pending_handle', //审核通过待办理
    REJECTED: 'rejected',             //审核被驳回
    REFUSED: 'refused',               //审核未通过
    COMPLETED: 'completed',           //已完成
    INVALID: 'invalid'                //已失效
};

//状态配置   //0-待审核;2-审核未通过;3-已审核通过待办理;1-已完成;9-已失效 10-被驳回
var STATUS_CONFIG = {
    //审核中
    ["0"]: {
        icon: 'images/load.png',
        text: '运营经理审核中',
        showReapply: false,
        reasonLabel: ''
    },
    //审核通过待办理
    ["3"]: {
        icon: 'images/load.png',
        text: '审核通过待办理',
        showReapply: false,
        reasonLabel: ''
    },
    //审核被驳回
    ["10"]: {
        icon: 'images/refuse.png',
        text: '审核被驳回',
        showReapply: true,
        reasonLabel: '驳回原因'
    },
    //审核未通过
    ["2"]: {
        icon: 'images/refuse.png',
        text: '审核未通过',
        showReapply: false,
        reasonLabel: '拒绝原因'
    },
    //已完成
    ["1"]: {
        icon: 'images/complete.png',
        text: '审核已完成',
        showReapply: false,
        reasonLabel: ''
    },
    //已失效
    ["9"]: {
        icon: 'images/invalid.png',
        text: '审核已失效',
        showReapply: false,
        reasonLabel: ''
    }
};

function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            primKeyId: '',
            //当前状态
            status: STATUS.REJECTED,
            //详情数据
            detailData: {
            },
            role: '',
            showList: [],
            tempUpgdLmtCsMap: {
                1: "购房需要",
                2: "购车需要",
                3: "就医需要",
                4: "其他需要",
            }
        },
        computed: {
            //状态图标
            statusIcon: function () {
                var config = STATUS_CONFIG[this.detailData.approvestatus];
                return config ? config.icon : '';
            },
            //状态文字
            statusText: function () {
                var config = STATUS_CONFIG[this.detailData.approvestatus];
                return config ? config.text : '';
            },
            //是否显示重新申请按钮
            showReapplyBtn: function () {
                var config = STATUS_CONFIG[this.detailData.approvestatus];
                return config ? config.showReapply : false;
            },
            //原因标签
            reasonLabel: function () {
                var config = STATUS_CONFIG[this.detailData.approvestatus];
                return config ? config.reasonLabel : '';
            }
        },
        created: function () {
            //从URL获取状态参数
            // this.getStatusFromUrl();
            // 从URL获取来源
            const urlParams = new URLSearchParams(window.location.search);
            this.primKeyId = urlParams.get('primKeyId')
            this.role = urlParams.get('role')
            this.queryDetail();
        },
        mounted: function () {

        },
        methods: {
            //查看图片
            bigImg(imgSrc) {
                var imageUrls = new Array();
                imageUrls.push(imgSrc);
                vant.ImagePreview(imageUrls);
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
            //从URL获取状态参数
            // getStatusFromUrl: function() {
            //     var urlParams = new URLSearchParams(window.location.search);
            //     var statusParam = urlParams.get('status');
            //     if (statusParam && STATUS_CONFIG[statusParam]) {
            //         this.detailData.approvestatus = statusParam;
            //     }
            //     //根据状态设置对应的数据
            //     this.setDataByStatus();
            // },
            //根据状态设置数据
            // setDataByStatus: function() {
            //     //审核通过待办理时显示预约码
            //     if (this.detailData.approvestatus === STATUS.PENDING_HANDLE) {
            //         this.detailData.appointmentCode = '2601140909234';
            //         this.detailData.rejectReason = '';
            //     }
            //     //审核中时清空原因
            //     else if (this.detailData.approvestatus === STATUS.REVIEWING) {
            //         this.detailData.rejectReason = '';
            //         this.detailData.appointmentCode = '';
            //     }
            //     //已完成时清空原因
            //     else if (this.detailData.approvestatus === STATUS.COMPLETED) {
            //         this.detailData.rejectReason = '';
            //         this.detailData.appointmentCode = '';
            //     }
            //     //已失效时清空原因
            //     else if (this.detailData.approvestatus === STATUS.INVALID) {
            //         this.detailData.rejectReason = '';
            //         this.detailData.appointmentCode = '';
            //     }
            //     //被驳回或未通过时显示原因
            //     else {
            //         this.detailData.appointmentCode = '';
            //     }
            // },
            cancel: async function () {
                //TODO: 调用接口获取数据
                await $http(baseUrl.approveDataUrl, true, {
                    "PrimKeyId": this.primKeyId,
                    "appstatus": "11",
                    "msg": ""
                }, true)
                    .then(async res => {
                        if (res.retcode == 'success') {
                            vant.Toast({message:'撤回成功',duration:5000});
                            window.history.back();
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //返回上一页
            handleBack: function () {
                window.history.back();
            },
            handleCancel: function () {
                vant.Dialog.confirm({
                    title: '撤回后该笔临时提额申请变为已失效状态,已生成预约码失效；您确认要撤回吗?',
                    message: ""
                }).then(() => {
                    this.cancel();
                })
                .catch(()=>{     
                })
            },
            //重新申请
            handleReapply: function () {
                window.location.href = 'apply.html?PrimKeyId='+this.primKeyId;
            },
            //预览图片
            handlePreviewImage: function (index) {
                var images = this.detailData.imageList.map(function (item) {
                    return item.url;
                });
                vant.ImagePreview({
                    images: images,
                    startPosition: index
                });
            }
        }
    });
}
