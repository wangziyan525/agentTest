var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            DtlRcrdId: GetQueryString('DtlRcrdId'),
            TxnTm: decodeURIComponent(GetQueryString('TxnTm'))
        },
        created() {
            
        },
        methods: {
            closeHandle () {
                wx.closeWindow();
            }
        }
    })
}
