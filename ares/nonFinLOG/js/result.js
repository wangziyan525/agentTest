var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            time:'',
            uuid:'',
            result:'',
        },
        created() {
            this.time = decodeURIComponent(this.getQueryString('time'));
            this.uuid = this.getQueryString('uuid');
             
            if(this.getQueryString('result') == '1'){
                this.result='转办成功'
            }else{
                this.result='审批完成'
            }
        },
        methods: {
            finish(){
                window.location.href = '../views/signList.html'
            },
             //获取url参数
             getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
        }
    })
}
