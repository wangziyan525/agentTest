var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                queryDataDetailUrl: 'qywx/learnVideo/queryDataDetail.xa', // 查询观看记录
            },
            dataDetails: {}
        },
        created () {
            this.getQueryDataDetail()
        },

        methods: {
            getQueryDataDetail () {
                let params = {
                    videoId: GetQueryString('videoId')
                }
                $http(this.baseUrl.queryDataDetailUrl,true,params, true)
                .then(res => {
                    console.log(res)
                    if (res.retcode == '0') {
                        this.dataDetails = { ...res.data }
                    } else {
                        $.alert(res.retmsg);
                    }
                })
            }
        }
    })
};
