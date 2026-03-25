var baseUrl = {
  queryDetailUrl: "lsteData/wxtxConData.xa", //列表查询  
};

var vm;
function initFun() {
  vm = new Vue({
    el: "#app",
    data: {
      // 提示标题
      title: "",
      // 提示内容列表
      tipsList: [
      ],
    },
    computed: {
      // 是否有内容
      hasContent: function () {
        return this.tipsList.some(function (item) {
          return item.content.trim() !== "";
        });
      },
    },
    methods: {
      // 添加一条提示
      addTipItem: function () {
        this.tipsList.push({ content: "" });
      },
      // 删除一条提示
      deleteTipItem: function (index) {
        if (this.tipsList.length > 1) {
          this.tipsList.splice(index, 1);
        }
      },
      // 保存配置
      handleSubmit: function () {
        // 验证标题
        if (!this.title.trim()) {
          vant.Toast("请输入提示标题");
          return;
        }
        // 验证内容
        var validTips = this.tipsList.filter(function (item) {
          return item.content.trim() !== "";
        });
        if (validTips.length === 0) {
          vant.Toast("请至少输入一条提示内容");
          return;
        }
        // 组装数据
        var configData = {
          title: this.title,
          type: 1,
          tips: validTips.map(function (item) {
            return item.content;
          }),
        };
        $http(baseUrl.queryDetailUrl, true, configData, true)
          .then(res => {
            if (res.retcode == 'success') {
              vant.Toast("配置成功");
              wx.closeWindow();
            } else {
              $.alert("", res.retmsg, function () {
                wx.closeWindow();
              });
            }
          });
      },
    },
  });
}
