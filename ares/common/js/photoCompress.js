
function photoCompress(flag, file, w, objDiv) {  //w 一个文件压缩后的宽度 objDiv：一个是容器或者回调函数
	var ready = new FileReader();
	/*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
	ready.readAsDataURL(file);
	ready.onload = function () {
		var re = this.result;
		canvasDataURL(flag, re, w, objDiv)
	}
}
function canvasDataURL(flag, path, obj, callback) {
	var img = new Image();
	img.src = path;
	img.onload = function () {
		var that = this;
		// 默认按比例压缩
		var w = that.width,
			h = that.height,
			scale = w / h;
		if (flag == "2") {
			w = w / 5;
			h = h / 5;
		} else {
			w = obj.width || w;
			h = obj.height || (w / scale);
		}
		var quality = 0.7;  // 默认 0.7
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		// 创建属性节点
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(that, 0, 0, w, h);
		if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality;
		}
		var base64 = canvas.toDataURL('image/jpeg', quality);
		// 回调返回 base64的值
		callback(base64);
	}
}
/**
  用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData) {
	var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
}


var xhr;
const $UploadImg = function jqPromiseAjax(params){
	return new Promise(function(resolve,reject ){
		$.showLoading("上传图片...");
		var flag='999';
		var fileObj = params.file;
		var form = new FormData(); // FormData 对象
		if(fileObj){
			if (fileObj.size / 1024 > 1025*Number(params.compressNum)) { //大于10M，进行压缩上传
				photoCompress(flag, fileObj, {
					quality: 0.4
				}, function (base64Codes) {
					// console.log("压缩后：" + base.length / 1024 + " " + base);
					var bl = convertBase64UrlToBlob(base64Codes);
					form.append("file", bl, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象
					// form.append("flag", params.imgflag); // 文件参数
					xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
					xhr.open("post", params.url, true); //post方式 true 异步。
					xhr.onload = function (e) {
						var data = JSON.parse(e.target.responseText);
						resolve(data)
					};
					xhr.onerror = uploadFailed; //请求失败
					xhr.upload.onloadstart = function () {//上传开始执行方法
						//$.showLoading("图片上传中...");
					};

					xhr.send(form); //开始上传，发送form数据

				});
			} else { //小于等于1M 原图上传
				form.append("file", fileObj); // 文件对象
				//form.append("flag", params.imgflag); // 文件参数
				xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
				xhr.open("post", params.url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
				xhr.onload = function (e) {
					// var data = JSON.parse(e.target.responseText);
					// resolve(data)
				};
				xhr.onerror = uploadFailed; //请求失败
				xhr.upload.onloadstart = function () {//上传开始执行方法

				};
				xhr.send(form); //开始上传，发送form数据

			}
		}else{
			$.hideLoading();
			return
		}

	})
}
//上传文件方法
function UpladFile(url,idObject,imgflag) {

}

//上传失败
function uploadFailed(evt) {
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
}
//取消上传
function cancleUploadFile() {
	xhr.abort();
}