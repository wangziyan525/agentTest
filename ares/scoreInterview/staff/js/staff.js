function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'headofficecheck/userGetRecord.xa',//列表接口
           
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
            maxDateText:'',

            isShowEdit:false,  //是否有底部填写按钮
            isSave:false,  //是否是保存没提交

            role:'',   //1-总行 2-分支行

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
                if (windowH - 20 + mainH1 >= mainH2) {
                    if (this.callbacktest == true) {
                        this.callbacktest = false;
                        this.getList();
                    }
                }
            },

            //获取列表
            getList(){
                let _this = this;
                let params = {};
                params.pagenum = _this.pagenum;
                params.pagesize = 10;
                params.month = _this.searchYearMonth;
                $http(_this.getListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data){
                                _this.role = res.data.userInfo;
                                var arr = res.data.recordInfo;
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
                                //是否可编辑填写
                                _this.isCanEdit();
                            }else{
                                _this.haveList = false;
                                _this.noList = true; 
                            }
                        }else if(res.retcode == 'param.error'){
                            $.alert('',res.retmsg);
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //是否可编辑填写
            isCanEdit(){
                if(this.list.length == 0){
                    this.isShowEdit = true;
                }else{
                    var firstType = this.list[0].datastatus;
                    var firstDate = this.list[0].submitdate?this.list[0].submitdate:this.list[0].createtime;
                    var first= this.readTime(firstDate).replace('-','');
                    //逻辑：获取今日月份，看list第一条是否是当月，没有----- 需要填写   有----- 看它datastatus是不是未提交，需要填写 
                    var now = new Date();
                    var nowYear = now.getFullYear();
                    var nowMonth = now.getMonth() + 1;
                    nowMonth = nowMonth>10?nowMonth:'0'+nowMonth;
                    var nowYearMonth = nowYear +'' + nowMonth;
                    if(first != nowYearMonth){
                        this.isShowEdit = true;
                        this.isSave = false;
                    }else{
                        if(this.role == '1'){
                            if(firstType == 0){
                                this.isShowEdit = true;
                                this.isSave = true;
                            }else{
                                this.isShowEdit = false;
                                this.isSave = false;
                            }
                        }else{
                            this.isShowEdit = true;
                            this.isSave = true;
                        }
                    }
                }
                
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

            //时间戳转化
            readTime(str){
                var times = new Date(str);
                var year = times.getFullYear();
                var month = times.getMonth() + 1;
                if(month < 10){
                    month = '0' + month;
                };
                return year + '-' + month;
            },

            readTime1(str){
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

            //时间解析
            readYue(str){
                var times = new Date(str);
                var year = times.getFullYear();
                var month = times.getMonth() + 1;
                month = month<10?'0'+month:month;
                var lastYear = year - 1;
                if(month == '07'){
                    return `${year}年员工半年度`;
                }else if(month == '01'){
                    return `${lastYear}年员工年度`;
                }else{
                    return `${year}年${month}月`;
                }
            },

            //跳转(总行)
            toTian(){
                if(this.isSave){
                    window.location.href = './headOfficePosition.html?id=' + this.list[0].id;
                }else{
                    window.location.href = './headOfficePosition.html';
                };
            },
            toDetail(type,id){
                if(this.role == '1'){
                    if(type == '0'){
                        window.location.href = './headOfficePosition.html?id=' + id;
                    }else{
                        window.location.href = './headOfficeDetail.html?id=' + id;
                    };
                };
                if(this.role == '2'){
                    if(type == '0'){
                        window.location.href = './branchPosition.html?id=' + id;
                    }else{
                        window.location.href = './branchDetail.html?id=' + id;
                    };
                }
            },
             //跳转(分支行)
            toTian1(){
                // if(this.isSave){
                //     window.location.href = './branchPosition.html?id=' + this.list[0].id;
                // }else{
                    window.location.href = './branchPosition.html';
                // };
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
                this.pagenum = 1;
                this.callbacktest = false; //分页开关
                this.haveList = false;
                this.noList = false;
            },

        }
    });

}

