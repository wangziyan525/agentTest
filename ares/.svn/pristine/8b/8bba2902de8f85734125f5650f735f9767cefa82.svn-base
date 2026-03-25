var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                tetTechManegerUrl: 'qywx/techManager/tetTechManeger.xa', // 详情
                deleteUrl: 'qywx/techManager/delete.xa' // 取消会议
            },
            dataInfo: {

            }
        },
        created () {
            this.tetTechManeger();
        },
        methods: {
            tetTechManeger () {
                $http(this.baseUrl.tetTechManegerUrl,true, {
                    id: GetQueryString('id')
                }, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.dataInfo = res.data;
                    } else {
                        $.alert("",res.retmsg, function () {
                            if (res.retcode == '-1') {
                                wx.closeWindow();
                            }
                            
                        });
                    }
                });
            },

            deleteHandle () {
                let that = this;
                // let meetingInfoId = BigInt(that.dataInfo.meetingInfoId).toString()
                $.confirm("", "确认删除", function () {
                    $http(that.baseUrl.deleteUrl,true, {
                        id: that.dataInfo.id
                    }, false)
                    .then(res => {
                        $.alert("",res.retmsg, function () {
                            wx.closeWindow();
                        });
                    });
                })
            }
        }
    })
}
