var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                phjdCheckBatchListUrl: 'qywx/phjdData/phjdCheckBatchList.xa', // 批次列表
                phjdCheckBatchListDataUrl: 'qywx/phjdData/phjdCheckBatchListData.xa', // 批次列表数据
            },
            dataList: [
                // {
                //     checkbatchnum: '202509-1', // 审查批次
                //     checkbatchname: '', // 审查批次名称
                //     humancode: '', // 员工号
                //     idcardname: '', // 员工姓名
                //     total: '10', // 审报总数
                //     checkedagree: '1', // 已抽查通过个数
                //     checkedrefuse: '', // 已抽查拒绝个数
                //     checkpercent: '10', // 抽查比例
                //     button: '0'
                // }
            ],
            searchData: {
                batchstatus: sessionStorage.getItem('batchstatus') ? sessionStorage.getItem('batchstatus') : '0',
                checkbatchnum: '',
                checkbatchnumName: ''
            },
            checkbatchnum: {
                show: false,
                list: []
            },
            popupBottom: {
                show: false
            },
            headerString: ''
        },
        created() {
            this.phjdCheckBatchList();
            
        },
        methods: {
            tabsHandle () {
                this.phjdCheckBatchListData()
            },

            phjdCheckBatchList () {
                $http(this.baseUrl.phjdCheckBatchListUrl, true,{}, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.checkbatchnum.list = res.data.map(item => {
                            return {
                                text: item.checkbatchname,
                                code: item.checkbatchnum
                            }
                        })

                        if (res.data.length >= 0) {
                            this.searchData.checkbatchnumName = res.data[0].checkbatchname;
                            this.searchData.checkbatchnum = res.data[0].checkbatchnum;
                            this.headerStringFun()
                        }
                        this.phjdCheckBatchListData();
                    } else {
                        this.$dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    }
                })
            },

            phjdCheckBatchListData () {
                this.dataList = [];
                $http(this.baseUrl.phjdCheckBatchListDataUrl, true, this.searchData, true)
                .then(res => {
                    if (res.retcode == 'success') {
                        this.dataList = res.data;
                    } else if (res.retcode == 'nobatch') {
                        this.dataList = [];
                    } else {
                        this.$dialog.alert({
                            message: res.retmsg
                        }).then(() => {
                        });
                    }
                })
            },

            headerStringFun () {
                //202909-01
                let month = parseInt(this.searchData.checkbatchnum.slice(4, 6)) + 1;
                let day = this.searchData.checkbatchnum.slice(this.searchData.checkbatchnum.length - 1);

                

                //12月份
                if (month == '13') {
                    if (day == '1') {
                        this.headerString = '12月29号'
                    } else {
                        this.headerString = '1月13号'
                    }
                } else {
                    if (day == '1') {
                        let year=parseInt(this.searchData.checkbatchnum.slice(0, 4));
                        var date=new Date(year,parseInt(month)-1,0);
                        var getlastMonthDay=parseInt(date.getDate())-2;
                        this.headerString = `${parseInt(month)-1}月${getlastMonthDay}号`
                    } else {
                        this.headerString = `${month}月13号`
                    }
                }
            },
            
            selectHandel (key) {
                if (key == 'checkbatchnum' && this[key].list.length == 0) return vant.Toast('未查到更多批次')
                this[key].show = true;
            },

            checkbatchnumConfirm (param) {
                this.searchData.checkbatchnum = param.code;
                this.searchData.checkbatchnumName = param.text;
                this.checkbatchnum.show = false;
                this.headerStringFun()
                this.phjdCheckBatchListData();
            },

            formatCheckedNum (num1, num2) {
                return floatAdd(num1, num2);
            },
            
            copyHandle (param) {
                this.$nextTick(() => {
                    console.log(navigator)
                    navigator.clipboard.writeText(param)
                    .then(res => {
                        vant.Toast('文本已复制到剪切板');
                    })
                    .catch(res => {
                        vant.Toast('复制失败');
                    })
                })
                
            },
            
            // 0待完成抽查 2已抽查通过 1已抽查驳回
            

            // formatButton (param) {
            //     if (param == 0) return '待完成抽查';
            //     if (param == 2) return '已抽查通过';
            //     if (param == 1) return '已抽查驳回';
            // },

            goPage (param) {
                sessionStorage.setItem('batchstatus', this.searchData.batchstatus);
                window.location.href = `samplingList.html?checkbatchnum=${param.checkbatchnum}&humancode=${param.humancode}`
            }
        }
    })
};




/**
 * 乘法 - js运算精度丢失问题
 * @param arg1  数1
 * @param arg2  数2
 * 0.0023 * 100 ==> 0.22999999999999998
 * {{ 0.0023 | multiply(100) }} ==> 0.23
 */
var floatMultiply = (arg1, arg2) => {
    arg1 = Number(arg1);
    arg2 = Number(arg2);
    if ((!arg1 && arg1!==0) || (!arg2 && arg2!==0)) {
        return null;
    }
   
    var n1, n2;
    var r1, r2; // 小数位数
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    n1 = Number(arg1.toString().replace(".", ""));
    n2 = Number(arg2.toString().replace(".", ""));
    return n1 * n2 / Math.pow(10, r1 + r2);
};


/**
 * 加法 - js运算精度丢失问题
 * @param arg1  数1
 * @param arg2  数2
 * 0.0023 + 0.00000000000001 ==> 0.0023000000000099998
 * {{ 0.0023 | plus(0.00000000000001) }} ==> 0.00230000000001
 */
var floatAdd = (arg1, arg2) => {
    arg1 = Number(arg1) || 0;
    arg2 = Number(arg2) || 0;
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (floatMultiply(arg1, m) + floatMultiply(arg2, m)) / m;
}

var floatMin = (arg1, arg2) => {
    arg1 = Number(arg1) || 0;
    arg2 = Number(arg2) || 0;
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (floatMultiply(arg1, m) - floatMultiply(arg2, m)) / m;
}


