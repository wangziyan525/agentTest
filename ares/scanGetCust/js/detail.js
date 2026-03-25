var baseUrl = {
    getInspectionInfoById:'xczxcustacqu/xczxCustacquDetail.xa',
    submitApproveInfo:'xczxcustacqu/xczxCustacquHandleData.xa',
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            submitTab:'1',
            tab:'',
            applyid:'',
            icon: {
                activeIcon: "../image/ckend.png",
                inactiveIcon: "../image/unselect.png",
            },
            nowDate:'',
            isShow:false,
            resonShow:false,
            refusereason:'',
            detail:{},
            isRectify:true,
            popupDataShow:false,

            popupBottomShow1: false,
            popupObject1: {
                columns: [{text: '资料收集中', val: '2'},{text: '审查审批中', val: '3'},{text: '签约中', val: '4'},
                    {text: '放款', val: '5'},{text: '终止', val: '6'}],
                title: '选择当前阶段',
            },
            objectiveReasons:'',
            opinion:'',
            status:'',
            approveRecordList:[],
            opinionflag:'',
            datastage:'',
            datastageTxt:''
        },
        created() {
        },
        mounted() {
            this.applyid = this.GetQueryStrings('applyid');
            this.tab = this.GetQueryStrings('tab');
            this.getDetail();

        },
        methods: {
            callTap(tel){
                if(tel!='' && tel!=undefined){
                    window.location.href = 'tel:' + tel;
                }
            },
            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
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
                    this.datastageTxt = param.text;
                    this.datastage = param.val;
                }
            },
            chooseSources(num){
                if(num==1){
                    this.isRectify = false
                }else{
                    this.isRectify = true
                }

            },


            getDetail(){
                var that=this;
                var param={};
                param.applyid=that.applyid;
                $http(baseUrl.getInspectionInfoById, true,param, true)
                    .then(res => {
                        if (res.retcode == 'success'){
                            that.detail = res.data
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
                this.refusereason=''
                if(num=='1'){
                    this.opinionflag='1'
                }else{
                    this.opinionflag='2'
                }
            },
            /**
             * 提交审批
             */
            submitBindtap(type) {
                var that = this;
                let params = {};
                let tip='';
                if(type=='ylx'){
                    params.refusereason = '';
                    params.datastage = '1';
                    tip='请确认是否已联系'
                }
                if(type=='qd'){
                    tip='请确认是否提交'
                    if(that.opinionflag == ''){
                        $.alert("", '请选择是否准入');
                        return;
                    }
                    if(that.opinionflag=='2'){
                        that.datastage = '7'
                    }
                    if(that.datastage == ''){
                        $.alert("", '请选择当前阶段');
                        return;
                    }else{
                        params.datastage = that.datastage
                    }
                    if(that.opinionflag=='1' && that.datastage=='6'){
                        if(that.refusereason == ''){
                            $.alert("", '请输入终止原因');
                            return;
                        }
                        params.refusereason = that.refusereason;
                    }else if(that.opinionflag=='2'){
                        if(that.refusereason == ''){
                            $.alert("", '请输入不予准入原因');
                            return;
                        }
                        params.refusereason = that.refusereason;
                    }else{
                        params.refusereason = ''
                    }


                }

                params.applyid = that.applyid;

                vant.Dialog.confirm({
                    title: tip,
                    message: ""
                }).then(() => {
                    $http(baseUrl.submitApproveInfo,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                $.alert("","提交成功",function () {
                                    window.location.href = 'list.html?tab='+that.submitTab;
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



