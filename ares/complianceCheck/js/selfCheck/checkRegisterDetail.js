var baseUrl = {
    getInspectionInfoById:'retailsalescheck/getInspectionInfoById.xa',
    problemSubmit:"retailsalescheck/problemSubmit.xa",
    getNextApproveUser:'retailsalescheck/getNextApproveUser.xa',
    submitApproveInfo:'retailsalescheck/submitApproveInfo.xa',
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
            nowDate:'',
            isShow:false,
            resonShow:false,
            refuseInfo:'',
            detail:{},
            completedRectification:'2',
            receiveDate:'',
            rectificationMeasures:'',
            isRectify:true,
            popupDataShow:false,
            dateType:"",
            currentDate:new Date(),
            rectificationFinishDate:'',
            plannedCompletionDate:'',
            delayReason:'',
            nextApproveUserId:'',
            nextApproveUserName:'',
            popupBottomShow1: false,
            popupObject1: {
                columns: [],
                title: '选择下一步审核人',
            },
            objectiveReasons:'',
            opinion:'',
            status:'',
            approveRecordList:[]
        },
        created() {
        },
        mounted() {

            this.id = this.GetQueryStrings('id');
            this.getDetail();
            //this.getProblemApproveUser();
            this.nowDate = this.getToday();
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
            closeBindtap(){
                this.resonShow = true
            },
            closePup(){
                this.resonShow = false
            },
            showTap(num) {
                this.type = num;
                this['popupBottomShow' + num] = true;
            },
            closeOverlayBindtap() {
                let num = this.type;
                this['popupBottomShow' + num] = false;
            },
            onConfirm(param) {
                let num = this.type;
                this['popupBottomShow' + num] = false;
                if(num==1){
                    this.nextApproveUserName = param.text;
                    this.nextApproveUserId = param.val;
                }
            },
            chooseSources(num){
                if(num==1){
                    this.isRectify = false
                }else{
                    this.isRectify = true
                }

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
                var disposeTime = year + '-' + month + '-' + day;
                that[that.dateType] =disposeTime;
                that.popupDataShow = false;

                if(that.dateType=='plannedCompletionDate'){
                    if(that.detail.problemRecordList.length==0){
                        that.isShow=true
                    }else{
                        if(that.plannedCompletionDate>that.detail.problemRecordList[0].plannedCompletionDate){
                            that.isShow=true
                        }else{
                            that.isShow=false
                        }
                    }

                }
            },
            retrunTimes(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            },
            /**
             * 获取当前日期
             */
            getToday(){
                var myDate=new Date();
                var mm=myDate.getMonth()+1;
                var dd=myDate.getDate();
                if(myDate.getMonth()<9){
                    mm="0"+mm;
                }
                if(myDate.getDate()<10){
                    dd="0"+dd;
                }
                return myDate.getFullYear()+'-'+mm+'-'+dd;
            },
            /**
             * 查询经办人
             */
            getNextApproveUser() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                let param = {
                }
                param.id=that.id;
                param.submitFlag = "";
                param.fillType = '1';
                $http(baseUrl.getNextApproveUser,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var list = res.data
                            if(list.length>0){
                                for(var i=0;i<list.length;i++){
                                    that.popupObject1.columns.push({text: list[i].userName, val: list[i].userId})
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
            getDetail(){
                var that=this;
                var param={};
                param.id=that.id;
                $http(baseUrl.getInspectionInfoById, true,param, true)
                    .then(res => {
                        if (res.retcode == 'success'){
                            that.detail = res.data

                            that.approveRecordList=[]
                            for(var i=0;i<that.detail.approveRecordList.length;i++){
                                if(that.detail.approveRecordList[i].stage=='0' || that.detail.approveRecordList[i].stage=='1' || that.detail.approveRecordList[i].stage=='2' || that.detail.approveRecordList[i].stage=='3' || that.detail.approveRecordList[i].stage=='4' || that.detail.approveRecordList[i].stage=='5' || that.detail.approveRecordList[i].stage=='6'){
                                    that.approveRecordList.push(that.detail.approveRecordList[i])
                                }
                            }
                            that.detail.specialCheckIdTxt = res.data.specialCheckName
                        }else if (res.retcode == 'user.no.permission') {
                            $.alert('', res.retmsg, function () {
                                wx.closeWindow();
                            })
                        }else{
                            $.alert("",res.retmsg,function () {

                            });
                        }
                    });

            },
            selectSubmitInfo(num){
                this.status=num
            },
            /**
             * 提交审批
             */
            submitBindtap() {
                var that = this;
                let params = {};
                if(that.status==''){
                    $.alert("", '请选择审核意见');
                    return;
                }
                if(that.status=='2'){
                    if(that.opinion==''){
                        $.alert("", '请填写驳回原因');
                        return;
                    }
                }else{
                    if(that.nextApproveUserId==''){
                        $.alert("", '请选择下一步审核人');
                        return;
                    }
                }

                params.id = that.id;
                params.status = that.status;
                params.opinion = that.opinion;
                params.nextApproveUserId = that.nextApproveUserId;
                params.nextApproveUserName = that.nextApproveUserName;

                vant.Dialog.confirm({
                    title: '请确认是否提交',
                    message: ""
                }).then(() => {
                    $http(baseUrl.submitApproveInfo,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                $.alert("","提交成功",function () {
                                    window.location.href = 'registerApproveList.html';
                                });

                            }else{
                                $.alert("",res.retmsg,function () {

                                });
                            }
                        });
                }).catch(() => {

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



