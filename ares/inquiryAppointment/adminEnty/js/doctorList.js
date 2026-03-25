function initFun () {
    new Vue({
        el: '#app',
        data: {
            baseUrl: {
                listUrl: 'qywx/clinic/docApointQuery.xa',
                deleteUrl:'qywx/clinic/docInfoDel.xa'
            },
            doctorList:[],
        },
        created () {
           localStorage.removeItem('itemObj');
        },
        mounted(){
            $.showLoading('加载中...');
            setTimeout(()=>{
                this.getList()
            },1500)
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
            // 获取列表数据
            getList(){
                var that = this;
                $http(that.baseUrl.listUrl, true,{'flag':'admin'}, true)
                .then(res => {
                    if(res.retcode == 'fail'){
                        console.log(res.retmsg);
                        var str = res.retmsg;
                        $.alert('',str,function(){
                            // console.error(res.retmsg);
                            WeixinJSBridge.call('closeWindow');
                        });

                    } 
                    that.doctorList = res.data.docInfos;
                    that.doctorList.map((v,i)=>{
                        var time1 = v.startTime.split('-');
                        v.startTime1 = time1[0]+'年'+time1[1]+"月"+time1[2]+'日';
                        var time2 = v.endTime.split('-');
                        v.endTime1 = time2[0]+'年'+time2[1]+"月"+time2[2]+'日';
                    })
                });
            },
            // 删除
            deleteTap(id,index){
                var that = this;
                var params = {
                    id:id
                }
                $.confirm("", "确定删除这个医师信息？", function () {
                    $http(that.baseUrl.deleteUrl, true,params, false)
                    .then(res => {
                        $.alert('','删除成功')
                        that.doctorList.splice(index, 1);
                    });
                })
            },
            addTap(){
                window.location.href = './doctorEdit.html?viewFlag=add'
            },
            // 编辑
            editTap(item){
                localStorage.setItem('itemObj',JSON.stringify(item))
                window.location.href = './doctorEdit.html?viewFlag=edit'
            }
        }
    })
};
