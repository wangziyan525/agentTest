var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                getInfoTechUserUrl: 'qywx/techManager/getInfoTechUser.xa', // 查询员工
                saveDataUrl: 'qywx/techManager/saveData.xa', // 保存
            },
            formData: {
                humanCode: '',
                name: '',
                orgId: '',
                orgName: '',
                roleId: '',
                roleName: ''
            },
            roleIdType: {
                show: false,
                title: '请选择',
                list: [
                    // {
                    //     text: '支行安全员',
                    //     value: '0'
                    // },
                    // {
                    //     text: '分行安全员',
                    //     value: '1'
                    // },
                    // {
                    //     text: '总行机关',
                    //     value: '2'
                    // },
                    // {
                    //     text: '一级机构安全员',
                    //     value: '3'
                    // },
                    // {
                    //     text: '直属行安全员',
                    //     value: '4'
                    // }
                ]
            },
            
            submitStatus: false
        },

        created () {
        },

        methods: {
            
            inputHandle () {
                if (this.formData.humanCode && this.formData.humanCode.length != 6) {
                    this.formData = {
                        ...this.formData,
                        name: '',
                        orgId: '',
                        orgName: '',
                        roleId: '',
                        roleName: ''
                    };
                    return
                };

                $http(this.baseUrl.getInfoTechUserUrl, true, {
                    humancode: this.formData.humanCode
                }, true).then(res => {
                    if (res.retcode = 'success') {
                        this.formData = {
                            ...this.formData,
                            ...res.data.infoTechUser
                        }
                        this.roleIdType.list = res.data.list ? res.data.list.map(item => {
                            return {
                                text: item.name,
                                value: item.id
                            }
                        }) : []
                    } else {
                        $.alert("",res.retmsg, function () {})
                    }
                    
                })
            },

            roleIdTypeConfirm (param) {
                console.log(param)
                this.formData.roleName = param.text;
                this.formData.roleId = param.value;
                this.roleIdType.show = false;
            },

            /**
             * 提交会议
             */
            submitHandle () {


                if (this.formData.humanCode.length != 6) return  vant.Toast('请输入员工编号');
                if (this.formData.name == '') return  vant.Toast('请重新输入员工编号');
                if (this.formData.orgId == '') return  vant.Toast('请输入机构ID');
                if (this.formData.orgName == '') return  vant.Toast('请重新输入员工编号');
                if (this.formData.roleName == '') return  vant.Toast('请选择角色名称');
                
                if (this.submitStatus) return ;
                
                console.log(this.formData)
                
                this.submitStatus = true;
                $http(this.baseUrl.saveDataUrl,true,this.formData, true)
                .then(res => {
                    this.submitStatus = false;
                    if (res.retcode === 'success') {
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

            popupHandle (key) {
                this[key].show = true;
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


           
        }
    })
};
