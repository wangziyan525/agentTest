function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'xczxcustacqu/orgManagerOrgDetailQuery.xa',//详情接口
            deleteStepUrl: 'xczxcustacqu/orgManagerDel.xa',//删除机构
            getPeopleListUrl: 'xczxcustacqu/orgManagerUserQuery.xa',//人员列表接口
            updateDetailUrl: 'xczxcustacqu/orgManagerEdit.xa',//编辑保存


            id:'',

            //-------------------------------------------------------详情页面部分

            isEdit:false,  //是否编辑
            infos:{},   
            province:'',
            leaderList:[],  //领导列表
            leaderListExpand:false, //领导列表是否展开
            custManagerList:[],  //客户经理列表
            custManagerListExpand:true, //客户经理列表是否展开

            isShowCityPupop:false,
            areaList:areaList,


            isShowAddPeopleModel:false,  //新增人员按钮

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

            this.id = this.getQueryString('id')


        },
        mounted: function () {

            //获取详情
            this.getInfos()

        },
        methods: {

            //获取详情
            getInfos(){
                let params = {};
                params.orgid = this.id;
                $http(this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            this.infos = res.data
                            this.province = res.data.province + '/' + res.data.city + '/' + res.data.district
                            this.leaderList = res.data.leaderUserattachs
                            this.custManagerList = res.data.managerUserattachs
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                        
                    });
            },

            //编辑
            toEdit(){
                this.isEdit = true
                this.leaderListExpand = true
                this.custManagerListExpand = true
            },

            //选中地址
            selectAdress(){
                this.isShowCityPupop = true
            },

            //选中地址确认
            selectedCity(arr){
                this.isShowCityPupop = false
                this.province = arr[0].name + '/' + arr[1].name + '/' + arr[2].name
                this.infos.address = ''
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

            //领导收展
            expandLeader(){
                this.leaderListExpand = !this.leaderListExpand;
            },

            //客户经理收展
            expandCustManager(){
                this.custManagerListExpand = !this.custManagerListExpand;
            },

            //删除机构
            deleteStep(){
                let _this = this;
                $.confirm('', `确定删除此条机构信息吗`, function () {
                    let params = {};
                    params.orgid = _this.id;
                    $http(_this.deleteStepUrl,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                vant.Toast('删除成功');
                                history.back()
                            }else{
                                $.alert('',res.retmsg,function(){
                                   
                                });
                            }
                            
                        });
                }, function () {
                    //取消操作
                });
            },

             //------------------- 选择人员
             toAddPeople(i){
                this.addPeopleItem = i
                if(this.infos.budescr == ''){
                    vant.Toast('请先输入机构名称');
                    return;
                }else{
                    this.isShowAddPeopleModel = true
                    this.getPeopleList()
                }
            },

            //----------------------------------------------------------------------------------------------------新增人员部分

            //获取人员列表
            getPeopleList(){
                this.peopleList = []
                let params = {};
                params.budescr = this.infos.budescr;
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


            //修改保存
            toUpdate(){
                if(this.province == ''){
                    vant.Toast('请选择省市区');
                    return;
                };
                if(this.infos.address == ''){
                    vant.Toast('请输入详细地址');
                    return;
                };
                let params = {};
                params.orgid = this.id;
                params.budescr = this.infos.budescr;
                let arr = this.province.split('/')
                params.province = arr[0];
                params.city = arr[1];
                params.district = arr[2];
                params.address = this.infos.address;
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
                $http(this.updateDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            vant.Toast('编辑完成');
                            history.back()
                        }else{
                            $.alert('',res.retmsg,function(){
                                // WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
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

