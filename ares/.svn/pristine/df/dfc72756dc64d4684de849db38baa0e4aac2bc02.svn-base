var baseUrl = {
    getRecordList: 'dwDate/queryList.xa',
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            time:'',
            /*paging: {
                loading: false,
                finished: false,
                text: '没有更多了',
                page: 1,
                pageSize: 10,
            },*/
            listLoading: false,
            listFinished: false,
            list:[],
            moreStatus: false,
            noMoreStatus: false,
            nodata: false,
            searchList: {
                pageIndex: 1,
                pageSize: 10
            },

        },
        created(){
        },
        mounted(){
            this.getRecordList();
            this.time = this.getQueryString('time');
        },
        methods:{
            addMore() {
                this.getRecordList()
            },
            onLoad () {
                // this.loading = true;
                
                this.getRecordList()
            },
            //跳转详情页
        toDetail(item){
            localStorage.setItem('UserDetail',JSON.stringify(item));
            window.location.href = "./statement.html";
        },
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            /**
             * 获取机构列表
             */

             
            getRecordList() {
                $http(baseUrl.getRecordList,true, this.searchList, false)
                .then(res => {
                    // if(res.data){
                    //     for (let i = 0; i < res.data.length; i ++) {
                    //         this.list.push(res.data[i])
                    //     }   
                    // }
                   

                    // this.listLoading = false;

                    // if (10 > res.data.length) {
                    //     this.listFinished = true;
                    // } else {
                    //     this.searchList.pageIndex++
                    // }
                    // if (this.searchList.pageIndex == 1 && this.list.length == 0) {
                    //     this.noList = true;
                    // }
                    if (res.data != '' && res.data != null && res.data != undefined) {
                        this.nodata = false;
    
                        if (res.data.length < this.searchList.pageSize) {
                            this.noMoreStatus = true;
                            this.moreStatus = false;
                        } else {
                            this.noMoreStatus = false;
                            this.moreStatus = true;
                            this.searchList.pageIndex++;
                        }
                        var newDataList = [];
                        var dataList = res.data;
    
                        newDataList = dataList ? dataList : [];
                        this.list = this.list.concat(newDataList);
                    } else {
                        if (this.searchList.pageIndex > 1) {
                            this.noMoreStatus = true;
                            this.moreStatus = false;
                            this.nodata = false;
                        } else {
                            this.noMoreStatus = false;
                            this.moreStatus = false;
                            this.nodata = true;
                        }
    
                    }
                });
            },

            
            jump(item){
                window.location.href = 'detail.html?buDescr='+item.buDescr+'&dfFlag=1'+'&ssbm='+item.ssbm+'&time='+this.time
            },
        }
    })
}



