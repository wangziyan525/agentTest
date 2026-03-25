function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'headofficecheck/userGetDetail.xa',    //详情接口
            toSubUrl: 'headofficecheck/firstCheckSubmit.xa',//评分接口

            upLoadImgUrl:'headofficecheck/uploadImage.xa',   //上传图片
            downLoadImgUrl:'headofficecheck/downloadImage.xa',   //下载图片

            id:'',
            infos:{},
            status:'',  //0未提交 1第一考核人第二考核人均未审核 2第一考核人未考核 3第二考核人未考核 4已完成

            titleText:'',   //标题文字
            examineTime:'',
            examinedPeopels:'',   //回显审核人
            monthTitle:'个人月度情况',

            active:0,     //tab索引

            isExexamined:true,  //是否已经填写
            exexaminedTimeType:0,  //考核情况 0-正在填写 1-待评分 2-已评分 3-完成
            examineingList:[{reason:''},{reason:''},{reason:''},{reason:''}],      //填写考核内容

            reason:'',
            scoreNum:'',

            upImgsList:[],

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
                            var infos = res.data;
                            _this.infos = res.data;
                            //状态
                            _this.status = res.data.datastatus;
                            //赋值
                            _this.examinePeople1 = infos.firstcheckIdcardname?infos.firstcheckIdcardname:'';//考核人1
                            _this.examinePeople2 = infos.secondcheckIdcardname?infos.secondcheckIdcardname:'';//考核人2
                            //审批人回显
                            _this.examinedPeopels = `${infos.firstcheckIdcardname}、${infos.secondcheckIdcardname}`;
                            //填写内容回显
                            _this.examineingList[0].reason = infos.monthwork?infos.monthwork:'';//
                            _this.examineingList[1].reason = infos.advantagesProgress?infos.advantagesProgress:'';//
                            _this.examineingList[2].reason = infos.lessReasons?infos.lessReasons:'';//
                            _this.examineingList[3].reason = infos.nextmonthPlan?infos.nextmonthPlan:'';//
                            //创建时间回显
                            var times = infos.submitdate?infos.submitdate:infos.createtime;
                            _this.examineTime = _this.readTime1(times);
                            times = _this.readTime(times);
                            //处理填报时间
                           _this.getFillInTime(times);
                            //照片回显
                            if(res.data.images != ''){
                                var arr = res.data.images.split(',');
                                for(var i=0;i<arr.length;i++){
                                    var obj = {};
                                    obj.path = './image/photo.png';
                                    obj.pathText = arr[i];
                                    obj.isShow = false;
                                    _this.upImgsList.push(obj);
                                };
                                for(var i=0;i<_this.upImgsList.length;i++){
                                    _this.getPic(_this.upImgsList[i].pathText,i);
                                }
                            };
                        }else if(res.retcode == 'param.error'){
                            $.alert('',res.retmsg);
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //处理填报时间
            getFillInTime(times){
                //当前时间
                var timesArr = times.split('-');
                var nowYear = timesArr[0];
                var nowMonth = timesArr[1];
                var lastYear = '';
                var lastMonth = '';
                var days = '';
                //上一个月时间
                if(nowMonth == 1){
                    lastYear = nowYear - 1;
                    lastMonth = '12';
                    days = '31';
                }else{
                    lastYear = nowYear;
                    lastMonth = nowMonth - 1;
                    days = new Date(lastYear,lastMonth,0).getDate();
                };
                if(lastMonth < 10){
                    lastMonth = '0' + lastMonth;
                };
                if(lastMonth == 12){
                    this.titleText = `${lastYear}年年度`;
                    this.monthTitle = '个人年度工作情况';
                }else if(lastMonth == 6){
                    this.titleText = `${nowYear}年半年度`;
                    this.monthTitle = '个人半年度工作情况';
                }else{
                    this.titleText = `${nowYear}年${lastMonth}月`;
                    this.monthTitle = '个人月度工作情况';
                }
            },

            //tab切换
            changeActive(i,v){
                this.$refs.mySwipe.swipeTo(i);
            },

            //轮播图切换
            monthChange(i,v){
                this.active = i;
            },


            //提交
            toExamine(){
                let params = {};
                params.id = this.id;
                if(this.reason == ''){
                    vant.Toast('请输入谈话要点');
                    return;
                }else{
                    params.firstcheckTalkingpoints = this.reason;
                };
                if(this.scoreNum == ''){
                    vant.Toast('请评分');
                    return;
                }else{
                    if(this.scoreNum > 100){
                        this.scoreNum == '';
                        vant.Toast('评分不能超过100分');
                        return;
                    }else{
                        params.firstcheckScore = this.scoreNum;
                    }
                };

                this.toSubInfo(params);
            },
            toSubInfo(params){
                let _this = this;
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


            //时间解析
            readYue(str){
                var arr = str.split('-');
                if(arr[1] == '07'){
                    return `${arr[0]}年员工半年度`;
                }else if(arr[1] == '12'){
                    return `${arr[0]}年员工年度`;
                }else{
                    return str;
                }
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

            //---------------------------------------------------------------------- 上传图片
            watchImg(index){
                var arr = [];
                for(var i=0;i<this.upImgsList.length;i++){
                    arr.push(this.upImgsList[i].path);
                }
                vant.ImagePreview({
                    images:arr,
                    startPosition:index,
                });
            },

            //图片下载
            getPic(str,i){
                let _this = this;
                let params = {};
                params.filename = str;
                $http(_this.downLoadImgUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var path = 'data:image/jpg;base64,'+ res.data;
                            _this.$set(_this.upImgsList[i],'path',path);
                            _this.$set(_this.upImgsList[i],'isShow',true);
                        }else if(res.retcode == 'param.error'){
                            $.alert('',res.retmsg);
                        }else{
                            $.alert('',res.retmsg,function(){
                                // WeixinJSBridge.call('closeWindow');
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

