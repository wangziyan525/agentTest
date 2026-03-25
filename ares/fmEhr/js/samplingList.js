var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
                phjdCheckBatchDetailListUrl: 'qywx/phjdData/phjdCheckBatchDetailList.xa',
                phjdCheckBatchCheckUrl: 'qywx/phjdData/phjdCheckBatchCheck.xa'
            },
            searchData: {
                checkstatus:"",
                checkbatchnum: GetQueryString('checkbatchnum'),
                pagenum: 1,
                pagesize: 10,
                humancode: GetQueryString('humancode'),
            },
            finished: false,
            loading: false,
            dataDetails: {
                // total: '',
                // checkedagree: '',
                // checkedrefuse: '',
                // checkpercent: '3', // 按钮 0抽查完成，未到提交时间  2抽查通过  1抽查拒绝 3未抽查完成
            },
            submitStatus: false,
            day: '',
            dataList: [
            ],
            headerString:"",
            ifEnd:true,//分页下拉标志
        },

        created () {
            // let day = new Date().getDate()
            // this.day = day;
            // if (day > 15) {
            //     this.submitStatus = true
            // }


            let month = parseInt(this.searchData.checkbatchnum.slice(4, 6)) + 1;
            let day = this.searchData.checkbatchnum.slice(this.searchData.checkbatchnum.length - 1);

                

            //12月份
            if (month == '13') {
                if (day == '1') {
                    this.headerString = '13号'
                } else {
                    this.headerString = '29号'
                }
            } else {
                if (day == '1') {
                    this.headerString = '13号';
                } else {
                    let year=parseInt(this.searchData.checkbatchnum.slice(0, 4));
                    var date=new Date(year,parseInt(month)-1,0);
                    var getlastMonthDay=parseInt(date.getDate())-2;
                    this.headerString = `${getlastMonthDay}号`
                }
            }


            
        },
        mounted(){

            var height=$(".topData").height();
            height=Number(height)+4;
            $(".bkGround").css("height",height+"px");

            // var footGight=$(".footer_fiexd_container").height();
            // var toneedHeight=Number(height)+Number(footGight);
            // var viewHight=window.innerHeight;
            // var scrollPartHight=Number(viewHight)-Number(toneedHeight);
            // $(".scrollPart").css("height",scrollPartHight+"px");

            this.getDataList();
            
    
        },
        methods: {
            onLoad() {
                this.getDataList();
            },

            chooseTab(param){
                this.searchData.checkstatus=param;
                this.searchData.pagenum = 1;
                this.dataList = [];
                this.ifEnd=true;
                this.getDataList();
            },

            /**
             * 列表查询
             */


            getDataList() {
                var  that = this;

                $http(that.baseUrl.phjdCheckBatchDetailListUrl, true, that.searchData)
                .then(res => {
                    if (res.retcode == 'success') {
                        // this.dataDetails = res.data;
                        // let list = res.data.detailList
                        // for (let i = 0; i < list.length; i ++) {
                        //     that.dataList.push(list[i]);
                        // }
    
                        that.dataDetails = res.data;
                        var datalist=res.data.detailList;
                        //一页的数据
                        if (!datalist) {
                            datalist = [];
                        }
                        if (that.searchData.pagenum == 1) {
                            that.dataList = datalist;
                        } else {
                            that.dataList = that.dataList.concat(datalist);
                        }
                        if (that.searchData.pagesize > datalist.length) {//多页页的数据
                            that.ifEnd = true;
                        } else {
                            that.searchData.pagenum++;
                            that.ifEnd = false;
                        }
                        $("#app").show();
                    } else {
                        $.alert("", res.retmsg);
                    }
                });
            },

            formatCheckedNum (num1, num2) {
                return floatAdd(num1, num2);
            },

            goPage (param) {
                window.location.href = `details.html?checkid=${param.checkid}&phjdid=${param.phjdid}&humancode=${GetQueryString('humancode')}`
            },

            submitHandle () {
                let params = {
                    checkbatchnum: GetQueryString('checkbatchnum'),
                    humancode: GetQueryString('humancode'),
                };
                if (this.dataDetails.button == 0 || this.dataDetails.button == 3) return;
                let message = this.dataDetails.button == 2 ? '抽查通过后该批次均将变为有效建档，是否确认操作?' : '拒绝后该批次所有未检查过的，及检查未通过的建档均将退回，建档人可对退回的建档进行自查后再次提交。'
                this.$dialog.confirm({
                    message: message
                }).then(() => {
                    $http(this.baseUrl.phjdCheckBatchCheckUrl, true,params, true)
                    .then(res=> {
                        if (res.retcode == 'success') {
                            this.$dialog.alert({
                                message: this.dataDetails.button == 2 ? '已通过' : '已驳回'
                            }).then(() => {
                                this.searchData.pagenum = 1;
                                this.dataList = [];
                                this.ifEnd=true;
                                this.getDataList();
                            });
                        } else {
                            this.$dialog.alert({
                                message: res.retmsg
                            }).then(() => {
                            });
                        }
                    })
                }).catch(() => {

                })

                
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
