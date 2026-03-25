var baseUrl = {
    queryListUrl: 'tobaccoFarmer/getTobaccoFarmerLoanDataList.xa',//查询

}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            type:"0",//
            pageNum:1,
            pageSize:30,

            list:[
               {}
                
            ],
            typeObj:{

            }
           
        },
        created(){
            this.queryList();
            $("#app").show();
            

        },
        mounted(){


        },
        methods:{
            chooseType(param){
                var that=this;
                that.type=param;
                that.pageNum=1;
                that.pageSize=30;
                that.queryList();
            },
            

            /**
             * 查询列表
             */
            async queryList(){

                var that=this;
                var param={};
                
                param.pageNum=that.pageNum+"";
                param.pageSize=that.pageSize+"";
                param.type=that.type;
                


                if(that.pageNum=="1"){
                    that.list=[];
                }

                const res = await $http(baseUrl.queryListUrl, true,param, true);

                if (res.retcode === 'success'){


                    var datalist=res.data;
                    //一页的数据
                    if (!datalist) {
                        datalist = [];
                    }
                    if (that.pageNum == 1) {
                        that.list = datalist;
                    } else {
                        that.list = that.list.concat(datalist);
                    }
                    if (that.pageSize > datalist.length) {//多页页的数据
                        that.ifEnd = true;
                    } else {
                        that.pageNum++;
                        that.ifEnd = false;
                    }
                    $("#app").show();

                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    });
                }

            },
            
            

            goDetail(id){
                window.location.href="index.html?id="+id;
            },

            //金额格式化
            formatCurrency(n) {
                //将数字转化为字符串
                if(n==undefined || n == ''){
                    return '';
                }else{

                    //将数字转化为字符串
                    let num = n.toString();
                    let isFu = false;
                    if(num < 0){
                        isFu = true;
                        num = num.replace(/-/g,'');
                    }
                    //判断小数点截取小数点后面的数字
                    if(num.indexOf('.') > 0){
                        var afterNum = num.substr(num.indexOf('.')).substring(1);
                        if(afterNum.length == 0){
                            afterNum = '.00';
                        }else if(afterNum.length == 1){
                            afterNum = '.' + afterNum +'0';
                        }else{
                            afterNum = num.substr(num.indexOf('.')).substring(0,3);
                        }
                    }
                    let after = num.indexOf('.') > 0 ? afterNum : '.00';
                    //如果存在小数点
                    let numArr = num.indexOf('.') > 0 ? num.substring(0, num.indexOf('.')).split('') : num.split('');
                    var str = '';//字符串累加
                    for (var i = numArr.length - 1, j = 1; i >= 0; i--, j++) {
                        if (j % 3 == 0 && i != 0) {//每隔三位加逗号，过滤正好在第一个数字的情况
                            str += numArr[i] + ",";//加千分位逗号
                            continue;
                        }
                        str += numArr[i];//倒着累加数字
                    }
                    if(isFu){
                        return '-'+ str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串

                    }else {
                        return  '￥'+str.split('').reverse().join('') + after;//字符串=>数组=>反转=>字符串
                    }
                }
            }

           



            }







    })
}



//浏览器滚动部分高度
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
};

//浏览器可视部分高度
function getCilentHeight() {
    var clientHeight = 0;

    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    }
    return clientHeight;
};

//浏览器内容高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}


window.onscroll = function () {
    if ((getScrollHeight() - (Math.ceil(getScrollTop() + getCilentHeight()))) < 10) {

        if (!vm.ifEnd) {
            vm.ifEnd = true;
            vm.queryList();
        }
    }

};

