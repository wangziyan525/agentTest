function action() {
    new Vue({
        el: "#app",
        data: {

            addStepUrl: 'xczxcustacqu/orgManagerAdd.xa',  //新增机构
            searchStepList1: 'xczxcustacqu/orgManagerOrgQuery.xa',  //机构模糊搜索
            getPeopleListUrl: 'xczxcustacqu/orgManagerUserQuery.xa',//人员列表接口

            isShowAddPeopleModel:false,


            //-------------------------------------------------------新增页面部分
            stepNo:'',
            stepName:'',
            stepAddress:'',
            stepAddDetail:'',
            leaderList:[],  //领导列表
            leaderListExpand:false, //领导列表是否展开
            custManagerList:[],  //客户经理列表
            custManagerListExpand:true, //客户经理列表是否展开
            isShowCityPupop:false,
            areaList:areaList,
            stepNameSearchTimer:null,  //机构名称搜索的防抖
            stepList:[],     //机构列表
            isShowStepList:false,  //是否展示机构列表
            addPeopleItem:-1,     //选择添加人员索引

            //-------------------------------------------------------新增人员部分
            stepName:'',   //机构名称
            keyword:'',    //搜索名称
            peopleList:[],
            isHaveList:false,
            noList:false,
            selectedTotal:0,
            isAllSelected:false,


        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });


        },
        mounted: function () {


        },
        methods: {

            //----------------------------------------------------------------------------------------------------新增页面部分
            
            //选中地址
            toSelectStepAddress(){
                this.isShowCityPupop = true
            },

            //选中地址确认
            selectedCity(arr){
                this.isShowCityPupop = false
                this.stepAddress = arr[0].name + '/' + arr[1].name + '/' + arr[2].name
                this.stepAddDetail = ''
            },

            //领导收展
            expandLeader(){
                this.leaderListExpand = !this.leaderListExpand;
            },

            //客户经理收展
            expandCustManager(){
                this.custManagerListExpand = !this.custManagerListExpand;
            },

            //机构名称模糊搜索()
            stepNameChnage(){
                this.isShowStepList = false
                this.stepList = []
                if(this.searchStepList){
                    clearTimeout(this.searchStepList);
                }
                this.searchStepList = setTimeout(()=>{
                    this.stepNameChnage1();
                },1000)

            },

            //机构名称模糊搜索
            stepNameChnage1(){
                let params = {};
                params.budescr = this.stepName;
                $http(this.searchStepList1,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data && res.data.length > 0){
                                this.stepList = res.data 
                                this.isShowStepList = true
                            }else{
                                this.isShowStepList = false
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                   
                            });
                        }
                       
                    });
            },

            //选择机构
            selectStep(i){
                this.stepName = this.stepList[i]
                this.isShowStepList = false
                this.stepList = []
            },

            //------------------- 选择人员
            toAddPeople(i){
                this.addPeopleItem = i
                if(this.stepName == ''){
                    vant.Toast('请先输入机构名称');
                    return;
                }else{
                    this.isShowAddPeopleModel = true
                    this.getPeopleList()
                }
            },

            //添加机构
            toAddAgency(){
                if(this.stepNo == ''){
                    vant.Toast('请输入机构号');
                    return;
                };
                if(this.stepName == ''){
                    vant.Toast('请输入机构名称');
                    return;
                };
                if(this.stepAddress == ''){
                    vant.Toast('请选择省市区');
                    return;
                };
                if(this.stepAddDetail == ''){
                    vant.Toast('请输入详细地址');
                    return;
                };
                let params = {};
                params.orgid = this.stepNo;
                params.budescr = this.stepName;
                let arr = this.stepAddress.split('/')
                params.province = arr[0];
                params.city = arr[1];
                params.district = arr[2];
                params.address = this.stepAddDetail;
                if(this.leaderList.length > 0){
                    let arrUser1 = []
                    for(let i=0;i<this.leaderList.length;i++){
                        arrUser1.push(this.leaderList[i].userid)
                    }
                    params.leaderHumancodes = arrUser1;
                }else{
                    params.leaderHumancodes = [];
                }
                if(this.custManagerList.length > 0){
                    let arrUser2 = []
                    for(let i=0;i<this.custManagerList.length;i++){
                        arrUser2.push(this.custManagerList[i].userid)
                    }
                    params.managerHumancodes = arrUser2;
                }else{
                    params.managerHumancodes = [];
                }
                $http(this.addStepUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            vant.Toast('新增成功');
                            history.back()
                        }else{
                            $.alert('',res.retmsg,function(){
                                // WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },


            //删除人员
            deletePeople(i,name,type){
                if(type == 1){
                    let _this = this;
                    $.confirm('', `确定删除${name}吗`, function () {
                        _this.leaderList.splice(i,1)
                    }, function () {
                        //取消操作
                    });
                }else if(type == 2){
                    let _this = this;
                    $.confirm('', `确定删除${name}吗`, function () {
                        _this.custManagerList.splice(i,1)
                    }, function () {
                        //取消操作
                    });
                }
            },


            //----------------------------------------------------------------------------------------------------新增人员部分

            //获取人员列表
            getPeopleList(){
                this.peopleList = []
                let params = {};
                params.budescr = this.stepName;
                params.keyword = this.keyword;
                $http(this.getPeopleListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            if(res.data && res.data.length > 0){
                                this.isHaveList = true;
                                this.noList = false;
                                this.peopleList = res.data.map((item,i)=>{
                                    return{
                                        isSelect:this.readSelectedPeople(res.data[i].userid),
                                        ...item
                                    }
                                })
                            }else{
                                this.isHaveList = false;
                                this.noList = true;
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                   
                            });
                        }
                    });
            },

            //处理选择人员
            readSelectedPeople(id){
                let isSelect = false;
                if(this.addPeopleItem == 1){
                    for(let i=0;i<this.leaderList.length;i++){
                        if(this.leaderList[i].userid == id){
                            isSelect = true
                            break
                        }
                    }
                }else if(this.addPeopleItem == 2){
                    for(let i=0;i<this.custManagerList.length;i++){
                        if(this.custManagerList[i].userid == id){
                            isSelect = true
                            break
                        }
                    }    
                }
                return isSelect
            },

            //选择人员
            peopleSelected(i){
                this.$set(this.peopleList[i],'isSelect',!this.peopleList[i].isSelect)
                this.getPeopleSelectedTotal()
            },

            //全选
            allSelect(){
                if(this.isAllSelected){
                    this.isAllSelected = false
                    for(let i=0;i<this.peopleList.length;i++){
                        this.$set(this.peopleList[i],'isSelect',false)
                    }
                    this.selectedTotal = 0
                }else{
                    this.isAllSelected = true
                    for(let i=0;i<this.peopleList.length;i++){
                        this.$set(this.peopleList[i],'isSelect',true)
                    }
                    this.selectedTotal = this.peopleList.length
                }
                
            },

            //选择人员数量
            getPeopleSelectedTotal(){
                let n = 0;
                for(let i=0;i<this.peopleList.length;i++){
                    if(this.peopleList[i].isSelect){
                        n++
                    }
                }
                this.selectedTotal = n
                //是否全选
                if(this.selectedTotal == this.peopleList.length){
                    this.isAllSelected = true
                }else{
                    this.isAllSelected = false
                }
            },

            //确定选择
            selectedPeopleConfim(){
                let arr = []
                for(let i=0;i<this.peopleList.length;i++){
                    if(this.peopleList[i].isSelect){
                        arr.push(this.peopleList[i])
                    }
                }
                if(arr.length > 0){
                    if(this.addPeopleItem == 1){
                        this.leaderList = arr
                        this.leaderListExpand = true
                    }
                    if(this.addPeopleItem == 2){
                        this.custManagerList = arr
                        this.custManagerListExpand = true
                    }
                    this.isShowAddPeopleModel = false
                }else{
                    vant.Toast('请至少选择一个人员');
                    return;
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
          

        }
    });

}

