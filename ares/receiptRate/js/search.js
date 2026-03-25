function initFun () {
    new Vue({
        el: '#app',
        data: {
           bankListUrl:'bankAcceptanceBill/getBankNameByName.xa',
           list:[],
           total:0,
           keyWord:'',
           pageNum:1,
           pageSize:20,
           moreFlag:true,
           viewFlag:false,
           timer:null
        },
        created () {

        },
        methods: {
            cancelTap(){
                this.keyWord = '';
                this.searchTap();
            },
            // 动态癌变列表中关键字的颜色
            keywordCss(str){
                let keyword = this.keyWord;
                keyword = keyword.trim();
                if(keyword!=""){
                    str = str.replace(keyword,`<font color='#FF3113'>${keyword}</font>`);
                } 
                return str;
            },
            searchTap(){
                let that = this;
                that.moreFlag = true;
                that.pageNum = 1;
                that.list = [];
                that.preventMultiple()
            },
            // 防抖
            preventMultiple(){
                var that = this;
                if(that.timer){
                    clearTimeout(that.timer);
                };
                that.timer = setTimeout(()=>{
                    that.getBankList();
                },150)
            },
            getBankList(){
                let that = this;
                if(!that.moreFlag){
                    return;
                }
                var params = {
                    "memberBankName":that.keyWord,
                    "pageNum":that.pageNum,
                    "pageSize":that.pageSize
                }
                var token = localStorage.getItem("X-Token");
                $.ajax({
                    url: base.context + that.bankListUrl,
                    type: 'POST',
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('X-Token', token);
                        $.showLoading();
                    },
                    contentType: 'application/json;charset=utf-8;',
                    async:false,
                    data: JSON.stringify(params),
                    success: function (res) {
                        if (typeof (res) == 'string') {
                            res = JSON.parse(res);
                        }
                        if (res.retcode == 'success') {
                            console.log(res.data)
                            that.total = res.data.total;
                            if (res.data.list.length > 0) {
                                res.data.list.map((v, i) => {
                                    v['imgSrc'] = './bankIcon/' + v.memberBankNo + '.png'
                                })
                            }
                            if (that.pageSize > res.data.list.length) {
                                that.moreFlag = false;
                            } else {
                                that.pageNum++;
                                that.moreFlag = true;
                            }
                            that.viewFlag = true;
                            that.list = that.list.concat(res.data.list);
                            console.log(that.list, 'that.list')
                        } else {
                            $.alert('', res.retmsg)
                        }
                    },
                    error: function (xhr, status, error) {
                        $.alert('', '网络错误，请稍后再试');
                    },
                    complete: function (xhr) {
                        $.hideLoading();
                    }
                });
                // $http(that.bankListUrl, true, params,false)
                // .then(res => {
                //     console.log(res.data)
                //     that.total = res.data.total;
                //     if(res.data.list.length>0){
                //         res.data.list.map((v,i)=>{
                //             v['imgSrc'] = './bankIcon/'+ v.memberBankNo + '.png'
                //         })
                //     }
                //     if(that.pageSize>res.data.list.length){
                //         that.moreFlag = false;
                //     }else{
                //         that.pageNum++;
                //         that.moreFlag = true;
                //     }
                //    that.viewFlag = true;
                //    that.list = that.list.concat(res.data.list);
                //    console.log(that.list,'that.list')
                // });
            },
            imgError(e){
                e.target.src = './bankIcon/bank_icon.png'
            },
            // 选择银行
            selectBank(item){
                window.location.replace('./addBank.html?bankObj='+encodeURIComponent(JSON.stringify(item)))
            },
            // 返回
            backTap(){
                history.back()
            },
            beforeDestroy () {
                if(this.timer){
                    clearTimeout(this.timer);
                };
            }, 
        },
    })
};
