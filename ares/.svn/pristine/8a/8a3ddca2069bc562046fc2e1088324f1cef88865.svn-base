function initFun () {
    new Vue({
        el: '.container',
        data: {
            today:'',
            currentYear:'',
            currentMonth:'',
            currentDay:"",
            greaList: {
                subTitle: '一档',
                rateList: []
            },
            bpList:[],
            viewFlag:''
        },
        created:function(){
            this.today = getToday();
            this.currentYear = new Date().getFullYear();
            this.currentMonth = new Date().getMonth()+1;
            this.currentDay = new Date().getDate();
            if(this.currentMonth<10){
                this.currentMonth = '0'+this.currentMonth
            }
            if(this.currentDay<10){
                this.currentDay = '0'+this.currentDay
            }
            this.getRate();
        },
        methods: {
            handleBlur(event) {
                let that = this;
                var index = event.currentTarget.dataset.index;
                var list = that.greaList.rateList;
                var reg = /^\d+(\.\d{1,2})?$/;
                if(list[index].rate!=""){
                    if(!reg.test(list[index].rate)){
                        $.alert('','请输入正确的指导利率')
                        return false;
                    }
                    list[index].rate = Number(list[index].rate).toFixed(2);
                }
            },
            getRate(){
                let that = this;
                getRateList().then(res => {
                    if (res.retcode == 'success') {
                        if(Array.isArray(res.data)&&res.data.length==0){
                            that.viewFlag = 2;
                            if(sessionStorage.getItem('firstRate')){
                                that.greaList.rateList = JSON.parse(sessionStorage.getItem('firstRate'));
                            }else{
                                that.handleDate();
                            } 
                        }else{
                            that.viewFlag = 1;
                            that.greaList.rateList = res.data;
                        }
                        that.getBP();
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
            handleDate(){
                var that = this;
                that.greaList.rateList = []
                for(var i=0;i<7;i++){
                    var month = +that.currentMonth+i;
                    if(month>12){
                        if(month==13){
                            that.currentYear++;
                        }
                        month-=12;
                        console.log(month,that.currentYear)
                    };
                    if(month<10){
                        month = '0'+ month;
                    }
                    var obj = {
                        date: that.currentYear+'年'+month+'月',
                        rateMonth:that.currentYear+'-'+month,
                        rate: ''
                    }
                    that.greaList.rateList.push(obj);
                    console.log(that.greaList.rateList,'that.greaList.rateList')
                }
            },
            previewRate(){
                if(checkRateItem(this.greaList.rateList)){
                    sessionStorage.setItem('firstRate',JSON.stringify(this.greaList.rateList))
                    window.location.href = './table.html?flag=0'
                }
            },
            submitHandle () {
                var that = this;
                if(!checkRateItem(that.greaList.rateList)){
                    return false;
                }
                saveTap(that.greaList.rateList,0)
            },
            // 修改
            editTap(viewFlag){
                console.log(viewFlag,'viewFlag')
                window.location.href = './edit.html?viewFlag='+viewFlag
            },
            // BP管理页面
            toBp(){
                window.location.href = './managementBP.html'
            },
            // 银行挡位管理
            toGradeList(){
                window.location.href = './gradeList.html'
            }
        },
        beforeDestroy() {
            sessionStorage.removeItem('firstRate')
        },
    })
};
