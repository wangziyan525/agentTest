function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'dressCodeInspection/queryDataDetail.xa',//详情接口
            getFileDetailUrl: 'dressCodeInspection/getResources.xa',//下载资源接口

            infos:{},
            filesList:[],

            isShowPics:false,
            videoUrl:'',
            videoTitle:'',


        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },

        mounted: function () {

            //查询详情状态
            this.getDetail();


        },
        methods: {

            //查询详情状态
            getDetail(){
                let _this = this;
                let params = {};
                params.id = _this.getQueryString('id');
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data){
                                _this.infos = res.data.dressCodeInspection;
                                var arr = res.data.dressCodeInspection.resourcesList;
                                _this.filesList = arr;
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //解析1
            readWayCategory(str){
                if(str == '1'){
                    return '着装规范';
                }else if(str == '2'){
                    return '工作纪律';
                }else if(str == '3'){
                    return '服务意识';
                }else if(str == '4'){
                    return '卫生环境';
                }else if(str == '5'){
                    return '其他';
                }else{
                    return '--';
                }
            },

            //获取员工号
            getCode(arr){
                var str = '';
                for(var i=0;i<arr.length;i++){
                    str += arr[i].humancode + ',';
                };
                str = str.substring(0,str.length - 1);
                return str;
            },

            //获取员工名字
            getName(arr){
                var str = '';
                for(var i=0;i<arr.length;i++){
                    str += arr[i].name + ',';
                };
                str = str.substring(0,str.length - 1);
                return str;
            },

            //获取资源
            watchFiles(id,name,realName){
                let _this = this;
                let params = {};
                params.id = id;
                params.fileId = name;
                $https(_this.getFileDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data){
                                var host = window.location.host;
                                var href = window.location.href;
                                if(href.includes('uatqywx')){
                                    var habitat = '/uat_wxqy';
                                }else {
                                    var habitat = '/wxqy';
                                }
                                var path = 'https://' + host + habitat + '/upload/'+ res.data.filePath;
                               //图片
                                if(name.toLowerCase().includes('gif') ||
                                    name.toLowerCase().includes('png') ||
                                    name.toLowerCase().includes('jpeg') ||
                                    name.toLowerCase().includes('jpg') ||
                                    name.toLowerCase().includes('bmp')){
                                    vant.ImagePreview({
                                        images:[path],
                                        index:1
                                    });
                                }else {
                                    _this.videoUrl = path;
                                    _this.videoTitle = realName;
                                    _this.isShowPics = true;
                                }
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //清除视频
            clearVideo(){
                this.videoUrl = '';
                this.videoTitle = '';
                this.isShowPics = false;
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

