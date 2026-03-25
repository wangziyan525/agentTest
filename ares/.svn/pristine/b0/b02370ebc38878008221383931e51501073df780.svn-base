function action() {
    new Vue({
        el: "#app",
        data: {

            getListUrl: 'xczxcustacqu/orgManagerOrgInfoList.xa',//列表接口

            keyword:'',
            list:[],
            isHaveList:false,
            noList:false,


        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {  


             //获取列表
             this.getList();

        },
        methods: {


            //获取列表
            getList(){
                this.list = []
                let params = {};
                params.keyword = this.keyword;
                $http(this.getListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data && res.data.length > 0){
                                this.isHaveList = true;
                                this.noList = false;
                                this.list = res.data
                            }else{
                                this.isHaveList = false;
                                this.noList = true;
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                        
                    });
            },

            //--------------------------------------------------------------------- 跳转
            toDetail(id){
                window.location.href = './detail.html?id=' + id;
            },

            toAddAgency(){
                window.location.href = './addAgency.html';
            },


        }
    });

}

