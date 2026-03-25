var baseUrl = {
    queryInfoUrl: 'misconduct/getUserInfo.xa',//查询用户信息
    queryListUrl: 'misconduct/getInspectors.xa',//查询排查人
    submitUrl: 'misconduct/submitResult.xa',//提交
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            id:"",
            page:"page1",
            //时间弹出框
            popupDataShow:false,
            minDate:new Date(1950,0,1),
            maxDate:new Date(),
            currentDate:new Date(),
            //选择下拉框
            popupShow:false,
            dataType:"",
            popupList:[],
            //用户信息
            userInfo:{},
            degreeOfEducation:"",
            permanentAddress:"",
            workTime:"",
            //考核问题
            list:questionList,

            otherDescription:"",
            investigateUserId:"",
            investigateUserName:"",

            useridList:[],//查询审查人

            flowStep:"",
            batch:"",
        },
        created(){
            var that=this;
            var id=GetQueryString("id");
            var batch=GetQueryString("batch")?GetQueryString("batch"):"";
            that.id=id?id:"";
            that.batch=batch;
            that.queryInfo();
            that.queryUserList();
            
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            /**
             * 查询用户信息
             */
            async queryInfo(){
                var that=this;
                var param={};
                param.employeeMisconductChecklistId=that.id;
                param.batch=that.batch;
                const res = await $http(baseUrl.queryInfoUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.userInfo=res.data;
                    //驳回重新修改
                    if(that.id){

                        that.degreeOfEducation=that.userInfo.degreeOfEducation?that.userInfo.degreeOfEducation:"";
                        that.permanentAddress=that.userInfo.permanentAddress?that.userInfo.permanentAddress:"";
                        that.workTime=that.userInfo.workTime?that.userInfo.workTime:"";
                        //考核问题
                        that.list=that.userInfo.investigationResultTreeVOs?that.userInfo.investigationResultTreeVOs:[];
                        that.otherDescription=that.userInfo.otherDescription?that.userInfo.otherDescription:"";
                    
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
             * 查询排查人
             */
            async queryUserList(){
                var that=this;
                var param={};
                param.batch=that.batch;
                const res1 = await $http(baseUrl.queryListUrl, true,param, true);

                if (res1.retcode === 'success'){
                    that.flowStep=res1.data.flowStep;
                    var inspectorUserInfos=res1.data.inspectorUserInfos;
                    var useridList=[];
                    for(var i=0;i<inspectorUserInfos.length;i++){
                        var opt={};
                        opt.text=inspectorUserInfos[i].idcardName;
                        opt.value=inspectorUserInfos[i].userId;
                        useridList.push(opt);

                    }
                    that.useridList=useridList;
                }
                else{
                    vant.Dialog.alert({
                        message: res1.retmsg
                    }).then(() => {
                        
                    }); 
                }
                
            },
            choosePicker(){
                var that=this;
                that.popupDataShow=true;
            },
            //确定时间
            getTime(a) {
                var that=this;
                that.dateVal = that.retrunTimes(a);
                var year = that.dateVal.split('-')[0];
                var month = that.dateVal.split('-')[1];
                var day = that.dateVal.split('-')[2];

                if (month <= 9) {
                    month = '0' + month;
                }
                if (day <= 9) {
                    day = '0' + day;
                }
                var disposeTime = year + '-' + month + '-' + day;

                that.workTime=disposeTime;
                this.popupDataShow = false;

            },
            retrunTimes(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            },
            showPopup(param){
                var that=this;
                that.popupShow=true;
                that.dataType=param;
                if(param=="degreeOfEducation"){
                    that.popupList=educationList;
                }
                if(param=="investigateUserId"){
                    that.popupList=that.useridList;
                }
               
            },
            cancelPopup(){
                var that=this;
                that.popupShow=false;
                that.dataType="";
            },
            onConfirm(param){
                var that=this;
                that[that.dataType]=param.value;
                
                if(that.dataType=="investigateUserId"){
                    that.investigateUserName=param.text;
                }
                that.popupShow=false;
            },
            /**
             * 勾选选项
             * @param {*} index 
             * @param {*} index1 
             * @param {*} results 
             */
            chooseItem(index,index1,results){
                var that=this;
                that.list[index].secondQuestion[index1].result=results;
                that.$forceUpdate();

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
                                    that.otherDescription = that.otherDescription+result;
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
            /**
             * 下一步
             */
            nextBut(){
                var that=this;
                if(that.degreeOfEducation==""){
                    vant.Toast('请选择文化程度');
                    return; 
                }
                if(that.workTime==""){
                    vant.Toast('请选择参加工作时间');
                    return; 
                }
                if(that.permanentAddress==""){
                    vant.Toast('请填写家庭常驻详细住址');
                    return; 
                }
                that.page="page2";
            },
            /**
             * 提交
             */
            async submit(){
                var that=this;
                if(that.degreeOfEducation==""){
                    vant.Toast('请选择文化程度');
                    return; 
                }
                if(that.workTime==""){
                    vant.Toast('请选择参加工作时间');
                    return; 
                }
                if(that.permanentAddress==""){
                    vant.Toast('请填写家庭常驻详细住址');
                    return; 
                }

                var list=that.list;
                var InvestigationResult=[];
                for(var i=0;i<list.length;i++){
                    var optList=list[i].secondQuestion;
                    for(var j=0;j<optList.length;j++){
                        var result=optList[j].result;
                        if(result===""){
                            vant.Toast('请选择'+optList[j].secondTitle);
                            return; 
                        }
                        var opt=optList[j];
                        opt.firstTitle=list[i].firstTitle;
                        opt.firstSequence=list[i].firstSequence;
                        InvestigationResult.push(opt);

                    }
                }
                if(that.investigateUserId==""){
                    vant.Toast('请选择排查人');
                    return;
                }
                
                var param={};
                param.degreeOfEducation=that.degreeOfEducation;
                param.workTime=that.workTime;
                param.permanentAddress=that.permanentAddress;

                param.investigationResults=InvestigationResult;
                param.otherDescription=that.otherDescription;

                param.investigateUserId=that.investigateUserId;
                param.investigateUserName=that.investigateUserName;
                param.flowStep=that.flowStep;
                
                param.employeeMisconductChecklistId=that.id;//修改
                
                param.batch=that.batch;
                const res = await $http(baseUrl.submitUrl, true,param, true);

                if (res.retcode === 'success'){
                   that.page="page3";

                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => { 
                    }); 
                }
                
            },

            /**
             * 返回列表
             */
            toExit(){
                
                window.location.href="applyList.html?batch="+this.batch;
            },
            
            
            


                
                
                
                

            }
            
           
           
           
            
            
    
    })
}





