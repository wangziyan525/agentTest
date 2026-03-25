var url = base.context+'test/getTestData.xa'
function action() {
    new Vue({
        el: '#app',
        data: {




        },
        created() {

            this.getInfos
        },
        mounted() {

          //获取详情

        },
        methods: {



            //获取用户信息
            getInfos(){
                let _this = this;
                let params = {};

                $http(url, true,params, true)
                .then(res => {
                    if (res.retcode == 'success') {

                    } else {

                    }
                });
            },


          

        },
    });
};


