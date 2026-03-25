function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'headofficecheck/lineStatistics.xa',//列表接口
            upDownUrl: 'headofficecheck/lineExportResult.xa',//导出接口

            list:[],


            haveList:false,
            noList:false,

            searchYearMonth:'',    //月份搜索
            isshowChooseTime:false, //时间选择遮罩层
            chooseTimeShow:false,  //时间插件
            currentDate: new Date(),
            minDate: new Date(2020,0),
            maxDate: null,

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {

            //获取现在时间
            this.getNow();

        },
        methods: {

            //获取列表
            getList(){
                let _this = this;
                let params = {};
                params.month = _this.searchYearMonth;
                $http(_this.getListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data){
                                var arr = res.data;
                                if(arr.length == 0){
                                    _this.haveList = false;
                                    _this.noList = true;
                                }else{
                                    _this.haveList = true;
                                    _this.noList = false;
                                    _this.list = arr;
                                };
                            }else{
                                _this.haveList = false;
                                _this.noList = true;
                            }
                        }else if(res.retcode == 'param.error'){
                            $.alert('',res.retmsg);
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                                history.back();
                            });
                        }
                    });
            },

            //导出文件
            toUpDownFile(ids){
                let _this = this;
                let params = {};
                params.month = _this.searchYearMonth;
                $http(_this.upDownUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            $.alert('','导出成功',function(){

                            });
                        }else if(res.retcode == 'param.error'){
                            $.alert('',res.retmsg);
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //跳转
            toDetail(departmentname){
                window.location.href = './lineDetail.html?departmentname=' + encodeURI(departmentname) + '&month=' + this.searchYearMonth;
            },

            //打开时间选择
            showChooseTime(){
                this.chooseTimeShow = true;
            },

            //时间格式化
            formatter(type,val) {
                if(type=="year"){
                    return `${val}年`
                }else if(type=="month"){
                    return `${val}月`
                }
                return val;
            },

            //插件时间选择确定
            chooseDate(val,index){
                this.searchYearMonth = this.initDateTimer(val);
                this.chooseTimeShow = false;
                this.newList();
                this.getList();
            },

            //时间格式化
            initDateTimer (param) {
                var month = param.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }
                return param.getFullYear() + '-' + month;
            },


            //获取现在时间
            getNow(){
                let date = new Date;
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                month =(month<10 ? '0'+month:month);
                this.searchYearMonth = year + '-' + month;
                this.maxDate = new Date(year,month-1);
                this.maxDateText = year + '-' + month;
                //获取列表
                this.newList();
                this.getList();
            },

            //初始化列表
            newList(){
                this.list = [];
                this.haveList = false;
                this.noList = false;
            },


        }
    });

}

