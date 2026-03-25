var baseUrl = {
    socreFindByUserId:'examination/socreFindByUserId.xa',
    updateFaceExamineCheckData:"faceExamineCheck/updateFaceExamineCheckData.xa",
}
function initFun() {
    new Vue({
        el: "#app",
        data: {
            userid:'',
            batchId:'',
            nodata:false,
            seq_no:'',
            useTime:'',
            point:'',
            fullScore:'',
            tabsDataList:[/*{
                title:'123213232312321dadasda都是实打实大苏打实打实大苏打实打实的',
                scoreList:[{
                    xxx:'填空1',
                    aaa:'大大实打实大苏打萨达萨达萨达萨达萨达是啊实打实的',
                    bbb:'1分'
                },{
                    xxx:'填空2',
                    aaa:'111111111大大实打实大苏打萨达萨达萨达萨达萨达是啊实打实的',
                    bbb:'2分'
                }]
            },{
                title:'333333333333333都是实打实大苏打实打实大苏打实打实的',
                scoreList:[{
                    xxx:'填空1',
                    aaa:'333333大大实打实大苏打萨达萨达萨达萨达萨达是啊实打实的',
                    bbb:'4分'
                },{
                    xxx:'填空2',
                    aaa:'33333111111111大大实打实大苏打萨达萨达萨达萨达萨达是啊实打实的',
                    bbb:'5分'
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
            async getDetail(){
                var that=this;
                var param={};
                param.batchId=that.batchId;
                param.userId=that.userid;
                const res = await $http(baseUrl.socreFindByUserId, true,param, true);
                if (res.retcode === 'success'){
                    if(res.data){
                        that.tabsDataList = res.data.tabsDataList;
                        that.useTime = that.secondsToMinutes(res.data.use_Time)
                        that.point = res.data.score;
                        that.fullScore = res.data.fullScore;

                        for(let i=0;i<that.tabsDataList.length;i++){
                            var question = '';
                            const questionText=that.tabsDataList[i].question_content.split('@@');
                            for(var k=0;k<questionText.length-1;k++){
                                if(that.tabsDataList[i].answerList[k].answer_content==undefined){
                                    that.tabsDataList[i].answerList[k].answer_content = ''
                                }
                                question+=questionText[k]+`<span style="color: #0465FF;border-bottom: 1px solid #0465FF;padding: 0 10px">${that.tabsDataList[i].answerList[k].answer_content}</span>`

                            }
                            if(questionText.length>that.tabsDataList[i].answerList.length){
                                question+=questionText[questionText.length-1]
                            }
                            that.tabsDataList[i].question_content = question
                        }
                    }


                }else{
                    $.alert("",res.retmsg,function () {

                    });
                }
            },
            secondsToMinutes(seconds){
                const minutes = Math.floor(seconds/60);
                const remainingSeconds = seconds%60;
                return `${minutes}分${remainingSeconds}秒`
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



