var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getMyReservedListUrl: 'qywx/newMeet/getWeekPcList.xa', // 查询会议位置
            },
            searchList: {
                theme: '',
                meetingDate: formatDate(new Date()),
                pageIndex: 1,
                pageSize: 10
            },
            popupTime: {
                show: false,
                currentDate: new Date()
            },
            listLoading: false,
            listFinished: false,
            refreshing: false,
            noList: false,
            dataList: [
            ]
        },

        created() {
            // this.getDateList()
        },
        
        methods: {
            searchHandle () {
                this.popupTime.show = true;
            },

            onLoad () {
                this.loading = true;
                
                this.getDateList()
            },
            getDateList () {
                $http(this.baseUrl.getMyReservedListUrl,true, this.searchList, false)
                .then(res => {
                    if (this.refreshing) {
                        
                        this.refreshing = false;
                    }

                    for (let i = 0; i < res.data.length; i ++) {
                        this.dataList.push(res.data[i])
                    }

                    this.listLoading = false;

                    if (10 > res.data.length) {
                        this.listFinished = true;
                    } else {
                        this.searchList.pageIndex++
                    }
                    if (this.searchList.pageIndex == 1 && this.dataList.length == 0) {
                        this.noList = true;
                    }
                });
            },
            onRefresh () {
                this.listFinished = false;
                this.loading = true;
                this.searchList.pageIndex = 1;
                this.dataList = [];
                this.noList = false;
                // this.getDateList()
            },
            searchHander () {
                this.searchList.pageIndex = 1;
                this.dataList = [];
                this.noList = false;
                this.onLoad();
            },

            popupTimeConfirm (param) {
                this.searchList.meetingDate = formatDate(param);
                this.popupTime.show = false;
                this.searchList.pageIndex = 1;
                this.dataList = [];
                this.noList = false;
                this.onLoad();
            },

            goPage (param) {
                window.location.href = `details.html?meetingInfoId=${param.meetingInfoId}`;
                // window.location.href = `details.html?meetingInfoId=${BigInt(param.meetingInfoId).toString()}`;
            }
        }
    })
};

function formatDate (param) {
    let year, month, date;
    year = param.getFullYear();
    if (param.getMonth() + 1 > 9) {
        month = param.getMonth() + 1;
    } else {
        month = '0' + (param.getMonth() + 1);
    }
    if (param.getDate() > 9) {
        date = param.getDate()
    } else {
        date = '0' + param.getDate()
    }
    return `${year}-${month}-${date}`;
};
