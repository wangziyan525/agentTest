function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'accessControl/visited/findList.xa',//生成二维码


            active:0, 
            pagenum:1,//页码
            callbacktest: false, //分页开关
            list:[],
            isHaveList:false,
            noList:false,

            //0:初始化(创建二维码) 1:拜访人员提交 2:拜访申请通过 3:申请作废 

            scrollTop:0,

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {

            this.getList();
            

        },
        methods: {

            //监听元素滚动高度
            handleScroll(){
                var mainH1 = this.$refs.main.scrollTop; //元素滚动高度
                var mainH2 = this.$refs.main.scrollHeight;//元素高度
                var windowH = $(window).height();  //可视
                if (windowH + 50 + mainH1 >= mainH2) {
                    if (this.callbacktest == true) {
                        this.callbacktest = false;
                        this.getList();
                    }
                }

            },
            //获取列表
            getList(){
                if(this.pagenum == 1){
                    this.list = [];
                };
                let _this = this;
                let params = {};
                if(_this.active == 0){
                    params.approve_type = '1';
                }else if(_this.active == 1){
                    params.approve_type = '0';
                }else if(_this.active == 2){
                    params.approve_type = '2';
                };
                params.pageNum = _this.pagenum;
                params.pageSize = 10;
                $http(_this.getListUrl,true,params, true)
                .then(res => {
                    if(res.retcode == 'success'){
                        var arr = res.data.listData.voList;
                        if(arr){
                            if(arr.length == 0){
                                if(_this.pagenum == 1){
                                    _this.isHaveList = false;
                                    _this.noList = true;
                                    _this.callbacktest = false;
                                }
                            }else{
                                _this.isHaveList = true;
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
                        }else{
                            _this.isHaveList = false;
                            _this.noList = true; 
                        }
                    }else{
                        $.alert('',res.retmsg,function(){
                            window.close();
                        });
                    }
                });
            },

            //详情
            toDetail(it){
                window.location.href = './visitDetail.html?id=' + it.id;
            },

            //tab切换
            changeActive(){
                this.pagenum = 1;
                this.getList();
            },

        }
    });

}

