function formatDate(param) {
    var date = new Date(param);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return [year, month, day].join("-");
}

function formatBillCgy(key) {
    var map = {
        AC01: "银票/财票",
        AC02: "商票"
    };
    return map[key] || "";
}

function formatTranSt(key) {
    var map = {
        "": "全部",
        "00": "待签收",
        "01": "审核拒绝",
        "02": "交易成功",
        "03": "交易失败"
    };
    return map[key] || "";
}

function createMockData() {
    return [
        {
            QtnShdNur: "4040112223348255",
            QuoteNo: "234567865432134545",
            BillCgy: "AC01",
            BillTotShet: 2,
            BillTot: "19000.00",
            StlAmt: "18624.00",
            DueInt: "586.00",
            DcnInst: "2.10%",
            TxnTm: "2025-06-25 09:41:00",
            TranSt: "00"
        },
        {
            QtnShdNur: "4040112223348255",
            QuoteNo: "234567865432134545",
            BillCgy: "AC02",
            BillTotShet: 2,
            BillTot: "19000.00",
            StlAmt: "18624.00",
            DueInt: "586.00",
            DcnInst: "2.10%",
            TxnTm: "2025-06-25 09:41:00",
            TranSt: "02"
        },
        {
            QtnShdNur: "4040112223348255",
            QuoteNo: "234567865432134545",
            BillCgy: "AC01",
            BillTotShet: 2,
            BillTot: "19000.00",
            StlAmt: "18624.00",
            DueInt: "586.00",
            DcnInst: "2.10%",
            TxnTm: "2025-06-25 09:41:00",
            TranSt: "03",
            RfsRsn: "额度不足"
        }
    ];
}

function filterMockData(list, state) {
    if (!state.TranSt) return list.slice();

    return list.filter(function (item) {
        return item.TranSt === state.TranSt;
    });
}

function applyListData(vm) {
    var resultList = vm.searchList.DalSt === "01"
        ? filterMockData(vm.sourceData, vm.searchList)
        : [];

    vm.dataList = resultList;
    vm.listLoading = false;
    vm.listFinished = true;
    vm.noList = resultList.length === 0;
}

function initFun() {
    window.vm = new Vue({
        el: ".container",
        data: {
            sourceData: createMockData(),
            searchList: {
                DalSt: "01",
                DsplPg: 1,
                DsplNumRc: 10,
                TranSt: "",
                QryStDt: "2025-06-25",
                QryEndDt: "2025-06-25"
            },
            listLoading: false,
            listFinished: true,
            noList: false,
            dataList: [],
            popupMask: {
                show: false,
                checked: "1",
                key: ""
            },
            popupTime: {
                show: false,
                maxDate: new Date(),
                currentDate: new Date("2025-06-25")
            },
            popupTranSt: {
                show: false,
                list: [
                    { code: "", text: "全部" },
                    { code: "02", text: "交易成功" },
                    { code: "01", text: "审核拒绝" },
                    { code: "03", text: "交易失败" }
                ]
            }
        },
        created: function () {
            applyListData(this);
        },
        methods: {
            popupTimerHandle: function (index) {
                var endDate = new Date("2025-06-25");
                var startDate = new Date(endDate);

                this.popupMask.checked = index;

                if (index === 1) {
                    this.searchList.QryStDt = formatDate(endDate);
                    this.searchList.QryEndDt = formatDate(endDate);
                }
                if (index === 2) {
                    startDate.setDate(endDate.getDate() - 6);
                    this.searchList.QryStDt = formatDate(startDate);
                    this.searchList.QryEndDt = formatDate(endDate);
                }
                if (index === 3) {
                    startDate.setMonth(endDate.getMonth() - 1);
                    this.searchList.QryStDt = formatDate(startDate);
                    this.searchList.QryEndDt = formatDate(endDate);
                }
                if (index === 4) {
                    startDate.setMonth(endDate.getMonth() - 3);
                    this.searchList.QryStDt = formatDate(startDate);
                    this.searchList.QryEndDt = formatDate(endDate);
                }
            },
            popupSelectTimerHandle: function (key) {
                this.popupMask.key = key;
                this.popupTime.show = true;
            },
            popupTimeConfirm: function (param) {
                this.searchList[this.popupMask.key] = formatDate(param);
                this.popupMask.checked = "";
                this.popupTime.show = false;
            },
            popupResetHandle: function () {
                this.popupMask.checked = "1";
                this.searchList.QryStDt = "2025-06-25";
                this.searchList.QryEndDt = "2025-06-25";
            },
            popupConfirmHandle: function () {
                if (this.searchList.QryStDt > this.searchList.QryEndDt) {
                    vant.Toast("起始日期不能大于结束日期");
                    return;
                }
                this.popupMask.show = false;
                applyListData(this);
            },
            popupTranStConfirm: function (param) {
                if (this.searchList.QryStDt > this.searchList.QryEndDt) {
                    vant.Toast("起始日期不能大于结束日期");
                    return;
                }
                this.searchList.TranSt = param.code;
                this.popupTranSt.show = false;
                applyListData(this);
            },
            onLoad: function () {
                applyListData(this);
            },
            handleTabs: function (index) {
                this.searchList.DalSt = index;
                this.searchList.TranSt = index === "01" ? "" : "00";
                this.searchList.QryStDt = "2025-06-25";
                this.searchList.QryEndDt = "2025-06-25";
                this.popupMask.checked = "1";
                applyListData(this);
            },
            formatTranStClass: function (param) {
                if (param === "00") return "colorF5A623";
                if (param === "02") return "color66C102";
                if (param === "01" || param === "03") return "colorFF0000";
                return "color272727";
            },
            formatResultTranSt: function (param) {
                if (param === "00") return "待签收";
                if (param === "01") return "审核拒绝";
                if (param === "02") return "签收成功";
                if (param === "03") return "交易失败";
                return formatTranSt(param);
            },
            formatBillTag: function (param) {
                if (param === "AC01") return "银票";
                if (param === "AC02") return "商票";
                return "";
            },
            formatBillTagClass: function (param) {
                return param === "AC02" ? "header_D09F4C" : "header_1482FF";
            },
            detailsHandle: function () {
                vant.Toast("本地预览页，未接详情跳转");
            },
            formatBillCgy: formatBillCgy
        }
    });
}

window.addEventListener("load", function () {
    initFun();
});
