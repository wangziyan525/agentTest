function initFun () {
    new Vue({
        el: '#app',
        data: {
            saveBPUrl:'bankAcceptanceBill/saveBPValue.xa', //银承票据保存BP值
            bpList:'',
            eidtFlag:'',//0不可编辑
        },
        created () {
            this.getBP()
        },
        methods: {
            getBP() {
                let that = this;
                getBPList().then(res => {
                    that.bpList = res.data.bpValueList;
                    that.eidtFlag = res.data.BPStatus;
                })
            },
            backTap(){
                history.back();
            },
            saveBP(){
                let that = this;
                if(that.eidtFlag==0){
                    $.alert('','BP值每日10点之后不允许修改');
                    return false 
                }
                var array = [];
                that.bpList.map((v,i)=>{
                    array.push({"bpType":v.bpType,"bpValue":v.bpValue})
                })
                if(!checkBpItem(array)){
                    return false;
                }
                var params = {'BPValueList':array}
                $.confirm('', '确认提交？', function () {
                    $http(that.saveBPUrl, true, params, false)
                        .then(res => {
                            $.alert('','提交成功')
                        });
                });
            },
            numToChinese(num){
                const chineseNums = ['一','二','三','四','五','六','七']
                if(num>=0&&num<=9){
                    return chineseNums[num];
                }
                return;
            }
        }
    })
};
