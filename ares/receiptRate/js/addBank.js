function initFun () {
    new Vue({
        el: '#app',
        data: {
            addBankUrl:'bankAcceptanceBill/saveBillBankLevel.xa',
            gradeList:[{text:'一档',id:'01'},{text:'二档',id:'02'},{text:'三档',id:'03'},{text:'四档',id:'04'},{text:'五档',id:'05'},{text:'六档',id:'06'},{text:'七档',id:'07'}],
            gradeText:"",
            gradeShow:false, 
            selectIndex:0,
            bankLevel:'',
            flag:'',//0 新增  1修改
            bankObj:''
        },
        created () {
            this.flag = getQueryString('flag')?getQueryString('flag'):"";
            if(this.flag==0){
                document.title = '新增银行'
            }else if(this.flag==1){
                document.title = '银行档位修改'
            }else{
                document.title = '西安银行'
            }
            this.bankObj = getQueryString('bankObj')?JSON.parse(decodeURIComponent(getQueryString('bankObj'))):'';
            this.bankLevel = this.bankObj.bankLevel;
            this.gradeTranslateText(this.bankLevel);
        },
        methods: {
            gradeSelectTap(index){
                this.selectIndex = index+1;
                this.gradeText = this.gradeList[index].text;
                this.bankLevel = this.gradeList[index].id;
            },
            gradeHide(){
                this.gradeShow = false
            },
            gradeTranslateText(num){
                var that = this;
                switch(num){
                    case "01":
                        that.selectIndex = 1;
                        that.gradeText = '一档';
                        break;
                    case "02":
                        that.selectIndex = 2;
                        that.gradeText = '二档';
                        break;
                    case "03":
                        that.selectIndex = 3;
                        that.gradeText = '三档';
                        break;
                    case "04":
                        that.selectIndex = 4;
                        that.gradeText = '四档';
                        break;
                    case "05":
                        that.selectIndex = 5;
                        that.gradeText = '五档';
                        break;
                    case "06":
                        that.selectIndex = 6;
                        that.gradeText = '六档';
                        break;
                    case "07":
                        that.selectIndex = 7;
                        that.gradeText = '七档';
                        break;
                    default:
                        that.selectIndex = 0;
                        that.gradeText = '';
                        break;
                }
            },
            toSearchTap(){
                window.location.href = './search.html'
            },
            // 保存
            addBankTap(num){
                var that = this;
                var title = '';
                var msg = ''
                if(num==1){
                    if(that.bankObj.memberId==""||that.bankObj.memberId==undefined){
                        $.alert('','请选择银行');
                        return false;
                    }else if(that.bankLevel==""||that.bankLevel==undefined){
                        $.alert('','请选择银行挡位');
                        return false;
                    }
                    if(that.flag==1){
                        title ='您确定要修改该银行吗？';
                        msg = '修改成功！'
                    }else{
                        title ='您确定要保存该银行吗？';
                        msg = '保存成功！'
                    }
                   
                }else if(num==0){
                    title ='您确定要删除该银行吗？';
                    msg = '删除成功！'
                }
                $.confirm('', title, function () {
                    var params = { 
                        "memberId":that.bankObj.memberId,
                        "bankLevel":that.bankLevel
                    }
                    $http(that.addBankUrl, true, params, true)
                        .then(res => {
                            if (res.retcode == 'success') {
                                $.alert('',msg,function(){
                                    window.location.replace('./gradeList.html')
                                })
                            } else {
                                $.alert('', res.retmsg)
                            }
                        });
                });
            },
            // 删除
            deleteTap(){
                this.bankLevel = '';
                this.addBankTap(0);
            },
            // 返回
            backTap(){
                window.location.replace('./gradeList.html')
            }
        }
    })
};
