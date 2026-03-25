var vm;

function initFun() {
    vm = new Vue({
        el: '.container',
        data: {
            dataList: {},
            reviewList: {},
            managerList: {},
            baseUrl: {
                getFinacGuaranteeLetterDataUrl: 'qywx/finacGuaranteeLetter/getFinacGuaranteeLetterData.xa',
                getManagerListUrl: 'qywx/finacGuaranteeLetter/getManagerList.xa', //查询转办人
                saveFinacGuaranteeLetterDataFlowUrl: 'qywx/finacGuaranteeLetter/saveFinacGuaranteeLetterDataFlow.xa', //提交转办人
                updateFinacGuaranteeLetterDataFlowUrl: 'qywx/finacGuaranteeLetter/updateFinacGuaranteeLetterDataFlow.xa', //审批
                getPdfBase64Url: 'generalFileDownload/finacGuaranteeLetter/getPdfBase64.xa', //预览图片
                //    generalFileDownload/discount/attachmentPreview.xa 


                getPictureBase64Url: 'qywx/finacGuaranteeLetter/getPictureBase64.xa', //下载图片
            },
            rejectMsg: '',
            nodata: '',
            page: '1',
            role: '',
            status: '',
            remark: '',
            base64Str: '',
            searchWord: '',
            showList1: [],
            showList2: [],
            showList3: [],
            showReviewFlag: false,
        },
        mounted() {
            this.getFinacGuaranteeLetterData();
            this.role = this.getQueryString('role');

        },
        methods: {
            //查看图片
            bigImg(imgSrc) {
                var imageUrls = new Array();
                imageUrls.push(imgSrc);
                vant.ImagePreview(imageUrls);

            },
            //查看审批流程
            showReview() {
                this.showReviewFlag = true;

            },
            //查看pdf
            wactchPdf(param) {
                var url = `${base.context}${this.baseUrl.getPdfBase64Url}?fileName=${param.name}`;
                var pdfUrl = '../assets/web/viewer.html?file=' + encodeURIComponent(url) + '&fileName=' + param.name;
                window.location.href = pdfUrl;
            },
            selectMangerList() {
                this.page = '2'
                this.getManagerList()
            },
            selectSubmitInfo(type) {
                this.status = type
                if (type == '1') {
                    $('.pass').attr('src', '../images/ckend.png');
                    $('.refuse').attr('src', '../images/unselect.png');
                } else if (type == '2') {
                    $('.pass').attr('src', '../images/unselect.png');
                    $('.refuse').attr('src', '../images/ckend.png');
                }
            },
            //公司选择
            chooseCompany(value) {
                this.saveFinacGuaranteeLetterDataFlow(value);
            },
            getFinacGuaranteeLetterData() {
                let params = {};
                params.TRAN_SEQ = this.getQueryString('TRAN_SEQ');
                $http(this.baseUrl.getFinacGuaranteeLetterDataUrl, true, params, true)
                    .then(async (res) => {
                        if (res.retcode == 'success') {
                            this.dataList = res.data.data;
                            this.reviewList = res.data.list;
                            if (res.data.data.COMP_FILE1) {
                                this.showList1 = this.fileStrToArray(res.data.data.COMP_FILE1)
                                this.showList1 = await this.getFileBase64(this.showList1)
                            }
                            if (res.data.data.COMP_FILE2) {
                                this.showList2 = this.fileStrToArray(res.data.data.COMP_FILE2)
                                this.showList2 = await this.getFileBase64(this.showList2)
                            }
                            if (res.data.data.COMP_FILE3) {
                                this.showList3 = this.fileStrToArray(res.data.data.COMP_FILE3)
                                this.showList3 = await this.getFileBase64(this.showList3)
                            }
                        } else {
                            $.alert("", res.retmsg, function () {
                                if (res.retcode == '-1') {
                                    wx.closeWindow();
                                }

                            });
                        }
                    });
            },
            //处理图片方法
            fileStrToArray(str) {
                if (!str || typeof str !== 'string') {
                    return []
                }
                return str.split(',').map(filename => {
                    const lastIndex = filename.lastIndexOf('.');
                    const type = lastIndex > -1 ? filename.slice(lastIndex + 1) : '';
                    return {
                        'name': filename,
                        'type': type,
                    }
                })
            },
            //遍历查询base64
            async getFileBase64(fileArray) {
                const result = [];
                for (const file of fileArray) {
                    let params = {};
                    params.fileName = file.name;
                    params.type = '1';
                    const res = await $http(this.baseUrl.getPictureBase64Url, true, params, true);
                    if (res.retcode == 'success') {
                        result.push({ ...file, 'base64': res.data })
                    } else {
                        $.alert("", res.retmsg, function () {
                            if (res.retcode == '-1') {
                                wx.closeWindow();
                            }

                        });
                    }
                }
                return result
            },
            // 查询转办人
            getManagerList() {
                let params = {};
                params.name = this.searchWord;
                $http(this.baseUrl.getManagerListUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.managerList = res.data;
                        } else {
                            $.alert("", res.retmsg, function () {
                                if (res.retcode == '-1') {
                                    wx.closeWindow();
                                }

                            });
                        }
                    });
            },

            // 提交转办人
            saveFinacGuaranteeLetterDataFlow(value) {

                vant.Dialog.confirm({
                    title: '请确定是否转办给'+value.idcardname+'-'+value.userid,
                    message: ""
                }).then(() => {
                    let params = {};
                    params.TRAN_SEQ = this.getQueryString('TRAN_SEQ');
                    params.sendHumancode = value.userid
                    $http(this.baseUrl.saveFinacGuaranteeLetterDataFlowUrl, true, params, true)
                        .then(res => {
                            if (res.retcode == 'success') {

                                window.location.href = "../views/result.html?uuid=" + res.data.uuid + '&time=' + res.data.time + '&result=1'
                            } else {
                                $.alert("", res.retmsg, function () {
                                    if (res.retcode == '-1') {
                                        wx.closeWindow();
                                    }

                                });
                            }
                        });
                }).catch(() => {

                })








            },
            // 审批
            updateFinacGuaranteeLetterDataFlow() {
                let params = {};
                params.TRAN_SEQ = this.getQueryString('TRAN_SEQ');
                params.remark = this.remark
                params.status = this.status //1通过 2拒绝
                if (this.status == '') {
                    vant.Toast("请选择审批意见");
                    return;

                }
                if (this.status == '2') {
                    if (this.remark == '') {
                        vant.Toast("请输入拒绝原因");
                        return;
                    }
                }
                $http(this.baseUrl.updateFinacGuaranteeLetterDataFlowUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            window.location.href = "../views/result.html?uuid=" + res.data.uuid + '&time=' + res.data.time + '&result=2'
                        } else {
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
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
            //审批类型
            getQuestionTypeText(type) {
                const typeMap = {
                    '1': '投标保函',
                    '2': '履约保函',
                    '3': '预付款保函',
                    '4': '质量及维修保函',
                    '5': '付款（支付）保函',
                    '6': '其它非融资性保函',
                };
                return typeMap[type] || '未知';
            },
            //审批状态 

            //状态值 0待处理、1已经处理（待客户经理处理）、2审核通过、3审核拒绝 

            getReviewStatusText(type) {
                const typeMap = {
                    '0': '待处理',
                    '1': '已转办',
                    '2': '审核通过',
                    '3': '审核拒绝',
                };
                return typeMap[type] || '未知';
            },
            getReviewListText(type) {
                const typeMap = {
                    '0': '待审核',
                    '1': '审核通过',
                    '2': '审核拒绝',
                    '3': '已转办',
                };
                return typeMap[type] || '未知';
            },
            //证件类型
            getCertificateTypeText(type) {
                const typeMap = {
                    '06': '营业执照',
                    '07': '开户许可证',
                    '08': '税务登记证',
                    '09': '纳税人编码',
                    '10': '贷款卡号',
                    '11': '社保卡号',
                    '12': '单位证明',
                    '14': '政府批文',
                    '15': '金融企业ID',
                    '20': '港澳居民来往内陆通行证',
                    '21': '台湾居民来往大陆通行证',
                    '30': '统一社会信用代码',
                    '31': '工商注册号',
                    '32': '机关和事业单位登记号',
                    '33': '社会团体登记号',
                    '34': '民办非企业登记号',
                    '35': '基金会登记号',
                    '36': '宗教证书登记号',
                    '37': '其他',
                    '77': '移植对公贷款客户',
                    '88': '移植对公存款客户',
                    '99': '内部户',
                };
                return typeMap[type] || '未知';
            },

            submitHandle() { },
            confirmCenterHandle() { }
        },

    })
};
