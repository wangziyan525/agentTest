var baseUrl = {
    getLeaderListUrl: 'partyNew/getLeaderList.xa',//查询征求意见人员
    queryInfoUrl1: 'partyNew/queryFirstLeaderSuggestTemp.xa',//查询专干人员详情
    queryInfoUrl2: 'partyNew/querySJLeaderSuggestTemp.xa',//查询支部书记人员
    queryInfoUrl3: 'partyNew/queryLeaderSuggestTempAdmin.xa',//查询管理员详情
    submitUrl: 'partyNew/addLeaderSuggestTemp.xa',//提交
    updateUrl: 'partyNew/updateVerify.xa',//审批


}
var vm

function initFun() {
    vm = new Vue({
        el: "#app",
        data: {
            type:"",
            title_id:"",
            id: "",
            readonly:false,
            detail:{},

            list:[]
            




        },
        created() {
            var that=this;
            var type=GetQueryString("type")?GetQueryString("type"):"";//1:党务专干发起，2：书记审核；3：管理员查看详情
            that.type = type;

            var id=GetQueryString("id")?GetQueryString("id"):"";
            var title_id=GetQueryString("title_id")?GetQueryString("title_id"):"";
            that.id=id;
            that.title_id=title_id;

            that.getLeaderList();
            

            $("#app").show();


        },
        mounted() {


        },
        methods: {
            onChangeData(){
                var that=this;
                that.$forceUpdate();

            },
            /**
             * 查询征求意见人员列表
             */
            async getLeaderList() {

                var that = this;
                var param = {};

                param.title_id = that.title_id;

                const res = await $http(baseUrl.getLeaderListUrl, true, param, true);

                if (res.retcode === 'success') {
                    var list = res.data;
                    that.list = list;
                    that.queryInfo();
                    $("#app").show();

                } else if(res.retcode === '-2'){
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }else {
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    });
                }

            },

            /**
             * 查询详情
             */
            async queryInfo() {

                var that = this;

                var url="";

                var param = {};
                param.title_id = that.title_id;
                if(that.type=="1"){
                    url=baseUrl.queryInfoUrl1;
                }else if(that.type=="2"){
                    param.id = that.id;
                    url=baseUrl.queryInfoUrl2;
                }else if(that.type=="3"){
                    param.id = that.id;
                    url=baseUrl.queryInfoUrl3;
                    
                }
                

                const res = await $http(url, true, param, true);

                if (res.retcode === 'success') {


                    var detail = res.data;

                    if(res.data){

                        that.detail = detail;
                        if(that.type=='2' && detail.status=="0"){
                            that.readonly=false;
                        }else{
                            that.readonly=true;
                        }
                        var list=that.list;

                        if(list.length>0){
                            for(var i=0;i<list.length;i++){
                                var s = 1+i;
                                list[i].content=detail['humancode'+s];
                            }
                        }

                        that.list=list;
                    }else{
                        if(that.type=='1'){
                            that.readonly=false;
                        }

                    }
                    

                    that.$forceUpdate();
                    $("#app").show();

                } else if(res.retcode === '-2'){
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }else {
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    });
                }

            },

           
           

            

            /**
             * 提交
             */
             submits() {
                var that = this;

                var param = that.detail;

               
                if (!that.detail.totalnum || that.detail.totalnum == "") {
                    vant.Toast('请输入建议人数');
                    return;
                }
                if (!that.detail.middleleader || that.detail.middleleader == "") {
                    vant.Toast('请输入党员中层人数');
                    return;
                }
                if (!that.detail.nomiddleleader || that.detail.nomiddleleader == "") {
                    vant.Toast('请输入非党员中层人数');
                    return;
                }
                if (!that.detail.partymember || that.detail.partymember == "") {
                    vant.Toast('请输入党员员工人数');
                    return;
                }
                if (!that.detail.publicmember || that.detail.publicmember == "") {
                    vant.Toast('请输入群众人数');
                    return;
                }
                if (!that.detail.democraticmember || that.detail.democraticmember == "") {
                    vant.Toast('请输入民主党派（含中层及普通员工）人数');
                    return;
                }

                if (!that.detail.idea || that.detail.idea == "") {
                    vant.Toast('请输入意见');
                    return;
                }
                if (!that.detail.suggest || that.detail.suggest == "") {
                    vant.Toast('请输入建议');
                    return;
                }
                var list=that.list;
                for(let i=0;i<list.length;i++){
                    var content=list[i].content;
                    if (!content || content == "") {
                        vant.Toast('请输入'+list[i].idcardname+"的征求意见建议");
                        return;
                    }
                    let s=i+1;
                    param['humancode'+s]=content;
                }

                var url=""
                param.title_id = that.title_id;
                if(that.type=="1"){
                    url=baseUrl.submitUrl;
                }else if(that.type=="2"){
                    url=baseUrl.updateUrl;
                    param.id = that.id;
                }
                
                

                that.submitNew(url,param);

            },


            async submitNew(url,param){
                var that=this;
                
                const res = await $http(url, true, param, true);
                if (res.retcode === 'success') {
                    vant.Dialog.alert({
                        message: "提交成功"
                    }).then(() => {
                        that.queryInfo();

                    });
                } else {
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                    });
                }

            },
            

            


        }


    })
}





