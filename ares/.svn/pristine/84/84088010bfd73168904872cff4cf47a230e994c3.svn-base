var baseUrl = {
    queryActivityUrl: "insurancePractice/queryActivity.xa", //查询当前考试    
    createQuestionUrl: 'insurancePractice/createQuestion.xa',   //生成当前考试试题
    saveAnswerUrl: 'insurancePractice/saveAnswer.xa',   //保存当前考试试题


}
var vm;
function initFun() {
    vm = new Vue({
        el: '#app',
        data() {
            return {
                currentIndex: 0,
                score: 0,
                answers: {},
                answerList: [],
                timeUp: false,
                totalTime: 60 * 60, // 60分钟，以秒为单位
                currentTime: 60 * 60,
                timerInterval: null,
                examData: {
                }
            }
        },
        mounted() {
            this.startTimer();
            this.createQuestion();
        },
        computed: {
            questions() {
                if (this.examData.data) {
                    return this.examData.data.answerListUser
                } else {
                    return []
                }
            },
            totalQuestions() {
                return this.questions.length;
            },
            totalScore() {
                return this.questions.reduce((total, question) => total + question.question_score, 0);
            },
            currentQuestion() {
                return this.questions[this.currentIndex];
            },
            options() {
                const question = this.currentQuestion;
                const options = {};

                if (question.choicea) options.A = question.choicea;
                if (question.choiceb) options.B = question.choiceb;
                if (question.choicec) options.C = question.choicec;
                if (question.choiced) options.D = question.choiced;

                return options;
            },
            progressPercentage() {
                return ((this.currentIndex + 1) / this.totalQuestions) * 100;
            },
            formattedTime() {
                const minutes = Math.floor(this.currentTime / 60);
                const seconds = this.currentTime % 60;
                return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            },
            remainingMinutes() {
                return Math.floor(this.currentTime / 60);
            },
            answeredCount() {
                return Object.keys(this.answers).length;
            }
        },

        methods: {
            //组答案为制定格式
            initAnswerList() {
                this.answerList = this.examData.data.answerListUser.map(question => {
                    return {
                        questionid: question.questionid,
                        answerid: question.answerid,
                        user_answer: ''
                    }
                })
            },
            //保存当前考试试题
            saveAnswer(type) {
                let params = {};
                params.socre_id = this.examData.data.socre_id;
                params.autoflag = type;
                params.answerList = this.answerList
                $http(baseUrl.saveAnswerUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            localStorage.setItem('testResult',JSON.stringify(res.data))                          
                            window.location.href = "./testResult.html"


                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //查询当前考试
            queryActivity() {

                let params = {};
                params.examinationtype = ""
                $http(baseUrl.queryActivityUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.examData = res
                            this.initAnswerList()
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            //生成当前考试试题
            createQuestion() {
                let params = {};
                params.examinationtype = ""
                $http(baseUrl.createQuestionUrl, true, params, true)
                    .then(res => {
                        if (res.retcode == 'success') {
                            this.examData = res
                            this.initAnswerList()
                        } else {
                            $.alert("", res.retmsg, function () {
                                wx.closeWindow();
                            });
                        }
                    });
            },
            getQuestionTypeText(type) {
                const typeMap = {
                    'SINGLE': '单选题',
                    'MULTIPLE': '多选题',
                    'JUDGE': '判断题'
                };
                return typeMap[type] || '未知题型';
            },
            isSelected(optionKey) {
                const questionId = this.currentQuestion.questionid;
                return this.answers[questionId] && this.answers[questionId].includes(optionKey);
            },

            selectOption(optionKey) {
                const questionId = this.currentQuestion.questionid;
                const questionType = this.currentQuestion.question_type;

                if (!this.answers[questionId]) {
                    this.answers[questionId] = [];
                }

                if (questionType === 'SINGLE' || questionType === 'JUDGE') {
                    // 单选题和判断题只能选一个
                    this.answers[questionId] = [optionKey];
                    for (let i = 0; i < this.answerList.length; i++) {
                        if (this.answerList[i].questionid == questionId) {
                            this.answerList[i].user_answer = optionKey
                        }
                    }
                } else if (questionType === 'MULTIPLE') {
                    // 多选题可以多选
                    const index = this.answers[questionId].indexOf(optionKey);
                    if (index > -1) {
                        this.answers[questionId].splice(index, 1);
                    } else {
                        this.answers[questionId].push(optionKey);
                    }
                    for (let i = 0; i < this.answerList.length; i++) {
                        if (this.answerList[i].questionid == questionId) {
                            this.answerList[i].user_answer = this.answers[questionId].join(",")
                        }
                    }
                }
            },



            prevQuestion() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                }
            },
            nextQuestion() {
                if (this.currentIndex < this.totalQuestions - 1) {
                    this.currentIndex++;
                }
            },
            startTimer() {
                this.timerInterval = setInterval(() => {
                    if (this.currentTime > 0) {
                        this.currentTime--;
                    } else {
                        this.timeUp = true;
                        clearInterval(this.timerInterval);
                        this.submitExam('1');
                    }
                }, 1000);
            },
            submitExam(type) {
                if(type == '1'){
                    vant.Dialog.alert({
                        message: "考试时间结束，将自动提交答案"
                    }).then(() => {
                        // 停止计时器
                        clearInterval(this.timerInterval);
                        this.saveAnswer('1')
                    });
                }else{
                    // 停止计时器
                    clearInterval(this.timerInterval);
                    this.saveAnswer('0')
                }
               




            },
        },

        beforeDestroy() {
            clearInterval(this.timerInterval);
        }

    })
};

