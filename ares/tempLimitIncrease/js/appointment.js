var baseUrl = {
    queryListUrl: "lsteData/queryList.xa", //列表查询
};
var vm;
function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            channel: '',
            //当前Tab
            activeTab: 'pending',
            activeTab2: 0,
            datastatus: '',
            //当前状态筛选
            activeStatus: 'pending_handle',
            //状态列表
            tabList: [
                //0-待审核;2-审核未通过;3-已审核通过待办理;1-已完成;9-已失效 10-被驳回
                { name: '已审核通过待办理', value: '3' },
                { name: '未通过', value: '2' },
                { name: '已完成', value: '1' },
                { name: '被驳回', value: '10' },
                { name: '已失效', value: '9' },
            ],
            //列表数据
            list: [],
            //加载更多
            loading: false,
            finished: false,
            //分页
            pageNum: 1,
            pageSize: 10
        },
        created: function () {
            // 从URL获取来源
            const urlParams = new URLSearchParams(window.location.search);
            this.channel = urlParams.get('channel')
        },
        mounted: function () {

        },
        methods: {
            //返回上一页
            handleBack: function () {
                window.history.back();
            },
            //Tab切换
            handleTabChange: function (tab) {
                if (this.activeTab === tab) return;
                this.activeTab = tab;
                //重置分页并刷新数据
                this.resetAndRefresh();
            },
            //Tab2切换
            handleTabChange1: function (tab) {
                if (this.activeTab2 === tab) return;
                this.activeTab2 = tab;
                //重置分页并刷新数据
                this.resetAndRefresh();
            },
            //重置分页并刷新数据
            resetAndRefresh: function () {
                this.pageNum = 1;
                this.list = [];
                this.finished = false;
                this.onLoad();

            },
            //加载更多
            onLoad: function () {
                this.loading = true;
                this.query();
            },
            //加载数据
             query() {
                if (this.activeTab == 'pending') {
                    this.datastatus = 0;
                } else {
                    this.datastatus = this.tabList[this.activeTab2].value
                }
                //获取当前 Tab 状态值
                 $http(baseUrl.queryListUrl, true, {
                    "channel": this.channel,
                    "datastatus": this.datastatus,
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize
                }, true)
                    .then(res => {
                        this.loading = false;
                        if (res.retcode == 'success') {
                            // 判断是否加载完成
                            if (res.data.length < 10) {
                                this.finished = true;
                            }
                            this.list = this.list.concat(res.data);
                            this.pageNum++;
                        } else {
                            this.finished = true;
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    })


            },
            //点击卡片
            handleCardClick: function (activeTab, item) {
                if (activeTab == 'approved') {
                    window.location.href = `detail.html?primKeyId=${encodeURIComponent(item.primKeyId)}&role=1`;
                } else {
                    //跳转到详情页
                    window.location.href = `reviewDetail.html?primKeyId=${encodeURIComponent(item.primKeyId)}`;
                }

            }
        }
    });
}
