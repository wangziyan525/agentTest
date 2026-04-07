var baseUrl = {
    queryInfoUrl: 'misconduct/getInvestmentDetail.xa'
};

// 根据 pre/11.xlsx 的输出字段定义维护分组和中英文字段映射
var sectionConfigs = [
    {
        key: 'RYPOSFR',
        title: '担任法人信息',
        fields: [
            { key: 'RYNAME', label: '查询人姓名' },
            { key: 'ENTNAME', label: '企业(机构)名称' },
            { key: 'REGNO', label: '注册号' },
            { key: 'ENTTYPECODE', label: '企业(机构)类型编码' },
            { key: 'ENTTYPE', label: '企业(机构)类型' },
            { key: 'REGCAP', label: '注册资本(企业:万元)' },
            { key: 'ENTSTATUS', label: '企业状态' },
            { key: 'REGCAPCUR', label: '注册资本币种' },
            { key: 'CREDITCODE', label: '统一社会信用代码' },
            { key: 'REGORGPROVINCE', label: '所在省份' },
            { key: 'REGORGCITY', label: '所在城市' },
            { key: 'REGCITY', label: '所在城市编码' },
            { key: 'REGORGDISTRICT', label: '所在区/县' },
            { key: 'ESDATE', label: '成立日期' },
            { key: 'ENTID', label: '企业' },
            { key: 'ENTITYTYPE', label: '实体类型' },
            { key: 'APPRDATE', label: '核准日期' },
            { key: 'REVDATE', label: '吊销日期' },
            { key: 'CANDATE', label: '注销日期' }
        ]
    },
    {
        key: 'RYPOSSHA',
        title: '投资企业信息',
        fields: [
            { key: 'RYNAME', label: '查询人姓名' },
            { key: 'ENTNAME', label: '企业(机构)名称' },
            { key: 'REGNO', label: '注册号' },
            { key: 'ENTTYPECODE', label: '企业(机构)类型编码' },
            { key: 'ENTTYPE', label: '企业(机构)类型' },
            { key: 'REGCAP', label: '注册资本(企业:万元)' },
            { key: 'ENTSTATUS', label: '企业状态' },
            { key: 'REGCAPCUR', label: '注册资本币种' },
            { key: 'CREDITCODE', label: '统一社会信用代码' },
            { key: 'REGORGPROVINCE', label: '所在省份' },
            { key: 'REGORGCITY', label: '所在城市' },
            { key: 'REGCITY', label: '所在城市编码' },
            { key: 'REGORGDISTRICT', label: '所在区/县' },
            { key: 'ESDATE', label: '成立日期' },
            { key: 'SUBCONAM', label: '投资数额（万）' },
            { key: 'CURRENCY', label: '投资单位' },
            { key: 'CONFORM', label: '投资方式' },
            { key: 'FUNDEDRATIO', label: '投资比例' },
            { key: 'CONDATE', label: '投资日期' },
            { key: 'ISLISTED', label: '是否上市' },
            { key: 'SOURCETYPE', label: '数据来源:' },
            { key: 'FRNAME', label: '法定代表人姓名' },
            { key: 'ENTID', label: '企业ENTID' },
            { key: 'APPRDATE', label: '核准日期' },
            { key: 'REVDATE', label: '吊销日期' },
            { key: 'CANDATE', label: '注销日期' }
        ]
    },
    {
        key: 'RYPOSPER',
        title: '担任高管信息',
        fields: [
            { key: 'RYNAME', label: '查询人姓名' },
            { key: 'ENTNAME', label: '企业(机构)名称' },
            { key: 'REGNO', label: '注册号' },
            { key: 'ENTTYPECODE', label: '企业(机构)类型编码' },
            { key: 'ENTTYPE', label: '企业(机构)类型' },
            { key: 'REGCAP', label: '注册资本(企业:万元)' },
            { key: 'ENTSTATUS', label: '企业状态' },
            { key: 'REGCAPCUR', label: '注册资本币种' },
            { key: 'CREDITCODE', label: '统一社会信用代码' },
            { key: 'REGORGPROVINCE', label: '所在省份' },
            { key: 'REGORGCITY', label: '所在城市' },
            { key: 'REGCITY', label: '所在城市编码' },
            { key: 'REGORGDISTRICT', label: '所在区/县' },
            { key: 'ESDATE', label: '成立日期' },
            { key: 'POSITION', label: '职务' },
            { key: 'FRNAME', label: '法定代表人姓名' },
            { key: 'ENTID', label: '企业ENTID' },
            { key: 'APPRDATE', label: '核准日期' },
            { key: 'REVDATE', label: '吊销日期' },
            { key: 'CANDATE', label: '注销日期' }
        ]
    },
    {
        key: 'PUNISHBREAK',
        title: '失信被执行人信息',
        fields: [
            { key: 'ENTID', label: '企业ENTID' },
            { key: 'CASECODE', label: '案号' },
            { key: 'INAMECLEAN', label: '被执行人姓名/名称' },
            { key: 'TYPE', label: '失信人类型' },
            { key: 'BUSINESSENTITY', label: '法定代表人/负责人姓名' },
            { key: 'CARDNUM', label: '组织机构代码' },
            { key: 'REGDATECLEAN', label: '立案时间' },
            { key: 'PUBLISHDATECLEAN', label: '发布时间' },
            { key: 'COURTNAME', label: '执行法院' },
            { key: 'AREANAMECLEAN', label: '省份' },
            { key: 'GISTID', label: '执行依据文号' },
            { key: 'GISTUNIT', label: '做出执行依据单位' },
            { key: 'DUTY', label: '生效法律文书确定的义务' },
            { key: 'DISRUPTTYPENAME', label: '失信被执行人行为具体情形' },
            { key: 'PERFORMANCE', label: '被执行人的履行情况' },
            { key: 'PERFORMEDPART', label: '已履行(元)' },
            { key: 'UNPERFORMPART', label: '未履行(元)' }
        ]
    },
    {
        key: 'PUNISHED',
        title: '被执行人信息',
        fields: [
            { key: 'ENTID', label: '企业ENTID' },
            { key: 'CASECODE', label: '案号' },
            { key: 'INAMECLEAN', label: '被执行人姓名/名称' },
            { key: 'CARDNUMCLEAN', label: '组织机构代码' },
            { key: 'AREANAMECLEAN', label: '省份' },
            { key: 'COURTNAME', label: '执行法院' },
            { key: 'REGDATECLEAN', label: '立案时间' },
            { key: 'CASESTATE', label: '案件状态' },
            { key: 'EXECMONEY', label: '执行标的(元)' },
            { key: 'TYPE', label: '被执行人类型' }
        ]
    },
    {
        key: 'ENTCASEINFO',
        title: '行政处罚信息',
        fields: [
            { key: 'ENTID', label: '企业ENTID' },
            { key: 'UNITNAME', label: '当事人名称' },
            { key: 'CREDITCODE', label: '统一社会信用代码' },
            { key: 'ILLEGACTTYPE', label: '违法行为类型' },
            { key: 'PENAUTH_CN', label: '决定机关名称' },
            { key: 'PENCONTENT', label: '行政处罚内容' },
            { key: 'PENDECISSDATE', label: '处罚决定日期' },
            { key: 'PENDECNO', label: '决定文书号' },
            { key: 'PUBLICDATE', label: '公示日期' }
        ]
    },
    {
        key: 'FINALCASE',
        title: '终本案件信息',
        fields: [
            { key: 'ENTID', label: '企业ENTID' },
            { key: 'CASECODE', label: '案号' },
            { key: 'INAME', label: '被执行人姓名/名称' },
            { key: 'TYPE', label: '当事人类型' },
            { key: 'CARDNUM', label: '组织机构代码' },
            { key: 'DOM', label: '地址' },
            { key: 'COURTNAME', label: '执行法院' },
            { key: 'REGDATE', label: '立案时间' },
            { key: 'FINALDATE', label: '终本日期' },
            { key: 'EXECMONEY', label: '执行标的' },
            { key: 'UNPERFMONEY', label: '未履行金额' }
        ]
    },
    {
        key: 'LIMITCONSUM',
        title: '限制高消费信息',
        fields: [
            { key: 'CASECODE', label: '案号' },
            { key: 'COURT_NAME', label: '执行法院' },
            { key: 'PUBLISH_DATE', label: '发布时间' },
            { key: 'REGDATE', label: '立案时间' },
            { key: 'LIMIT_ORDER', label: '原文' },
            { key: 'INAME', label: '被执行人姓名/名称' },
            { key: 'ENTNAME', label: '限销令对象' },
            { key: 'ENTID', label: '限消令对象ENTID' },
            { key: 'APPLICANT', label: '申请人' },
            { key: 'APPLICANT_ENTID', label: '申请人ENTID' }
        ]
    },
    {
        key: 'EXCEPTIONLIST',
        title: '企业经营异常名录',
        fields: [
            { key: 'ENTNAME', label: '企业名称' },
            { key: 'ENTID', label: '企业ENTID' },
            { key: 'REGNO', label: '注册号' },
            { key: 'CREDITCODE', label: '统一社会信用代码' },
            { key: 'INDATE', label: '列入日期' },
            { key: 'OUTDATE', label: '移出日期' },
            { key: 'YR_REGORG', label: '列入机关名称' },
            { key: 'YC_REGORG', label: '移出机关名称' },
            { key: 'INREASON', label: '列入原因' },
            { key: 'OUTREASON', label: '移出原因' }
        ]
    },
    {
        key: 'BREAKLAW',
        title: '严重违法信息',
        fields: [
            { key: 'ENTNAME', label: '企业名称' },
            { key: 'ENTID', label: '企业ENTID' },
            { key: 'CREDITCODE', label: '统一社会信用代码' },
            { key: 'INREASON', label: '列入原因' },
            { key: 'INDATE', label: '列入日期' },
            { key: 'OUTREASON', label: '移出原因' },
            { key: 'OUTDATE', label: '移出日期' },
            { key: 'INREGORG', label: '列入作出决定机关' },
            { key: 'OUTREGORG', label: '移出作出决定机关' }
        ]
    }
];

