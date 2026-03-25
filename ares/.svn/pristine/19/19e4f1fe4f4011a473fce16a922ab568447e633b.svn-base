var BPListUrl = 'bankAcceptanceBill/getBPValue.xa'; //银承票据获取BP值
var saveRateUrl = 'bankAcceptanceBill/saveBillRate.xa';  //保存利率
var billRateUrl = 'bankAcceptanceBill/getBillRate.xa';//获取利率
// 获取当前时间
function getToday(){
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth()+1;
    var currentDay = new Date().getDate();
    if(currentMonth<10){
        var currentMonth = '0'+currentMonth
    }
    if(currentDay<10){
        var currentDay = '0'+currentDay
    }
    var today = currentYear + "-" + currentMonth + "-" + currentDay;
    return today;
};
// 数字和小数点校验
function checkNum(num){
    var reg = /^\d+(\.\d{1,2})?$/;
    if(num!=""){
        if(!reg.test(num)){
            $.alert('','请输入正确的指导利率')
            return false;
        }
    }
    return true;
};
//获取url参数
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null)
        return (r[2]);
    return null;
};
// 判断利率是否为空
function checkRateItem(list) {
    for (var i = 0; i < list.length; i++) {
        console.log(list[i].rate,'list[i].rate')
        if (list[i].rate == "") {
            $.alert('', '指导利率未填写完整');
            return false;
        }else if(list[i].rate == "0.00"||list[i].rate == "0.0"||list[i].rate == "0"){
            $.alert('', '指导利率不能为0.00');
            return false;
        }else if(!checkNum(list[i].rate)){
            return false;
        }
    }
    return true;
}
function checkBpItem(list) {
    var reg = /^[1-9]\d*$/;
    for (var i = 0; i < list.length; i++) {
        if (list[i].bpValue == "") {
            $.alert('', 'BP值未填写完整');
            return false;
        }else if (!reg.test(list[i].bpValue)) {
            $.alert('', '请输入数字！');
            return false;
        }else if (list[i].bpValue > 100 || list[i].bpValue < 0) {
            $.alert('', 'BP值区间0~100');
            return false;
        }
    }
    return true;
}
// 保存利率
function saveTap(list, flag) {
    var array = [];
    list.map((v, i) => {
        array.push({ "rateMonth": v.rateMonth, "rate": v.rate })
    })
    var params = { 'billRateList': array }
    $.confirm('', '确认提交？', function () {
        $http(saveRateUrl, true, params, true)
            .then(res => {
                if (res.retcode == 'success') {
                    var status = res.data;
                    if (flag == 0) {
                        window.location.replace('./index.html')
                    } else {
                        window.location.href = './finished.html?status='+status
                    }
                    sessionStorage.clear()
                } else {
                    $.alert('', res.retmsg)
                }
            });
    });
}
// 获取BP值
var getBPList =  function(){
    return new Promise((resolve, reject) => {
        $http(BPListUrl, true, {}, true)
            .then(res => {
                if (res.retcode == 'success') {
                    return resolve(res);
                }else {
                    $.alert('', res.retmsg)
                }
            });
    })
}
// 获取利率
var getRateList = function () {
    return new Promise((resolve, reject) => {
        $http(billRateUrl, true, {}, true)
            .then(res => {
                return resolve(res);
            });
    })
};
