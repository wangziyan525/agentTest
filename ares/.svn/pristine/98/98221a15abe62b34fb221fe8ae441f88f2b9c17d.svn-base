var baseUrl = {
    queryDataByIdUrl:'phjdData/queryDataById.xa',//查询详情
    downPhotoDataUrl: 'phjdData/downPhotoData.xa',//下载图片
    businessQueryUrl: 'phjdData/phjdXNDoBusinessQuery.xa',//查询办理业务
    addRecordUrl:'phjdData/phjdFollowRecordAdd.xa',//新增跟进记录
    listRecordUrl:'phjdData/phjdFollowRecordList.xa',//跟进记录列表
    
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            tab:"1",
            flag:"1",//建档主体
            datatype:"",
            id:"",
            ifEdit:"1",//是否可以修改，1可以


            detail:{},
            image1: [],
            imageLocal1: [],
            image2: [],
            imageLocal2: [],
            image3: [],
            imageLocal3: [],

            sildeIndex: [
                false, false, false,false,false,false,false,false,false
            ],

            

            

            listStatusOpt:{//0无效 1有效 8申报拒绝 9 待申报
                "1":"有效建档",
                "0":"待完善建档",
                "9":"待申报建档",
                "8":"申报驳回建档",
                "7":"已申报未抽查",
                // "10":"已作废",
            },
            listopencardOpt:{
                "0":"未开卡",
                "1":"已开卡",
                "9":"已销卡",

            },
            listopenacctOpt:{
                "0":"未开户",
                "1":"已开户",
                "9":"已销户",

            },
            estbdocmnbyListOpt:{
                "1":"小微企业",
                "2":"个体",
            },

            //tab2
            businessInfo:{//个体的没有企业贷款和代发
                "open_recv_bill_biz_ind": "",//是否开通收单业务标志
                "opencard_ind": "",//是否开卡标志
                "proc_dpst_biz_ind": "",//是否办理过存款业务标志
                "proc_indv_mtg_loan_ind": "",//是否办理过个人按揭贷款标志
                "proc_indv_consm_loan_ind": "",//是否办理过个人消费贷款标志
                "openacct_ind": "",//是否开户标志
                "proc_chrem_biz_ind": "",//是否办理过理财业务标志
                "proc_indv_assist_loan_ind": "",//是否办理过个人助业贷款标志

                "proc_corp_loan_ind": "",//是否办理过企业贷款标志
                "contr_payroll_biz_ind": "",//是否签约代发工资业务标志
            },

            businessOpt1:{//开户标志 0:未办理 1:已办理 9:已销户
                "":"--",
                "0":"未办理",
                "1":"已办理",
                "9":"已销户",
            },
            businessOpt2:{//开卡标志 0:未办理 1:已办理 9:已销卡
                "":"--",
                "0":"未办理",
                "1":"已办理",
                "9":"已销卡",
            },
            businessOpt3:{//开通收单业务标志 0:未办理 1:已办理 9:已解约
                "":"--",
                "0":"未办理",
                "1":"已办理",
                "9":"已解约",
            },
            businessOpt4:{//贷款标志( 0:无贷户 1:存续期内 9:已结清
                "":"--",
                "0":"无贷户",
                "1":"有贷户",
                "9":"已结清",
            },
            businessOpt5:{//办理存款业务标志 0:未办理 1:存续期内 9:已到期
                "":"--",
                "0":"未办理",
                "1":"存续期内",
                "9":"已到期",
            },
            businessOpt6:{//0-否；1-是
                "":"--",
                "0":"否",
                "1":"是",
            },

            //tab3
            recodeList:[],
            addRecodeText:"",
            showcancelPopup:false,

            
           
        },
        created(){
            var that=this;
            var id=GetQueryString("id");
            that.id=id;
            var flag=GetQueryString("flag");//建档主体 1：公司 2：企业
            that.flag=flag;
            var ifEdit=GetQueryString("ifEdit");
            that.ifEdit=ifEdit;
            var datatype=GetQueryString("datatype");//datatype   1 普惠  2  服务站 
            that.datatype=datatype;

            that.getDetails();
            
            
        },
        mounted(){
    
        },
        methods:{
            /**
             * 弹起增加记录页面
             */
            addRecordPopup(){
                var that=this;
                that.addRecodeText="";
                that.showcancelPopup=true;

            },
            /**
             * 新增跟进记录
             */
            async addRecordBtn(){
                var  that = this;
                if(!that.addRecodeText){
                    vant.Toast('请输入新增跟进记录');
                    return; 
                }
                var  param = {};
                param.content =that.addRecodeText; 
                param.phjdid =that.id;    
                const res = await $http(baseUrl.addRecordUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.showcancelPopup=false;
                    that.queryRecordList();
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }

            },
            //查询跟进记录
            async queryRecordList(){
                var  that = this;
                var  param = {};
                param.phjdid =that.id;    
                const res = await $http(baseUrl.listRecordUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.recodeList = res.data;
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }

            },
            /**
             * 切换tab
             * @param {*} tab 
             */
            choosetab(tab){
                var that=this;
                that.tab=tab;
                if(tab=="1"){
                    // that.getDetails();
                }else if(tab=="2"){
                    that.getBusiness();
                }else if(tab=="3"){
                    that.queryRecordList();
                }
            },

            /**
             * 进入修改页面
             * @param {} id 
             */
            goEdit(){
                var that=this;
                var flag=that.flag;
                if(flag=="1"){
                    window.location.href="companyDetail.html?flag="+that.flag+"&datatype="+that.datatype+"&id="+that.id+"&v=1";
                }else if(flag=="2"){
                    window.location.href="personDetail.html?flag="+that.flag+"&datatype="+that.datatype+"&id="+that.id+"&v=1";
                }
                
                
            },
            /**
             * 展开或关闭
             * @param {*} index 
             */

            slideHandle (index) {
                this.sildeIndex[index] = !this.sildeIndex[index];
                this.$forceUpdate();
            },
            /**
             * 查询办理业务
             */
            async getBusiness() {
                let that = this;
                let param = {};
                param.id =that.id;    
                const res = await $http(baseUrl.businessQueryUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.businessInfo = res.data.DatCnt?res.data.DatCnt: that.businessInfo;
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }

            },
            
            /**
             * 查看详情首页
             */
            async getDetails() {
                let that = this;
                let param = {};
                param.InDtlId =that.id;    
                const res = await $http(baseUrl.queryDataByIdUrl, true,param, true);

                if (res.retcode === 'success'){
                    $("#app").show();
                    this.detail = res.data;
                    if(that.detail.SignPhtRte){
                        var param1={};
                        param1.filename= that.detail.SignPhtRte;
                        $http(baseUrl.downPhotoDataUrl, true,param1, true).then(res1 => {
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
                        $http(baseUrl.downPhotoDataUrl, true,param2, true).then(res2 =>{
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
                                $http(baseUrl.downPhotoDataUrl, true,param3, true).then(res3 => {
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
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }

            },
            
            /**
             * 图片放大
             * @param {*} images 
             * @param {*} index 
             */
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

            copyHandle (param) {
                navigator.clipboard.writeText(param)
                .then(res => {
                    vant.Toast('复制成功')
                })
                .catch(err => {
                    vant.Toast('复制失败')
                })
            },    

             /**
             * 开始录音
             */
            showRecorddiv () {
                $('.luyinbtn').attr('start', 'yes');
                $('.recodeblock').addClass('showluyin');
                $('.luyinbtn').text('结束说话');
                wx.startRecord();
            },
             /**
             * 开始录音
             */

            startRecord () {
                let that = this;
                let hasstart = $('.luyinbtn').attr('start');
                if (hasstart == 'no') {
                    $('.luyinbtn').attr('start', 'yes');
                    $('.luyinbtn').text('结束说话');
                    wx.startRecord();
                } else {
                    $('.luyinbtn').attr('start', 'no');
                    $('.luyinbtn').text('开始说话');
                    $('.recodeblock').removeClass('showluyin');
                    wx.stopRecord({
                        success: function (res) {
                            let localId = res.localId;
                            wx.translateVoice({
                                localId: localId,
                                isShowProgressTips: 1,
                                success: function (res) {
                                    let result = res.translateResult;
                                    result = result.substring(0,result.length - 1);
                                    that.addRecodeText =  that.addRecodeText?that.addRecodeText+result:result;

                                    that.$forceUpdate();
                                },
                                fail: function (res) {
                                    $.alert(JSON.stringify(res),"");
                                }
                            })
                        },
                        fail: function (res) {
                            $.alert(JSON.stringify(res),"");
                        }
                    });
                }
            },

                
                
                

        }
            
           
           
           
            
            
    
    })
}





