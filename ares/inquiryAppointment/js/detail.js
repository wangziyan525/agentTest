function initFun () {
    new Vue({
        el: '#app',
        data: {
            detailDocUrl:"qywx/clinic/appointDocDetail.xa",
            detailDevUrl:'qywx/clinic/appointDeviceDetail.xa',
            detail:'',
            dateTime:"",
            week:'',
            tabIndex:'',
            id:""
        },
        created () {
            if(sessionStorage.getItem('tabIndex')){
                this.tabIndex = sessionStorage.getItem('tabIndex')
            }else{
                this.tabIndex = this.getQueryString('tabIndex')?this.getQueryString('tabIndex'):0;
            }
           console.log(this.tabIndex,'this.tabIndex')
           this.id = this.getQueryString('id')?this.getQueryString('id'):'';
           this.getDetail()
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
                var url = '';
                if(that.tabIndex==0){
                    url = that.detailDocUrl;
                }else if(that.tabIndex==1){
                    url = that.detailDevUrl;
                }
                var params = {
                    id:that.id
                }
                $http(url, true, params, false)
                    .then(res => {
                        if(that.tabIndex==0){
                            that.detail = res.data.docInfo;
                        }else if(that.tabIndex==1){
                            that.detail = res.data.deviceInfo;
                        }          
                        that.dateTime = that.detail.startApoint.split(' ');
                        that.week = that.getWeek(that.dateTime[0]);
                    });
            },
            getWeek(date){
                var week = ''
                var index = new Date(date);
                if(index.getDay() == 0){ week = "星期日"; }
                else if(index.getDay() == 1){ week = "星期一"; }
                else if(index.getDay() == 2){ week = "星期二"; }
                else if(index.getDay() == 3){ week = "星期三"; }
                else if(index.getDay() == 4){ week = "星期四"; }
                else if(index.getDay() == 5){ week = "星期五"; }
                else if(index.getDay() == 6){ week = "星期六"; }
                return week;
            }
        }
    })
};
