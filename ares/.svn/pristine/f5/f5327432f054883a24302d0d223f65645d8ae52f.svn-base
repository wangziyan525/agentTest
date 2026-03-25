function initFun() {
    new Vue({
        el: '.container',
        data: {
            recordUrl:'bankAcceptanceBill/getBankAcceptanceBillPublishHistory.xa',
            today: "",
            version:"",
            bpList:[],
            tableData:'',
        },
        created: function () {
            this.today = getQueryString('date');
            this.version  = getQueryString('version');
            this.getRecord();
        },
        methods: {
            getRecord(){
                let that = this;
                var params = {
                   date:that.today,
                   version:that.version
                }
                $http(that.recordUrl, true,params, false)
                    .then(res => {
                        that.today = that.today.replace(/-/g, '/');
                        that.bpList = res.data.bpValueList;
                        that.handleDate(res.data.list);
                    });
            },
            handleDate(list) {
                var that = this;
                var date = []; //时间
                list[0].rateList.map((v, i) => {
                    v['date'] = v.rateMonth.replace(/-/g, '年') + '月';
                    date.push(v.date);
                })
                list.map((v,i)=>{
                    v.subTitle =  that.gradeTranslateText(v.subTitle);
                })
                var newObj = {
                    date: date,
                    greaList:list
                };
                console.log(newObj,'newObj')
                that.tableData = newObj   
            },
            gradeTranslateText(num){
                switch(num){
                    case "01":
                        return '一档';
                    case "02":
                        return '二档';
                    case "03":
                        return '三档';
                    case "04":
                        return '四档';
                    case "05":
                        return '五档';
                    case "06":
                        return '六档';
                    case "07":
                        return '七档';
                    default:
                        return '';
                }
            },
        }
    })
};
