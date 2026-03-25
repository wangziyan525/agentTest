var baseUrl = {
    specialInspectionOrgList:'retailsalescheck/specialInspectionOrgList.xa',
    submitBindtap:"retailsalescheck/specialInspectionSave.xa",
    downLoadImgUrl:'faceExamineCheck/getMsgBase64.xa',//下载图片
    applyExemption:'exemptionApply/applyExemption.xa',
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            id:'',
            orgList:'',
            submitInfo:{
                startTime:"",
                endTime:"",
                specialCheckName:'',
                checkContent:'',
                checkFinishedDate:'',
                checkTimeRange:'',
                scopeTaskExecution:'',
                scopeTaskExecutionTxt:'',
                checkFirstOrgName:'',
                checkSecondOrgName:''
            },
            popupDataShow:false,
            dateType:"",
            currentDate:new Date(),
            firstOrgList:[],
            firstOrgChoose:[],
            secondOrgList:[],
            secondOrgChoose:[],
            popupBottomShow1: false,
            popupObject1: {
                columns: [{text: '一级机构', val: '1'},{text: '经营支行', val: '2'}],
                title: '任务执行范围',
            },
            popupBottomShow2: false,
            /*popupObject2: {
                columns: [],
                title: '一级机构',
            },*/
            popupBottomShow3: false,
           /* popupObject3: {
                columns: [],
                title: '经营支行',
            },*/
            secondFlag:''
        },
        created() {
        },
        mounted() {
            this.mch_code = this.GetQueryStrings('mch_code');
            this.tab = this.GetQueryStrings('tab');
            this.id = this.GetQueryStrings('id');

        },
        methods: {
            jisuan(){
                //计算列表高度
                this.$nextTick(()=>{
                    var bodyHeight = $('.mains').height();
                    var btnHeight = $('.addBtn').outerHeight();
                    $('.orgScroll').css({'height':bodyHeight-btnHeight+'px'});
                })

            },
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            pickerdate(dateType){
                this.dateType=dateType;
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
                var disposeTime = year + '.' + month + '.' + day;

                that.submitInfo[that.dateType] =disposeTime;

                that.popupDataShow = false;

            },
            retrunTimes(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            },
            showTap(num) {
                this.type = num;
                this['popupBottomShow' + num] = true;
                if(num==2){
                    this.jisuan()
                    this.specialInspectionOrgList();
                }
            },
            showTap1(num) {
                this.type = num;

                this.secondOrgList = [];
                this.secondOrgChoose =[];
                var orgListNew = [];
                if(this.firstOrgChoose==''){
                    $.alert("",'请先选择一级机构');
                    return ;
                }else{
                    this['popupBottomShow' + num] = true;
                    this.jisuan()
                    var firstOrgChooseList = this.firstOrgChoose.split(',')
                    for(var i=0;i<firstOrgChooseList.length;i++){
                        for(var j=0;j<this.orgList.length;j++){
                            if(firstOrgChooseList[i]==this.orgList[j].orgname){
                                for(var n=0;n<this.orgList[j].ssbm.length;n++){
                                    orgListNew.push({orgname:this.orgList[j].orgname+'-'+this.orgList[j].ssbm[n].orgname})
                                    /*if(this.orgList[i].ssbm[n].orgname=='营业室'){

                                    }else{
                                        orgListNew.push(this.orgList[i].ssbm[n])
                                    }*/

                                }

                            }
                        }
                    }
                    for(var k=0;k<orgListNew.length;k++){
                        this.secondOrgList.push({orgname: orgListNew[k].orgname,check:false})
                    }
                }
            },
            closeOverlayBindtap() {
                let num = this.type;
                this['popupBottomShow' + num] = false;
            },
            onConfirm(param) {
                let num = this.type;
                this['popupBottomShow' + num] = false;
                if(num==1){
                    this.submitInfo.scopeTaskExecutionTxt = param.text;
                    this.submitInfo.scopeTaskExecution = param.val;

                    this.submitInfo.checkFirstOrgName = ''
                    this.submitInfo.checkSecondOrgName = ''
                    if(param.val == '1'){
                        this.secondFlag = '1'
                    }else{
                        this.secondFlag = '2'
                    }

                }
                if(num==2){
                    this.submitInfo.checkFirstOrgName = param.text;
                    var secondOrg = []
                    this.popupObject3.columns = []
                    for(var i=0;i<this.orgList.length;i++){
                        if(this.orgList[i].orgname == param.text)
                            secondOrg = this.orgList[i].ssbm
                    }

                    for(var j=0;j<secondOrg.length;j++){
                        this.popupObject3.columns.push({text: secondOrg[j].orgname, val: secondOrg[j].orgname})
                    }
                }
                if(num==3){
                    this.submitInfo.checkSecondOrgName = param.text;
                }
            },

            /**
             * 查询机构列表
             */
            specialInspectionOrgList() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                that.firstOrgList = []
                that.firstOrgChoose = []
                let param = {
                }
                $http(baseUrl.specialInspectionOrgList,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            that.orgList = res.data
                            if(that.orgList.length>0){
                                for(var i=0;i<that.orgList.length;i++){
                                    that.firstOrgList.push({orgname: that.orgList[i].orgname,check:false})
                                    /*that.popupObject2.columns.push({text: that.orgList[i].orgname, val: that.orgList[i].orgname})*/
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
                if(that.submitInfo.specialCheckName==''){
                    $.alert("",'请填写专项检查名称');
                    return ;
                }
                /*if(that.submitInfo.startTime==''){
                    $.alert("",'请选择开始时间');
                    return ;
                }*/
                if(that.submitInfo.endTime==''){
                    $.alert("",'请选择结束时间');
                    return ;
                }
                if(that.submitInfo.startTime && that.submitInfo.endTime){
                    if(that.submitInfo.startTime>that.submitInfo.endTime){
                        $.alert("",'结束时间大于开始时间，请重新选择');
                        return ;
                    }
                }
                if(that.submitInfo.checkContent==''){
                    $.alert("",'请填写检查内容');
                    return ;
                }
                if(that.submitInfo.checkFinishedDate==''){
                    $.alert("",'请选择检查完成时间节点');
                    return ;
                }
                if(that.submitInfo.scopeTaskExecution==''){
                    $.alert("",'请选择任务执行范围');
                    return ;
                }
                if(that.firstOrgChoose==''){
                    var firstOrgChooseArr = [];
                   /* $.alert("",'请选择一级机构');
                    return ;*/
                }else{
                    var firstOrgChoose = that.firstOrgChoose.split(',')
                    var firstOrgChooseArr = [];
                    for(var i=0;i<firstOrgChoose.length;i++){
                        firstOrgChooseArr.push({checkFirstOrgName:firstOrgChoose[i],checkSecondOrgName:''})
                    }
                }
                if(that.submitInfo.scopeTaskExecution=='2'){
                    if(that.secondOrgChoose==''){
                        var secondOrgChooseArr = [];
                        /*$.alert("",'请选择经营支行');
                        return ;*/
                    }else{
                        var secondOrgChoose = that.secondOrgChoose.split(',');
                        var secondOrgChooseArr = [];
                        for(var k=0;k<secondOrgChoose.length;k++){
                            var str1 = secondOrgChoose[k].split('-')[0];
                            var str2 = secondOrgChoose[k].split('-')[1];
                            secondOrgChooseArr.push({checkFirstOrgName:str1,checkSecondOrgName:str2})
                        }
                    }
                }

                params.specialCheckName = that.submitInfo.specialCheckName;
                if(that.submitInfo.startTime){
                    params.checkTimeRange = that.submitInfo.startTime+'-'+that.submitInfo.endTime;
                }else{
                    params.checkTimeRange = that.submitInfo.endTime;
                }

                params.checkContent = that.submitInfo.checkContent;
                params.scopeTaskExecution = that.submitInfo.scopeTaskExecution;
                params.checkFirstOrgNameList = firstOrgChooseArr;
                params.checkSecondOrgNameList = secondOrgChooseArr;
                params.checkFinishedDate = that.submitInfo.checkFinishedDate;

                vant.Dialog.confirm({
                    title: '请确认是否提交',
                    message: ""
                }).then(() => {
                    $http(baseUrl.submitBindtap,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                $.alert("","提交成功",function () {
                                    window.location.href = 'specialCheckList.html';
                                });

                            }else{
                                $.alert("",res.retmsg,function () {

                                });
                            }
                        });
                }).catch(() => {

                })
            },
            //选择介绍人
            // 多选
            xuanzManager(index) {
                let that = this;
                that.firstOrgList[index].check = !that.firstOrgList[index].check;
                that.watchSelect()

            },
            // 检测选择数量
            watchSelect() {
                let that = this;

                let list = that.firstOrgList;
                let firstOrgChoose = [];
                let checkChooseLength = [];
                list = list.filter((item)=>{
                    return item.check==true;
                });
                for(var i=0;i<list.length;i++){
                    if(list[i].check && list[i].check==true){
                        var obj1 = list[i].orgname
                        checkChooseLength.push(obj1)
                        firstOrgChoose.push(obj1)
                    };
                }
                that.firstOrgChoose = firstOrgChoose.join(',')
                console.log(that.firstOrgChoose)
                console.log(checkChooseLength)

            },

            chooseSel2(){
                this.popupBottomShow2 = false;

            },
            closeSel2(){
                this.popupBottomShow2 = false;
                this.firstOrgChoose=[];
            },



            //选择介绍人
            // 多选
            xuanzManagerSec(index) {
                let that = this;
                that.secondOrgList[index].check = !that.secondOrgList[index].check;
                that.watchSelectSec()

            },
            // 检测选择数量
            watchSelectSec() {
                let that = this;

                let list = that.secondOrgList;
                let secondOrgChoose = [];
                let checkChooseSecLength = [];
                list = list.filter((item)=>{
                    return item.check==true;
                });
                for(var i=0;i<list.length;i++){
                    if(list[i].check && list[i].check==true){
                        var obj1 = list[i].orgname
                        checkChooseSecLength.push(obj1)
                        secondOrgChoose.push(obj1)
                    };
                }
                that.secondOrgChoose = secondOrgChoose.join(',')
                console.log(that.secondOrgChoose)
                console.log(checkChooseSecLength)

            },

            chooseSel3(){
                this.popupBottomShow3 = false;

            },
            closeSel3(){
                this.popupBottomShow3 = false;
                this.secondOrgChoose=[];
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



