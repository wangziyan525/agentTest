/**
 * 封装POST请求
 * @param url 请求第值
 * @param showLoading true 显示loading,false 不显示
 * @param params 请求参数
 * @param status 是否需要特殊处理
 */

var $http =  function (url,loading, params, status) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: base.context + url,
            type: 'POST',
            beforeSend: function(XMLHttpRequest){
                if(loading){
                    $.showLoading('加载中...');
                }
                XMLHttpRequest.setRequestHeader('X-Token',localStorage.getItem("X-Token") ? localStorage.getItem("X-Token") : '');
            },
            timeout:180*1000,
            contentType:'application/json;charset=utf-8;',
            data: JSON.stringify(params),
            success: function (res) {
                var res =( typeof res === "string") ? $.parseJSON(res) : res;
                // 需要特殊处理返回码 retcode
                if (status) return resolve(res);

                if (res.retcode === 'success') return resolve(res);
                $.alert("",res.retmsg);
            },
            error: function (xhr,status,error) {
                if (error.status == 401) {
                    var formUrl = window.location.href;
                    if (formUrl.indexOf(base.domain) == -1) {
                        alert("非法访问","");
                        return;
                    }
                    var formUrls = window.location.href.split('?');
                    var link = formUrls[0];
                    if(formUrl.indexOf('code=') > 0 && formUrls.length >1){
                        var arg = "";
                        var args = formUrls[1].split("&");
                        for(var i=0;i<args.length;i++){
                            if(args[i].indexOf("code=") < 0){
                                arg += "&"+args[i];
                            }
                        }
                        link += "?"+arg.substr(1,arg.length);
                    }

                    var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+base.appid+'&redirect_uri='+encodeURIComponent(link)+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
                    top.location.replace(url);
                }
                $.alert("系统异常，请稍后再试","");
            },
            complete: function (xhr) {
                if(loading) {
                    $.hideLoading();
                }
            }
        });
    });
};

/**
 * 封装上传文件
 * @param {*} url 请求第值
 * @param {*} params 入参
 */

var $Upload =  function (url, params) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: base.context + url,
            type: 'POST',
            dataType: 'json',
            async: false,
            contentType: false,
            processData: false,
            beforeSend: function(XMLHttpRequest){
                XMLHttpRequest.setRequestHeader('X-Token',localStorage.getItem("X-Token") ? localStorage.getItem("X-Token") : '' );
            },
            data: params,
            success: function (res) {
                var res =( typeof res === "string") ? $.parseJSON(res) : res;
                if (res.retcode === 'success') return resolve(res);
                $.alert(res.retmsg,"");
            },
            error: function (err) {
                if (err.status == 401) {
                    var formUrl = window.location.href;
                    if (formUrl.indexOf(base.domain) == -1) {
                        alert("非法访问","");
                        return;
                    }
                };
                console.log("上传超时")
                console.log(err);
                alert("上传超时","");
            },
            complete: function (xhr,status) {
                $.hideLoading();
            }
        });
    });
};
