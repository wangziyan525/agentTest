function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'bankTycheck/queryDataById.xa',  //详情接口
            toSubmitUrl: 'bankTycheck/approveData.xa',  //提交接口
            getImgPathUrl: 'faceExamineCheck/getMsgBase64.xa',  //获取图片


            transeq:'',
            infos:{},
            picList:[],
            
            reason:'',
            isPass:true, //是否同意
            isApproved:false, //是否审批过了

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

            this.id = this.getQueryString('transeq');

        },
        mounted: function () {

            //获取详情
            this.getDetail();


        },
        methods: {

            //获取详情
            getDetail(){
                let _this = this;
                let params = {};
                params.id = _this.id;
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.infos = res.data;
                            _this.id = res.data.id;
                            if(res.data.approvestatus == '0'){
                                _this.isApproved = false;
                            }else{
                                _this.isApproved = true;
                            };
                            _this.picList = res.data.checkfiles.map((it,i)=>{
                                return{
                                    picPath:'./image/photo.png',
                                    isShowGif:true,
                                    file:it,
                                }
                            });
                            _this.downImgs();
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //处理图片，主要是为了懒加载2
            downImgs(){
                for(var i=0;i<this.picList.length;i++){
                   this.getPic(this.picList[i].file,i);
                }
            },

            //获取图片
            getPic(str,i){
                let _this = this;
                let params = {};
                params.fileName = str;
                $http(_this.getImgPathUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var path = 'data:image/jpg;base64,'+ res.data;
                            _this.$set(_this.picList[i],'picPath',path);
                            _this.$set(_this.picList[i],'isShowGif',false);
                        }else if(res.retcode == 'param.error'){
                            $.alert('',res.retmsg);
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },
            watchImg(str,i){
                let _this = this;
                let params = {};
                params.fileName = str;
                $http(_this.getImgPathUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var path = 'data:image/jpg;base64,'+ res.data;
                            var arr = [];
                            arr.push(path);
                            vant.ImagePreview({
                                images:arr,
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

            //同意拒绝
            toPass(){
                this.isPass = !this.isPass;
            },

            //提交
            toSub(){
                var str = '';
                if(!this.isPass && this.reason == ''){
                    vant.Toast('请输入拒绝理由');
                    return false
                }; 
                let _this = this;
                let params = {};
                if(_this.isPass){
                    params.approve_state = '1';
                    str = '审批通过';
                }else{
                    params.approve_state = '2';
                    str = '审批拒绝';
                }
                params.id = _this.id;
                params.reason = _this.reason;
                params.transeq = _this.transeq;
                $http(_this.toSubmitUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            $.alert('',str,function(){
                               //获取详情
                               _this.getDetail();
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

            //时间戳转化
            readTime(str){
                var times = new Date(str);
                var year = times.getFullYear();
                var month = times.getMonth() + 1;
                if(month < 10){
                    month = '0' + month;
                };
                var day = times.getDate();
                if(day < 10){
                    day = '0' + day;
                };
                var hours = times.getHours();
                var min = times.getMinutes();
                var scend = times.getSeconds();
                return year + '-' + month + '-' + day + ' ' +  hours +':'+  month +':'+  month;
            },

           
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            
            //添加千分位
            numFormat(n) {
                //将数字转化为字符串
                if(n == '' || n==undefined){
                    return '';
                }else{
                    let num = n.toString();
                    let isFu = false;
                    if (num < 0) {
                        isFu = true;
                        num = num.replace(/-/g, '');
                    }
                    //判断小数点截取小数点后面的数字
                    let after = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : '';
                    //如果存在小数点
                    let numArr = num.indexOf('.') > 0 ? num.substring(0, num.indexOf('.')).split('') : num.split('');
                    var str = '';//字符串累加
                    for (var i = numArr.length - 1, j = 1; i >= 0; i--, j++) {
                        if (j % 3 == 0 && i != 0) {//每隔三位加逗号，过滤正好在第一个数字的情况
                            str += numArr[i] + ",";//加千分位逗号
                            continue;
                        }
                        str += numArr[i];//倒着累加数字
                    }
                    if (isFu) {
                        return '-' + str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串

                    } else {
                        return str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串
                    }
                }
            },

        }
    });

}

