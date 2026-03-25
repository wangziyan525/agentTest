function initFun () {
    new Vue({
        el: '#app',
        data: {
            bankGroupUrl:'bankAcceptanceBill/getBillBankGroup.xa',
            imgUrl:base.domain + base.prefix + 'receiptRate/bankIcon/',
            keyword:'',
            tabList:[{text:'全部',id:''},{text:'一档',id:'01'},{text:'二档',id:'02'},{text:'三档',id:'03'},{text:'四档',id:'04'},{text:'五档',id:'05'},{text:'六档',id:'06'},{text:'七档',id:'07'}],
            tabIndex:0,
            bankLevel:'',
            firstBank:[],
            secondBank:[],
            thirdBank:[],
            fourthBank:[],
            fifthBank:[],
            sixthBank:[],
            seventhBank: []
        },
        created: function () {
            // this.getBankGroup();
        },
        mounted() {
            let that = this;
            that.$nextTick(()=>{
                this.getBankGroup();
            })  
        },
        methods: {
            searchTap(){
                this.getBankGroup()
            },
            tabTap(index,id){
                this.tabIndex = index;
                this.bankLevel = id;
                this.getBankGroup()
            },
            getBankGroup() {
                let that = this;
                that.firstBank = [];
                that.secondBank = [];
                that.thirdBank = [];
                that.fourthBank = [];
                that.fifthBank = [];
                that.sixthBank = [];
                that.seventhBank = [];
                var params = {
                    bankLevel:that.bankLevel,
                    memberBankName:that.keyword
                }
                $http(that.bankGroupUrl, true,params, false)
                    .then(res => {
                        that.firstBank = that.handleImg(res.data.firstBankGroup);
                        that.secondBank = that.handleImg(res.data.secondBankGroup);
                        that.thirdBank = that.handleImg(res.data.thirdBankGroup);
                        that.fourthBank = that.handleImg(res.data.fourthBankGroup);
                        that.fifthBank = that.handleImg(res.data.fifthBankGroup);
                        that.sixthBank = that.handleImg(res.data.sixthBankGroup);
                        that.seventhBank = that.handleImg(res.data.seventhBankGroup);
                    });
            },
            loadImg(list,index){
                console.log('loadFlag')
                list[index].loadFlag = true;
            },
            handleImg(list){
                if(list.length>0){
                    list.map((v,i)=>{
                        v['loadFlag'] = false;
                    })
                }
                return list;
            },
            imgError(event){
                event.target.src = './bankIcon/bank_icon.png';
            },
             // 新增银行
             toAddTap() {
                window.location.href = './addBank.html?flag=0'
            },
             // 选择银行
             selectBank(item){
                window.location.replace('./addBank.html?flag=1&bankObj='+encodeURIComponent(JSON.stringify(item)))
            }
        }
    })
};
