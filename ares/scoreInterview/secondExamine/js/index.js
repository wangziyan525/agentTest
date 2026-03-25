function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'headofficecheck/secondCheckQueryList.xa',//列表接口


            searchName:'',
            list:[],
            pagenum:1,//页码
            callbacktest: false, //分页开关
            haveList:false,
            noList:false,

            searchYearMonth:'',    //月份搜索
            isshowChooseTime:false, //时间选择遮罩层
            chooseTimeShow:false,  //时间插件
            currentDate: new Date(),
            minDate: new Date(2020,0),
            maxDate: null,
            active:0,


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

            //监听元素滚动高度
            handleScroll(){
                var mainH1 = this.$refs.main.scrollTop; //元素滚动高度
                var mainH2 = this.$refs.main.scrollHeight;//元素高度
                var windowH = $(window).height();  //可视
                if (windowH - 120  + mainH1 >= mainH2) {
                    if (this.callbacktest == true) {
                        this.callbacktest = false;
                        this.getList();
                    }
                }
            },

            //tab切换
            changeActive(i){
                this.newList();
                this.getList(); 
            },

            //搜索
            toSearch(){
                this.newList();
                this.getList(); 
            },

            //获取列表
            getList(){
                let _this = this;
                let params = {};
                params.pagenum = _this.pagenum;
                params.pagesize = 10;
                params.month = _this.searchYearMonth;
                if(_this.active == 0){
                    params.datastatus = '2';
                }else{
                    params.datastatus = '3';
                };
                params.name = _this.searchName;
                $http(_this.getListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data){
                                var arr = res.data;
                                if(arr.length == 0){
                                    if(_this.pagenum == 1){
                                        _this.haveList = false;
                                        _this.noList = true;
                                        _this.callbacktest = false;
                                    }
                                }else{
                                    _this.haveList = true;
                                    _this.noList = false;
                                    for (let i = 0; i < arr.length; i++) {
                                        _this.list.push(arr[i]);
                                    };
                                    if (arr.length >= 10) {
                                        _this.pagenum++;
                                        _this.callbacktest = true;
                                    } else {
                                        _this.callbacktest = false;
                                    };
                                };
                            }else if(res.retcode == 'param.error'){
                                $.alert('',res.retmsg);
                            }else{
                                _this.haveList = false;
                                _this.noList = true; 
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
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

            //去往详情
            toDetail(id){
                window.location.href = './detail.html?id=' + id;
            },

            //时间戳转化
            readTime(str){
                var myDate = new Date(str);
                var yy = myDate.getFullYear();
                var MM = myDate.getMonth() +1;
                var dd = myDate.getDate();
                var hh = myDate.getHours();
                var mm = myDate.getMinutes();
                var ss = myDate.getSeconds();
                if(MM<10){
                    MM = `0${MM}`
                }
                if(dd<10){
                    dd = `0${dd}`
                }
                if(hh<10){
                    hh = `0${hh}`
                }
                if(mm<10){
                    mm = `0${mm}`
                }
                if(ss < 10){
                    ss = `0${ss}`
                };
               
                return yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
            },

            //获取现在时间
            getNow(){
                let date = new Date;
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                month =(month<10 ? '0'+month:month);
                this.maxDate = new Date(year,month-1);
                this.searchYearMonth = `${year}-${month}`;
                this.getList();
            },

            //初始化列表
            newList(){
                this.list = [];
                this.pagenum = 1;
                this.callbacktest = false; //分页开关
                this.haveList = false;
                this.noList = false;
            },

         

        }
    });

}

