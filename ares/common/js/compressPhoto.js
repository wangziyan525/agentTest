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

// 压缩图片
function smallPhoto(file,formdata,callback){
	var flag = 999;
	console.log(file.size)
	if(file.size / 1024 > 1025){
		photoCompress(flag, file, {
			quality: 0.4
		}, function (base64Codes) {
			var bl = convertBase64UrlToBlob(base64Codes);
			formdata.append("file", bl, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象
			callback(formdata)	
		});
	}else{
		formdata.append("file", file); // 文件对象
		callback(formdata)
	}
}

function getObjectURL(file) {
	var url = null;
	if (window.createObjectURL != undefined) {
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) {
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}
