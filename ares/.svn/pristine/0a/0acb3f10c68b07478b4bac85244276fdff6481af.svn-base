function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'headofficecheck/rzManagerDeptUserList.xa',//列表接口
            upDownUrl: 'headofficecheck/rzExportCheckTable.xa',//导出接口


            departmentname:'',
            month:'',
           
            list:[],
            pagenum:1,//页码
            callbacktest: false, //分页开关
            haveList:false,
            noList:false,

            isExid:false,

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {

            this.departmentname = decodeURI(this.getQueryString('departmentname'));
            this.month = this.getQueryString('month');


            document.title = this.departmentname;

            //获取列表
            this.getList();

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
                params.pagesize = 20;
                params.month = _this.month;
                params.departmentname = _this.departmentname;
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
                                    arr = arr.map((it,i)=>{
                                        return{
                                            isCanChoosed:it.datastatus==4?true:false,
                                            isChoosed:false,
                                            ...it
                                        }
                                    })
                                    for (let i = 0; i < arr.length; i++) {
                                        _this.list.push(arr[i]);
                                    };
                                    if (arr.length >= 20) {
                                        _this.pagenum++;
                                        _this.callbacktest = true;
                                    } else {
                                        _this.callbacktest = false;
                                    };
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
                            });
                        }
                    });
            },

            //选择导出
            toChooseList(i){
                this.$set(this.list[i],'isChoosed',!this.list[i].isChoosed);
            },

            //导出
            toUpDown(){
                var ids = '';
                for(var i=0;i<this.list.length;i++){
                    if(this.list[i].isChoosed){
                        ids += this.list[i].humancode + ",";
                    }
                };
                if(ids == ''){
                    vant.Toast('请选择需导出的人员');
                    return;
                }else{
                    ids = ids.substring(0,ids.length-1);
                }
                this.toUpDownFile(ids);
            },

            //导出文件
            toUpDownFile(ids){
                let _this = this;
                let params = {};
                params.month = _this.month;
                params.userids = ids;
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


            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
         

        }
    });

}

