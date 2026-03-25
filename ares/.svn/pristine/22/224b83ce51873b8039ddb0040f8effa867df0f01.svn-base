var baseUrl = {
    questionFindById:'examination/QuestionFindById.xa',
    questionSaveDate:"examination/QuestionSaveDate.xa",
    questionSave:'examination/QuestionSave.xa',
}

function initFun() {
    new Vue({
        el: "#app",
        data: {
            batchId:'',
            minutes:'',
            seconds:'',
            timeLeft:'',
            timeover:'0',
            timer:'',
            num:0,//考题顺序
            backInfo:'',//用于接收后台返回数据，插入每道题答案
            submitInfo:[/*{key1:'',key2:'',key3:''},{key1:'',key2:''},{key1:'',key2:''},{key1:'',key2:''}*/],//提交数据
            totle:'',
            exmList:[/*{desc:`1. 热热热<textarea oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1" class="question01" placeholder="" maxlength="150" ></textarea>热热热<textarea oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1" class="question02" placeholder="" maxlength="150" ></textarea>热热热热热热热热热热热热热热热热热热热热热热热热热热热热热热热热热`},
                {desc:`<textarea oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1" class="question11" placeholder="" maxlength="150" ></textarea>刹石狩<textarea oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1"  class="question12" placeholder="" maxlength="150" ></textarea>`},
                {desc:`<textarea oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1" class="question21" placeholder="" maxlength="150" ></textarea>不不不<textarea oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1"  class="question22" placeholder="" maxlength="150" ></textarea>`},
                {desc:`<textarea oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1" class="question31" placeholder="" maxlength="150" ></textarea>西行信<textarea oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1"  class="question32" placeholder="" maxlength="150" ></textarea>`}*/],

        },
        created() {
        },
        mounted() {
            //手机锁屏倒计时停止
            document.addEventListener("visibilitychange",function(){
                if(document.visibilityState=='hidden'){
                    var b=Date.now();
                }else{
                    var betweenMs=Date.now()-b;
                    var betweenTime=Math.floor(betweenMs/1000);
                    this.timeLeft -= betweenTime;
                }
            });
            this.batchId = this.getQueryString('batchId');
            this.questionSaveDate();
            /*var msg = '<div style="margin-bottom:10px">运营业务知识测试答题</div><div>是否确认开始考试</div>'
            vant.Dialog.confirm({
                title:'',
                cancelButtonText:"取消",
                confirmButtonText:"确认",
                message: msg
            }).then(() => {
                this.questionSaveDate();
                this.questionFindById();
            }).catch(() => {
                wx.closeWindow();
                WeixinJSBridge.call('closeWindow');
            })*/


        },
        methods: {

            //获取url参数
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return (r[2]);
                return null;
            },
            changeQue(type){//通过题索引和this.num,点击展示上一题或下一题
                var num = this.num
                if(type=='minus'){
                    this.assembleData()
                    this.num = Number(num)-1
                }else{
                    //由于使用v-html，v-model无效，手动组装数据
                    this.assembleData()
                    this.num = Number(num)+1;
                }

            },
            assembleData(){
                var num = this.num;
                console.log(this.submitInfo)
                console.log( $('.question'+(num+1)+'0').val())
                console.log(this.submitInfo[num])
                for(var i=0;i<this.submitInfo.length;i++){
                    const obj = this.submitInfo[num]
                    const keys = Object.keys(obj)
                    for(var j=0;j<keys.length;j++){
                        const key = keys[j]
                        obj[key] = $('.question'+(num+1)+j.toString()).val()
                        console.log($('.question'+(num+1)+j.toString()).val())
                    }
                    //const key = Object.keys(submitInfo[num])[i]
                    //this.submitInfo[num][key] = $('.question'+(num+1)+i.toString()).val()
                }

                /*this.submitInfo[num].key1 = $('.question'+(num.toString()+1)).val();
                this.submitInfo[num].key2 = $('.question'+(num.toString()+2)).val();*/
                localStorage.setItem('submitInfo',JSON.stringify(this.submitInfo))
            },
            //倒计时
            startTime(){

            },
            updateTimerDisplay(){
                const minutes = Math.floor(this.timeLeft/60)
                const seconds = this.timeLeft%60
                this.timer = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`

            },
            //查询考试剩余时间
            async questionSaveDate(){
                var that=this;
                var param={};
                param.batchId=that.batchId;
                const res = await $http(baseUrl.questionSaveDate, true,param, true);
                if (res.retcode === 'success'){
                    if(res.data){
                        if(res.data.state==1){
                            $.alert("",'您已参加过本次考试',function () {
                                window.location.href = 'detail.html?batchId='+that.batchId;
                            })

                        }else{
                            var msg = '<div style="margin-bottom:10px">运营业务知识测试答题</div><div>是否确认开始考试</div>'
                            vant.Dialog.confirm({
                                title:'',
                                cancelButtonText:"取消",
                                confirmButtonText:"确认",
                                message: msg
                            }).then(() => {
                                that.timeLeft = Number(res.data);
                                const timer=setInterval(()=>{
                                    that.timeLeft--;
                                    that.updateTimerDisplay();

                                    if(that.timeLeft<=0){
                                        clearInterval(timer);
                                        that.timeover = '2'
                                        that.submitBindtap()
                                    }
                                },1000)
                                this.questionFindById();
                            }).catch(() => {
                                wx.closeWindow();
                                WeixinJSBridge.call('closeWindow');
                            })

                        }
                    }


                }else{
                    $.alert("",res.retmsg,function () {
                        wx.closeWindow();
                        WeixinJSBridge.call('closeWindow');
                    });
                }
            },
            async questionFindById(){
                /*debugger
                var that=this
                var data111= [
                    {
                        "batchId": "1",
                        "question_content": "内容@@FFFF@@FFFF@@",
                        "question_num": "1",
                        "createTime": "",
                        "updateTime": ""
                    },
                    {
                        "batchId": "1",
                        "question_content": "内容222@@FFFF222@@@FFFF222",
                        "question_num": "2",
                        "createTime": "",
                        "updateTime": ""
                    }
                ]

                for(var i=0;i<data111.length;i++){
                    /!*组装考题*!/
                    var textarea = `<textarea oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1" class="question01"+i placeholder="" maxlength="150" ></textarea>`
                    var question='';
                    const questionText=data111[i].question_content.split('@@');
                    for(var k=0;k<questionText.length-1;k++){
                        question+=questionText[k]+`<textarea oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1" class="question${i+1}${k}" placeholder="" maxlength="150" ></textarea>`
                    }
                    if(!questionText[questionText.length-1]){

                    }else{
                        question+=questionText[questionText.length-1]
                    }
                    var exmList = data111[i].question_num+'. '+ question
                    let newObj={desc:`${exmList}`}
                    that.exmList.push(newObj)
                    /!*组装要提交答案*!/
                    const questionNum=data111[i].question_content.split('@@').length-1;
                    const obj={}
                    for(var j=1;j<=questionNum;j++){
                        obj[`key${j}`] = ''
                    }
                    that.submitInfo.push(obj)
                }*/

                var that=this;
                that.submitInfo=[];
                that.exmList = [];
                var param={};
                param.batchId = that.batchId;
                const res = await $http(baseUrl.questionFindById, true,param, true);
                if (res.retcode === 'success'){
                    that.totle = res.data.length;
                    if(res.data){
                        that.backInfo = res.data
                        for(var i=0;i<res.data.length;i++){
                            /*组装考题*/
                            var textarea = `<input oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1" class="question01"+i placeholder="" maxlength="150"></input>`
                            var question='';
                            const questionText=res.data[i].question_content.split('@@');
                            for(var k=0;k<questionText.length-1;k++){
                                question+=questionText[k]+`<input oninput="this.style.width=(this.value.length+1)*16+'px'" type="text" rows="1" class="question${i+1}${k}" placeholder="" maxlength="150"></input>`
                            }
                            if(!questionText[questionText.length-1]){

                            }else{
                                question+=questionText[questionText.length-1]
                            }
                            var exmList =  question
                            let newObj={desc:`${exmList}`}
                            that.exmList.push(newObj)
                            /*组装要提交答案*/
                            const questionNum=res.data[i].question_content.split('@@').length-1;
                            const obj={}
                            for(var j=1;j<=questionNum;j++){
                                obj[`key${j}`] = ''
                            }
                            that.submitInfo.push(obj)


                            this.$nextTick(()=>{
                                //若存在缓存，需要给页面赋值
                                if(localStorage.getItem('submitInfo')!==null){
                                    that.submitInfo = JSON.parse(localStorage.getItem('submitInfo'));
                                    var submitInfo = localStorage.getItem('submitInfo')
                                    for(var i=0;i<that.submitInfo.length;i++){
                                        const obj = that.submitInfo[i]
                                        const keys = Object.keys(obj)
                                        for(var j=0;j<keys.length;j++){
                                            const key = keys[j]
                                            console.log(obj[key])
                                            console.log('.question'+(i+1)+j.toString())
                                            $('.question'+(i+1)+j.toString()).val(obj[key])
                                            if(obj[key]!=''){
                                                $('.question'+(i+1)+j.toString()).css({'width':(obj[key].length+1)*16+'px'})
                                            }else{
                                                $('.question'+(i+1)+j.toString()).css({'width':'80'})
                                            }

                                        }
                                    }
                                }
                            })

                        }

                    }


                }else{
                    $.alert("",res.retmsg,function () {

                    });
                }
            },

            /**
             * 提交审批
             */
            submitBindtap() {
                var that = this;
                //最后一题需要在点击提交前组装数组
                that.assembleData()
                let params = {};
                console.log(that.submitInfo)
                //组装数据提交至后台
                for(var j=0;j<that.backInfo.length;j++){

                    console.log(Object.values(that.submitInfo[j]).join(","))
                    that.backInfo[j].answer_content = Object.values(that.submitInfo[j]).join(",")
                }
                params.data = that.backInfo

                if(that.timeover=='2'){//倒计时到直接提交
                    $http(baseUrl.questionSave,true,params, true)
                        .then(res => {
                            if(res.retcode == 'success'){
                                $.alert("","考试时间到，提交成功",function () {
                                    //清除缓存
                                    localStorage.removeItem('submitInfo')
                                    window.location.href = 'detail.html?batchId='+that.batchId;
                                });

                            }else{
                                $.alert("",res.retmsg,function () {

                                });
                            }
                        });
                }else{
                    for(var i=0;i<that.submitInfo.length;i++){
                        if(that.submitInfo[i].key1=='' || that.submitInfo[i].key2==''){
                            vant.Dialog.confirm({
                                title: '您还有题目未作答，确认提交？',
                                cancelButtonText:"取消",
                                confirmButtonText:"确认",
                                message: ""
                            }).then(() => {
                                $http(baseUrl.questionSave,true,params, true)
                                    .then(res => {
                                        if(res.retcode == 'success'){
                                            $.alert("","提交成功",function () {
                                                //清除缓存
                                                localStorage.removeItem('submitInfo')
                                                window.location.href = 'detail.html?batchId='+that.batchId;
                                            });

                                        }else{
                                            $.alert("",res.retmsg,function () {

                                            });
                                        }
                                    });
                            }).catch(() => {

                            })

                            return;
                        }
                    }
                    vant.Dialog.confirm({
                        title: '请确认是否提交',
                        message: ""
                    }).then(() => {
                        $http(baseUrl.questionSave,true,params, true)
                            .then(res => {
                                if(res.retcode == 'success'){
                                    $.alert("","提交成功",function () {
                                        //清除缓存
                                        localStorage.removeItem('submitInfo')
                                        window.location.href = 'detail.html?batchId='+that.batchId;
                                    });

                                }else{
                                    $.alert("",res.retmsg,function () {

                                    });
                                }
                            });
                    }).catch(() => {

                    })
                }

            },



        }
    })
}



