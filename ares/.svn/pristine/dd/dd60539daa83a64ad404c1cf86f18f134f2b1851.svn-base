var baseUrl = {
    applyExemptionInfo:'exemptionApply/applyExemptionInfo.xa',
    uploadImage:"exemptionApply/applyExemptionUpload.xa",
    downLoadImgUrl:'faceExamineCheck/getMsgBase64.xa',//下载图片
    applyExemption:'exemptionApply/applyExemption.xa',
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            id:'',
            tab:'',
            ymType:'',
            refuseInfo:'',
            detail:{},
            mch_code:'',
            windowInfo:{addImgList:[],mediaIds:[],replaceIndex: '',addImgListOld:[],mediaIdsOld:[]},
            imageBase64: "data:image/png;base64,",

        },
        created() {
        },
        mounted() {
            this.mch_code = this.GetQueryStrings('mch_code');
            this.tab = this.GetQueryStrings('tab');
            this.id = this.GetQueryStrings('id');
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

             getDetail(){
                var that=this;
                var param={};
                param.mch_code=that.mch_code;
                param.id=that.id;
                $http(baseUrl.applyExemptionInfo, true,param, true)
                .then(res => {
                    if (res.retcode == 'success'){

                        that.detail.all_title = res.data.all_title ? res.data.all_title : '';
                        that.detail.title = res.data.title ? res.data.title : '';
                        that.detail.mch_code = res.data.mch_code ? res.data.mch_code : '';
                        that.detail.reason = res.data.reason ? res.data.reason : '';
                        that.detail.update_time = res.data.update_time ? res.data.update_time : '';
                        that.detail.apply_time = res.data.apply_time ? res.data.apply_time : '';
                        that.detail.audit_user_name = res.data.audit_user_name ? res.data.audit_user_name : '';
                        that.detail.apply_name = res.data.apply_name ? res.data.apply_name : '';
                        that.detail.apply_org_name = res.data.apply_org_name ? res.data.apply_org_name : '';
                        that.detail.type = res.data.type ? res.data.type : '';
                        that.detail.apply_status = res.data.apply_status ? res.data.apply_status : '';
                        that.detail.is_exemption = res.data.is_exemption ? res.data.is_exemption : '';
                        if(that.tab=='0'){
                            //that.detail.type = '0';
                            that.detail.apply_status = '0';
                            if(res.data.is_exemption == '0'){
                                that.detail.type = '1';
                                that.ymType = '1'
                            }else{
                                that.detail.type = '2';
                                that.ymType = '2'
                            }
                        }
                        if(that.tab=='2'){
                            if(that.detail.type=='1'){
                                that.ymType = '2'
                            }else{
                                that.ymType = '1'
                            }
                        }
                        if(that.tab=='3'){
                            if(res.data.is_exemption == '0'){
                                that.detail.type = '1';
                                that.ymType = '1'
                            }else{
                                that.detail.type = '2';
                                that.ymType = '2'
                            }
                        }
                        if(res.data.images){
                            for(var i=0;i<res.data.images.length;i++){
                                that.windowInfo.addImgListOld.push(that.imageBase64+res.data.images[i])
                            }
                        }
                    }else{
                        $.alert("",res.retmsg,function () {

                        });
                    }
                 });

            },
            // 上传图片S
            upload(num,name) {
                let that = this;
                let len = that[name].addImgList.length;
                let len1 = that[name].addImgListOld.length;
                let count = num - len-len1
                wx.chooseImage({
                    count: count,
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType:['album','camera'],
                    success: function (res) {
                        that.uploadImage(res.localIds, 0,name);
                    },
                    fail: function (res) {
                        $.alert("", res.errMsg);
                    }
                });
            },
            uploadImage(localIds, index,name) {
                var that = this;
                wx.uploadImage({
                    localId: localIds[index], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 0, // 默认为1，显示进度提示
                    success: function (res) {
                        that.uploadServer(localIds, index, res.serverId, 0,name)
                    },
                    fail: function (res) {
                        $.alert("", "图片上传失败，请稍后再试");
                    }
                });
            },
            uploadServer(localIds, index, serverId, flag,name) {
                let that = this;
                let params = {
                    mediaId: serverId,
                }
                $http(baseUrl.uploadImage, true, params, false)
                    .then(res => {
                        console.log(res, '上传')
                        if (flag == 0) { //上传
                            that[name].mediaIds.push(res.data);
                            that.getLocalImgData(localIds, index, serverId,name)
                        } else if (flag == 1) { //替换
                            that[name].mediaIds[that[name].replaceIndex] = res.data;
                            that.replaceLocalImgData(localIds, index, serverId,name);
                        }

                    });
            },
            getLocalImgData(localIds, index, serverId,name) {
                var that = this;
                wx.getLocalImgData({
                    localId: localIds[index],
                    success: function (res) {
                        var localData = res.localData;
                        if (!localData.startsWith('data:')) {
                            localData = 'data:image/png;base64,' + localData;
                        }
                        that[name].addImgList.push(localData);
                        that.$forceUpdate();
                        if (index < localIds.length - 1) {
                            index += 1;
                            that.uploadImage(localIds, index,name);
                        }
                    }, fail: function (res) {
                        $.alert("", "获取本地图片出错!");
                    }
                })
            },
            // 删除图片
            deleteImg(index,name) {
                this[name].addImgList.splice(index, 1);
                this[name].mediaIds.splice(index, 1);
            },
            // 删除图片
            deleteImg1(index,name) {
                this[name].addImgListOld.splice(index, 1);
                this[name].mediaIdsOld.splice(index, 1);
            },
            // 修改补录图片
            replaceImg(num,index,name) {
                let that = this;
                let len = that[name].addImgList.length;
                let len1 = that[name].addImgListOld.length;
                let count = num - len - len1;
                that[name].replaceIndex = index;
                wx.chooseImage({
                    count: count,
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    success: function (res) {
                        that.replaceImage(res.localIds, 0,name);
                    },
                    fail: function (res) {
                        $.alert("", res.errMsg);
                    }
                });
            },
            replaceImage(localIds, index,name) {
                var that = this;
                $.showLoading('加载中...');
                wx.uploadImage({
                    localId: localIds[index], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        that.uploadServer(localIds, index, res.serverId, 1,name)
                    },
                    fail: function (res) {
                        $.alert("", "图片上传失败，请稍后再试");
                    }
                });
            },
            replaceLocalImgData(localIds, index, serverId,name) {
                var that = this;
                wx.getLocalImgData({
                    localId: localIds[index],
                    success: function (res) {
                        var localData = res.localData;
                        if (!localData.startsWith('data:')) {
                            localData = 'data:image/png;base64,' + localData;
                        }
                        that[name].addImgList.splice(that[name].replaceIndex, 1, localData);
                        that.$forceUpdate();
                    }, fail: function (res) {
                        $.alert("", "获取本地图片出错!");
                    }
                })
            },
            /**
             * 提交审批
             */
            submitBindtap() {
                var that = this;
                let params = {};
                var windowInfoImg = that.windowInfo.mediaIds.concat(that.windowInfo.mediaIdsOld);
                if(windowInfoImg.length==0){
                    $.alert("", '请至少上传1张影像资料');
                    return;
                }
                params.type = that.ymType;
                params.apply_pic = windowInfoImg ? windowInfoImg.join(',') : '';
                params.mch_code = that.mch_code;

                vant.Dialog.confirm({
                    title: '请确认是否提交',
                    message: ""
                }).then(() => {
                    $http(baseUrl.applyExemption,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                $.alert("","提交成功",function () {
                                    window.location.href = 'list.html';
                                });

                            }else{
                                $.alert("",res.retmsg,function () {

                                });
                            }
                        });
                }).catch(() => {

                })
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
            /**
             * 预览图片
             * */
            previewImg:function (index) {
                var photoArr=new Array();
                /*for(var i=0;i<this.photoInfo.length;i++){
                    photoArr.push(this.imageBase64+this.photoInfo[i].image)
                }*/
                photoArr.push(index);
                vant.ImagePreview({
                    images:photoArr,
                    //startPosition:index
                });
            },
            //查看图片
            bigImg(i){
                var imageUrls = new Array();
                imageUrls.push(this.windowInfo.addImgListOld[i]);
                vant.ImagePreview(imageUrls);
            },
            //证件类型
            readCardType(str){
                if(str == '1'){
                    return '身份证'
                }else if(str == '06'){
                    return '营业执照'
                }else if(str == '07'){
                    return '开户许可证'
                }else if(str == '08'){
                    return '税务登记证'
                }else if(str == '09'){
                    return '纳税人编码'
                }else if(str == '10'){
                    return '贷款卡号'
                }else if(str == '11'){
                    return '社保卡号'
                }else if(str == '12'){
                    return '单位证明'
                }else if(str == '14'){
                    return '政府批文'
                }else if(str == '15'){
                    return '金融企业ID'
                }else if(str == '16'){
                    return '其他证件'
                }else if(str == '20'){
                    return '港澳居民来往内地通行证'
                }else if(str == '21'){
                    return '台湾居民来往大陆通行证'
                }else if(str == '30'){
                    return '统一社会信用代码'
                }else if(str == '31'){
                    return '工商注册号'
                }else if(str == '32'){
                    return '机关和事业单位登记号'
                }else if(str == '33'){
                    return '社会团体登记号'
                }else if(str == '34'){
                    return '民办非企业登记号'
                }else if(str == '35'){
                    return '基金会登记号'
                }else if(str == '36'){
                    return '基金会登记号'
                }else if(str == '37'){
                    return '其他'
                }else if(str == '77'){
                    return '移植对公贷款客户'
                }else if(str == '88'){
                    return '移植对公存款客户'
                }else{
                    return ''
                }
            },

        }
    })
}



