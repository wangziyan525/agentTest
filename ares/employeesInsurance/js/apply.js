var baseUrl = {
    insuranceUploadPhotoUrl: "insurancePractice/insuranceUploadPhoto.xa", //上传照片    
    insuranceDownPhotoUrl: 'insurancePractice/insuranceDownPhoto.xa',   //下载照片
    saveInsuranceApplyDataUrl: 'insurancePractice/saveInsuranceApplyData.xa',   //保存数据
}
var vm;
function initFun() {
    vm = new Vue({
        el: '.container',
        data: {
            showNth:false,
            showEdu:false,
            showPlo:false,
            showTips:false,
            nth:'汉族',
            plo:'群众',
            edu:'本科',
            nthList: [
                '汉族',
                '蒙古族',
                '回族',
                '藏族',
                '维吾尔族',
                '苗族',
                '彝族',
                '壮族',
                '布依族',
                '朝鲜族',
                '满族',
                '侗族',
                '瑶族',
                '白族',
                '土家族',
                '哈尼族',
                '哈萨克族',
                '傣族',
                '黎族',
                '僳僳族',
                '佤族',
                '畲族',
                '高山族',
                '拉祜族', 
                '水族',
                '东乡族',
                '纳西族',
                '景颇族',
                '柯尔克孜族',
                '土族',
                '达斡尔族',
                '仫佬族', 
                '羌族',
                '布朗族',
                '撒拉族',
                '毛南族',
                '仡佬族',
                '锡伯族',
                '阿昌族',
                '普米族',
                '塔吉克族',
                '怒族',
                '乌孜别克族',
                '俄罗斯族',
                '鄂温克族',
                '德昂族',
                '保安族',
                '裕固族',
                '京族',
                '塔塔尔族',
                '独龙族',
                '鄂伦春族',
                '赫哲族',
                '门巴族',
                '珞巴族',
                '基诺族',
            ],
            eduLevel:['高中及同等学历','中专','大专','本科','研究生'],
            ploSta:['群众','中国共产主义青年团团员','中国共产党党员'],
            userInfo:{},
            uploadImage:'',
            type:''

        },

        created() {

        },
        mounted() {
            this.type = this.getQueryString('type'); 
            if(JSON.parse(localStorage.getItem("hisUserInfo"))  != null && JSON.parse(localStorage.getItem("hisUserInfo"))  !== ''){
                this.userInfo = JSON.parse(localStorage.getItem("hisUserInfo")).BA
                this.uploadImage = JSON.parse(localStorage.getItem("hisUserInfo")).BA.idPicture
                if( this.type != 'BG' && this.type != 'ZX'){
                    this.initImageFun(JSON.parse(localStorage.getItem("hisUserInfo")).BA.idPicture) 
                }    
               
            }else{
                this.userInfo  = JSON.parse(localStorage.getItem("userInfo"));
            }
         
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
             //数据保存
             saveInsuranceApplyData(type) {
                 if(this.uploadImage == ''){
                    vant.Toast('请上传证件照片');
                    return; 
                 }
                this.userInfo = JSON.parse(localStorage.getItem("hisUserInfo"))
                let params = {};
                params.idPicture = this.uploadImage;
                params.nation =this.nth;
                params.mass = this.plo;
                params.educationLevel = this.edu;
                params.workNature = '专职';
                params.userContract = '劳动合同';
                params.type = type;
                if( this.userInfo != null &&  this.userInfo  !== ''){
                    if( this.userInfo.BG  != null &&  this.userInfo.BG  !== ''){
                        params.id = this.userInfo.BG.id;
                    }else{
                        params.id = this.userInfo.BA.id;    
                    }
                    
                }
               
                $http(baseUrl.saveInsuranceApplyDataUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            if(type == '3'){
                                vant.Toast('变更提交成功');
                                window.location.href = "./review.html?id="+res.data
                            }else{
                                localStorage.setItem("userId",res.data.id)
                            localStorage.setItem("imgData",res.data)
                            window.location.href = './test.html'
                            }
                            
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            chooseNth(val){
                this.nth = val;
                this.showNth = false;
            },
            choosePlo(val){
                this.plo = val;
                this.showPlo = false;
            },
            chooseEdu(val){
                this.edu = val;
                this.showEdu = false;
            },
            showNthFuc(){
                if(this.type!='ZX'){
                this.showEdu = true}
            },
            showPloFuc(){
                if(this.type!='ZX'){
                    this.showPlo = true
                }
            },
            showEduFuc(){
                if(this.type!='ZX'){
                this.showEdu = true}
            },
             //注销
             logout() {
                let params = {};
                params.idPicture = this.uploadImage;
                params.nation =this.nth;
                params.mass = this.plo;
                params.educationLevel = this.edu;
                params.workNature = '专职';
                params.userContract = '劳动合同';
                params.type = 2;
                $http(baseUrl.saveInsuranceApplyDataUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            vant.Toast('注销成功');
                           window.location.href = "./review.html?id="+res.data
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
           /**
             * 选择照片
             */
            afterRead(index){
                if(this.type != 'ZX'){
                    var that=this;
                    wx.chooseImage({
                        count:1,
                        sizeType:['compressed'],
                        sourceType:['album','camera'],
                        success:function(res){
                            var localIds=res.localIds;
                            
                            wx.getLocalImgData({
                                localId:localIds[0],
                                success:(res)=>{
                                    const base64Length = res.localData.length;
                                    const fileSizeBytes = Math.floor(base64Length * 3 / 4);

                                    if(fileSizeBytes > 45056 && fileSizeBytes < 10240){
                                        vant.Toast('图片大小应为10KB-44KB');
                                        return;
                                    }else{
                                        that.upImage(localIds[0],index);
                                    }
                                }
                            })
                        }
    
                    })
                }
               
                
                
            },
            /**
             * 上传照片
             * @param {} localIds 
             */
    
            upImage (localId,index) {
                var that=this;
                wx.uploadImage({
                    localId:localId,
                    success:function(res){
                        var serverId=res.serverId;
                        var param={};
                        param.mediaId=serverId;
                        $http(baseUrl.insuranceUploadPhotoUrl, true,param, false).then(res => {
                            that.uploadImage = res.data;
                            that.initImageFun(that.uploadImage) 
                        })
                        
                    }
                })
            },
            initImageFun (images) {
                
                    $http(baseUrl.insuranceDownPhotoUrl, false, {
                        filename: images,
                    }, false)
                    .then(res => {
                        document.getElementById('btmImg').src = 'data:image/jpeg;base64,' + res.data;
                    })
                
            },
            /**
             * 删除影像
             * @param {*} indexImg 
             */
            deleteImg(){
                this.uploadImage = '';
                document.getElementById('btmImg').src = './images/addImg.png';
            }
        }
    })
};
