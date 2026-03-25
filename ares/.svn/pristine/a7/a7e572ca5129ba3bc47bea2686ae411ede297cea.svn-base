function action() {
    new Vue({
        el: "#app",
        data: {

            toSubUrl: 'headofficecheck/firstCheckSubmit.xa',//评分接口

            id:'',
           
            reason:'',
            scoreNum:'',
            

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {

            this.id = this.getQueryString('id');
         

        },
        methods: {


            //提交
            topingfen(){
                if(this.reason == ''){
                    vant.Toast('请输入意见');
                    return;
                }

                if(this.scoreNum == ''){
                    vant.Toast('请评分');
                    return;
                }
                if(this.scoreNum > 100){
                    this.scoreNum == '';
                    vant.Toast('评分不能超过100分');
                    return;
                }
                let _this = this;
                let params = {};
                params.id = _this.id;
                params.firstcheckScore = _this.scoreNum;
                params.firstcheckTalkingpoints = _this.reason;
                $http(_this.toSubUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            $.alert('','提交成功',function(){
                                window.location.href = './success.html';
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

