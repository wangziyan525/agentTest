var mousePressed = false;
var lastX, lastY;
var canvastopHeight = 38;
var ctx = document.getElementById('myCanvas').getContext("2d");
var c = document.getElementById("myCanvas");
var saveimgs = document.getElementsByClassName("footname")[0];
var md = new MobileDetect(window.navigator.userAgent);
var mobileType = md.phone()+" "+md.os();

var indexnum = 0;
var clientWidth = (document.body.clientWidth)*0.95;
var direction = 1;
$('#myCanvas').attr('width',clientWidth);
$('#page2').css({"overflow":"hidden"});
window.addEventListener("orientationchange",function () {
    if(window.orientation==180 || window.orientation==0 ){
        var clientWidth = (document.body.clientWidth)*0.95;
        $('#myCanvas').attr('width',clientWidth);
        $('#page2').css({"overflow":"hidden"});
        direction = 1
    }
    if(window.orientation==90 || window.orientation==-90 ){
        var clientWidth = (document.body.clientWidth)*0.95;
        $('#myCanvas').attr('width',clientWidth);
        $('#page2').css({"overflow":"auto"});
        direction = 0
    }
});

function saveImageInfo(){
    var image = c.toDataURL("image/png");
    if(indexnum < 1){
    	$.alert('','请签名');
    	return;
    }
    if(indexnum < 4){
        $.alert('','请完整填写签名');
        return;
    }
    // var ctximg = document.createElement("span");
    // ctximg.innerHTML = "<img src='"+image+"' alt='from canvas'/>";
    //     saveimgs.appendChild(ctximg);
    //$.alert('phoneinfo:'+mobileType);

    var token = localStorage.getItem("X-Token");
    $.ajax({
        url: base.context + "commonsign/savaSign.xa",
        type: 'POST',
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('X-Token', token);
            $.showLoading();
        },
        contentType: 'application/json;charset=utf-8;',
        data: JSON.stringify({
            "templatekey":templatekey,
            "imgbase64": image,
            // "phoneinfo":mobileType,
            // "id":$('#signId').html(),
            "direction":direction+""
        }),
        success: function (res) {
            if (typeof (res) == 'string') {
                res = JSON.parse(res);
            }
            if (res.retcode == 'success') {
                $('#page1').hide();
                $('#page3 img').attr('src', "data:image/jpeg;base64," + res.data);
                toPage(3);
                document.title = '西安银行';
            } else {
                $.alert('',res.retmsg);
            }
        },
        error: function(xhr, status, error) {
            $.alert('','网络错误，请稍后再试');
        },
        complete: function(xhr) {
            $.hideLoading();
        }
    });
}


var selected1='6',selected2='blue';
function InitThis() {
//			触摸屏
    c.addEventListener('touchstart', function (event) {
        if (event.targetTouches.length == 1) {
            event.preventDefault();// 阻止浏览器默认事件，重要
            var touch = event.targetTouches[0];
            mousePressed = true;
            console.log(touch.pageY)
            Draw(touch.pageX - this.offsetLeft, touch.pageY - canvastopHeight, false);
        }

    },false);

    c.addEventListener('touchmove', function (event) {
        if (event.targetTouches.length == 1) {
            event.preventDefault();// 阻止浏览器默认事件，重要
            var touch = event.targetTouches[0];
            if (mousePressed) {
                Draw(touch.pageX - this.offsetLeft, touch.pageY - canvastopHeight, true);
            }
        }

    },false);

    c.addEventListener('touchend', function (event) {
    	indexnum++;
        if (event.targetTouches.length == 1) {
            event.preventDefault();// 阻止浏览器默认事件，防止手写的时候拖动屏幕，重要
//      			var touch = event.targetTouches[0];
            mousePressed = false;
        }
    },false);
//		   鼠标
    c.onmousedown = function (event) {
        mousePressed = true;
        Draw(event.pageX - this.offsetLeft, event.pageY - canvastopHeight, false);
    };

    c.onmousemove = function (event) {
        if (mousePressed) {
            console.log(event.pageY+"=="+canvastopHeight);
            Draw(event.pageX - this.offsetLeft, event.pageY - canvastopHeight, true);
        }
    };

    c.onmouseup = function (event) {
        mousePressed = false;
        indexnum++;
    };
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = selected2;
        ctx.lineWidth = selected1;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
	indexnum = 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function clearImg(){
    saveimgs.removeChild('img');
}