var baseUrl = {
    queryInfoUrl: 'keyCard/getPassCardReceive.xa',//查询
    submitUrl: 'keyCard/UpdatePassCardRceive.xa',//审核
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            id:"",
            detail:{
                
            },
            list:[],
            operate:"",
            role:"",
            bottomshow:false,
            transName:"",
            cardStatusOpt:{
                "0":"待审核",
                "1":"审核成功",
                "2":"已归还",
                "3":"审核拒绝",
                "4":"待归还",
            },

            moveUserID:"",//移交人员
            remark:"",
        },
        created(){
            var that=this;
            var id=GetQueryString("id");
            that.id=id;
            that.queryDetail();
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            /**
             * 查询
             */
            async queryDetail(){
                var that=this;
                var param={};
                param.id=that.id;             
                const res = await $http(baseUrl.queryInfoUrl, true,param, true);

                if (res.retcode === 'success'){
                    that.detail=res.data.passCardReceive;//基本信息
                    that.list=res.data.list;//移交信息
                    that.operate=res.data.operate;//操作
                    that.role=res.data.role;//角色
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        //wx.closeWindow();
                    }); 
                }
                
            },
            //当前机构人员选择
            selectHuman(){
                let that = this;
                wx.invoke('selectEnterpriseContact',{
                    fromDepartmentId:-1,
                    mode:'single',
                    type:['department','user'],
                    selectedDepartmentIds:[],
                    selectedUserIds:[],
                },function (res) {
                    
                    if(res.err_msg == 'selectEnterpriseContact:ok'){
                        if(typeof res.result == 'string'){
                            res.result = JSON.parse(res.result)
                        };
                        var selectedUserList = res.result.userList; //已选的成员列表
                        that.moveUserID  = selectedUserList[0].id; //所选人员ID
                        that.confirm("yijiao");
                    };
                   
                });
               

            },
            /**
             * 弹出筛选状态 
             */
            showPicker(){
                var that=this;
                that.bottomshow=true;
            },
            /**
             * 选择筛选状态
             * @param param
             */
            onConfirm(){
                var that=this;
                that.bottomshow=false;
                
            },
            
            /**
             * 审核/操作
             */
             confirm(operate){
                var that=this;
                var param={};
                param.operate = that.operate;
                if(operate=='guihuanApply'){//归还
                    param.id=that.id;
                    param.moveUserID="";
                    that.submit(param);
                }else if(operate=='yijiao'){//移交
                    param.id=that.id;
                    param.moveUserID=that.moveUserID;
                    that.submit(param);
                }else if(operate=='bohui'){//审核驳回
                    if(that.remark.trim()==""){
                        vant.Toast('请填写审核驳回理由');
                        return ;
                    }
                    param.remark=that.remark;
                    param.id=that.id;
                    param.status="N";
                    that.submit(param);
                }else if(operate=='tongguo'){//审核通过
                    param.id=that.id;
                    param.status="Y";
                    that.submit(param);
                }else if(operate=='jieshou'){//确认接收
                    param.id=that.id;
                    that.submit(param);
                }else if(operate=='guihuan'){//确认归还
                    

                    vant.Dialog.confirm({
                        title:"归还密钥卡",
                        message:"确认提交归还密钥卡归还申请",
                        cancelButtonText:"否",
                        confirmButtonText:"是",
                    }).then(async()=>{
                        param.id=that.id;
                        param.status="GH";
                        that.submit(param);
                    }).catch(()=>{
                       
        
                    })

                    
                }
               
            },
            /**
             * 提交
             * @param {*} param 
             */
            async submit(param){
                var that=this;
                const res = await $http(baseUrl.submitUrl, true,param, true);

                if (res.retcode === 'success'){
                    vant.Dialog.alert({
                        message: "操作成功"
                    }).then(() => {
                        window.location.href="list.html"
                    });
                    that.bottomshow=false;
                    that.remark="";
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
                                    that.remark = that.remark+result;
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





