var baseUrl = {
    queryFunctionUserRole: 'retailsalescheck/queryFunctionUserRole.xa',
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            showFlag:'0',
        },
        created(){
            var that=this;
            that.queryFunctionUserRole();
            $("#app").show();
            
        },
        mounted(){
            
    
        },
        methods:{


            /**
             * 查询机构列表
             */
            queryFunctionUserRole() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                let param = {
                }
                $http(baseUrl.queryFunctionUserRole,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data=='headoffice'){
                                that.showFlag = '0'
                            }else{
                                that.showFlag = '1'
                            }
                        }else{
                            $.alert("",res.retmsg,function () {});
                        }
                    });
            },
            jump(num){
                if(num=='1'){
                    window.location.href = 'selfCheck/checkRegisterList.html'
                }
                if(num=='2'){
                    window.location.href = 'randomCheck/checkRegisterList.html'
                }
                if(num=='3'){
                    window.location.href = 'randomCheck/checkRegisterListZH.html'
                }
                if(num=='4'){
                    if(this.showFlag=='0'){
                        window.location.href = 'randomCheck/registerApproveListZH.html'
                    }else{
                        window.location.href = 'randomCheck/registerApproveList.html'
                    }

                }
                if(num=='5'){
                    window.location.href = 'rectify/assignList.html'
                }
                if(num=='6'){
                    window.location.href = 'rectify/rectifyList.html'
                }
                if(num=='7'){
                    window.location.href = 'rectify/rectifyApproveList.html'
                }
                if(num=='8'){
                    window.location.href = 'specialSend/specialCheckList.html'
                }
                if(num=='9'){
                    window.location.href = 'summary/summaryTotal.html'
                }
                if(num=='10'){
                    window.location.href = 'summary/detailTotal.html'
                }
            }
        }
    })
}





