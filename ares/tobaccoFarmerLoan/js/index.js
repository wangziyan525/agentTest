var baseUrl = {
    queryInfoUrl: 'tobaccoFarmer/getTobaccoFarmerLoanData.xa',//查询
    queryPersonUrl: 'tobaccoFarmer/getFarmerLoanDataManagerListOp.xa',//查询协办人员
    downloadUrl: 'tobaccoFarmer/getBaseImage64.xa',//图片下载
    submitUrl1: 'tobaccoFarmer/updateTobaccoFarmerLoanData.xa',//客户经理审核
    submitUrl2: 'tobaccoFarmer/xbancheckFarmerLoanData.xa',//协办经理审核
    queryCityUrl: 'tobaccoFarmer/getTobaccoFarmerLoanCityList.xa',//查询省市区


}
var vm

function initFun() {
    vm = new Vue({
        el: "#app",
        data: {
            id: "",
            detail: {
                
            },

            //下一级审批人
            nextPersonshow: false,
            nextPersonList: [],
            nextPersonText: "",
            nextPersonValue: "",

            //审批意见
            ifAgreeFlag: "",
            approveRemark: "",

            //身份证图片
            imageLocal1: "",
            imageLocal2: "",

            //下拉框
            typeshow: false,
            typeFlag: "",
            typeList: [],

            //流转记录
            recodeList:[
              
            ],
            statusOpt:{
                "0":"待审核",
                "1":"审核成功",
                "2":"审核拒绝",
                "3":"驳回",
            },

            //对比数据对象
            oneBaseData:{},


            submitText:"",

            //省市区弹框
            showAreaPicker:false,
            areaList:{},
            fieldValue:"请选择",
            cascaderValue:"",

            show:false,
            dateType:"",
            currentDate: new Date(),
            minDate:new Date(1950,0,1),
            maxDate:new Date(3970,10,1),
            TpOpt:{
                "0":"本地烟农",
                "1":"职业烟农",
            }

        },
        created() {
            var that = this;
            var id=GetQueryString("id")?GetQueryString("id"):"";
            that.id = id;
            that.queryInfo();

            $("#app").show();


        },
        mounted() {


        },
        methods: {
            /**
             * z展示日期插件
             * @param param
             */
            showDate(param){
                var that=this;
                that.show=true;
                that.currentDate=that.detail.IdentVldDt? new Date(that.detail.IdentVldDt): new Date();
                that.dateType = param;
            },

            /**
             * 关闭日期插件
             */
            closeDate(){
                var that=this;
                that.show=false;
            },
            /**
             * 选择日期
             * @param value
             */
            chooseDate(value){
                var that=this;
                that.detail[that.dateType]=that.initDateTimer(value);
                that.show=false;
                that.dateType = "";
                that.filltData('IdentVldDt','IdentValTrm');
            },
            /**
             * 初始化时间格式
             * @param {*} param
             */

            initDateTimer (param) {
                var month = param.getMonth() + 1;
                var date = param.getDate();
                if (month < 10) {
                    month = '0' + month;
                }

                if (date < 10) {
                    date = '0' + date;
                }
                return param.getFullYear() + '-' + month + '-' + date;
            },


            /**
             * 级联省市区选择确定
             * @param {*} param0 
             */
            onFinished({selectedOptions}){
                this.show=false;
                // if(this.typeFlag=="ApltPlcAdr"){
                //     this.detail.ApltPlcAdr=selectedOptions.map((option)=>option.text).join('');
                // }
                // if(this.typeFlag=="PltAdr"){
                //     this.detail.PltAdrText=selectedOptions.map((option)=>option.text).join('');
                //     this.detail.PltAdr=selectedOptions[2].value+"@|$"+this.detail.PltAdrText;
                // }

                this.detail.PltAdrText=selectedOptions.map((option)=>option.text).join('');
                this.detail.PltAdr=selectedOptions[2].value+"@|$"+this.detail.PltAdrText;
                
                this.showAreaPicker = false;
                this.cascaderValue="";
                this.typeFlag = "";
            },
            /**
             * 省市区弹框
             * @param {*} param 
             */
            showAreas(param){
                this.typeFlag = param;
                this.showAreaPicker = true;
            },
            areaConfirm ([province, city, area]) {
                console.log(city, area)
                this.detail.Province = province.name;
                this.detail.City = city.name;
                this.detail.District = area.name;
                this.detail.NaPlc = province.name+'/'+city.name+'/'+area.name;
                this.showAreaPicker = false;
            },

            //选择审批意见
            ifAgree(param) {
                this.ifAgreeFlag = param;
                this.approveRemark = "";
            },

            //选择下一级
            onnextPersonConfirm(param) {
                var that = this;
                that.nextPersonValue = param.value;
                that.nextPersonText = param.text;
                that.nextPersonshow = false;
            },

            //选择下拉框
            chooseShow(list, param) {
                var that = this;
                that.typeFlag = param;
                that.typeList = list;
                that.typeshow = true;

            },
            //下拉框选择
            onTypeConfirm(param) {
                var that = this;
                that.typeshow = false;
                that.detail[that.typeFlag] = param.value;
                if(that.typeFlag=="Sex"){
                    that.filltData('Sex','Sex')
                }
                that.typeFlag = "";
                that.typeList = [];

            },
            //下拉框取消
            onTypeCancel() {
                var that = this;
                that.typeshow = false;
                that.typeFlag = "";
                that.typeList = [];
            },

            //基本信息比对
            filltData(param,param1) {
                var that=this;
                if(param=="Ntn"){
                    var Nation=that.oneBaseData.Nation;
                    if(that.oneBaseData.Nation && that.oneBaseData.Nation.trim().length==1){
                        var Nation="0"+Nation;
                    }

                    if(Nation != that.detail.Ntn){
                        that.submitText="客户申请时的身份证信息与核心客户信息不一致，是否继续提交？"
                        return true;
                    }else{
                        return false;
                    }

                } 
                 if(param=="IdentVldDt"){
                    if(that.detail.IdentVldDt && that.oneBaseData.IdentValTrm != that.detail.IdentVldDt.replace(/-/g,'')){
                        that.submitText="客户申请时的身份证信息与核心客户信息不一致，是否继续提交？"
                        return true;
                    }else{
                        return false;
                    }
                }

                if(that.detail[param] && that.oneBaseData[param1] != that.detail[param]){
                    that.submitText="客户申请时的身份证信息与核心客户信息不一致，是否继续提交？"
                    return true;
                } else{
                    return false;
                }
                
                
                
                // else if(param=="DstrInst"){
                //     if(that.oneBaseData.IdentDstrInst == that.detail.Ntn){
                //         return true;
                //     }
                // }else if(param=="Sex"){
                //     if(that.oneBaseData.Sex == that.detail.Sex){
                //         return true;
                //     }
                // }else if(param=="Adrs"){
                //     if(that.oneBaseData.HomeAdr == that.detail.Adrs){
                //         return true;
                //     }
                // }else if(param=="AplNm"){
                //     if(that.oneBaseData.CustChinNam == that.detail.AplNm){
                //         return true;
                //     }
                // }else if(param=="ApltIdentNum"){
                //     if(that.oneBaseData.IdentId == that.detail.ApltIdentNum){
                //         return true;
                //     }
                // }


            },


            /**
             * 查询详情
             */
            async queryInfo() {

                var that = this;
                var param = {};

                param.id = that.id;


                const res = await $http(baseUrl.queryInfoUrl, true, param, true);

                if (res.retcode === 'success') {


                    var detail = res.data.TobaccoFarmerLoanData;
                    that.detail = detail;
                    //利率，金额
                    that.detail.IntRtOld=that.detail.IntRt;
                    that.detail.ApplyAmtOld=that.detail.ApplyAmt;
                    //省市区@|$ 
                    that.detail.PltAdrText=that.detail.PltAdr.split("@|$")?that.detail.PltAdr.split("@|$")[1]:"";
                    //对比基本数据
                    that.oneBaseData=res.data.oneBaseData;
                    //流转记录
                    that.recodeList=res.data.TobaccoFarmerLoanDataFlow;

                    //客户经理审批查询协办人员和省市区

                    if (that.detail.ifCheck == '0' && that.detail.role == 'manager') {
                        that.queryPerson();
                        that.queryCity();
                    }

                    


                    if (that.detail.PhtFrnt) {
                        var param1 = {};
                        param1.fileName = that.detail.PhtFrnt;
                        const res1 = await $http(baseUrl.downloadUrl, true, param1, true);
                        if (res1.retcode === 'success') {
                            that.imageLocal1 = 'data:image/jpg;base64,' + res1.data;
                        } else {
                            that.imageLocal1 = '';
                        }
                    }
                    if (that.detail.PhtCntry) {
                        var param1 = {};
                        param1.fileName = that.detail.PhtCntry;
                        const res1 = await $http(baseUrl.downloadUrl, true, param1, true);
                        if (res1.retcode === 'success') {
                            that.imageLocal2 = 'data:image/jpg;base64,' + res1.data;
                        } else {
                            that.imageLocal2 = '';
                        }
                    }
                    that.$forceUpdate();

                    $("#app").show();

                } else {
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    });
                }

            },
            /**
             * 查询省市区
             */
            async queryCity() {
                var that = this;
                var param = {};
                const res = await $http(baseUrl.queryCityUrl, true, param, true);
                if (res.retcode === 'success') {
                    var rawData=res.data;
                    // 开始转换
                    // const province_list = {};
                    // const city_list = {};
                    // const county_list = {};

                    // rawData.forEach(province => {
                    //     province_list[province.CODE] = province.NAME;
                      
                    //     if (province.CHILDREN) {
                    //       province.CHILDREN.forEach(city => {
                    //         city_list[city.CODE] = city.NAME;
                      
                    //         if (city.CHILDREN) {
                    //           city.CHILDREN.forEach(county => {
                    //             county_list[county.CODE] = county.NAME;
                    //           });
                    //         }
                    //       });
                    //     }
                    //   });
                      
                    //   const areaList = {
                    //     province_list,
                    //     city_list,
                    //     county_list
                    //   };
                    var areaList=[];
                    rawData.forEach(item => {
                        var opt={};
                        opt.text= item.NAME;
                        opt.value= item.CODE;
                        opt.children=[];
                        
                      
                        if (item.CHILDREN) {
                            item.CHILDREN.forEach(item1 => {
                                var opt1={};
                                opt1.text= item1.NAME;
                                opt1.value= item1.CODE;
                                opt1.children=[];
                      
                            if (item1.CHILDREN) {
                                item1.CHILDREN.forEach(item2 => {
                                    var opt2={};
                                    opt2.text= item2.NAME;
                                    opt2.value= item2.CODE;
                                    opt1.children.push(opt2)
                              });
                            }
                            opt.children.push(opt1)
                          });
                        }

                        areaList.push(opt)
                      });


                    that.areaList=areaList;

                } else {
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    });
                }

            },
            /**
             * 查询协办人员
             */
            async queryPerson() {

                var that = this;
                var param = {};

                param.id = that.id;


                const res = await $http(baseUrl.queryPersonUrl, true, param, true);

                if (res.retcode === 'success') {


                    //获取下一级列表
                    var loanReviewEmployeeList = res.data;
                    var nextPersonList = [
                        {text: "请选择", value: ""},
                    ];
                    for (var j = 0; j < loanReviewEmployeeList.length; j++) {
                        var opt = {};
                        opt.value = loanReviewEmployeeList[j].HlpClitMgrInnrStfId;
                        opt.text = loanReviewEmployeeList[j].HlpClitMgrNm;
                        nextPersonList.push(opt);
                    }
                    that.nextPersonList = nextPersonList;

                } else {
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    });
                }

            },

            //检查数字格式
            checkNumber(param){
                var that=this;

                if(that.detail[param]=='0'){
                    that.detail[param]='';
                }else if(that.detail[param].startsWith('0') && !that.detail[param].startsWith('0.')){
                    vant.Toast('请检查数据，不能以0开头');
                    that.detail[param]='';
                }else if(that.detail[param].startsWith('-')){
                    vant.Toast('请检查数据，不能负数');
                    that.detail[param]='';
                }

                var num=that.detail[param];
                var x=String(num).indexOf(".")+1;
                var y=String(num).length-x;
                if(x!=0 && y>2){
                    that.detail[param]=Math.trunc(Number(num)*100)/100;
                }


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


            },

            /**
             * 提交
             */
             submits() {
                var that = this;

                var param = {};

                var url=baseUrl.submitUrl2;//协办审批url

                if (that.detail.role == 'manager') {
                    if(!that.detail.IdentVldDt){
                        vant.Toast('请选择证件有效期');
                        return;
                    }
                    // if(!that.detail.Sex){
                    //     vant.Toast('请选择性别');
                    //     return;
                    // }
                    // if(!that.detail.DstrInst){
                    //     vant.Toast('请输入发证机关');
                    //     return;
                    // }
                    // if(!that.detail.Adrs){
                    //     vant.Toast('请选择住址');
                    //     return;
                    // }
                    // if(!that.detail.Ntn){
                    //     vant.Toast('请选择民族');
                    //     return;
                    // }





                    
                    // if(!that.detail.CtcTel){
                    //     vant.Toast('请输入联系电话');
                    //     return;
                    // }
                    // if(that.detail.CtcTel && that.detail.CtcTel.trim().length<11){
                    //     vant.Toast('请检查联系电话');
                    //     return;
                    // }
                    if(!that.detail.MrgCcst){
                        vant.Toast('请选择婚姻状况');
                        return;
                    }
                    // if(!that.detail.NaPlc){
                    //     vant.Toast('请输入籍贯');
                    //     return;
                    // }
                    if(!that.detail.CtyRsdnCcst){
                        vant.Toast('请选择本市居住情况');
                        return;
                    }
                    if(!that.detail.FamStc){
                        vant.Toast('请选择家庭结构');
                        return;
                    }
                    if(!that.detail.HltCcst){
                        vant.Toast('请选择健康状况');
                        return;
                    }
                    if(!that.detail.ApltPlcAdr){
                        vant.Toast('请输入申请人住所地址');
                        return;
                    }
                    if(!that.detail.PltErc){
                        vant.Toast('请选择种植经验');
                        return;
                    }
                    if(!that.detail.CtrPltAra){
                        vant.Toast('请输入合同种植面积');
                        return;
                    }
                    if(!that.detail.NarTwoYrPerMuOtpt){
                        vant.Toast('请输入近两年每一亩产量');
                        return;
                    }
                    if(!that.detail.NarTwoYrAvSaleUtPrc){
                        vant.Toast('请输入近两年平均销售单价');
                        return;
                    }
                    if(!that.detail.NarTwoYrPutInMuAvCost){
                        vant.Toast('请输入近两年投入亩均成本');
                        return;
                    }
                    if(!that.detail.CurYrExpcMuAvCost){
                        vant.Toast('请输入本年度预计亩均成本');
                        return;
                    }
                    if(!that.detail.CurTobEqmt){
                        vant.Toast('请选择烤烟设备');
                        return;
                    }
                    if(!that.detail.Ast){
                        vant.Toast('请选择资产');
                        return;
                    }
                    if(!that.detail.TotAstAmt){
                        vant.Toast('请输入总资产金额');
                        return;
                    }
                    if(!that.detail.DbTrm){
                        vant.Toast('请输入借款期限');
                        return;
                    }
                    if(!that.detail.PltAdr){
                        vant.Toast('请输入种植地址');
                        return;
                    }


                    if(!that.detail.IntRt){
                        vant.Toast('请输入利率');
                        return;
                    }
                    if(Number(that.detail.IntRt)>Number(that.detail.IntRtOld)){
                        vant.Toast('利率不能大于'+that.detail.IntRtOld);
                        return;
                    }
                    if(Number(that.detail.MinInst )>Number(that.detail.IntRt)){
                        vant.Toast('利率不能小于'+that.detail.MinInst);
                        return;
                    }
                    
                    // if(that.detail.Tp){
                    //     if(that.detail.Tp=='0'){
                    //         if(Number(that.detail.IntRt)>Number(that.detail.IntRtOld)){
                    //             vant.Toast('利率不能大于'+that.detail.IntRtOld);
                    //             return;
                    //         }
                    //         if(Number(that.detail.MinInst )>Number(that.detail.IntRt)){
                    //             vant.Toast('利率不能小于'+that.detail.MinInst);
                    //             return;
                    //         }
    
                    //     }else if(that.detail.Tp=='1'){ //职业
                    //         if(Number(that.detail.IntRt)>Number(that.detail.HighInst)){
                    //             vant.Toast('利率不能大于'+that.detail.HighInst);
                    //             return;
                    //         }
                    //         if(Number(that.detail.MinInst )>Number(that.detail.IntRt)){
                    //             vant.Toast('利率不能小于'+that.detail.MinInst);
                    //             return;
                    //         }
    
                    //     }
                    // }
                    
                    

                   

                    

                    if (!that.detail.ApplyAmt) {
                        vant.Toast('请输入申请额度');
                        return;
                    }
                    if (Number(that.detail.ApplyAmt)<10000) {
                        vant.Toast('最小申请额度10000元');
                        return;
                    }
                    if(Number(that.detail.ApplyAmt)>Number(that.detail.ApplyAmtOld)){
                        vant.Toast('申请额度不能大于'+that.detail.ApplyAmtOld);
                        return;
                    }
                    
                    if (Number(that.detail.ApplyAmt)%10000 != 0) {
                        vant.Toast('申请额度必须为万元');
                        return;
                    }
                    if (that.detail.Tp=='0' && !that.detail.ifSL) {
                        vant.Toast('请选择是否双录');
                        return;
                    }
                    if (that.nextPersonValue == "") {
                        vant.Toast('请选择协办人员');
                        return;
                    }
                    

                    param = that.detail;
                    param.nextHumanCode = that.nextPersonValue;
                    url=baseUrl.submitUrl1;//客户经理审批url
                }

                if (that.ifAgreeFlag == "") {
                    vant.Toast('请选择审批意见');
                    return;
                }
                if (that.ifAgreeFlag == "2" && that.approveRemark == "") {
                    vant.Toast('请输入拒绝原因');
                    return;
                }
                if (that.ifAgreeFlag == "3" && that.approveRemark == "") {
                    vant.Toast('请输入驳回原因');
                    return;
                }

                param.id = that.id;
                param.status  = that.ifAgreeFlag;
                param.remark = that.approveRemark;


                var confirmText=that.submitText;

                if(confirmText && that.detail.role == 'manager'){
                    vant.Dialog.confirm({
                        title:"温馨提示",
                        cancelButtonText:"取消提交",
                        confirmButtonText:"确认提交",
                        message:confirmText+"<span style='color:rgb(251, 30, 30);'>(如客户身份资料已更新，请及时联系客户在手机银行更新客户信息)</span>"
                    }).then(async()=>{
                        that.submitNew(url,param);
                    }).catch(()=>{
                    })
                }else{
                    that.submitNew(url,param);

                }


            },


            async submitNew(url,param){
                var that=this;
                
                const res = await $http(url, true, param, true);
                if (res.retcode === 'success') {
                    vant.Dialog.alert({
                        message: "提交成功"
                    }).then(() => {
                        that.queryInfo();

                    });
                } else {
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    });
                }

            },

            

            //查看图片
            bigImg(img) {
                var imageUrls = new Array();
                imageUrls.push(img);
                vant.ImagePreview(imageUrls);
            },

            /**
             * 开始录音
             */
            showRecorddiv() {
                $('.luyinbtn').attr('start', 'yes');
                $('.recodeblock').addClass('showluyin');
                $('.luyinbtn').text('结束说话');
                wx.startRecord();
            },
            /**
             * 开始录音
             */

            startRecord() {
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
                                    result = result.substring(0, result.length - 1);
                                    that.approveRemark = that.approveRemark + result;
                                    that.$forceUpdate();
                                },
                                fail: function (res) {
                                    $.alert(JSON.stringify(res), "");
                                }
                            })
                        },
                        fail: function (res) {
                            $.alert(JSON.stringify(res), "");
                        }
                    });
                }
            },

            //金额格式化
            formatCurrency(n) {
                //将数字转化为字符串
                if(n==undefined || n == ''){
                    return '';
                }else{

                    //将数字转化为字符串
                    let num = n.toString();
                    let isFu = false;
                    if(num < 0){
                        isFu = true;
                        num = num.replace(/-/g,'');
                    }
                    //判断小数点截取小数点后面的数字
                    if(num.indexOf('.') > 0){
                        var afterNum = num.substr(num.indexOf('.')).substring(1);
                        if(afterNum.length == 0){
                            afterNum = '.00';
                        }else if(afterNum.length == 1){
                            afterNum = '.' + afterNum +'0';
                        }else{
                            afterNum = num.substr(num.indexOf('.')).substring(0,3);
                        }
                    }
                    let after = num.indexOf('.') > 0 ? afterNum : '.00';
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
                    if(isFu){
                        return '-'+ str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串

                    }else {
                        return  '￥'+str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串
                    }
                }
            }


        }


    })
}





