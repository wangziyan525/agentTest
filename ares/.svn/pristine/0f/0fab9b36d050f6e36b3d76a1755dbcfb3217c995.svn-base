function action() {
    new Vue({
        el: '#app',
        data: {


            //接口
            getDetailUrl: 'bail/xd/queryBusinessApplication.xa',  //详情接口

            batchNo:'',

            OrdrSeqNo:'',    //流水号
            approveTime:'',  //审批时间
            approveReason:'',  //审批意见
            approveStatus:'',  //审批状态

        },
        created() {

            // 调用水印
            __canvasWM({
                content: $.parseJSON($.cookie("user")).name,
            });

            //ios返回刷新
            window.addEventListener('pageshow', function (e) {
                if (e.persisted) {
                    window.location.reload();
                }
            });

            this.batchNo = this.getQueryString('batchNo');


        },
        mounted() {
            
            //获取详情
            this.getDetail();

        },
        methods: {

            //获取详情
            getDetail(){
                let _this = this;
                let params = {};
                params.FlwSeqNum = _this.batchNo;
                $http(_this.getDetailUrl,true,params, true,60)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var data = res.data;
                            _this.OrdrSeqNo = data.OrdrSeqNo;     //水流号
                            _this.approveTime = data.EmnAprvTm;     //审批时间
                            _this.approveReason = data.AprvCs;  //审批意见
                            _this.approveStatus = data.AprvSt;   //审批状态
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //完成
            over(){
                window.history.back();
            },
       
            //状态颜色
            readStatus(str){
                if(str){
                    if(str.includes('否决')){
                        return 'status2'
                    }else if(str.includes('再议')){
                        return 'status3'
                    }else{
                        return 'status1'
                    }
                }else{
                    return 'status1' 
                }
            },

             //状态图片
             readPic(str){
                if(str){
                    if(str.includes('否决') || str.includes('拒绝')){
                        return './image/nopass.png'
                    }else if(str.includes('再议')){
                        return './image/loadnow.png'
                    }else{
                        return './image/pass.png'
                    }
                }
            },

            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },

        },
    });
};


