var baseUrl = {
    queryListUrl: 'partyNew/queryLeaderSuggestTempList.xa',//查询列表
    exportUrl: 'partyNew/queryLeaderSuggestTempDown.xa',//导出
}
var vm

function initFun() {
    vm = new Vue({
        el: "#app",
        data: {
            title_id:"",
            list:[
            ],

        },
        created() {
            var that=this;
            var title_id=GetQueryString("title_id")?GetQueryString("title_id"):"";
            that.title_id=title_id;
            that.queryList();
            $("#app").show();

        },
        mounted() {


        },
        methods: {

            async exports(){
                var that = this;
                var param = {};

                param.title_id = that.title_id;

                const res = await $http(baseUrl.exportUrl, true, param, true);

                if (res.retcode === 'success') {

                    vant.Dialog.alert({
                        message: "导出成功，请查看"
                    }).then(() => {
                    });
                   

                } else {
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    });
                }
            },
            

            /**
             * 查询详情
             */
            async queryList() {

                var that = this;
                var param = {};

                param.title_id = that.title_id;

                const res = await $http(baseUrl.queryListUrl, true, param, true);

                if (res.retcode === 'success') {


                    var list = res.data;
                    that.list = list;

                    that.$forceUpdate();
                    $("#app").show();

                } else if(res.retcode === '-2'){
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }else {
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    });
                }

            },


            /**
             * 跳转
             */
             toDetail(id,title_id) {
                window.location.href="index.html?type=3&id="+id+"&title_id="+title_id;

            },


            
            

            


        }


    })
}





