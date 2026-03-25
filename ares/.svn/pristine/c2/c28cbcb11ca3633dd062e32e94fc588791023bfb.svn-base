function action() {
    new Vue({
        el: "#app",
        data: {

            getDetailUrl: 'headofficecheck/userGetDetail.xa',//详情接口
            getExaminePeopleUrl: 'headofficecheck/userGetCheckUserList.xa',   //获取考核列表

            id:'',
            position:'',
            workline:'',

            examinePeople1:'',   //考核人1
            examinePeople2:'',   //考核人2
            isshowChoosePeople:false,
            chooseExaminePeopleTitle:'', //选择第考核人标题
            chooseExaminePeopleItem:0,
            examinePeopleList1:[],  //第一考核人列表
            examinePeopleList2:[],  //第二考核人列表
            chooseList:[],

        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {

            if(this.getQueryString('id')){
                this.id = this.getQueryString('id');
                this.getDetail(this.id);
            };

            //获取考核人列表
            this.getExaminePeople();


        },
        methods: {

            //获取详情
            getDetail(id){
                let _this = this;
                let params = {};
                params.id = id;
                $http(_this.getDetailUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.examinePeople1 = res.data.firstcheckIdcardname?res.data.firstcheckIdcardname:'';
                            _this.examinePeople2 = res.data.secondcheckIdcardname?res.data.secondcheckIdcardname:'';
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //获取考核人
            getExaminePeople(){
                let _this = this;
                let params = {};
                $http(_this.getExaminePeopleUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            _this.examinePeopleList1 = res.data.first;
                            _this.examinePeopleList2 = res.data.second;
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //选择考核人
            chooseExaminePeople(i){
                this.chooseList = [];
                this.isshowChoosePeople = true;
                this.chooseExaminePeopleItem = i;
                var arr = [];
                if(i == '1'){
                    this.chooseExaminePeopleTitle = '选择考核人1';
                    arr = this.examinePeopleList1.map((it)=>{
                        return{
                            isChoose:this.examinePeople1 == it.idcardname?true:false,
                            ...it
                        }
                    });
                }else{
                    this.chooseExaminePeopleTitle = '选择考核人2';
                    arr = this.examinePeopleList2.map((it)=>{
                        return{
                            isChoose:this.examinePeople2 == it.idcardname?true:false,
                            ...it
                        }
                    });
                }
                this.chooseList = arr;
          
            },

            //选择考核人
            choosedPeople(name){
                if(this.chooseExaminePeopleItem == '1'){
                    this.examinePeople1 = name;
                }else{
                    this.examinePeople2 = name;
                };
                this.isshowChoosePeople = false;
                this.chooseExaminePeopleItem = 0;
            },

            //跳转
            toTian(){
                if(this.examinePeople1 == ''){
                    vant.Toast('请选择考核人1');
                    return false
                };
                if(this.examinePeople2 == ''){
                    vant.Toast('请选择考核人2');
                    return false
                };
                var firstcheckHumancode = '';
                var secondcheckHumancode = '';
                for(var i=0;i<this.examinePeopleList1.length;i++){
                    if(this.examinePeople1 == this.examinePeopleList1[i].idcardname){
                        firstcheckHumancode = this.examinePeopleList1[i].humancode;
                        break;
                    }
                };
                for(var i=0;i<this.examinePeopleList2.length;i++){
                    if(this.examinePeople2 == this.examinePeopleList2[i].idcardname){
                        secondcheckHumancode = this.examinePeopleList2[i].humancode;
                        break;
                    }
                };
                if(this.id != ''){
                    var str = './headOfficeDetail.html?firstcheckHumancode=' + firstcheckHumancode + '&secondcheckHumancode=' + secondcheckHumancode +'&id=' + this.id;
                    window.location.href = str;
                }else{
                    var str = './headOfficeDetail.html?firstcheckHumancode=' + firstcheckHumancode + '&secondcheckHumancode=' + secondcheckHumancode;
                    window.location.href = str;
                }
               
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
    });

}

