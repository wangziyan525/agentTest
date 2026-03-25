var baseUrl = {
    uploadUrl: 'phjdData/uploadPhoto.xa',//上传
    getOcrDataUrl: 'phjdData/getOcrData.xa',//上传
    downloadUrl: 'phjdData/downPhotoData.xa',//下载图片
    submitUrl: 'phjdData/saveData.xa',//保存
    updateUrl: 'phjdData/updateData.xa',//保存
    queryInfoUrl:'phjdData/queryDataById.xa',//查询详情
    deleteUrl:'phjdData/deleteData.xa',//删除
    saveLookRecodeUrl:'phjdData/saveLookRecode.xa',//记录第一次进入时间
    checkTyxydmDataUrl:'/phjdData/checkTyxydmData.xa',//校验信用代码
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            page:"page0",
            id:"",
            detail:{
                EstbDocMnBy:"",
                AcctMrk:"",//客户标识flag1
                AcctMrkDsc:"",//备注
                custtype:"",
                custdesc:"",

                EntpCorpAdr:"",//企业经营地址
                Province:"",
                City:"",
                District:"",
                SignPhtRte:"",//招牌照片路径
                BsnLicenseRte:"",//营业执照路径
                personPhoto:"",
                EntpNm:"",//企业名称
                AtchIndus:"",//所属行业flag2
                CorpYr:"",//经营年限flag3
                AtchIndusDsc:"",//所属行业描述
                EntpCtcManNm:"",//企业联系人姓名
                EstbDocManIdentNum:"",
                EntpCtcManTelNum:"",//企业联系人电话
                UnifyUvslCrCd:"",


                TchPps:"",//资金用途flag4
                TchPpsDsc:"",//资金用途描述
                ExpcTrm:"",//希望多久可以拿到贷款flag5
                IntRtAcptScop:"",//利率接受范围flag6
                ExptLmt:"",//期望额度flag7
                LglRprsShrhldRto:"",//法定代表人持股比例
                LglRprsLbyCcst:"",//法定代表人负债情况flag8
                LglRprsLbyTp:"",//法定代表人负债类型flag9
                EntpLbyCcst:"",//企业负债情况flag10


                EntpMnByBsn:"",//企业主营业务
                CorpPce:"",//经营场所flag11
                LseMoRntl:"",//租赁月租金
                EntpPrxSixMoMoyAvIncm:"",//企业近6个月月均营收flag12
                EntpStfPsnNum:"",//企业约多少员工（人）flag13

                frnlfw:"",//法人年龄范围
                frnlfwotherdsc:"",
                frhyznqk:"",//法人婚姻子女情况
                frhyznqkotherdsc:"",
                frznxl:"",//法人子女学龄
                frznxlotherdsc:"",
                sylrqk:"",//赡养老人情况
                sylrqkotherdsc:"",
                // lrstqk:"",//老人身体情况
                // lrstqkotherdsc:"",
                // lrjjqk:"",//老人经济情况
                // lrjjqkotherdsc:"",
                jtyjzc:"",//家庭月均支出情况
                jtqkzgpj:"",//家庭情况主观评价
                jtqkzgpjotherdsc:"",
                datasourcesjtqk:"",//信息来源（家庭情况）
                datasourcesjtqkotherdsc:"",


                fcqk:"",//房产情况
                fcqkotherdsc:"",
                fcpj:"",//房产评价
                fcpjotherdsc:"",
                ccqk:"",//车产情况
                ccqkotherdsc:"",
                ccpj:"",//车产评价
                ccpjotherdsc:"",
                jrzcph:"",//金融资产偏好
                // jrzcphotherdsc:"",
                jrzczgpj:"",//金融资产主观评价
                datasourcesjtqkotherdsc:"",
                datasourcesjtzcqk:"",//信息来源(家庭资产情况)
                datasourcesjtzcqkotherdsc:"",


                
            },
            description:"",
            imageLocal1:[],
            image1:[],
            imageLocal2:[],
            image2:[],
            imageLocal3:[],
            image3:[],


            ifAdd:"",

            showAreaPicker:false,
            areaList:areaList,
            humancode:"",

            
            ifView1:"",
            ifView2:"",
            ifView3:"",
            ifView4:"",
            ifView5:"",

            ifreadonly:false,//定位那块是否可重新定位

            yuyinFlag:"",

            datatype:"",//建档类型

            showcancelPopup:false,//撤销界面
            refuseMessage:"",//撤销原因
            

            
           
        },
        created(){
            var that=this;
            var flag=GetQueryString("flag");//建档主体
            that.detail.EstbDocMnBy=flag;
            that.humancode=$.parseJSON($.cookie("user")).humancode;
            var ifAdd=GetQueryString("ifAdd");
            that.ifAdd=ifAdd;
            var datatype=GetQueryString("datatype");//datatype   1 普惠  2  服务站 
            that.datatype=datatype;
            if(ifAdd=="1"){//新增
                
                var localData=localStorage.getItem(that.humancode+that.detail.EstbDocMnBy);
                if(localData){
                    that.detail=JSON.parse(localData);
                }
                
                if(!that.detail.EntpCorpAdr){
                    that.getAdess();
                }
                that.saveLookRecode();
            }else{ 
                var id=GetQueryString("id");
                that.id=id;
                that.queryDetail();
                that.ifreadonly=true;
            }
            
            $("#app").show();
            
        },
        mounted(){
            this.checkIfFineshed()
    
        },
        methods:{
            checkIfFineshed(){
                var that=this;
            
                var obj1={
                    EntpCorpAdr:"",//企业经营地址
                    // Province:"",
                    // City:"",
                    // District:"",
                    SignPhtRte:"",//招牌照片路径
                    BsnLicenseRte:"",//营业执照路径
                    personPhoto:"",
                    EntpNm:"",//企业名称
                    AtchIndus:"",//所属行业flag2
                    CorpYr:"",//经营年限flag3
                    EntpCtcManNm:"",//企业联系人姓名
                    EstbDocManIdentNum:"",
                    EntpCtcManTelNum:"",//企业联系人电话
                    UnifyUvslCrCd:"",
                }
                if(that.detail.AtchIndus=='6'){
                    obj1={
                        EntpCorpAdr:"",//企业经营地址
                        // Province:"",
                        // City:"",
                        // District:"",
                        SignPhtRte:"",//招牌照片路径
                        BsnLicenseRte:"",//营业执照路径
                        personPhoto:"",
                        EntpNm:"",//企业名称
                        AtchIndus:"",//所属行业flag2
                        CorpYr:"",//经营年限flag3
                        AtchIndusDsc:"",//所属行业描述
                        EntpCtcManNm:"",//企业联系人姓名
                        EstbDocManIdentNum:"",
                        EntpCtcManTelNum:"",//企业联系人电话
                        UnifyUvslCrCd:"",
                    }
                }
            
            that.detail.SignPhtRte=that.image1?that.image1.join(","):"";//招牌照片路径
            that.detail.BsnLicenseRte=that.image2?that.image2.join(","):"";//营业执照路径
            that.detail.personPhoto=that.image3?that.image3.join(","):"";//场所照片

            /**
             * 
             * @param {详情所有字段} param1 
             * @param {当前页面字段} param2 
             * @param {必输字段} keys 
             * @param {是否判断有效} flags 
             * @param {有效必输字段} param3 
             * @param {当前页面判断字段个数} needCounts  
             */

            var checkFlag1=filiterParam(that.detail, obj1, [ 'EntpCorpAdr',  'EntpNm','SignPhtRte','personPhoto','EntpCtcManNm'],true,['EntpCorpAdr','SignPhtRte','personPhoto','EntpCtcManTelNum','UnifyUvslCrCd'],"11");
            that.ifView1=checkFlag1;

            
            var obj2={
                TchPps:"",//资金用途flag4
                ExpcTrm:"",//希望多久可以拿到贷款flag5
                IntRtAcptScop:"",//利率接受范围flag6
                ExptLmt:"",//期望额度flag7
                LglRprsShrhldRto:"",//法定代表人持股比例
                LglRprsLbyCcst:"",//法定代表人负债情况flag8
                LglRprsLbyTp:"",//法定代表人负债类型flag9
                EntpLbyCcst:"",//企业负债情况flag10
            }
            
            if(that.detail.TchPps && that.detail.TchPps.includes('10')){
                obj2={
                    TchPps:"",//资金用途flag4
                    TchPpsDsc:"",//资金用途描述
                    ExpcTrm:"",//希望多久可以拿到贷款flag5
                    IntRtAcptScop:"",//利率接受范围flag6
                    ExptLmt:"",//期望额度flag7
                    LglRprsShrhldRto:"",//法定代表人持股比例
                    LglRprsLbyCcst:"",//法定代表人负债情况flag8
                    LglRprsLbyTp:"",//法定代表人负债类型flag9
                    EntpLbyCcst:"",//企业负债情况flag10
                }
            }
            var checkFlag2=filiterParam(that.detail, obj2,[],false);
            that.ifView2=checkFlag2;



            var obj3={
                EntpMnByBsn:"",//企业主营业务
                CorpPce:"",//经营场所flag11
                EntpPrxSixMoMoyAvIncm:"",//企业近6个月月均营收flag12
                EntpStfPsnNum:"",//企业约多少员工（人）flag13
            }

            if(that.detail.CorpPce=="2"){
                obj3={
                    EntpMnByBsn:"",//企业主营业务
                    CorpPce:"",//经营场所flag11
                    LseMoRntl:"",//租赁月租金
                    EntpPrxSixMoMoyAvIncm:"",//企业近6个月月均营收flag12
                    EntpStfPsnNum:"",//企业约多少员工（人）flag13
                }
            }
            var checkFlag3=filiterParam(that.detail, obj3,[],true,[],'4');
            that.ifView3=checkFlag3;
            var obj4={
                frnlfw:"",//法人年龄范围
                frhyznqk:"",//法人婚姻子女情况
                frznxl:"",//法人子女学龄
                sylrqk:"",//赡养老人情况
                // lrstqk:"",//老人身体情况
                // lrjjqk:"",//老人经济情况
                jtyjzc:"",//家庭月均支出情况
                jtqkzgpj:"",//家庭情况主观评价
                datasourcesjtqk:"",//信息来源（家庭情况）

            }

            var checkFlag4=newFiliterParam(that.detail, obj4,'14');
            that.ifView4=checkFlag4;

            var obj5={
                fcqk:"",//房产情况
                fcpj:"",//房产评价
                ccqk:"",//车产情况
                ccpj:"",//车产评价
                jrzcph:"",//金融资产偏好
                jrzczgpj:"",//金融资产主观评价
                datasourcesjtzcqk:"",//信息来源(家庭资产情况)
            }
            var checkFlag5=newFiliterParam(that.detail, obj5,'15');
            that.ifView5=checkFlag5;
            },
            getAdess(){
                var that = this
                $.showLoading('定位中...');
                AMap.plugin('AMap.Geolocation', function () {
                    var geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10*1000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,        //显示定位按钮，默认：true
                        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    });

                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', onComplete);
                    AMap.event.addListener(geolocation, 'error', errorCallback);
                });
                function onComplete (param) {

                    console.log(param)
                    
                    $.hideLoading();
                    that.detail.EntpCorpAdr=param.formattedAddress;
                    that.detail.Province=param.addressComponent.province;
                    that.detail.City=param.addressComponent.city;
                    that.detail.District=param.addressComponent.district;
                    that.detail.standby1=param.position.lat;
                    that.detail.standby2=param.position.lng;
                }
                function errorCallback() {
                    $.hideLoading();
                    vant.Dialog.alert({
                        message: "定位失败，请确认是否开启位置权限"
                    }).then(() => {
                    }); 
                }
            },
            areaConfirm ([province, city, area]) {
                console.log(city, area)
                this.detail.Province = province.name;
                this.detail.City = city.name;
                this.detail.District = area.name
                this.showAreaPicker = false;
                this.localStrongFun();
            },
            /**
             * 数据更新并将数据存入缓存
             */
            localStrongFun(){
                var that=this;
                that.$forceUpdate();
                if(that.ifAdd=="1"){
                    localStorage.setItem(that.humancode+that.detail.EstbDocMnBy, JSON.stringify(that.detail));
                }
            },
            localStrongFunNew(){
                var that=this;
                that.$forceUpdate();
                if(that.ifAdd=="1"){
                    localStorage.setItem(that.humancode+that.detail.EstbDocMnBy, JSON.stringify(that.detail));
                }
                that.page="page0"
            },
            /**
             * 页面跳转
             * @param {*} page 
             */
            toPage(page){
                var that=this;
                this.page=page;
                that.checkIfFineshed();
            },
            /**
             * 单选
             * @param {字段名} flag 
             * @param {选择结果} key 
             */
            singChoose(flag,key){
                var that =this;

                if(that.detail[flag]==key){
                    that.detail[flag]="";  
                }else{
                    that.detail[flag]=key;
                }
                
                if(flag=="AcctMrk"){
                    that.detail.AcctMrkDsc="";
                }
                if(flag=="AtchIndus"){
                    that.detail.AtchIndusDsc="";
                }
                if(flag=="CorpPce"){
                    that.detail.LseMoRntl="";
                }
               
                if(flag=="frnlfw"){
                    that.detail.frnlfwotherdsc="";
                }
                if(flag=="frhyznqk"){
                    that.detail.frhyznqkotherdsc="";
                }
                if(flag=="frznxl"){
                    that.detail.frznxlotherdsc="";
                }
                if(flag=="sylrqk"){
                    that.detail.sylrqkotherdsc="";
                }
                if(flag=="lrstqk"){
                    that.detail.lrstqkotherdsc="";
                }

               
                if(flag=="fcqk"){
                    that.detail.fcqkotherdsc="";
                }
                if(flag=="fcpj"){
                    that.detail.fcpjotherdsc="";
                }
                if(flag=="ccqk"){
                    that.detail.ccqkotherdsc="";
                }
                if(flag=="ccpj"){
                    that.detail.ccpjotherdsc="";
                }

                
                that.localStrongFun();

            },
            /**
             * 多选
             * @param {字段名} flag 
             * @param {选择结果} key 
             */
            multipleChoose(flag,key){
                var that=this;
                var answerss=that.detail[flag];
                var baseAnswer=answerss?answerss.split(","):[];
                var objIndex=baseAnswer.indexOf(key);
                if(objIndex>-1){//取消勾选
                    baseAnswer.splice(objIndex,1);
                }else{//添加勾选
                    baseAnswer.push(key);
                }
                baseAnswer.sort();//排序
                that.detail[flag]=baseAnswer.length>0?baseAnswer.join(","):"";

                if(flag=="TchPps" && !baseAnswer.includes('10')){
                    that.detail.TchPpsDsc="";
                }
                if(flag=="AcctMrk" && !baseAnswer.includes('4')){
                    that.detail.AcctMrkDsc="";
                }

                if(flag=="lrjjqk" && !baseAnswer.includes('5')){
                    that.detail.lrjjqkotherdsc="";
                }
                if(flag=="jtqkzgpj" && !baseAnswer.includes('5')){
                    that.detail.jtqkzgpjotherdsc="";
                }
                if(flag=="datasourcesjtqk" && !baseAnswer.includes('5')){
                    that.detail.datasourcesjtqkotherdsc="";
                }
                if(flag=="custtype" && !baseAnswer.includes('11')){
                    that.detail.custdesc="";
                }


                // if(flag=="jrzcph" && !baseAnswer.includes('5')){
                //     that.detail.jrzcphotherdsc="";
                // }
                if(flag=="jrzczgpj" && !baseAnswer.includes('5')){
                    that.detail.datasourcesjtqkotherdsc="";
                }
                if(flag=="datasourcesjtzcqk" && !baseAnswer.includes('5')){
                    that.detail.datasourcesjtzcqkotherdsc="";
                }


                


                




                that.localStrongFun();

            },
            multipleShow(flag,key){
                var that=this;
                var listString=that.detail[flag];
                var baseAnswer=listString?listString.split(","):[];
                if(baseAnswer && baseAnswer.length>0){
                   return  baseAnswer.includes(key)
                }
                return false;
            },
            /**
             * 选择照片
             */
            afterRead(flag){
                var that=this;
                wx.chooseImage({
                    count:1,
                    sizeType:['compressed'],
                    sourceType:['camera'],
                    success:function(res){
                        var localIds=res.localIds;
                        that.upImage(localIds[0],flag)
                    }

                })
                
                
            },
            /**
             * 上传照片
             * @param {} localIds 
             */
    
            upImage (localId,flag) {
                var that=this;
                wx.uploadImage({
                    localId:localId,
                    success:function(res){
                        var serverId=res.serverId;
                        var param={};
                        param.mediaId=serverId;

                        var url=baseUrl.uploadUrl;
                        if(flag=="2"){
                            url=baseUrl.getOcrDataUrl;
                        }

                        $http(url, true,param, false).then(res => {
                            if(flag=="1"){
                                that.imageLocal1.push(localId);
                                that.image1.push(res.data)
                            }else if(flag=="2"){
                                that.imageLocal2.push(localId);
                                that.image2.push(res.data.imgName);
                                that.detail.EntpNm=res.data.name;
                                that.detail.UnifyUvslCrCd=res.data.regNum;

                                if(that.detail.UnifyUvslCrCd && that.detail.UnifyUvslCrCd.startsWith("92")){//92开头是个体
                                    vant.Dialog.alert({
                                        message: "数据检查发现该经营主体是个体工商户，请确认主体类型是否为企业"
                                    }).then(() => {
                                    }); 
                                    return; 
                                }

                            }else if(flag=="3"){
                                that.imageLocal3.push(localId);
                                that.image3.push(res.data)
                            }
                            
                        })
                        
                    }
                })
            },
            
            /**
             * 删除影像
             * @param {*} indexImg 
             */
            deleteImg(indexImg,flag){
                var that=this;
                if(flag=='1'){
                    var list=that.imageLocal1;
                    list.splice(indexImg,1);
                    that.imageLocal1=list;
    
                    var submitList=that.image1;
                    submitList.splice(indexImg,1);
                    that.image1=submitList;
                }else if(flag=='2'){
                    var list=that.imageLocal2;
                    list.splice(indexImg,1);
                    that.imageLocal2=list;
    
                    var submitList=that.image2;
                    submitList.splice(indexImg,1);
                    that.image2=submitList;
                }else if(flag=='3'){
                    var list=that.imageLocal3;
                    list.splice(indexImg,1);
                    that.imageLocal3=list;
    
                    var submitList=that.image3;
                    submitList.splice(indexImg,1);
                    that.image3=submitList;
                }
                

                //赋值给common并存入缓存
                
                that.$forceUpdate();
                

            },
            /**
             * 记录第一次进入时间
             */
            async saveLookRecode(){
                var that=this;
                var param={};
                param.jdtype =that.detail.EstbDocMnBy;             
                const res = await $http(baseUrl.saveLookRecodeUrl, true,param, true);
                if (res.retcode === 'success'){
                }
                else{
                    
                }
                
            },
            /**
             * 查询信息
             */
            async queryDetail(){
                var that=this;
                var param={};
                param.InDtlId =that.id;             
                const res = await $http(baseUrl.queryInfoUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.detail=res.data;//基本信息
                    that.detail.EstbDocManIdentNumOld=res.data.EstbDocManIdentNum?res.data.EstbDocManIdentNum.trim():"";
                    that.image1=[];
                    that.image2=[];
                    that.image3=[];
                    that.imageLocal1=[];
                    that.imageLocal2=[];
                    that.imageLocal3=[];
                    if(that.detail.SignPhtRte){
                        that.image1.push(that.detail.SignPhtRte)
                    }
                    if(that.detail.BsnLicenseRte){
                        that.image2.push(that.detail.BsnLicenseRte);
                    }
                    if(that.detail.personPhoto){
                        var personPhotoList=that.detail.personPhoto.split(",");
                        that.image3.push(personPhotoList);
                    }
                    if(that.detail.SignPhtRte){
                        var param1={};
                        param1.filename=that.detail.SignPhtRte;
                        const res1 = await  $http(baseUrl.downloadUrl, true,param1, true);
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
                    }
                    if(that.detail.BsnLicenseRte){
                        var param2={};
                        param2.filename=that.detail.BsnLicenseRte;
                        const res2 = await  $http(baseUrl.downloadUrl, true,param2, true);
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
                    }
                    if(that.detail.personPhoto){
                        var personPhotoList=that.detail.personPhoto.split(",");
                        that.image3=[];
                        that.imageLocal3=[];
                        if(personPhotoList && personPhotoList.length>0){
                            for(var i=0;i<personPhotoList.length;i++){
                                var param3={};
                                param3.filename=personPhotoList[i];
                                const res3 = await  $http(baseUrl.downloadUrl, true,param3, true);
                                if(res3.retcode === 'success'){
                                    that.image3.push(personPhotoList[i]);
                                    that.imageLocal3.push('data:image/jpg;base64,'+res3.data);
                                }else{
                                    that.image3.push(personPhotoList[i]);
                                    that.imageLocal3.push('');
                                }
                            }
                        }
                        
                    }
                    that.checkIfFineshed();
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        //wx.closeWindow();
                    }); 
                }
                
            },
            /**
             * 作废
             */
            cancelBtn(){
                var that=this;
                that.showcancelPopup=true;
                that.refuseMessage="";

            },
             /**
             * 作废提交
             */
            async zuofei(){
                var that=this;
                if(that.refuseMessage==""){
                    vant.Toast('请输入作废原因');
                    return; 
                }

                vant.Dialog.confirm({
                    title:"请确认是否作废",
                    cancelButtonText:"取消",
                    confirmButtonText:"确认",
                    message:""
                }).then(async()=>{
                    var param={};
                    param.InDtlId =that.id;   
                    param.refuseMessage =that.refuseMessage;             
                    const res = await $http(baseUrl.deleteUrl, true,param, true);

                    if (res.retcode === 'success'){
                        vant.Dialog.alert({
                            message: "作废成功"
                        }).then(() => {
                            if(that.datatype=="2"){
                                window.location.href="../villageEhr/list.html?flag="+that.detail.EstbDocMnBy+"&datatype="+this.datatype;
                            }else{
                                window.location.href="list.html?flag="+that.detail.EstbDocMnBy+"&datatype="+this.datatype;


                            }
                        }); 
                    }
                    else{
                        vant.Dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        }); 
                    }
                    
                }).catch(()=>{
                    
    
                })
                
            },
             /**
             * 删除信息
             */
            async deletes(){
                var that=this;


                vant.Dialog.confirm({
                    title:"请确认是否删除",
                    cancelButtonText:"取消",
                    confirmButtonText:"确认",
                    message:""
                }).then(async()=>{
                    var param={};
                    param.InDtlId =that.id;             
                    const res = await $http(baseUrl.deleteUrl, true,param, true);

                    if (res.retcode === 'success'){
                        vant.Dialog.alert({
                            message: "删除成功"
                        }).then(() => {
                            if(that.datatype=="2"){
                                window.location.href="../villageEhr/list.html?flag="+that.detail.EstbDocMnBy+"&datatype="+this.datatype;
                            }else{
                                window.location.href="list.html?flag="+that.detail.EstbDocMnBy+"&datatype="+this.datatype;


                            }
                        }); 
                    }
                    else{
                        vant.Dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                            //wx.closeWindow();
                        }); 
                    }
                    
                }).catch(()=>{
                    
    
                })
                
            },
            checkInput(param){
                var that=this;
                var dataJson=that.detail;
                if(param=="EstbDocManIdentNum"){
                    if (dataJson.EstbDocManIdentNum && dataJson.EstbDocManIdentNum.trim() && !checkIdcard(dataJson.EstbDocManIdentNum)) {
                        return vant.Toast('请输入有效身份证号码');
                    }
                }else if(param=="EntpCtcManTelNum"){
                    // 手机号码校验
                    var reg = /^1[0-9]{10}$/;

                    if (dataJson.EntpCtcManTelNum && dataJson.EntpCtcManTelNum.trim() && !reg.test(dataJson.EntpCtcManTelNum)) {
                        vant.Toast('企业联系人电话格式不正确');
                        return;
                    }
                }else if(param=="UnifyUvslCrCd"){
                     //统一社会信用代码

                    var codeTest=/^[0-9A-Z]+$/;
                    if(dataJson.UnifyUvslCrCd && dataJson.UnifyUvslCrCd.trim() && (dataJson.UnifyUvslCrCd.length!=18 || !codeTest.test(dataJson.UnifyUvslCrCd))){
                        vant.Toast('请输入正确的统一社会信用代码');
                        return; 
                    }
                    if(dataJson.UnifyUvslCrCd.startsWith("92")){//92开头是个体
                        vant.Dialog.alert({
                            message: "数据检查发现该经营主体是个体工商户，请确认主体类型是否为企业"
                        }).then(() => {
                        }); 
                        return; 
                    }
                    if(dataJson.UnifyUvslCrCd){
                        that.checkUnifyUvslCrCd();
                    }
                }
                that.$forceUpdate();
                if(that.ifAdd=="1"){
                    localStorage.setItem(that.humancode+that.detail.EstbDocMnBy, JSON.stringify(that.detail));
                }
               
            },

            async checkUnifyUvslCrCd(){
                var that=this;
                var param={};
                param.EstbDocMnBy=that.detail.EstbDocMnBy; 
                param.UnifyUvslCrCd=that.detail.UnifyUvslCrCd;  
                if(that.ifAdd=="1"){
                    param.AcctMrk="1";
                }else{
                    param.AcctMrk="2";
                    param.id=that.id;
                }
               
                const res = await $http(baseUrl.checkTyxydmDataUrl, true,param, true);

                if (res.retcode === 'success'){
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
            },
            
            /**
             * 提交
             */
            async submits(){
                var that=this;
                var dataJson=that.detail;
                if(dataJson.EstbDocMnBy==""){
                    vant.Toast('请检查链接');
                    return; 
                }
                if(dataJson.AcctMrk==""){
                    vant.Toast('请选择客户需求');
                    return; 
                }
                if(dataJson.AcctMrk.indexOf('4')!==-1 && !dataJson.AcctMrkDsc){
                    vant.Toast('请输入其他客户需求');
                    return;
                }
                if(that.datatype=="2"){
                    if(!dataJson.custtype){
                        vant.Toast('请选择客群标签');
                        return; 
                    }
                    if(dataJson.custtype.indexOf('11')!==-1 && !dataJson.custdesc){
                        vant.Toast('请输入其他客群标签');
                        return;
                    }
                }
                if(dataJson.EntpNm==""){
                    vant.Toast('请输入企业名称');
                    return; 
                }
                //统一社会信用代码

                var codeTest=/^[0-9A-Z]+$/;
                if(dataJson.UnifyUvslCrCd && dataJson.UnifyUvslCrCd.trim() && (dataJson.UnifyUvslCrCd.length!=18 || !codeTest.test(dataJson.UnifyUvslCrCd))){
                    vant.Toast('请输入正确的统一社会信用代码');
                    return; 
                }
                if(dataJson.EntpCorpAdr==""){
                    vant.Toast('请输入企业经营地址');
                    return; 
                }
                if(dataJson.Province=="" || dataJson.City=="" || dataJson.District==""){
                    vant.Toast('请选择省市区');
                    return; 
                }
                if(!that.image1 || that.image1.length==0){
                    vant.Toast('请上传招牌照片');
                    return;
                }
                // if(!that.image2){
                //     vant.Toast('请上传营业执照');
                //     return;
                // }

                if(!that.image3 || that.image3.length==0){
                    vant.Toast('请上传小微企业办公或经营场所照片');
                    return;
                }
                
                
                if(dataJson.EntpCtcManNm ==""){
                    vant.Toast('请输入企业联系人姓名');
                    return; 
                }
                // if(dataJson.EstbDocManIdentNum=="" || !dataJson.EstbDocManIdentNum){
                //     vant.Toast('请输入身份证号码');
                //     return; 
                // }
                if (dataJson.EstbDocManIdentNum && dataJson.EstbDocManIdentNum.trim() && !checkIdcard(dataJson.EstbDocManIdentNum)) {
                    return vant.Toast('请输入有效身份证号码');
                }
                // if(dataJson.UnifyUvslCrCd==""){
                //     vant.Toast('请输入统一社会信用代码');
                //     return; 
                // }

                // 手机号码校验
                var reg = /^1[0-9]{10}$/;

                if (dataJson.EntpCtcManTelNum && dataJson.EntpCtcManTelNum.trim() && !reg.test(dataJson.EntpCtcManTelNum)) {
                    vant.Toast('企业联系人电话格式不正确');
                    return;
                }

                

                

                var param=that.detail;
                param.SignPhtRte=that.image1?that.image1.join(","):"";//招牌照片路径
                param.BsnLicenseRte=that.image2?that.image2.join(","):"";//营业执照路径
                param.personPhoto=that.image3?that.image3.join(","):"";//场所照片
                param.datatype=that.datatype;
                
                var url="";
                var alertText=""
                
                if(that.ifAdd=="1"){
                    url=baseUrl.submitUrl;
                    alertText="建档成功";

                    vant.Dialog.confirm({
                        title:"温馨提示",
                        cancelButtonText:"取消提交",
                        confirmButtonText:"确认提交",
                        message:"建档被认定为有效建档后，统一社会信用代码、身份证号将不支持修改，请务必确认内容填写正确。"
                    }).then(async()=>{
                        that.submitNew(url,param,alertText);
                        
                    }).catch(()=>{
                        
                        
                    })

                }else{
                    param.InDtlId=that.id;
                    url=baseUrl.updateUrl;
                    alertText="修改成功";
                    that.submitNew(url,param,alertText);
                }
                
            },
            async submitNew(url,param,alertText){
                var that=this;
                const res = await $http(url, true,param, true);

                if (res.retcode === 'success'){
                    alertText=res.data?res.data:alertText;
                    vant.Dialog.alert({
                        message: alertText
                    }).then(() => {
                        localStorage.removeItem(that.humancode+that.detail.EstbDocMnBy);//清除缓存 
                        if(that.datatype=="2"){
                            window.location.href="../villageEhr/list.html?flag="+that.detail.EstbDocMnBy+"&datatype="+this.datatype;
                        }else{
                            window.location.href="list.html?flag="+that.detail.EstbDocMnBy+"&datatype="+this.datatype;


                        }
                    });
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
            },
            resetBut(){
                var that=this;

                vant.Dialog.confirm({
                    title:"请确认是否重新建档",
                    cancelButtonText:"取消",
                    confirmButtonText:"确认",
                    message:""
                }).then(async()=>{
                    localStorage.removeItem(that.humancode+that.detail.EstbDocMnBy);//清除缓存 
                    location.reload();
                    
                }).catch(()=>{
                    
    
                })


               
            },
            
            
            /**
             * 开始录音
             */
            showRecorddiv (param) {
                $('.luyinbtn').attr('start', 'yes');
                $('.recodeblock').addClass('showluyin');
                $('.luyinbtn').text('结束说话');
                this.yuyinFlag=param;
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
                                    if(that.yuyinFlag=="refuseMessage"){
                                        that[that.yuyinFlag] =  that[that.yuyinFlag]?that[that.yuyinFlag]+result:result;

                                    }else{
                                        that.detail[that.yuyinFlag] =  that.detail[that.yuyinFlag]?that.detail[that.yuyinFlag]+result:result;

                                    }
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





