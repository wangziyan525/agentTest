var baseUrl = {
    getInspectionInfoById:'retailsalescheck/getProblemDetailById.xa',
    getAssignPersonList:"retailsalescheck/getAssignPersonList.xa",
    submitAssignPerson:'retailsalescheck/submitAssignPerson.xa',
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            id:'',
            tab:'',
            refuseInfo:'',
            detail:{},
            mch_code:'',
            operatorName:'',
            operatorId:'',
            popupBottomShow1: false,
            popupObject1: {
                columns: [],
                title: '选择经办人',
            },

        },
        created() {
        },
        mounted() {
            this.tab = this.GetQueryStrings('tab');
            this.id = this.GetQueryStrings('id');
            this.getDetail();
            this.getAssignPersonList();

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
                    this.operatorName = param.text;
                    this.operatorId = param.val;
                }
            },
             getDetail(){
                var that=this;
                var param={};
                param.id=that.id;
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
            /**
             * 查询经办人
             */
            getAssignPersonList() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                let param = {
                }
                $http(baseUrl.getAssignPersonList,true,param, true)
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
            /**
             * 提交审批
             */
            submitBindtap() {
                var that = this;
                let params = {};
                if(that.operatorId==''){
                    $.alert("", '请选择分配人');
                    return;
                }
                params.id = that.id;
                params.userId = that.operatorId;
                params.userName = that.operatorName;

                vant.Dialog.confirm({
                    title: '请确认是否分配至'+that.operatorName+'('+that.operatorId+')',
                    message: ""
                }).then(() => {
                    $http(baseUrl.submitAssignPerson,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                $.alert("","分配成功",function () {
                                    window.location.href = 'assignList.html';
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



