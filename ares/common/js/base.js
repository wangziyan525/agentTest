var base = {};
//企业号ID 生产  wxe33ac7fd5c052a61 测试wx2fb54fbe7a98cebd
base.appid = "wxe33ac7fd5c052a61";
//访问域名
base.domain = "https://weixin.xacbank.com.cn";
base.prefix = "/qywx/";    
//上下文
base.context = "/aresqywx/";
//websocket域名
base.websocket = "wss://weixin.xacbank.com.cn";
/**
 * 填充模板
 * */
function fillTemplate(tmpl,obj){
    var html = tmpl;
    for(var key in obj){
        var regexp = eval("/\{" + key + "\}/ig");
        html = html.replace(regexp,obj[key]);
    }
    return html;
}

//url获取参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null)
        return (r[2]);
    return null;
 }