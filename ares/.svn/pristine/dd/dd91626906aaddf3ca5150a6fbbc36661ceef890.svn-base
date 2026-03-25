var baseUrl = {
    getTesResultsAndDownDataUrl: "insurancePractice/getTesResultsAndDownData.xa",
    getPowerInfo: 'safetyCheck/getPowerInfo.xa'
}
var vm
function initFun() {
    vm = new Vue({
        el: "#app",
        data: {
            nodata: false,
            list: [],
        },
        created() {

        },
        mounted() {
            this.getList('1');
        },
        methods: {

            jisuan() {
                //计算列表高度
                this.$nextTick(() => {
                    var bodyHeight = $(window).height();
                    var bottomButton = $('.bottomButton').outerHeight();
                    $('.listScroll').css({ 'height': bodyHeight - bottomButton - 10 + 'px' });
                })

            },
            getList(type) {
                var that = this;
                let param = {}
                param.isExport = type;
                $http(baseUrl.getTesResultsAndDownDataUrl, true, param, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            if (type == '1') {
                                that.jisuan();
                                if (res.data != '' && res.data != null && res.data != undefined) {
                                    that.nodata = false;
                                    that.list = res.data
                                } else {
                                    that.nodata = true;
                                }
                            } else {
                                vant.Toast('导出成功');
                            }

                        } else {
                            $.alert("", res.retmsg, function () {
                                that.nodata = true;
                            });
                        }
                    });
            },
            jump() {
                window.location.href = 'selectPerson.html'
            }
        }
    })
}



