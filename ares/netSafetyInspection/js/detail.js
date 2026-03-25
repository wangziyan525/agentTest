var baseUrl = {
    downLoadImgUrl:'/safetyCheck/downCheckFile.xa',//下载图片
    getSubmitSafetyCheckInfo:"safetyCheck/getSubmitSafetyCheckInfo.xa",
    downloadFile:'safetyCheck/downloadFile.xa',//下载图片
    downloadSafetyCheckVideo:'safetyCheck/downloadSafetyCheckVideo.xa',//下载视频
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            id:'',
            windowInfo:{status:'1', showFlag:'0',imgList:[],describe:'',mediaIds:[],isShow:'0'},
            defendInfo:{status:'1', showFlag:'0',imgList:[],describe:'',mediaIds:[],isShow:'0'},
            railingInfo:{status:'1', showFlag:'0',imgList:[],describe:'',mediaIds:[],isShow:'0'},
            powerInfo:{status:'0', showFlag:'0',imgList:[],describe:'',mediaIds:[],isShow:'0'},
            selfEqInfo:{status:'1', showFlag:'0',imgList:[],describe:'',mediaIds:[],isShow:'0'},
            monitorInfo:{status:'1', showFlag:'0',imgList:[],describe:'',mediaIds:[],isShow:'0'},
            fireInfo:{status:'1', showFlag:'0',imgList:[],describe:'',mediaIds:[],isShow:'0'},
            pickUpInfo:{status:'1', showFlag:'0',imgList:[],describe:'',mediaIds:[],arrive:'',arriveVideo:'',isShow:'0'},

            tab:'0',
            imgList:[],
            refuseInfo:'',

            userName:'',
            dfFlag:'0',
            time:'',
            dataInfoShow:true,
            buDescr:'',
            ssbm:'',
            path:'',
            videoKey:0,
            videoShow:false,
            titleTip:''
        },
        created() {
        },
        mounted() {
            this.id = this.GetQueryStrings('id');
            this.time = this.GetQueryStrings('time');
            this.dfFlag = this.GetQueryStrings('dfFlag');

            this.buDescr = this.GetQueryStrings('buDescr') ? decodeURI(this.GetQueryStrings('buDescr')) : '';
            this.ssbm = this.GetQueryStrings('ssbm') ? decodeURI(this.GetQueryStrings('ssbm')) : '';
            var buDescr = '';
            var ssbm = '';
            if(this.GetQueryStrings('buDescr')=='' || this.GetQueryStrings('buDescr')==null){
                buDescr = $.parseJSON($.cookie("user")).buDescr;
            }else{
                buDescr = decodeURI(this.GetQueryStrings('buDescr'))
            }
            if(this.GetQueryStrings('ssbm')=='' || this.GetQueryStrings('ssbm')==null){
                ssbm = $.parseJSON($.cookie("user")).ssbm;
            }else{
                ssbm = decodeURI(this.GetQueryStrings('ssbm'))
            }

            this.titleTip = buDescr+'-'+ssbm+'-'+this.GetQueryStrings('time')
            this.getDetail();
        },
        methods: {

            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            chooseTab(param){
                var that=this;
                that.tab=param;
                that.userName = '';
                that.getDetail()
            },

            showMore(type){
                var that = this
                if(that[type].showFlag=='0'){
                    that[type].showFlag='1';
                    if(that[type].mediaIds.length>0){
                        that.downLoadImgUrl(type,that[type].mediaIds)
                    }
                    if(type == 'pickUpInfo'){
                        if(that[type].arriveVideo){
                            that.downloadFile(that[type].arriveVideo)
                        }

                    }

                }else{
                    that[type].showFlag='0'
                }

            },

            async getDetail(){
                var that=this;
                var param={};
                param.date=that.time;
                param.timeStatus=that.tab;
                param.ssbm=that.ssbm;
                param.buDescr=that.buDescr;
                param.submitStatus ='1';

                const res = await $http(baseUrl.getSubmitSafetyCheckInfo, true,param, true);
                if (res.retcode === 'success'){
                    if(res.data.safetyCheckListResults=='' || res.data.safetyCheckListResults==null || res.data.safetyCheckListResults==undefined){
                        that.dataInfoShow = false
                    }else{
                        that.dataInfoShow = true;
                        that.userName = res.data.userName;
                        that.assembleData(res.data.safetyCheckListResults);
                    }

                }else{
                    $.alert("",res.retmsg,function () {
                        that.dataInfoShow = false
                    });
                }
            },

            assembleData(dataInfo){
                var that = this;
                for(var i=0;i<dataInfo.length;i++){
                    if(dataInfo[i].sequence=="A"){
                        that.windowInfo.status = dataInfo[i].status;
                        that.windowInfo.describe = dataInfo[i].describe;
                        that.windowInfo.showFlag = '0';
                        that.windowInfo.isShow = '0';
                        that.windowInfo.imgList=[];
                        that.windowInfo.mediaIds = dataInfo[i].mediaIds ? dataInfo[i].mediaIds.split(',') : [];
                    }else if(dataInfo[i].sequence=="B"){
                        that.defendInfo.status = dataInfo[i].status;
                        that.defendInfo.describe = dataInfo[i].describe;
                        that.defendInfo.showFlag = '0';
                        that.defendInfo.isShow = '0';
                        that.defendInfo.imgList=[];
                        that.defendInfo.mediaIds = dataInfo[i].mediaIds ? dataInfo[i].mediaIds.split(',') : [];
                    }else if(dataInfo[i].sequence=="C"){
                        that.railingInfo.status = dataInfo[i].status;
                        that.railingInfo.describe = dataInfo[i].describe;
                        that.railingInfo.showFlag = '0';
                        that.railingInfo.isShow = '0';
                        that.railingInfo.imgList=[];
                        that.railingInfo.mediaIds = dataInfo[i].mediaIds ? dataInfo[i].mediaIds.split(',') : [];
                    }else if(dataInfo[i].sequence=="D"){
                        that.powerInfo.status = dataInfo[i].status;
                        that.powerInfo.describe = dataInfo[i].describe;
                        that.powerInfo.showFlag = '0';
                        that.powerInfo.isShow = '0';
                        that.powerInfo.imgList=[];
                        that.powerInfo.mediaIds = dataInfo[i].mediaIds ? dataInfo[i].mediaIds.split(',') : [];
                    }else if(dataInfo[i].sequence=="E"){
                        that.selfEqInfo.status = dataInfo[i].status;
                        that.selfEqInfo.describe = dataInfo[i].describe;
                        that.selfEqInfo.showFlag = '0';
                        that.selfEqInfo.isShow = '0';
                        that.selfEqInfo.imgList=[];
                        that.selfEqInfo.mediaIds = dataInfo[i].mediaIds ? dataInfo[i].mediaIds.split(',') : [];
                    }else if(dataInfo[i].sequence=="F"){
                        that.monitorInfo.status = dataInfo[i].status;
                        that.monitorInfo.describe = dataInfo[i].describe;
                        that.monitorInfo.showFlag = '0';
                        that.monitorInfo.isShow = '0';
                        that.monitorInfo.imgList=[];
                        that.monitorInfo.mediaIds = dataInfo[i].mediaIds ? dataInfo[i].mediaIds.split(',') : [];
                    }else if(dataInfo[i].sequence=="G"){
                        that.fireInfo.status = dataInfo[i].status;
                        that.fireInfo.describe = dataInfo[i].describe;
                        that.fireInfo.showFlag = '0';
                        that.fireInfo.isShow = '0';
                        that.fireInfo.imgList=[];
                        that.fireInfo.mediaIds = dataInfo[i].mediaIds ? dataInfo[i].mediaIds.split(',') : [];
                    }else if(dataInfo[i].sequence=="H"){
                        that.pickUpInfo.status = dataInfo[i].status;
                        that.pickUpInfo.describe = dataInfo[i].describe;
                        that.pickUpInfo.arrive = dataInfo[i].arrive;
                        that.pickUpInfo.showFlag = '0';
                        that.pickUpInfo.isShow = '0';
                        that.pickUpInfo.imgList=[];
                        that.pickUpInfo.arriveVideo=dataInfo[i].arriveVideo;
                        that.pickUpInfo.mediaIds = dataInfo[i].mediaIds ? dataInfo[i].mediaIds.split(',') : [];
                    }
                }
            },
            downLoadImgUrl(name,imgArr){
                var that = this;
                if(that[name].isShow=='0'){
                    that[name].imgList = [];
                    if(imgArr && imgArr.length>0){
                        for(var i=0;i<imgArr.length;i++){
                            var params={};
                            params.mediaId = imgArr[i];
                            $http(baseUrl.downLoadImgUrl, true,params, true)
                                .then(res => {
                                    if(res.retcode == 'success'){
                                        that[name].isShow='1'
                                        that[name].imgList.push('data:image/jpg;base64,'+res.data);
                                        //that.$forceUpdate();
                                    }else{
                                        $.alert("","图片下载失败，请重新展开检查项目加载图片",function () {
                                            that[name].isShow = '0'
                                        });
                                    }
                                });
                        }
                    }
                }

            },
            //下载视频
            downloadFile(fileName) {
                let that = this;
                let params = {
                    mediaId: fileName
                }
                if(fileName!='' && fileName!=undefined){
                    $http(baseUrl.downloadSafetyCheckVideo, true, params, false)
                        .then(res => {
                            if (res.retcode == 'success'){
                                that.videoShow = true;
                                that.pickUpInfo.isShow = '1'
                                // that.path = 'https://weixin.xacbank.com.cn/wxqy/upload/'+res.data;
                                that.path = base.domain+newBase.wxqy+'upload/'+res.data;
                                that.videoKey += 1;
                            }else{
                                $.alert("","视频下载失败，请重新展开检查项目加载视频",function () {
                                    that.pickUpInfo.isShow = '0'
                                });
                            }

                        });
                }

            },
            //查看图片
            bigImg(imgSrc){
                var imageUrls = new Array();
                imageUrls.push(imgSrc);
                vant.ImagePreview(imageUrls);

            },

            // 拨打电话
            callTap(tel){
                if(tel!='' && tel!=undefined){
                    window.location.href = 'tel:' + tel;
                }
            },
            // 敏感信息脱敏
            desensitizeIdNo(str, start, end) {
                if (!str && (start + end) >= str.length) {
                    return '';
                }
                let text1 = str.substring(0, start);
                let text3 = str.substring(end, str.length);
                let text2 = '';
                for (let i = 0; i < end - start; i++) {
                    text2 += "*";
                };
                return text1 + text2 + text3;
            },
            GetQueryStrings(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            jump(){
                window.location.href = 'edit.html?id='+this.detail.id
            },
            //播放视频
            videoPlay(){
                $('#pickUpInfoVideo').play();
            },
        }
    })
}



