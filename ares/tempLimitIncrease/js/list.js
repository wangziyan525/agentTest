var baseUrl = {
    queryListUrl: "lsteData/queryList.xa", //列表查询
};
var vm;
function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            activeTab: 0,
            tabList: [
                //0-待审核;2-审核未通过;3-已审核通过待办理;1-已完成;9-已失效 10-被驳回
                { name: '待审核', value: '0' },
                { name: '已审核通过待办理', value: '3' },
                { name: '未通过', value: '2' },
                { name: '已完成', value: '1' },
                { name: '被驳回', value: '10' },
                { name: '已失效', value: '9' },
            ],
            list: [],
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 10,
            channel: ''
        },
        created() {
            // 从URL获取来源
            const urlParams = new URLSearchParams(window.location.search);
            this.channel = urlParams.get('channel')
        },
        mounted() {
            this.query()
        },
        methods: {
            //返回上一页
            handleBack() {
                window.history.back();
            },
            //切换Tab
            handleTabChange(index) {
                this.activeTab = index;
                this.list = [];
                this.pageNum = 1;
                this.finished = false;
                this.loadData();
            },
            loadData(){
                this.loading = true ;    
                this.query()
            },
            //加载数据
            query() {
                
                //获取当前 Tab 状态值
                const status = this.tabList[this.activeTab].value;
                //TODO: 调用接口获取数据
                 $http(baseUrl.queryListUrl, true, {
                    "channel": this.channel,
                    "datastatus": status,
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
                    });
            },
            //点击列表项
            handleItemClick(item) {
                window.location.href = `detail.html?primKeyId=${encodeURIComponent(item.primKeyId)}&role=2`;
            },
            //新增申请
            handleAdd() {
                window.location.href = `apply.html`;
            }
        }
    });
}
