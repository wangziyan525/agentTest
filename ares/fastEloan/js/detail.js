function initFun () {
    new Vue({
        el: '#app',
        data: {
            detailUrl:'kuaiEloan/findById.xa',
            customerObj:'',
            detail:"",
            approvalRecord:[],
            viewFlag:"", //0 白名单准入页面  1白名单审批页面
            tabIndex:'',
        },
        created () {
           this.tabIndex = this.getQueryString('tabIndex')?this.getQueryString('tabIndex'):0;
           this.viewFlag = this.getQueryString('viewFlag') ? this.getQueryString('viewFlag') : "";
           if(this.getQueryString('customerObj')){
               this.customerObj = JSON.parse(decodeURIComponent(this.getQueryString('customerObj')));
               this.getDetail()
           }
        },
        methods: {
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            // 获取详情
            getDetail() {
                var that = this;
                var params = {
                    "IdentNum": that.customerObj.IdentNum,
                    "ClientNm": that.customerObj.ClientNm
                }
                $http(that.detailUrl, true, params, false)
                    .then(res => {
                        that.detail = res.data;
                        that.approvalRecord = res.data.data;
                        var list = that.approvalRecord;
                        for(var i = 0;i<list.length;i++){
                            if(list[i].AprvSt==2&&i>0){
                                list[i-1]['flag'] = true
                            }
                        }
                    });
            },
            detailCloseTap(){
                var url = ""
                if(this.viewFlag==0){
                    url = './index.html'
                }else if(this.viewFlag==1){
                    url = './list.html'
                }
                window.location.replace(url)
            }
        }
    })
};
