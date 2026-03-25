var baseUrl = {
    queryTipsUrl: "lsteData/wxtxConData.xa", //查询温馨提示配置
};
var vm;
function initFun() {
    vm = new Vue({
        el: "#app",
        data: {
            // 温馨提示配置数据
            configData: {
                title: "",
                tipss: [],
            },
        },
        created() { },
        mounted() {
            // 查询温馨提示配置
            this.queryTipsConfig();
        },
        methods: {
            // 查询温馨提示配置
            queryTipsConfig() {
                $http(baseUrl.queryTipsUrl, true, { type: 2 }, true)
                    .then((res) => {
                        if (res.retcode == "success") {
                            this.configData = res.data;
                        }
                    })
                    .catch((err) => {
                        console.log("查询温馨提示配置失败", err);
                    });
            },
            //关闭弹窗
            handleClose() {
                wx.closeWindow();
            },
            //确认按钮
            handleConfirm() {
                window.location.href = `list.html?channel=1`;
            },
        },
    });
}