var vm;

function initFun () {
    vm = new Vue({
        el:"#app",
        data:{
            id:"",
            sections:[],
            noData:false
        },
        created:function () {
            // 详情页通过上个页面透传的 employeeMisconductChecklistId 查询
            this.id = GetQueryString("id") ? GetQueryString("id") : "";
            this.queryInfo();
            $("#app").show();
        },
        methods:{
            async queryInfo(){
                var that = this;
                if (!that.id) {
                    that.noData = true;
                    return;
                }

                var param = {
                    employeeMisconductChecklistId: that.id
                };
                var res = await $http(baseUrl.queryInfoUrl, true, param, true);

                if (res.retcode === 'success'){
                    // 接口有效数据都在 PERSON_INFO 下，页面只渲染有值字段
                    var personInfo = res.data && res.data.PERSON_INFO ? res.data.PERSON_INFO : {};
                    that.sections = that.buildSections(personInfo);
                    that.noData = that.sections.length === 0;
                }
                else{
                    vant.Dialog.alert({
                        message: res.retmsg
                    }).then(function () {
                        that.noData = true;
                    });
                }
            },
            buildSections:function (personInfo) {
                var sections = [];
                for (var i = 0; i < sectionConfigs.length; i++) {
                    var config = sectionConfigs[i];
                    var records = personInfo[config.key];
                    if (Object.prototype.toString.call(records) !== '[object Array]' || records.length === 0) {
                        continue;
                    }

                    var items = [];
                    for (var j = 0; j < records.length; j++) {
                        var record = records[j] || {};
                        var rows = [];
                        for (var k = 0; k < config.fields.length; k++) {
                            var field = config.fields[k];
                            if (!this.hasDisplayValue(record[field.key])) {
                                continue;
                            }
                            // 每行统一转成 label/value 结构，HTML 只负责渲染
                            rows.push({
                                label: field.label,
                                value: this.formatValue(record[field.key], field.key)
                            });
                        }
                        if (rows.length) {
                            items.push({
                                rows: rows
                            });
                        }
                    }

                    if (items.length) {
                        sections.push({
                            key: config.key,
                            title: config.title,
                            items: items
                        });
                    }
                }
                return sections;
            },
            hasDisplayValue:function (value) {
                return value !== undefined && value !== null && String(value).replace(/^\s+|\s+$/g, '') !== '';
            },
            formatValue:function (value, fieldKey) {
                var text = String(value).replace(/^\s+|\s+$/g, '');
                // 数据来源字段需要把接口枚举值转成页面展示文案
                if (fieldKey === 'SOURCETYPE') {
                    if (text === '001') {
                        return '工商登记';
                    }
                    if (text === '002') {
                        return '上市披露';
                    }
                }
                if (fieldKey === 'ISLISTED') {
                    if (text === '0') {
                        return '上市';
                    }
                    if (text === '1') {
                        return '未上市';
                    }
                }
                return text;
            }
        }
    });
}
