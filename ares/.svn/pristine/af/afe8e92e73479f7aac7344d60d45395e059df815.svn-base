var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getMeetingInfoByIdUrl: 'qywx/newMeet/getMeetingInfoById.xa', // 会议详情
                getUserTypeUrl: 'qywx/newMeet/getUserType.xa', // 查询当前登录人
                queryLocationUrl: 'qywx/newMeet/queryLocation.xa', // 查询会议位置
                queryFloorUrl: 'qywx/newMeet/queryFloor.xa', // 查询楼层
                queryMeetRootListUrl: 'qywx/newMeet/queryMeetRootList.xa', // 查询会议室
                getPhotoDataUrl: 'qywx/newMeet/getPhotoData.xa',
                queryUserUrl: 'qywx/newMeet/queryUser.xa', // 管理人员查询会议参与人
                queryFwPersonUrl: 'qywx/newMeet/queryFwPerson.xa', // 查询服务人员
                addMeetUrl: 'qywx/newMeet/addMeet.xa', // 新增会议
                checkTimeUrl: 'qywx/newMeet/checkTime.xa', // 会议时间校验
                checkTimeMultiUrl:'qywx/newMeet/validateMeetingTimesRange.xa',//预约多天会议时间校验
                addMeetingRangeUrl:"qywx/newMeet/addMeetingRange.xa",//多天新增会议
                editMeetingUrl:"qywx/newMeet/addMeetingUser.xa",//修改参会人
                selectUsersAndDeptUrl:"qywx/newMeet/selectUsersAndDept.xa",// 行外人员选择发起会议人员
                selectDeptsUrl:"qywx/newMeet/selectDepts.xa",// 行外选择预约部门
            },
            userType: '',
            formData: {
                location: '',
                theme: '',
                floor: '',
                meetingRoomId: '',
                roomName: '',
                place: '',
                currentDate: '',
                startTime: '',
                endTime: '',
                noticeTimeType: '',
                sustainType: '', //默认持续
                meetingType: '',
                needEquipment: [],
                attendLoginName: '',
                attendWorkCode: '',
                attendLoginId: '',
                isServiceStaff: '',
                serviceLoginIds: '',
                serviceLoginId: '',
                meetingUserCount:'',   //参会人数
                meetingUserPhone:'',   //预约人联系电话
                startUserId:"",//会议发起人id
                startUserCode:'',//会议发起人员工号
                startUserName:'', //会议发起人姓名
                isImportantUser:2,//是否有重要人员参与
                appointmentDept:'', //预约部门
                appointmentDeptId:'', //预约部门Id
                currentDateStart:'',//连续多天  预约开始日期
                currentDateEnd:'',//连续多天  预约结束日期
                appointmentType:1,//预约类型  预约一天  连续预约多天
                meetingInfoId:'',//会议id  修改会议用
            },
            needEquipmentList: [],
            isMeetingRoom: false,
            finished: false,
            loading: false,
            pageIndex: 1,
            pageSize: 10,
            meetingToidStr: [],
            meetingTonameStr: [],
            meetingRoomList: [
            ],
            appointmentTypeText:"预约一天",
            popupAppointmentType: {
                show: false,
                title: '请选择',
                list: [  {text:"预约一天",val:'1'},
                {text:"预约多天",val:'2'}]
            },
            popupStartDate:{
                show: false,
                title: '请选择',
                currentDate: new Date(),
                minDate: new Date(),
            },
            popupEndDate:{
                show: false,
                title: '请选择',
                currentDate: new Date(),
                minDate: new Date(),
            },
            popupCurrentDate: {
                show: false,
                title: '请选择',
                currentDate: new Date(),
                minDate: new Date(),
            },
            popupLocation: {
                show: false,
                title: '请选择',
                list: [  {text:"总行"},
                {text:"科技部"}]
            },
            popupFloor: {
                show: false,
                title: '请选择',
                list: [
                ]
            },
            popupStartTime: {
                show: false,
                title: '请选择',
                currentDate: '',
                minTime:"",
            },

            popupEndTime: {
                show: false,
                title: '请选择',
                minTime: '',
                currentDate: '',
                minMinute: ''
            },

            popupNoticeTimeType: {
                show: false,
                title: '请选择',
                list: [
                    {
                        text: '提前10分钟',
                        value: '1'
                    },
                    {
                        text: '提前30分钟',
                        value: '2'
                    },
                    {
                        text: '提前1小时',
                        value: '3'
                    },
                    {
                        text: '提前2小时',
                        value: '4'
                    }
                ]
            },
            popupServiceLogin: {
                show: false,
                list: [

                ]
            },
            popupMeetingPerson: {
                show: false,
                list: [

                ]
            },
            popupStartPerson: {
                show: false,
                list: [

                ]
            },
            popupDept: {
                show: false,
                list: [

                ]
            },
            popupSustainType: {
                show: false,
                title: '请选择',
                list: [
                    {
                        text: '一小时',
                        value: '1'
                    },
                    {
                        text: '两小时',
                        value: '2'
                    },
                    {
                        text: '三小时',
                        value: '3'
                    },
                    {
                        text: '四小时',
                        value: '4'
                    },
                    {
                        text: '五小时',
                        value: '5'
                    }
                ]
            },

            popupMeetingType: {
                show: false,
                title: '请选择',
                list: [
                    {
                        text: '普通会议',
                        value: '0'
                    },
                    {
                        text: '视频会议',
                        value: '1'
                    },
                    {
                        text: '接待会议',
                        value: '2'
                    }
                ]
            },
            popupWhetherType: {
                show: false,
                title: '请选择',
                list: [
                    {
                        text: '否',
                        value: 2
                    },
                    {
                        text: '是',
                        value: 1
                    }
                ]
            },

            submitStatus: false,
            tipsFlag:false,
            weekFlag:false,
            currentTime:'',
            // equipment:'小米投影仪、索尼音响'
        },

        created () {
            this.getNowTime();
            this.getUserType();
            if(GetQueryString('meetingInfoId')){
                this.formData.meetingInfoId = GetQueryString('meetingInfoId');
                this.getMeetingInfoById();
            }else{
                if (localStorage.getItem('temporaryData')) {
                    this.temporaryDataRender(JSON.parse(localStorage.getItem('temporaryData')))
                }
                if (localStorage.getItem('needEquipmentList')) {
                    this.needEquipmentList = JSON.parse(localStorage.getItem('needEquipmentList'));
                }
            }
            this.queryLocation();
        },

        methods: {
            getMeetingInfoById () {
                var that = this;
                $http(that.baseUrl.getMeetingInfoByIdUrl,true, {
                    meetingInfoId:that.formData.meetingInfoId
                }, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        console.log(res.data)
                        that.temporaryDataRender(res.data);
                        var needEquipment = res.data.needEquipment?res.data.needEquipment:'';
                        if(needEquipment!=''){
                            that.needEquipmentList = needEquipment.split(',').map(item => {
                                return {lable: item, status:true}
                            })
                        }
                        console.log(that.needEquipmentList,'that.needEquipmentList00000')
                        that.formData.roomName = res.data.place?res.data.place:'';
                    } else {
                        $.alert("",res.retmsg, function () {
                            if (res.retcode == '-1') {
                                wx.closeWindow();
                            } 
                        });
                    }
                });
            },
            // 修改功能  设备数据处理
            handleEquipment() {
                var needEquipmentList= res.data.needEquipment.split(','); 
                var equipmentList = res.data.equipment.split(','); 
                var list = []; 
                for (var i = 0; i < equipmentList.length; i++) { 
                    var obj = { lable: equipmentList[i], status: '' }; 
                    if (needEquipmentList.indexOf(equipmentList[i]) != -1) { 
                        obj.status = true 
                    } else { 
                        obj.status = false 
                    };  
                }; 
                return list;
            },
            // 获取当前时间
            getNowTime(){
                var now = new Date();
                var hours = now.getHours();
                var minutes = now.getMinutes();
                this.currentTime = hours + ":" + minutes;
            },
            // 判断是否21点后(总行会议室21点后不可以进行预约操作)
            checkHours(){
                var hours = "21:00";
                var date = new Date();
                var hoursList = hours.split(":");
                var currentList = this.currentTime.split(":");
                 if (date.setHours(currentList[0], currentList[1]) > date.setHours(hoursList[0], hoursList[1])) {
                     return true;
                 }else{return false;};
            },

            /**
             *
             * @param {*} item
             * @param {*} index
             */
            equipmentHandle (item, index) {
                if(this.formData.meetingInfoId!=''){
                    return;
                }
                this.needEquipmentList[index].status = !this.needEquipmentList[index].status;
                this.formData.needEquipment = this.needEquipmentList.filter(item => { if (item.status) return item }).map(text => { return text.lable });
            },

            getUserType () {
                $http(this.baseUrl.getUserTypeUrl,false,{}, false)
                .then(res => {
                    this.userType = res.data.roleType;
                    if(this.userType=="行内员工"){
                        this.formData.startUserName = $.parseJSON($.cookie("user")).idcardname;
                        this.formData.startUserId = $.parseJSON($.cookie("user")).humancode;
                        this.formData.startUserCode = $.parseJSON($.cookie("user")).humancode;
                        this.formData.appointmentDept = $.parseJSON($.cookie("user")).ssbm;
                    }
                })
            },

            /**
             * 查询会议位置
             */
            queryLocation () {
                $http(this.baseUrl.queryLocationUrl,true,{}, false)
                .then(res => {
                    this.popupLocation.list = res.data.map(item => {
                        return {
                            text: item.location,
                            value: item.location
                        }
                    })
                });
            },
            /**
             * 渲染临时存储数据
             * @param {*} param
             */
            temporaryDataRender (param) {
                this.formData = {
                    ...param
                };
                // this.meetingRoomList = this.meetingRoomList.map(item => {
                //     return {
                //         ...item,
                //         isChecked: item.meetingRoomId == param.meetingRoomId ? true : false
                //     }
                // })
                this.popupCurrentDate.currentDate = new Date(param.currentDate);
                this.popupStartTime.currentDate = param.startTime;
                this.meetingToidStr = param.attendLoginId.split(',');
                this.meetingTonameStr = param.attendLoginName.split(',');
                this.popupEndTime.currentDate = param.endTime;
                this.popupEndTime.minTime = param.startTime.split(':')[0];
                this.popupEndTime.minMinute = param.startTime.split(':')[1];
                if(this.formData.meetingInfoId){
                    this.formData.serviceLoginId = param.serviceUserName;
                    this.formData.serviceLoginIds = param.serviceLoginId;
                }
            },

            /**
             * 临时存储
             */
            temporaryHandle () {
                localStorage.setItem('temporaryData', JSON.stringify(this.formData));
                localStorage.setItem('needEquipmentList', JSON.stringify(this.needEquipmentList));
                vant.Toast('临时保存成功')
            },

            /**
             * 会议参与人
             */

            personHandle () {
                let that = this;
                wx.invoke("selectEnterpriseContact", {
                    "fromDepartmentId": -1,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
                    "mode": "multi",// 必填，选择模式，single表示单选，multi表示多选
                    "type": ["user"],// 必填，选择限制类型，指定department、user中的一个或者多个
                    "selectedDepartmentIds": [],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                    "selectedUserIds": that.meetingToidStr// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                }, function (res) {
                    if (res.err_msg == "selectEnterpriseContact:ok") {
                        if (typeof res.result == 'string') {
                            res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
                        }
                        var selectedUserList = res.result.userList; // 已选的成员列表
                        that.meetingToidStr = [];
                        that.meetingTonameStr = [];
                        for (var i = 0; i < selectedUserList.length; i++) {
                            var user = selectedUserList[i];
                            var userId = user.id; // 已选的单个成员ID
                            var userName = user.name;// 已选的单个成员名称
                            that.meetingToidStr.push(userId);
                            that.meetingTonameStr.push(userName);
                        }
                        console.log(selectedUserList)
                        that.formData.attendLoginId = that.meetingToidStr.join();
                        that.formData.attendLoginName = that.meetingTonameStr.join();
                        // $('#meetingperson span').text(meetingTonameStr.toString());
                    }
                }
                );
            },
            // 会议预约人
            startUserNameHandle(){
                let that = this;
                wx.invoke("selectEnterpriseContact", {
                    "fromDepartmentId": -1,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
                    "mode": "single",// 必填，选择模式，single表示单选，multi表示多选
                    "type": ["user"],// 必填，选择限制类型，指定department、user中的一个或者多个
                    "selectedDepartmentIds": [],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                    "selectedUserIds": that.formData.startUserId// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                }, function (res) {
                    if (res.err_msg == "selectEnterpriseContact:ok") {
                        if (typeof res.result == 'string') {
                            res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
                        }
                        var selectedUserList = res.result.userList; // 已选的成员列表
                        that.formData.startUserId = selectedUserList[0].id;
                        that.formData.startUserName = selectedUserList[0].name;
                    }
                }
                );
            },
            // 会议预约人部门
            appointmentDeptHandle(){

                if (this.formData.appointmentDeptId == '') return vant.Toast('请选择会议发起人姓名')

                $http(this.baseUrl.selectDeptsUrl, true, {
                    departmentId: this.formData.appointmentDeptId
                }, false).then(res => {
                    if (res.data.length > 0) {
                        this.popupDept.list = res.data.map(item => {
                            return {
                                text: `${item.deptName}`,
                                ...item
                            }
                        })
                        this.popupDept.show = true;
                    } else {
                        $.alert("",res.retmsg, function () {
                        });
                    }

                })

                // let that = this;
                // wx.invoke("selectEnterpriseContact", {
                //     "fromDepartmentId": -1,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
                //     "mode": "single",// 必填，选择模式，single表示单选，multi表示多选
                //     "type": ["department"],// 必填，选择限制类型，指定department、user中的一个或者多个
                //     "selectedDepartmentIds":that.formData.appointmentDeptId,// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                //     "selectedUserIds":[]// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                // }, function (res) {
                //     if (res.err_msg == "selectEnterpriseContact:ok") {
                //         if (typeof res.result == 'string') {
                //             res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
                //         }
                //         var selectedDpList = res.result.departmentList; // 已选的部门列表
                //         that.formData.appointmentDeptId = selectedDpList[0].id;
                //         that.formData.appointmentDept = selectedDpList[0].name;
                //     }
                // }
                // );
            },

            inputHandle () {
                $http(this.baseUrl.queryUserUrl, true, {
                    userName: this.formData.attendLoginName
                }, false).then(res => {
                    if (res.data.length > 0) {
                        this.popupMeetingPerson.list = res.data.map(item => {
                            return {
                                text: `${item.bu_descr}/${item.name}`,
                                ...item
                            }
                        })
                        this.popupMeetingPerson.show = true;
                    }

                })
            },

            /**
             * 行外 会议发起人姓名
             */


            inputStartUserHandle () {
                $http(this.baseUrl.selectUsersAndDeptUrl, true, {
                    userName: this.formData.startUserName
                }, false).then(res => {
                    if (res.data.length > 0) {
                        this.popupStartPerson.list = res.data.map(item => {
                            return {
                                text: `${item.bu_descr}/${item.name}`,
                                ...item
                            }
                        })
                        this.popupStartPerson.show = true;
                    }

                })
            },

            popupMeetingPersonConfirm (param) {
                this.formData.attendLoginName = param.name;
                this.formData.attendLoginId = param.humancode;
                this.formData.attendWorkCode = param.humancode;
                this.popupMeetingPerson.show = false;
            },

            popupStartPersonConfirm (param) {
                this.formData.startUserName = param.name;
                this.formData.startUserId = param.humancode;
                this.formData.startUserCode = param.humancode;
                this.formData.appointmentDeptId = param.departmentId;
                this.formData.appointmentDept = '';
                this.popupStartPerson.show = false;
            },

            popupDeptConfirm (param) {
                this.formData.appointmentDept = param.deptName;
                vant.Toast('因存在多部门兼职情况，请明确您此次预约的会议实际发起部门。')
                this.popupDept.show = false;
            },

            /**
             * 提交会议
             */
            submitHandle () {
                var that = this;
                if(this.formData.meetingInfoId!=''){
                    this.eidtTap();
                    return;
                }
                if (this.submitStatus) return;
                if (this.formData.location == '') return vant.Toast('请选择');
                if (this.formData.theme == '') return vant.Toast('请输入');
                if (this.formData.floor == '') return vant.Toast('请选择');
                if (this.formData.meetingRoomId == '') return vant.Toast('请选择');
                
                if(this.formData.appointmentType==1){
                    if (this.formData.currentDate == '') return vant.Toast('请选择');
                }else if(this.formData.appointmentType==2){
                    if (this.formData.currentDateStart == '') return vant.Toast('请选择');
                    if (this.formData.currentDateEnd == '') return vant.Toast('请选择');
                }
               
                if (this.formData.startTime == '') return vant.Toast('请选择');
                if (this.formData.endTime == '') return vant.Toast('请选择');
                if (this.formData.noticeTimeType == '') return vant.Toast('请选择');
                if (this.formData.isImportantUser == '') return vant.Toast('请选择');
                // if (this.formData.needEquipment.length == 0) return vant.Toast('请选择');

                if (this.userType == '管理人员') {
                    if (this.formData.sustainType == '') return vant.Toast('请选择');
                }
                if (this.formData.meetingType == '') return vant.Toast('请选择');
                if (this.formData.attendLoginName == '') return vant.Toast('请选择');
                if (this.formData.attendLoginId == '') return vant.Toast('请选择');
                if (this.formData.isServiceStaff == '1' && this.userType == '管理人员') {
                    if (this.formData.serviceLoginIds == '') return vant.Toast('请选择');
                }
                if(this.formData.location == '总行'){
                    if(this.formData.meetingUserCount == '') return vant.Toast('请输入参会人数');
                }
                if(this.formData.meetingUserPhone == '') return vant.Toast('请输入预约人联系电话');
                if (this.userType == '管理人员') {
                    if (this.formData.appointmentDeptId == '') return vant.Toast('请选择预约部门');
                    if (this.formData.startUserName == '') return vant.Toast('请选择会议发起人');
                }

                if (this.formData.isImportantUser == 1) {
                    if (this.formData.importantLeader  == '') return vant.Toast('请输入重要人的姓名') 
                }
                let params = {
                    location: this.formData.location,
                    floor: this.formData.floor,
                    startTime:'',
                    endTime:'',
                    meetingRoomId: this.formData.meetingRoomId,
                    place: this.formData.place,
                    theme: this.formData.theme,
                    noticeTimeType: this.formData.noticeTimeType,
                    sustainType: this.formData.sustainType,
                    meetingType: this.formData.meetingType,
                    needEquipment: this.formData.needEquipment.join(),
                    attendLoginName: this.formData.attendLoginName,
                    attendLoginId: this.formData.attendLoginId,
                    attendWorkCode: this.formData.attendWorkCode,
                    serviceLoginId: this.formData.isServiceStaff == '1' && this.userType == '管理人员' ? this.formData.serviceLoginIds : '',
                    meetingUserCount: this.formData.meetingUserCount,
                    meetingUserPhone: this.formData.meetingUserPhone,
                    isImportantUser:this.formData.isImportantUser,//是否有重要人员
                    importantLeader : this.formData.isImportantUser == 1 ? this.formData.importantLeader  : '',
                    startUserName:this.formData.startUserName,
                    startUserId:this.formData.startUserId,
                    startUserCode:this.formData.startUserCode,
                    appointmentDept:this.formData.appointmentDept, //预约部门  
                }

                var url = '';
                if (that.formData.appointmentType == 2) {
                    // 预约多天
                    params['currentDateStart'] = this.formData.currentDateStart;
                    params['currentDateEnd'] = this.formData.currentDateEnd;
                    params.startTime = `${this.formData.startTime}:00`;
                    params.endTime = `${this.formData.endTime}:00`;
                    url=that.baseUrl.addMeetingRangeUrl;
                } else {
                    // 预约一天
                    params['currentDate'] = this.formData.currentDate;
                    params.startTime = `${this.formData.currentDate} ${this.formData.startTime}:00`;
                    params.endTime = `${this.formData.currentDate} ${this.formData.endTime}:00`;
                    url=that.baseUrl.addMeetUrl;
                }
                console.log(params,'00000000000000000')
                this.submitStatus = true;
                $http(url,true,params, true)
                .then(res => {
                    this.submitStatus = false;
                    if (res.retcode === 'success') {
                        localStorage.removeItem('temporaryData');
                        localStorage.removeItem('needEquipmentList');
                        $.alert("",res.retmsg, function () {
                            window.location.href = 'views/list.html'
                        });
                    } else {
                        $.alert("",res.retmsg, function () {
                        });
                    }
                });
                //
            },

            // 修改会议
            eidtTap(){
                var that = this;
                if (that.formData.attendLoginId == '') return vant.Toast('请选择参会人');
                if(that.userType=="行内员工"){
                    that.formData.attendWorkCode = "";
                }
                if(that.formData.location == '总行'){
                    if(that.formData.meetingUserCount == '') return vant.Toast('请输入参会人数');
                }
                var params = {
                    meetingInfoId: that.formData.meetingInfoId,
                    meetingRoomId: that.formData.meetingRoomId,
                    theme: that.formData.theme,
                    startTime: that.formData.startTime,
                    endTime:that.formData.endTime,
                    sustainTime: that.formData.sustainTime,
                    attendLoginName: that.formData.attendLoginName,
                    attendLoginId: that.formData.attendLoginId,
                    attendWorkCode: that.formData.attendWorkCode,
                    meetingUserCount: that.formData.meetingUserCount,
                    appointmentDept:that.formData.appointmentDept, 
                };
                $.confirm("", '确认修改会议参会人？', function () {
                    $http(that.baseUrl.editMeetingUrl, true, params, true)
                        .then(res => {
                            if (res.retcode === 'success') {
                                localStorage.removeItem('temporaryData');
                                localStorage.removeItem('needEquipmentList');
                                $.alert("", res.retmsg, function () {
                                    window.location.href = 'views/list.html'
                                });
                            } else {
                                $.alert("", res.retmsg, function () {
                                });
                            }
                        });
                })
               
            },

            meetingRoomHandle () {
                if(this.formData.meetingInfoId!=''){
                    return;
                }
                if (this.formData.location == '' && this.formData.floor == '') return vant.Toast('请选择位置与楼层');
                this.pageIndex = 1;
                this.finished = false,
                this.loading = true;
                this.meetingRoomList = [];
                this.needEquipmentList = [];
                this.formData.needEquipment = [];
                this.queryMeetRootList();
                // 会议室请求
                this.isMeetingRoom = true;

            },

            queryMeetRootList () {
                let params = {
                    location: this.formData.location,
                    floor: this.formData.floor,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                };
                $http(this.baseUrl.queryMeetRootListUrl,true,params, false)
                .then(res => {
                    for (let i = 0; i < res.data.length; i ++) {
                        this.meetingRoomList.push({
                            ...res.data[i],
                            pictures: ''
                        });
                    }

                    this.loading = false;

                    if (10 > res.data.length) {
                        this.finished = true;
                    } else {
                        this.searchDataList.pageNum++
                    }
                })


            },


            /**
             * 会议时间校验
             * @param {*} param
             * @param {*} index
             */

            checkTime () {
                let that = this;
                if (this.formData.startTime == '') return;
                if (this.formData.endTime == '') return;
                if (this.formData.meetingRoomId == '') return;
                if (this.formData.currentDate == '') return;
                if (this.formData.location == '') return;
                if (this.formData.floor == '') return;
                if (this.formData.sustainType == '') return;
                let params = {
                    startTime: `${this.formData.currentDate} ${this.formData.startTime}:00`,
                    endTime: `${this.formData.currentDate} ${this.formData.endTime}:00`,
                    meetingRoomId: this.formData.meetingRoomId,
                    currentDate: this.formData.currentDate,
                    location: this.formData.location,
                    floor: this.formData.floor,
                    sustainType: this.formData.sustainType
                }
                $http(this.baseUrl.checkTimeUrl,true,params, true)
                .then(res => {
                    if (res.retcode != 'success') {
                        $.alert("",res.retmsg, function () {
                            that.formData.startTime = '';
                            that.formData.endTime = '';
                            that.formData.currentDate = '';
                            localStorage.removeItem('temporaryData');
                            localStorage.removeItem('needEquipmentList');
                        });
                    }
                })

            },
            // 预约多天 会议时间
            checkTimeMulti () {
                let that = this;
                if (this.formData.startTime == '') return;
                if (this.formData.endTime == '') return;
                if (this.formData.meetingRoomId == '') return;
                if (this.formData.currentDateStart == '') return;
                if (this.formData.currentDateEnd == '') return;
                if (this.formData.location == '') return;
                if (this.formData.floor == '') return;
                if (this.formData.sustainType == '') return;
                let params = {
                    currentDateStart:that.formData.currentDateStart,
                    currentDateEnd:that.formData.currentDateEnd,
                    startTime: `${this.formData.startTime}:00`,
                    endTime: `${this.formData.endTime}:00`,
                    meetingRoomId: this.formData.meetingRoomId,
                    currentDate: this.formData.currentDate,
                    location: this.formData.location,
                    floor: this.formData.floor,
                    sustainType: this.formData.sustainType
                }
                $http(this.baseUrl.checkTimeMultiUrl,true,params, true)
                .then(res => {
                    if (res.retcode != 'success') {
                        $.alert("",res.retmsg, function () {
                            that.formData.currentDateStart='',
                            that.formData.currentDateEnd='',
                            that.formData.startTime = '';
                            that.formData.endTime = '';
                            that.formData.currentDate = '';
                            localStorage.removeItem('temporaryData');
                            localStorage.removeItem('needEquipmentList');
                        });
                    }
                })

            },


            lookPictures (param, index) {
                $http(this.baseUrl.getPhotoDataUrl,true,{
                    nameUrl: param.picture
                }, false).then(res => {
                    this.meetingRoomList[index].pictures = 'data:image/png;base64,' + res.data;
                })
            },

            /**
             * 会议室选择
             * @param {*} item
             * @param {*} index
             */

            meetingCheckedHandle (param, index) {
                this.meetingRoomList = this.meetingRoomList.map(item => {
                    return {
                        ...item,
                        isChecked: false
                    }
                });
                this.meetingRoomList[index].isChecked = true;
                this.formData.meetingRoomId = param.meetingRoomId;
                this.formData.roomName = param.roomName;
                this.formData.place = param.departmentName
                this.formData.isServiceStaff = param.isServiceStaff;
                this.needEquipmentList = param.equipment.split('、').map(item => {
                    return {lable: item, status: false}
                })
                this.formData.serviceLoginId = '';
                this.formData.serviceLoginIds = '';
                this.isMeetingRoom = false;
                if (this.userType == '管理人员') {
                    if(this.formData.appointmentType==2){
                        this.checkTimeMulti()
                    }else{
                        this.checkTime();
                    } 
                }
            },

            /**
             * 唤醒弹框
             * @param {*} key
             */
            popupHandle (key) {
                if(this.formData.meetingInfoId!=''){  //会议修改功能  不支持修改
                    return;
                }
                // 楼层
                if (key == 'popupFloor') {
                    if (this.formData.location == '') return vant.Toast('请选择');
                    $http(this.baseUrl.queryFloorUrl,true,{
                        location: this.formData.location
                    }, false)
                    .then(res => {
                        this.popupFloor.list = res.data.map(item => {
                            return {
                                text: `${item.floor}楼`,
                                value: item.floor
                            }
                        })
                        this[key].show = true;
                    });

                }

                else if (key == 'popupServiceLogin') {
                    $http(this.baseUrl.queryFwPersonUrl,true,{}, false)
                    .then(res => {
                        this.popupServiceLogin.list = res.data.map(item => {
                            return {
                                text: item.userName,
                                value: item.loginId,
                                status: false
                            }
                        })
                        this[key].show = true;
                    });

                }else {
                    if (key == 'popupEndTime' && this.formData.startTime == '') {
                        return vant.Toast('请选择开始时间');
                    }else if(key == 'popupEndDate' && this.formData.currentDateStart== ''){
                        return vant.Toast('请选择开始日期');
                    }
                   
                    this[key].show = true;
                }
            },
            getWeek(location){
                var now = new Date();
                var currentDate = formatDate(now);
                var weekDay = now.getDay();
                if((weekDay==0||weekDay==6)&&location.indexOf('总行')!='-1'){
                    this.tipsFlag = true;
                    this.weekFlag = true;
                    if (new Date(this.formData.currentDate).getTime() == new Date(currentDate).getTime()) {
                        var hours = new Date(now.setHours(now.getHours() + 5)).getHours();
                        var minutes = new Date(now).getMinutes();
                        this.popupStartTime.minTime = hours;
                        this.popupStartTime.minMinute = minutes;
                        this.popupStartTime.currentDate = hours + ":" + minutes
                        this.formData.startTime = '';
                        this.formData.endTime = '';
                        this.popupCurrentDate.show = false;
                        this.popupLocation.show = false;
                    }
                }else{
                    this.tipsFlag = false;
                    this.weekFlag = false;
                    this.popupStartTime.minTime = '';
                    this.popupStartTime.minMinute = '';
                    this.popupStartTime.currentDate = '';
                }
            },

            // 预约类型
            popupAppointmentTypeConfirm(param){
                this.appointmentTypeText = param.text;
                this.formData.appointmentType = param.val;
                this.popupAppointmentType.show = false;
            },
            /**
             * 预约日期
             */
            popupCurrentDateConfirm (param) {
                this.formData.currentDate = formatDate(param);
                this.popupCurrentDate.show = false;
                this.getWeek(this.formData.location)
                if (this.userType == '管理人员') {
                    this.checkTime();
                }
            },

            // 预约开始日期
            popupStartDateConfirm(param){
                var nowDay = new Date(param);
                var nextDay = new Date(nowDay.setDate(nowDay.getDate() + 1));
                this.popupEndDate.currentDate = nextDay;
                this.popupEndDate.minDate = nextDay;
                this.formData.currentDateStart= formatDate(param);
                this.popupStartDate.show = false;
                if (this.userType == '管理人员') {
                    this.checkTimeMulti();
                }
            },
            // 预约结束日期
            popupEndDateConfirm(param){
                this.formData.currentDateEnd = formatDate(param);
                this.popupEndDate.show = false;
            },
            /**
             * 开始时间
             */
            popupStartTimeConfirm (param) {
                console.log(param)
                console.log(param.split(':'))
                this.formData.startTime = param;
                this.popupEndTime.currentDate = param;
                this.popupEndTime.minTime = param.split(':')[0];
                this.popupEndTime.minMinute = param.split(':')[1];
                this.formData.endTime = '';
                this.popupStartTime.show = false;
                if (this.userType == '管理人员') {
                    this.checkTimeMulti();
                }
            },

            /**
             * 结束时间
             */
            popupEndTimeConfirm (param) {
                this.formData.endTime = param;
                this.popupEndTime.show = false;
                if (this.userType == '管理人员') {
                    if(this.formData.appointmentType==2){
                        this.checkTimeMulti()
                    }else{
                        this.checkTime();
                    } 
                }
            },

            /**
             * 通知时间
             */
            popupNoticeTimeTypeConfirm (param) {
                console.log(param)
                this.formData.noticeTimeType = param.value;
                this.popupNoticeTimeType.show = false;
            },

            /**
             * 服务人员选择
             * @param {*} param
             */

            popupServiceLoginConfirm (param) {
                this.formData.serviceLoginId = param.text;
                this.formData.serviceLoginIds = param.value;
                this.popupServiceLogin.show = false
            },

            /**
             * 持续时间
             * @param {*} param
             */

            popupSustainTypeConfirm (param) {
                this.formData.sustainType = param.value;
                this.popupSustainType.show = false;
                if (this.userType == '管理人员') {
                    if(this.formData.appointmentType==2){
                        this.checkTimeMulti()
                    }else{
                        this.checkTime();
                    } 
                }
            },

            /**
             * 会议类型
             * @param {*} param
             */

            popupMeetingTypeConfirm (param) {
                console.log(param)
                this.formData.meetingType = param.value;
                this.popupMeetingType.show = false;
            },


            /**
             * 位置
             * @param {*} param
             */

            popupLocationConfirm (param) {
                this.getWeek(param.text)
                if((param.text).indexOf('总行')!=-1){
                    this.tipsFlag = true;
                    if(this.checkHours()){
                        this.popupLocation.show = false;
                        $.alert('','总行会议室无法预约，详情请查看顶部温馨提示！');
                        return false;
                    };
                    this.formData.sustainType = 2;  //预约总行的时候默认是2小时
                }else{
                    this.tipsFlag = false;
                    this.formData.sustainType = ""; 
                }
                this.formData.location = param.text;
                this.formData.floor = '';
                this.formData.meetingRoomId = '';
                this.formData.roomName = '';
                this.formData.place = '';
                this.needEquipmentList = [];
                this.formData.needEquipment = [];
                this.formData.isServiceStaff = '';
                this.formData.serviceLoginId = '';
                this.formData.serviceLoginIds = '';
                this.popupLocation.show = false;
                if (this.userType == '管理人员') {
                    if(this.formData.appointmentType==2){
                        this.checkTimeMulti()
                    }else{
                        this.checkTime();
                    } 
                }
            },

            /**
             * 楼层
             * @param {*} param
             */

            popupFloorConfirm (param) {
                this.formData.floor = param.value;
                this.formData.meetingRoomId = '';
                this.formData.roomName = '';
                this.formData.place = '';
                this.needEquipmentList = [];
                this.formData.needEquipment = [];
                this.formData.isServiceStaff = '';
                this.formData.serviceLoginId = '';
                this.formData.serviceLoginIds = '';
                this.popupFloor.show = false;
                if (this.userType == '管理人员') {
                    if(this.formData.appointmentType==2){
                        this.checkTimeMulti()
                    }else{
                        this.checkTime();
                    } 
                }
            },

            // 是否有重要人员参会
            popupWhetherTypeConfirm (param) {
                this.formData.isImportantUser = param.value;
                this.popupWhetherType.show = false;
            },

            /**
             * 服务人员选择
             */
            handleChecked (index) {
                this.popupServiceLogin.list[index].status = !this.popupServiceLogin.list[index].status;
            },

            /**
             * 确定人员选择
             */

            handleApproveUserChecked () {
                let checkedServiceLogin = this.popupServiceLogin.list.filter(item => {
                    if (item.status) return item;
                })
                this.formData.serviceLoginIds = checkedServiceLogin.map(item => {
                    return item.value
                }).join();
                this.formData.serviceLoginId = checkedServiceLogin.map(item => {
                    return item.text
                }).join()

                this.popupServiceLogin.show = false;
            },

            /**
             *
             * @param {*} imgListKey 图片
             */

            previewHandle (imgListKey) {
                vant.ImagePreview({
                    images: [imgListKey],
                    startPosition: 0
                })
            }
        }
    })
};
