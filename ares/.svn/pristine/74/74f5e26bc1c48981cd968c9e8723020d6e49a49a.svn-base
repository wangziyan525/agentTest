var baseUrl = {
    queryInfoUrl: 'misconduct/getUserInfo.xa',//查询用户信息
    queryListUrl: 'misconduct/getInspectors.xa',//查询排查人
    submitUrl: 'misconduct/approvalCheckResult.xa',//审核
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            id:"",
            userInfo:{
                
            },//查询信息

            //弹框
            popupShow:false,
            dataType:"",
            popupList:[],
            //单位负责人列表
            useridList:[],
            unitLeaderUserId:"",
            unitLeaderUserName:"",
            //拒绝原因
            approveFlag:"",
            refuseMessage:"",
            flowStep:"",
            statusOpt:{
                "0":"驳回",
                "1":"通过",
                "2":"待确认",
            },
            roleOpt:{
                "":"",
                "1":"单位负责人",
                "2":"排查人",
            },

            ifEditFlag:"",
            batch:"",

        },
        created(){
            var that=this;
            var id=GetQueryString("id");
            var ifEditFlag=GetQueryString("ifEditFlag");
            var batch=GetQueryString("batch")?GetQueryString("batch"):"";
            that.ifEditFlag=ifEditFlag;
            that.id=id;
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
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                       
                    }); 
                }
                
            },
             /**
             * 查询单位负责人
             */
            async queryUserList(){
                var that=this;
                var param={};
                param.employeeMisconductChecklistId=that.id;
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
            //审批意见
            approve(param){
                var that=this;
                that.approveFlag=param;
                that.refuseMessage="";
            },
            //弹框
            showPopup(param){
                var that=this;
                that.popupShow=true;
                that.dataType=param;
                
                that.popupList=that.useridList;
               
            },
            cancelPopup(){
                var that=this;
                that.popupShow=false;
                that.dataType="";
            },
            onConfirm(param){
                var that=this;
                that.unitLeaderUserId=param.value;
               
                that.unitLeaderUserName=param.text;
                that.popupShow=false;
            },

            
           
            /**
             * 提交
             * @param {*}  
             */
            async submit(){
                var that=this;

                if(that.approveFlag==""){
                    vant.Toast('请选择审批意见');
                    return; 
                }
                if(that.approveFlag=="0" && that.refuseMessage==""){
                    vant.Toast('请输入驳回意见');
                    return; 
                }
                if(that.useridList.length>0 && that.approveFlag=="1"){
                    if(that.unitLeaderUserId==""){
                        vant.Toast('请选择单位负责人');
                        return; 
                    }
                }
                var param={};
                param.status=that.approveFlag;
                param.refuseMessage=that.refuseMessage;
                param.unitLeaderUserId=that.unitLeaderUserId;
                param.unitLeaderUserName=that.unitLeaderUserName;
                param.employeeMisconductChecklistId=that.id;
                param.batch=that.batch;
                const res = await $http(baseUrl.submitUrl, true,param, true);

                if (res.retcode === 'success'){
                    vant.Dialog.alert({
                        message: "操作成功"
                    }).then(() => {
                        window.location.href="list.html?batch="+that.batch;
                    });
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    }); 
                }
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
                                    that.refuseMessage = that.refuseMessage+result;
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





