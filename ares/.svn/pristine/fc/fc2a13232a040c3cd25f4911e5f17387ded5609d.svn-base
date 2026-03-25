var baseUrl = {
    queryList: "retailsalescheck/getApproveList.xa",
    //getPowerInfo: 'safetyCheck/getPowerInfo.xa'
    specialInspectionOrgList:'retailsalescheck/specialInspectionOrgList.xa',
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            orgList:'',
            tab:'1',
            nodata:false,
            tabsDataList:[
            ],
            checkDate:"",
            popupDataShow:false,
            dateType:"",
            currentDate:new Date(),
            pageNum: 1,
            pageSize: 10,
            moreStatus: false,
            noMoreStatus: false,
            show:false,
            checkFirstOrgName:'',
            checkSecondOrgName:'',
            popupBottomShow2: false,
            popupObject2: {
                columns: [],
                title: '一级机构',
            },
            popupBottomShow3: false,
            popupObject3: {
                columns: [],
                title: '经营支行',
            },
        },
        created(){

        },
        mounted(){
            $('#app').show();
            //this.checkFirstOrgName = $.parseJSON($.cookie("user")).buDescr
            this.specialInspectionOrgList();
            this.getList();
        },
        methods:{
            jisuan(){
                //计算列表高度
                this.$nextTick(()=>{
                    var bodyHeight = $(window).height();
                    var topDiv = $('.topDiv').outerHeight();
                    $('.listScroll').css({'height':bodyHeight-topDiv-10+'px'});
                })

            },

            chooseTab(param){
                var that=this;
                that.tab=param;
                this.pageNum = 1;
                this.moreStatus = false
                this.noMoreStatus = false
                this.getList();

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
                if(num==2){
                    this.checkFirstOrgName = param.text;
                    var secondOrg = []
                    this.popupObject3.columns = []
                    for(var i=0;i<this.orgList.length;i++){
                        if(this.orgList[i].orgname == param.text)
                            secondOrg = this.orgList[i].ssbm
                    }
                    if(secondOrg.length==0){
                        this.popupObject3.columns.push({text: '全部', val: ''})
                    }
                    for(var j=0;j<secondOrg.length;j++){
                        this.popupObject3.columns.push({text: secondOrg[j].orgname, val: secondOrg[j].orgname})
                    }
                }
                if(num==3){
                    this.checkSecondOrgName = param.text;
                }
                this.tabsDataList = [];
                this.getList()
            },
            addMore(){
                this.getList();
            },
            /**
             * 查询机构列表
             */
            specialInspectionOrgList() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                let param = {
                }
                $http(baseUrl.specialInspectionOrgList,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            that.orgList = res.data
                            if(that.orgList.length>0){
                                that.popupObject2.columns.push({text: '全部', val: ''})
                                for(var i=0;i<that.orgList.length;i++){
                                    that.popupObject2.columns.push({text: that.orgList[i].orgname, val: that.orgList[i].orgname})
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
            getList() {
                var that = this;
                var token = localStorage.getItem("X-Token");
                var checkFirstOrgName = ''
                var checkSecondOrgName = ''
                if(that.checkFirstOrgName=='全部'){
                    checkFirstOrgName = ''
                }else{
                    checkFirstOrgName = that.checkFirstOrgName
                }
                if(that.checkSecondOrgName=='全部'){
                    checkSecondOrgName = ''
                }else{
                    checkSecondOrgName = that.checkSecondOrgName
                }
                let param = {
                    pageNum: that.pageNum,
                    pageSize: that.pageSize,
                    approveFlag:that.tab,
                    checkFirstOrgName:checkFirstOrgName,
                    checkSecondOrgName:checkSecondOrgName,
                }
                $http(baseUrl.queryList,true,param, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            that.tabsDataList = [];
                            that.jisuan();
                            if(res.data!='' && res.data!=null && res.data!=undefined){
                                that.nodata = false;

                                if(res.data.length<that.pageSize){
                                    that.noMoreStatus = true;
                                    that.moreStatus = false;
                                }else{
                                    that.noMoreStatus = false;
                                    that.moreStatus = true;
                                    that.pageNum++;
                                }
                                var newDataList = [];
                                var dataList=res.data;

                                newDataList = dataList ? dataList : [];
                                that.tabsDataList = that.tabsDataList.concat(newDataList);
                            }else{
                                if(that.pageNum>1){
                                    that.noMoreStatus = true;
                                    that.moreStatus = false;
                                    that.nodata = false;
                                }else{
                                    that.noMoreStatus = false;
                                    that.moreStatus = false;
                                    that.nodata = true;
                                }

                            }
                        }else if (res.retcode == 'user.no.permission') {
                            $.alert('', res.retmsg, function () {
                                wx.closeWindow();
                            })
                        }else{
                            $.alert("",res.retmsg,function () {
                                that.nodata = true;
                            });
                        }
                    });
            },
            jump(item){
                if(this.tab=='1'){
                    window.location.href = 'checkRegisterApprove.html?id='+item.id+'&tab='+this.tab
                }else{
                    window.location.href = 'checkRegisterDetail.html?id='+item.id
                }

            }
        }
    })
}



