function action() {
    new Vue({
        el: "#app",
        data: {

            numbercunt:'',
            infos:{},       //详情信息


        },
        created: function () {



        },
        mounted: function () {



        },
        methods: {

            //赋值
            tosubInfo(){
                this.$set(this.infos,'weightedRate',this.numbercunt);
                if(this.infos.weightedRate && this.infos.weightedRate != ''){
                    this.infos.weightedRate = this.toFixeda((this.infos.weightedRate*100));
                };
                console.log(this.infos.weightedRate)
            },


            //截取小数点后4位
            toFixeda(num){
                var str = num.toString();
                var match = str.match(/^-?\d+(?:\.\d{0,4})?/);
                return match ? parseFloat(match[0]) : 0;
            },


            //限制最多4位小数点
            weightedRateLength(){
                this.infos.weightedRate = this.infos.weightedRate.match(/^\d*(?:\.\d{0,4})?/g)[0] || '';
            },


        }
    });

}

