var baseUrl = {
    queryListUrl:'phjdData/queryStationList.xa',//查询
    
}
var vm
function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            page:"page1",
            searchWord:"",
            list:[],
            columnsList: [
                { code: '1', text: '服务站' },
                { code: '2', text: '县域支行' },
                { code: '3', text: '其他支行' }
            ],
           
            
        },
        created(){
            console.log('ccccc', this.columnsList)
            this.queryList();
            $("#app").show();
        },
        mounted(){
    
        },
        methods:{
            async queryList(){
                var that=this;
                var param={};
                param.stationname=that.searchWord;
                const res = await $http(baseUrl.queryListUrl, true,param, true);
                if (res.retcode === 'success'){
                    that.list=res.data;//基本信息
                    
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(() => {
                        wx.closeWindow();
                    }); 
                }
            },

            addtBtn(){
                window.location.href="addStationname.html?type=0";
            },

            editBtn(item){
                window.location.href="addStationname.html?type=1&id="+item.id;
            },

            viewBtn(item){
                window.location.href="addStationname.html?type=2&id="+item.id;
            },

            changeType(val) {
                console.log('val', val)
                let data = '';
                this.columnsList.forEach(ele => {
                    if (val === ele.code) return data = ele.text;
                });
                return data || '--'
            }


             
                

         }
            
           
           
           
            
            
    
    })
}





