var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {},
        created () {
        },
        methods: {
            handleToherf(val) {
                let url = base.domain + base.prefix
                if (val == 1) {
                    url = url + 'scanToleaders/assignList.html?v=1'
                } else if (val == 2) {
                    url = url + 'scanGetCust/list.html?v=1'
                } else if (val == 3) {
                    url = url + 'scanToleaders/headOfficeBranchList.html?v=1'
                } else if (val == 4) {
                    url = url + 'serviceSiteGovern/list.html?v=1'
                }
                window.location.href = url
            }
        }
    })
};
