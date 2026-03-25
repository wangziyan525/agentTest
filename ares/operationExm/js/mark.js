var baseUrl = {
    socreFindByUserId:'examination/socreFindByUserId.xa',
    socreSave:"examination/socreSave.xa",
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            userid:'',
            batchId:'',
            nodata:false,
            seq_no:'',
            score:'',
            scoreArr:[],
            popupBottomShow1: false,
            popupObject1: {
                columns: [],
                title: '请选择分数',
            },
            type:'',
            index:'',
            index1:'',
            tabsDataList:[/*{
                question_content:'123213232312321dadasda都是实打实大苏打实打实大苏打实打实的',
                answerList:[{
                    xxx:'填空1',
                    answer_content:'大大实打实大苏打萨达萨达萨达萨达萨达是啊实打实的',
                    value:''
                },{
                    xxx:'填空2',
                    answer_content:'111111111大大实打实大苏打萨达萨达萨达萨达萨达是啊实打实的',
                    value:''
                }]
            },{
                question_content:'333333333333333都是实打实大苏打实打实大苏打实打实的',
                answerList:[{
                    xxx:'填空1',
                    answer_content:'333333大大实打实大苏打萨达萨达萨达萨达萨达是啊实打实的',
                    value:''
                },{
                    xxx:'填空2',
                    answer_content:'33333111111111大大实打实大苏打萨达萨达萨达萨达萨达是啊实打实的',
                    value:''
                }]
            }*/]
        },
        created() {
        },
        mounted() {
            this.userid = this.GetQueryStrings('userid');
            this.batchId = this.GetQueryStrings('batchId');
            this.getDetail();
        },
        methods: {
            jisuan(){
                //计算列表高度
                this.$nextTick(()=>{
                    var bodyHeight = $(window).height();
                    var btn = $('.btn').outerHeight();
                    $('.listScroll').css({'height':bodyHeight-btn+'px'});
                })

            },

            async getDetail(){
                var that=this;
                var param={};
                param.userId=that.userid;
                param.batchId=that.batchId;
                const res = await $http(baseUrl.socreFindByUserId, true,param, true);
                if (res.retcode === 'success'){
                    if(res.data){
                        that.jisuan();
                        that.tabsDataList = res.data.tabsDataList;
                        for(let i=0;i<that.tabsDataList.length;i++){
                            var question = '';
                            const questionText=that.tabsDataList[i].question_content.split('@@');
                            for(var k=0;k<questionText.length-1;k++){
                                if(that.tabsDataList[i].answerList[k].answer_content==undefined){
                                    that.tabsDataList[i].answerList[k].answer_content = ''
                                }
                                question+=questionText[k]+`<span style="color: #0465FF;border-bottom: 1px solid #0465FF;padding: 0 10px">${that.tabsDataList[i].answerList[k].answer_content}</span>`
                                if(that.tabsDataList[i].answerList[k].answer_score=='0'){
                                    that.tabsDataList[i].answerList[k].answer_score = ''
                                }
                            }
                            if(questionText.length>that.tabsDataList[i].answerList.length){
                                question+=questionText[questionText.length-1]
                            }
                            that.tabsDataList[i].question_content = question
                        }
                        for (var j = 0; j <= res.data.gap_score; j++) {
                            that.popupObject1.columns.push({
                                text: j+'分',
                                value: j
                            })
                        }
                    }


                }else{
                    $.alert("",res.retmsg,function () {

                    });
                }
            },
            showTap(num,index,index1) {
                this.type = num;
                this.index = index;
                this.index1 = index1;
                this['popupBottomShow' + num] = true;
            },
            closeOverlayBindtap() {
                let num = this.type;
                this['popupBottomShow' + num] = false;
            },
            onConfirm(param) {
                let num = this.type;
                let index = this.index;
                let index1 = this.index1;
                this['popupBottomShow' + num] = false;
                this.tabsDataList[index].answerList[index1].answer_score = param.value
                //this.$set(this.scoreArr[index],index1,param.value)
                console.log(this.tabsDataList)

            },
            /**
             * 提交审批
             */
            submitBindtap() {
                var that = this;
                let params = {};
                console.log(that.tabsDataList)
                params.tabsDataList = that.tabsDataList
                for(var i=0;i<that.tabsDataList.length;i++){
                    for(var k=0;k<that.tabsDataList[i].answerList.length;k++){
                        if(that.tabsDataList[i].answerList[k].answer_score===''){
                            console.log(that.tabsDataList[i].answerList[k].answer_score)
                            $.alert('','您还有题目未打分');
                            return;
                        }
                    }

                }
                vant.Dialog.confirm({
                    title: '本次判分后无法修改，请确认是否提交',
                    message: ""
                }).then(() => {
                    $http(baseUrl.socreSave,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                $.alert("","提交成功",function () {
                                    //清除缓存
                                    window.location.href = 'list.html?batchId='+that.batchId;
                                });

                            }else{
                                $.alert("",res.retmsg,function () {

                                });
                            }
                        });
                }).catch(() => {

                })
            },



            GetQueryStrings(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },


        }
    })
}



