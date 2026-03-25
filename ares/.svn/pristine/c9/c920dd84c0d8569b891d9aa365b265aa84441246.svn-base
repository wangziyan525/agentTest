function action() {
    new Vue({
        el: "#app",
        data: {
            getListUrl: 'dressCodeInspection/queryDataList.xa',//详情接口

            list:[],
            haveList:true,
            noList:false,

            humanCodeName: '',

            isShowTimeChoosed:false,  //是否显示时间筛选
            minDate: new Date(2020,1,),
            maxDate: new Date(),
            chooseTime:'',  //选择的时间
            submitYear:'',
            submitMonth:'',


        },
        created: function () {

            // 调用水印
            var username = $.parseJSON($.cookie("user")).name;
            __canvasWM({
                content: username
            });

        },
        mounted: function () {


            //获取列表
            this.getList();


        },
        methods: {

            //获取列表
            getList(){
                this.list = [];
                this.noList = false;
                this.haveList = false;
                let _this = this;
                let params = {};
                if(_this.submitMonth != ''){
                    var months =  parseInt(_this.submitMonth);
                }else {
                    var months = '';
                }
                params.submitYear = _this.submitYear;
                params.submitMonth = months.toString();
                $http(_this.getListUrl,true,params, true)
                    .then(res => {
                        if(res.retcode == 'success'){
                            var arr = res.data.dressCodeInspectionList;
                            if(arr && arr.length > 0){
                                _this.noList = false;
                                _this.haveList = true;
                                _this.list = arr;
                            }else {
                                _this.haveList = false;
                                _this.noList = true;
                            }
                        }else{
                            $.alert('',res.retmsg,function(){
                                WeixinJSBridge.call('closeWindow');
                            });
                        }
                    });
            },

            //清空
            clearList(){
                this.submitYear = '';
                this.submitMonth = '';
                this.chooseTime = '';
                this.getList();
            },

            //时间选择
            chooseDate(value) {
                this.chooseTime = this.initDateTimer(value);
                this.submitYear = this.chooseTime.split('-')[0];
                this.submitMonth = this.chooseTime.split('-')[1];
                this.isShowTimeChoosed=false;
                this.getList();
            },

            initDateTimer (param) {
                var month = param.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }
                return param.getFullYear() + '-' + month;
            },

            formatter(type,val) {
                if(type=="year"){
                    return `${val}年`
                }else if(type=="month"){
                    return `${val}月`
                }
                return val;
            },

            //解析1
            readWayCategory(str){
              if(str == '1'){
                return '着装规范';
              }else if(str == '2'){
                  return '工作纪律';
              }else if(str == '3'){
                  return '服务意识';
              }else if(str == '4'){
                  return '卫生环境';
              }else if(str == '5'){
                  return '其他';
              }else{
                  return '--';
              }
            },

            //获取员工名字
            getName(arr){
                var str = '';
                for(var i=0;i<arr.length;i++){
                    str += arr[i].name + ',';
                };
                str = str.substring(0,str.length - 1);
                return str;
            },


            //去往详情
            toDetail(id){
                window.location.href ='./detail.html?id=' + id;
            },




        }
    });

}

