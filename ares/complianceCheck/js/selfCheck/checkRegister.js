var baseUrl = {
    saveInspectionInfo:'retailsalescheck/saveInspectionInfo.xa',
    getNextApproveUser:"retailsalescheck/getNextApproveUser.xa",
    getSpecialInspectionList:'retailsalescheck/getSpecialInspectionList.xa',
    applyExemption:'exemptionApply/applyExemption.xa',
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            id:'',
            icon: {
                activeIcon: "../image/ckend.png",
                inactiveIcon: "../image/noCkend.png",
            },
            searchDate1:'',
            refuseInfo:'',
            busType:[],
            popupDataShow:false,
            dateType:"",
            popupDataShowD:false,
            dateTypeD:"",
            currentDate:new Date(),
            popupBottomShow1: false,
            popupObject1: {
                columns: [{text: '基金', val: '1'},{text: '保险', val: '2'},{text: '贵金属', val: '3'},{text: '存款', val: '4'},
                    {text: '理财', val: '5'},{text: '国债', val: '7'},{text: '其他', val: '6'}],
                title: '业务种类',
            },
            popupBottomShow2: false,
            popupObject2: {
                columns: [],
                title: '下一步审核人',
            },
            popupBottomShow3: false,
            popupObject3: {
                columns: [],
                title: '专项检查名称',
            },
            businessInfo:{occurrenceDate:'',businessType:'',businessTypeTxt:'',businessNumber:''},
            businessInfoList:[{occurrenceDate:'',businessType:'',businessTypeTxt:'',businessNumber:''}],
            submitInfo:{
                checkDate:"",
                checkObject:[],
                businessRecordList:'',
                specialCheck:'2',
                specialCheckId:'',
                specialCheckIdTxt:'',
                anyProblem:'',
                problemRecord:'',
                rectificationMeasures:'',
                rectificationFinishDate:'',
                remark:'',
                checkFirstOrgName:'',
                checkName:'',
                checkSecondOrgName:'',
                nextApproveUserName:'',
                nextApproveUserId:'',
            },
            checkObjectFlag:false,
            specialCheckFlag:false,
            anyProblemFlag:false,
            minDate:'',
        },
        created() {
        },
        mounted() {
            this.getNextApproveUser();
            this.id = this.GetQueryStrings('id');
            //this.getDetail();
            this.submitInfo.checkFirstOrgName = $.parseJSON($.cookie("user")).buDescr;
            this.submitInfo.checkSecondOrgName = $.parseJSON($.cookie("user")).ssbm;
            this.submitInfo.checkName = $.parseJSON($.cookie("user")).name;
            this.getSpecialInspectionList()
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
            chooseSpecialCheck(num){
                if(num==1){
                    this.specialCheckFlag = true
                }else{
                    this.specialCheckFlag = false
                }

            },
            chooseAnyProblem(num){
                if(num==1){
                    this.anyProblemFlag = true
                }else{
                    this.anyProblemFlag = false
                }

            },
            chooseCheckObject(num){
                if(this.submitInfo.checkObject.includes('2') || this.submitInfo.checkObject.includes('3')){
                    this.checkObjectFlag = true
                }else{
                    this.checkObjectFlag = false
                }
            },
            pickerdate(dateType){
                this.dateType=dateType;
                if(dateType=='rectificationFinishDate'){
                    this.minDate = new Date()
                }else{
                    this.minDate = new Date(2000,1)
                }
                this.popupDataShow = true;
            },
            closeTime(){
                this.dateType="";
                this.popupDataShow = false;
            },
            //确定时间
            getTime(a) {
                var that=this;
                var dateVal = that.retrunTimes(a);
                var year = dateVal.split('-')[0];
                var month = dateVal.split('-')[1];
                var day = dateVal.split('-')[2];
                if (month <= 9) {
                    month = '0' + month;
                }
                if (day <= 9) {
                    day = '0' + day;
                }
                var disposeTime = year + '-' + month + '-' + day;
                if(that.dateType == 'rectificationFinishDate'){
                    that.submitInfo[that.dateType] =disposeTime;
                }else if(that.dateType == 'checkDate'){
                    that.submitInfo[that.dateType] =disposeTime;
                } else{
                    that.businessInfoList[that.dateType].occurrenceDate =disposeTime;
                }
                that.popupDataShow = false;
                that.$forceUpdate();

            },
            pickerdateD(dateType){
                this.dateTypeD=dateType;
                this.popupDataShowD = true;
            },
            closeTimeD(){
                this.dateTypeD="";
                this.popupDataShowD = false;
            },
            //确定时间
            getTimeD(a) {
                var that=this;
                var dateVal = that.retrunTimesD(a);
                var year = dateVal.split('-')[0];
                var month = dateVal.split('-')[1];
                var day = dateVal.split('-')[2];
                var hour = dateVal.split('-')[3];
                var minutes = dateVal.split('-')[4];
                if (month <= 9) {
                    month = '0' + month;
                }
                if (day <= 9) {
                    day = '0' + day;
                }
                if (hour <= 9) {
                    hour = '0' + hour;
                }
                if (minutes <= 9) {
                    minutes = '0' + minutes;
                }
                var disposeTime = year + '-' + month + '-' + day + ' '+hour+':'+minutes;
                that.businessInfoList[that.dateTypeD].occurrenceDate =disposeTime;
                that.popupDataShowD = false;
                that.$forceUpdate();

            },
            updateInput(){
                this.$forceUpdate();
            },
            retrunTimes(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            },
            retrunTimesD(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() }-${date.getHours() }-${date.getMinutes() }`
            },
            showTap(num,index) {
                this.type = num;
                this.index = index;
                this['popupBottomShow' + num] = true;
            },
            closeOverlayBindtap() {
                let num = this.type;
                this['popupBottomShow' + num] = false;
            },
            onConfirm(param) {
                let num = this.type;
                let index = this.index;
                this['popupBottomShow' + num] = false;
                if(num==1){
                    this.businessInfoList[index].businessTypeTxt = param.text;
                    this.businessInfoList[index].businessType = param.val;
                }
                if(num==2){
                    this.submitInfo.nextApproveUserName = param.text;
                    this.submitInfo.nextApproveUserId = param.val;
                }
                if(num==3){
                    this.submitInfo.specialCheckIdTxt = param.text;
                    this.submitInfo.specialCheckId = param.val;
                }
                this.$forceUpdate();
            },

            addInfo(){
                var obj={occurrenceDate:'',businessType:'',businessTypeTxt:'',businessNumber:''}
                this.businessInfoList.push(obj)
            },
            deleteInfo(index){
                this.businessInfoList.splice(index,1);
                this.$forceUpdate();
            },
            /**
             * 零售合规检查查询专项检查列表
             */
            getSpecialInspectionList() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                let param = {
                }
                /*param.submitFlag = "SUBMIT";
                param.fillType = '1';
                param.id = ''*/
                $http(baseUrl.getSpecialInspectionList,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var list = res.data
                            if(list.length>0){
                                for(var i=0;i<list.length;i++){
                                    that.popupObject3.columns.push({text: list[i].specialCheckName, val: list[i].id})
                                }
                            }
                        }else if (res.retcode == 'user.no.permission') {
                            $.alert('', res.retmsg, function () {
                                wx.closeWindow();
                            })
                        }else{
                            $.alert("",res.retmsg,function () {});
                        }
                    });
            },
            /**
             * 查询下一步审核人
             */
            getNextApproveUser() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                let param = {
                }
                param.submitFlag = "SUBMIT";
                param.fillType = '1';
                param.id = ''
                $http(baseUrl.getNextApproveUser,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var list = res.data
                            if(list.length>0){
                                for(var i=0;i<list.length;i++){
                                    that.popupObject2.columns.push({text: list[i].userName, val: list[i].userId})
                                }
                            }
                        }else if (res.retcode == 'user.no.permission') {
                            $.alert('', res.retmsg, function () {
                                wx.closeWindow();
                            })
                        }else{
                            $.alert("",res.retmsg,function () {});
                        }
                    });
            },
            /**
             * 提交审批
             */
            submitBindtap() {
                var that = this;
                let params = {};
                if(that.submitInfo.checkDate==''){
                    $.alert("", '请选择检查时间');
                    return;
                }
                if(that.submitInfo.checkObject==''){
                    $.alert("", '请选择检查对象');
                    return;
                }
                if(that.submitInfo.checkObject.includes('2') || that.submitInfo.checkObject.includes('3')){
                    if(that.hasEmptyValues(that.businessInfoList)==true){
                        $.alert("", '至少填写一条业务信息');
                        return;
                    }
                }
                if(that.submitInfo.specialCheck==''){
                    $.alert("", '请选择是否为专项检查');
                    return;
                }
                if(that.specialCheckFlag==true){
                    if(that.submitInfo.specialCheckId==''){
                        $.alert("", '请选择专项检查名称');
                        return;
                    }
                }
                if(that.submitInfo.anyProblem==''){
                    $.alert("", '请选择是否存在问题');
                    return;
                }
                if(that.anyProblemFlag==true){
                    if(that.submitInfo.problemRecord==''){
                        $.alert("", '请填写问题记录');
                        return;
                    }
                    if(that.submitInfo.rectificationMeasures==''){
                        $.alert("", '请填写整改措施');
                        return;
                    }
                    if(that.submitInfo.rectificationFinishDate==''){
                        $.alert("", '请选择整改完成时间');
                        return;
                    }
                }
                if(that.submitInfo.nextApproveUserId==''){
                    $.alert("", '请选择下一步审核人');
                    return;
                }
                params.fillType = '1';
                params.businessRecordList = that.businessInfoList
                params.spotCheckObject = '';
                params.checkFirstOrgName = '';
                params.checkSecondOrgName = '';
                params.checkDate = that.submitInfo.checkDate;
                params.checkCategory = '';
                const checkObject = [...that.submitInfo.checkObject].sort((a,b)=>a-b)
                params.checkObject = checkObject.join(',');
                params.specialCheck = that.submitInfo.specialCheck;
                params.specialCheckId = that.submitInfo.specialCheckId;
                params.anyProblem = that.submitInfo.anyProblem;
                params.problemRecord = that.submitInfo.problemRecord;
                params.rectificationMeasures = that.submitInfo.rectificationMeasures;
                params.rectificationFinishDate = that.submitInfo.rectificationFinishDate;
                params.remark = that.submitInfo.remark;
                params.nextApproveUserId = that.submitInfo.nextApproveUserId;
                params.nextApproveUserName = that.submitInfo.nextApproveUserName;
                vant.Dialog.confirm({
                    title: '请确认是否提交',
                    message: ""
                }).then(() => {
                    $http(baseUrl.saveInspectionInfo,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                $.alert("","提交成功",function () {
                                    window.location.href = 'checkRegisterList.html';
                                });

                            }else{
                                $.alert("",res.retmsg,function () {

                                });
                            }
                        });
                }).catch(() => {

                })
            },

            hasEmptyValues(arr){
              return arr.some(obj=>{
                  return Object.values(obj).some(value => value === null || value === undefined || value==='')
              })
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


        }
    })
}



