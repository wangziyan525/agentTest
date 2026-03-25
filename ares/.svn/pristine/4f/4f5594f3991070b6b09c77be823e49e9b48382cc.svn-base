var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                findSysNameUrl: 'rmbUpgradeTask/findSysName.xa'
            },
            sysList: [],
        },
        created () {
            this.findSysName();
        },

        methods: {
            findSysName () {
                $http(this.baseUrl.findSysNameUrl,true,{}, false)
                .then(res => {
                    this.sysList = res.data.map(item => {
                        return {
                            sysNumber: item,
                            status: false
                        }
                    })
                });
            },
            equipmentHandle (item, index) {
                // this.sysList = this.sysList.map(item => {
                //     return {
                //         ...item,
                //         status: false
                //     }
                // })
                // this.sysList[index].status = true;
                window.location.href = 'indexNew.html?sysNumber=' + item.sysNumber;
            },
        }
    })
};
