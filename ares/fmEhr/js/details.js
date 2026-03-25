function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                queryDataByIdUrl: 'qywx/phjdData/queryDataById.xa',
                downPhotoDataUrl: 'qywx/phjdData/downPhotoData.xa',
                phjdCheckBatchOneCheckUrl: 'qywx/phjdData/phjdCheckBatchOneCheck.xa'
            },
            activeName: '0',
            sildeIndex: [
                true, true, true
            ],
            detail: {
                // phjdAlldataDeclare: {
                //     checkstatus: '0',
                //     batchstatus: '0'
                // },
                // EstbDocMnBy: '', // 1 公司 2 个人  3农户
            },
            image1: [],
            imageLocal1: [],
            image2: [],
            imageLocal2: [],
            image3: [],
            imageLocal3: [],
            popupBottom: {
                show: false
            },

            submitData: {
                checkcontent: ''
            },
            backstatus: false,
            flag:true,

        },

        created() {
            var flag=GetQueryString("flag");//是否从申报入口
            if(flag=="declare"){
                this.flag=false;
            }
            this.getDetails();
            
        },
        methods: {
            slideHandle (index) {
                this.sildeIndex[index] = !this.sildeIndex[index];
                this.$forceUpdate();
            },

            getDetails() {
                let that = this;
                let params = {
                    checkid: GetQueryString('checkid'),
                    InDtlId: GetQueryString('phjdid')
                }
                $http(this.baseUrl.queryDataByIdUrl, true,params, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.detail = {
                            ...res.data,
                        }
                        this.backstatus = res.data.SubManStfId == $.parseJSON($.cookie("user")).humancode ? true : false;
                        if(that.detail.SignPhtRte){
                            var param1={};
                            param1.filename= that.detail.SignPhtRte;
                            $http(this.baseUrl.downPhotoDataUrl, true,param1, true).then(res1 => {
                                if(res1.retcode === 'success'){
                                    that.image1=[];
                                    that.imageLocal1=[];
                                    that.image1.push(that.detail.SignPhtRte);
                                    that.imageLocal1.push('data:image/jpg;base64,'+res1.data);
                                }else{
                                    that.image1=[];
                                    that.imageLocal1=[];
                                    that.image1.push(that.detail.SignPhtRte);
                                    that.imageLocal1.push('');
                                }
                            })
                            
                        }
                        if(that.detail.BsnLicenseRte){
                            var param2={};
                            param2.filename=that.detail.BsnLicenseRte;
                            $http(this.baseUrl.downPhotoDataUrl, true,param2, true).then(res2 =>{
                                if(res2.retcode === 'success'){
                                    that.image2=[];
                                    that.imageLocal2=[];
                                    that.image2.push(that.detail.BsnLicenseRte);
                                    that.imageLocal2.push('data:image/jpg;base64,'+res2.data);
                                }else{
                                    that.image2=[];
                                    that.imageLocal2=[];
                                    that.image2.push(that.detail.BsnLicenseRte);
                                    that.imageLocal2.push("");
                                }
                            })
                            
                        }
                        if(that.detail.personPhoto){
                            var personPhotoList=that.detail.personPhoto.split(",");
                            that.image3=[];
                            that.imageLocal3=[];
                            if(personPhotoList && personPhotoList.length>0){
                                for(var i=0;i<personPhotoList.length;i++){
                                    var param3={};
                                    param3.filename=personPhotoList[i];
                                    $http(this.baseUrl.downPhotoDataUrl, true,param3, true).then(res3 => {
                                        if(res3.retcode === 'success'){
                                            that.image3.push(personPhotoList[i]);
                                            that.imageLocal3.push('data:image/jpg;base64,'+res3.data);
                                        }else{
                                            that.image3.push(personPhotoList[i]);
                                            that.imageLocal3.push('');
                                        }
                                    })
                                    
                                }
                            }
                        }
                    } else {
                        this.$dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    }
                })
            },

            previewHandle (images,index) {
                vant.ImagePreview({
                    images: images,
                    startPosition: index
                })
            },

            /**
             * 多选
             * @param {*} keys 后台返回
             * @param {*} list 原始数据
             */

            formatCheckBox (keys, list) {
                if (keys == undefined) return ''
                let keysArr = keys.split(',');
                let dataString = '';
                dataString = list.filter(item => keysArr.some(item1 => item1 == item.value)).map(item2 => {
                    return item2.text
                }).join(',')
                return dataString
            },

            /**
             * 
             * @param {*} keys 后台返回
             * @param {*} list 原始数据
             */

            formatRadio (keys, list) {
                let dataString = '';
                dataString = list.filter(item => {
                    if (keys == item.value) return item
                }).map(item1 => {return item1.text}).join(",");
                return dataString;
            },

            nextHandle (checkstatus) {
                if (checkstatus == 1 && this.submitData.checkcontent == '') return vant.Toast('请输入驳回原因') 

                let params = {
                    checkstatus: checkstatus,
                    checkcontent: checkstatus == 1 ? this.submitData.checkcontent : '',
                    checkid: GetQueryString('checkid')
                };

                $http(this.baseUrl.phjdCheckBatchOneCheckUrl, true,params, true)
                .then(res=> {
                    if (res.retcode == 'success') {
                        this.$dialog.alert({
                            message: checkstatus == '1' ? '已驳回' : '已通过'
                        }).then(() => {
                            window.location.href = `samplingList.html?checkbatchnum=${this.detail.phjdAlldataDeclare.checkbatchnum}&humancode=${GetQueryString('humancode')}`
                        });
                    } else {
                        this.$dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    }
                })
            },

            backHandle () {
                window.location.href = `samplingList.html?checkbatchnum=${this.detail.phjdAlldataDeclare.checkbatchnum}&humancode=${GetQueryString('humancode')}`;
            },

            copyHandle (param) {
                navigator.clipboard.writeText(param)
                .then(res => {
                    vant.Toast('复制成功')
                })
                .catch(err => {
                    vant.Toast('复制失败')
                })
            },
        }
    })
};