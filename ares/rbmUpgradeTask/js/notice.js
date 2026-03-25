var app =new Vue({
    el:"#page",
    data:{
        url:{
            addNotice:"rmbUpgradeTask/addNotice.xa"//发布公告
        },
        content:'',// 公告内容
        inputNum:0,
        allNum:150
    },
    created(){

    },
    mounted(){

    },
    methods: {
        /**
         * 发布公告
         * */
        addNotice: function () {
            if (this.inputNum > this.allNum) {
                $.alert("", "公告内容不能超过" + this.allNum + "字");
                return;
            }

            let that = this;
            let param = {};
            param.content = that.content;
            $http(this.url.addNotice, true, param, false)
                .then(res => {
                    $.alert("", "公告已发布", function () {
                        that.content = '';
                        wx.closeWindow();
                    });
                });
        },
        /**
         * 监听文本框输入
         * */
        textareaInput: function () {
            this.inputNum = this.content.length;
        }
    }
});