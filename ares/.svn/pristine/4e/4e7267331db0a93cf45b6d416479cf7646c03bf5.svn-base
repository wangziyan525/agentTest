var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getListTechManagerUrl: 'qywx/techManager/getListTechManager.xa', // 列表
            },
            searchList: {
                string: ''
            },
            listLoading: false,
            listFinished: false,
            refreshing: false,
            noList: false,
            dataList: [
                // {
                //     orgName: '高陵阳光村镇银行崇皇支行',
                //     name: '李程垒',
                //     humanCode: '820078',
                //     rolename: '支行安全员',
                //     orgID: '262'
                // },
                // {
                //     orgName: '高陵阳光村镇银行崇皇支行',
                //     name: '李程垒',
                //     humanCode: '820078',
                //     rolename: '支行安全员',
                //     orgID: '262'
                // }
            ]
        },

        created() {
            this.getDateList()
        },
        
        methods: {
            getDateList () {
                $http(this.baseUrl.getListTechManagerUrl,true, this.searchList, true)
                .then(res => {
                    this.noList = false;
                    if (res.retcode == 'success') {
                        this.dataList = res.data;
                    } else {
                        this.dataList = [];
                        $.alert("",res.retmsg, function () {
                            if (res.retcode == '-1') {
                                wx.closeWindow();
                            }
                        });
                    }

                    if (this.dataList.length == 0) {
                        this.noList = true;
                    }
                });
            },
            searchHander () {
                this.dataList = [];
                this.getDateList();
            },

            goPage (param) {
                window.location.href = `details.html?id=${param.id}`;
            }
        }
    })
};
