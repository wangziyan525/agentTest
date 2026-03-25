var baseUrl = {
    queryInfoUrl: 'customerVoice/selectDepartmentList.xa',//查询部门
    uploadUrl:'customerVoice/downLoadFile.xa',//上传图片
    submitUrl: 'customer/addFeedBack.xa',//申请接口
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            deptName:"",
            deptId:"",

            //选择下拉框
            popupShow:false,
            dataType:"",
            popupList:[
               
            ],

            common:[
                {
                   "feedbackContent":"",
                   "feedbackImageLocal":[],
                   "feedbackImage":[]
                }
            ],
            yuyinIndex:"",
        },
        created(){
            var that=this;
            that.queryDept();
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{
            /**
             * 查询
             */
            async queryDept(){
                var that=this;
                const res = await $http(baseUrl.queryInfoUrl, true,{}, true);
                if (res.retcode === 'success'){
                    var list=res.data;
                    var popupList=list.map(obj=>({
                        text:obj.ssbm,
                        value:obj.deptid
                    }))
                   that.popupList=popupList;

                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg?res.retmsg:"系统异常"
                    }).then(() => { 
                    }); 
                }
            },
            /**
             * 选择照片
             */
            afterRead(index){
                var that=this;
                wx.chooseImage({
                    count:1,
                    sizeType:['compressed'],
                    sourceType:['album','camera'],
                    success:function(res){
                        var localIds=res.localIds;
                        that.upImage(localIds[0],index)
                    }

                })
                
                
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

                        $http(baseUrl.uploadUrl, true,param, false).then(res => {
                            that.common[index].feedbackImageLocal.push(localId);
                            that.common[index].feedbackImage.push(res.data)
                        })
                        
                    }
                })
            },
            /**
             * 添加问题
             */
            addQuestion(){
                var that=this;
                var list=that.common;
                var opt={
                    "feedbackContent":"",
                    "feedbackImageLocal":[],
                    "feedbackImage":[],
                   
                };
                list.push(opt);
                that.common=list;
            },
            /**
             * 删除问题
             * @param {*} index 
             */
            deleteQuestion(index){
                vant.Dialog.confirm({
                    title:"是否删除",
                    cancelButtonText:"否",
                    confirmButtonText:"是",
                    message:""
                }).then(()=>{
                    var that=this;
                    var list=that.common;
                    list.splice(index,1);
                    that.common=list;
                    that.$forceUpdate();
                }).catch(()=>{
                    
    
                })
                
            },
            /**
             * 删除影像
             * @param {*} index 
             * @param {*} indexImg 
             */
            deleteImg(index,indexImg){
                var that=this;
                var list=that.common[index].feedbackImageLocal;
                list.splice(indexImg,1);
                that.common[index].feedbackImageLocal=list;

                var submitList=that.common[index].feedbackImage;
                submitList.splice(indexImg,1);
                that.common[index].feedbackImage=submitList;

                //赋值给common并存入缓存
                
                that.$forceUpdate();
                

            },
            /**
             * 弹框选择
             */
            showPopup(param){
                var that=this;
                that.popupShow=true;
                that.dataType=param;
               
            },
            cancelPopup(){
                var that=this;
                that.popupShow=false;
                that.dataType="";
            },
            onConfirm(param){
                var that=this;
                if(that.dataType=="deptName"){
                    that.deptId=param.value;
                    that.deptName=param.text;
                }
                
                that.popupShow=false;
            },
            
            /**
             * 提交
             */
            async appltBtn(){
                var that=this;
                var common=that.common;
                for(var i=0;i<common.length;i++){
                    var opt=common[i];
                    if(opt.feedbackContent==""){
                        var num=i+1;
                        vant.Toast('请输入问题'+num+'的客户问题');
                        return; 
                    }
                    

                };
                if(that.deptId==""){
                    vant.Toast('请选择接受部门');
                    return; 
                }

                console.log(that.common)
                var param={};
                var submitList=[];
                for(var j=0;j<common.length;j++){
                    var opt={};
                    opt.feedbackContent=common[j].feedbackContent;
                    opt.feedbackImage=common[j].feedbackImage?common[j].feedbackImage.join(","):"";
                    opt.deptId=that.deptId;
                    submitList.push(opt)
                }
                console.log(submitList)
                param.list=submitList;
                const res = await $http(baseUrl.submitUrl, true,param, true);

                if (res.retcode === 'success'){
                    window.location.href="list.html"

                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg?res.retmsg:"系统异常"
                    }).then(() => { 
                    }); 
                }
                
            },

            /**
             * 开始录音
             */
            showRecorddiv (index) {
                $('.luyinbtn').attr('start', 'yes');
                $('.recodeblock').addClass('showluyin');
                $('.luyinbtn').text('结束说话');
                wx.startRecord();
                this.yuyinIndex=index;
            },
             /**
             * 开始录音
             */

            startRecord () {
                let that = this;
                console.log(that.yuyinIndex)
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
                                    
                                    that.common[that.yuyinIndex].feedbackContent = that.common[that.yuyinIndex].feedbackContent+result;
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





