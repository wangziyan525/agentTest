function initFun() {
    new Vue({
        el: '.container',
        data: {
            flag:0,
            today: "",
            bpList:[],
            tableData:'',
            submitList:[],
        },
        created: function () {
            this.today = getToday();
            this.today = this.today.replace(/-/g, '/');
            this.tableData = JSON.parse(sessionStorage.getItem('firstRate'));
            this.flag = getQueryString('flag')?getQueryString('flag'):0
            this.getBP();
        },
        methods: {
            getBP() {
                let that = this;
                getBPList().then(res => {
                    that.bpList = res.data.bpValueList;
                    that.handleDate()
                })
            },
            handleDate() {
                var that = this;
                var list = this.tableData;
                var date = []; //时间
                var firstRateList = [];//一档
                var twoRateList = []; // 二档
                var threeRateList = [];//三档
                var fourRateList = [];//四档
                var fiveRateList = [];//五档
                var sixRateList = [];//六档
                var sevenRateList = [];//七档
                var bp1 = Number(that.bpList[2].bpValueCalc);
                var bp2 = bp1 + Number(that.bpList[3].bpValueCalc);
                var bp3 = bp2 + Number(that.bpList[4].bpValueCalc);
                var bp4 = bp3 + Number(that.bpList[5].bpValueCalc);
                var bp5 = bp4 + Number(that.bpList[6].bpValueCalc);
                var bp6 = bp5 + Number(that.bpList[7].bpValueCalc);
                for (var i = 0; i < list.length; i++) {
                    firstRateList.push(list[i].rate);
                    twoRateList.push((Number(list[i].rate) + bp1).toFixed(2));
                    threeRateList.push((Number(list[i].rate) + bp2).toFixed(2));
                    fourRateList.push((Number(list[i].rate) + bp3).toFixed(2));
                    fiveRateList.push((Number(list[i].rate) + bp4).toFixed(2));
                    sixRateList.push((Number(list[i].rate) + bp5).toFixed(2));
                    sevenRateList.push((Number(list[i].rate) + bp6).toFixed(2));
                    date.push(list[i].date);
                    var obj = {
                        date:list[i].date,
                        rateMonth:list[i].rateMonth,
                        rate:list[i].rate,
                    }
                    that.submitList.push(obj);
                };
                var newObj = {
                    date: date,
                    greaList: [
                        { subTitle: '一档', rateList: firstRateList },
                        { subTitle: '二档', rateList: twoRateList },
                        { subTitle: '三档', rateList: threeRateList },
                        { subTitle: '四档', rateList: fourRateList },
                        { subTitle: '五档', rateList: fiveRateList },
                        { subTitle: '六档', rateList: sixRateList },
                        { subTitle: '七档', rateList: sevenRateList }
                    ]
                };
                that.tableData = newObj
                
            },
            submitHandle() {
                saveTap(this.submitList,this.flag)
            }
        }
    })
};
