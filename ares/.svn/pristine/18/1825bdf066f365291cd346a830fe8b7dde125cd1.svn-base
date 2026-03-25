function initFun() {
    new Vue({
        el: '.container',
        data: {
            viewFlag:'',
            today: '',
            currentYear: '',
            currentMonth: '',
            currentDay: "",
            bpList: [],
            firstList: [],
            secondList: [],
            thirdList: [],
            fourthList: [],
            fifthList: [],
            sixthList: [],
            seventhList: []
        },
        created: function () {
            this.today = getToday();
            this.viewFlag = getQueryString('viewFlag')?getQueryString('viewFlag'):"";
            if(this.viewFlag=='edit'){
                if(sessionStorage.getItem('firstRate')){
                    this.firstList = JSON.parse(sessionStorage.getItem('firstRate'));
                    this.secondList = JSON.parse(sessionStorage.getItem('secondRate'));
                    this.thirdList = JSON.parse(sessionStorage.getItem('thirdRate'));
                    this.fourthList = JSON.parse(sessionStorage.getItem('fourthRate'));
                    this.fifthList = JSON.parse(sessionStorage.getItem('fifthRate'));
                    this.sixthList = JSON.parse(sessionStorage.getItem('sixthRate'));
                    this.seventhList = JSON.parse(sessionStorage.getItem('seventhRate'));
                }else{
                    this.getRate();
                }  
            }else{
                this.getRate();
            }
            this.getBP();
        },
        methods: {
            getRate() {
                let that = this;
                getRateList().then(res => {
                    if (res.retcode == 'success') {
                        // 一档
                        that.firstList = res.data.firstRateGroup;
                        that.firstList.map((v, i) => {
                            v['date'] = v.rateMonth.replace(/-/g, '年') + '月';
                        })
                        // 二档
                        that.secondList = res.data.secondRateGroup;
                        that.secondList.map((v, i) => {
                            v['date'] = v.rateMonth.replace(/-/g, '年') + '月';
                        })
                        // 三档
                        that.thirdList = res.data.thirdRateGroup;
                        that.thirdList.map((v, i) => {
                            v['date'] = v.rateMonth.replace(/-/g, '年') + '月';
                        })
                        // 四档
                        that.fourthList = res.data.fourthRateGroup;
                        that.fourthList.map((v, i) => {
                            v['date'] = v.rateMonth.replace(/-/g, '年') + '月';
                        })
                        // 五档
                        that.fifthList = res.data.fifthRateGroup;
                        that.fifthList.map((v, i) => {
                            v['date'] = v.rateMonth.replace(/-/g, '年') + '月';
                        })
                        // 六档
                        that.sixthList = res.data.sixthRateGroup;
                        that.sixthList.map((v, i) => {
                            v['date'] = v.rateMonth.replace(/-/g, '年') + '月';
                        })
                        // 七档
                        that.seventhList = res.data.seventhRateGroup;
                        that.seventhList.map((v, i) => {
                            v['date'] = v.rateMonth.replace(/-/g, '年') + '月';
                        })

                    } else if (res.retcode == '403') {
                        $.alert('', res.retmsg, function () {
                            wx.ready(function () {
                                wx.closeWindow();
                            });
                        })
                    } else {
                        $.alert('', res.retmsg)
                    }

                })
            },
            getBP() {
                let that = this;
                getBPList().then(res => {
                    that.bpList = res.data.bpValueList;
                })
            },
            // 编辑处理
            handleBlur(event) {
                let that = this;
                var index = event.currentTarget.dataset.index;
                var list = that.bpList;
                var list1 = that.firstList;
                var reg = /^\d+(\.\d{1,2})?$/;
                if(list1[index].rate!=""){
                    if(!reg.test(list1[index].rate)){
                        $.alert('','请输入正确的指导利率')
                        return false;
                    }
                    list1[index].rate = Number(list1[index].rate).toFixed(2);
                }
                var list2 = that.secondList;
                var list3 = that.thirdList;
                var list4 = that.fourthList;
                var list5 = that.fifthList;
                var list6 = that.sixthList;
                var list7 = that.seventhList;
                list2[index].rate = (Number(list1[index].rate) + Number(list[2].bpValueCalc)).toFixed(2);
                list3[index].rate = (Number(list2[index].rate) + Number(list[3].bpValueCalc)).toFixed(2);
                list4[index].rate = (Number(list3[index].rate) + Number(list[4].bpValueCalc)).toFixed(2);
                list5[index].rate = (Number(list4[index].rate) + Number(list[5].bpValueCalc)).toFixed(2);
                list6[index].rate = (Number(list5[index].rate) + Number(list[6].bpValueCalc)).toFixed(2);
                list7[index].rate = (Number(list6[index].rate) + Number(list[7].bpValueCalc)).toFixed(2);
            },
            submitHandle() {
                var that = this;
                if (!checkRateItem(that.firstList)) {
                    return false;
                }
                saveTap(that.firstList, 1)
            },
            previewRate() {
                if(checkRateItem(this.firstList)){
                    sessionStorage.setItem('firstRate',JSON.stringify(this.firstList));
                    sessionStorage.setItem('secondRate',JSON.stringify(this.secondList));
                    sessionStorage.setItem('thirdRate',JSON.stringify(this.thirdList));
                    sessionStorage.setItem('fourthRate',JSON.stringify(this.fourthList));
                    sessionStorage.setItem('fifthRate',JSON.stringify(this.fifthList));
                    sessionStorage.setItem('sixthRate',JSON.stringify(this.sixthList));
                    sessionStorage.setItem('seventhRate',JSON.stringify(this.seventhList));
                    window.location.href = './table.html?flag=1'
                }
            },
            // BP管理页面
            toBp() {
                window.location.href = './managementBP.html'
            },
            // 银行挡位管理
            toGradeList() {
                window.location.href = './gradeList.html'
            },
            backTap(){
                history.back();
            },
            beforeDestroy() {
                sessionStorage.removeItem('firstRate');
                sessionStorage.removeItem('secondRate');
                sessionStorage.removeItem('thirdRate');
                sessionStorage.removeItem('fourthRate');
                sessionStorage.removeItem('fifthRate');
                sessionStorage.removeItem('sixthRate');
                sessionStorage.removeItem('seventhRate');
            },
        }
    })
};
