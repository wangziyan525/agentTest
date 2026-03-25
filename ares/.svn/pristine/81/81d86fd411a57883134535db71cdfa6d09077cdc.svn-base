window.URL = window.URL || window.webkitURL
var audioBuffer = [] // 音频缓冲数据
var audioLen = 0

var sampleRate = 16000
var isStart = false
var wavEnd = true //为true时音频播放结束

// 播放和合成进度相关
var audioCount = 0
var audioTimethEstimate = 0
var mBufferPecent = 0
var mSpeakPecent = 0
var mSpeakPecentTemp = 0
var textLength = 0
var audioPause = false
var barTimer
var barSpeeckTimer

// 播放相关
var myAudio = document.createElement('audio')
var mediaSource = null
var audioSegments = [] // 转写的MP3音频数据
var sourceBuffer = null
var mp3Encoder = null // 转换的mp3音频

// 缓冲进度和播放进度参数初始化
function initSpeeckBarParam() {
    audioCount = 0
    mBufferPecent = 0
    mSpeakPecent = 0
    mSpeakPecentTemp = 0
    audioPause = false

    //var bytePersecond = sampleRate * 2
    if (sampleRate === 8000) {
        audioTimethEstimate = textLength * 4000
    } else {
        audioTimethEstimate = textLength * 8000
    }
    //audioTimethEstimate = audioTimethEstimate / bytePersecond
}

//写入缓冲进度和播放进度回调
function setBarProcess() {
    //缓冲进度 播放进度回调写入
    if (wavEnd) {
        mBufferPecent = 100
    } //缓冲结束
    mSpeakPecentTemp = Math.max(mSpeakPecentTemp, mSpeakPecent) //播放进度取最大值，防止缓冲结束进度条出现回落
    onSpeekProcess(mBufferPecent, mSpeakPecentTemp)

    if (mBufferPecent === 100 && mSpeakPecentTemp === 100) {
        onAudioPlayStatus(2)
        window.clearInterval(barTimer)
    }
}

var totalLength = 0

// 计算播放进度
function setSpeekBitProcess() {
    var curLength = myAudio.currentTime * sampleRate * 2
    if (wavEnd) {
        mSpeakPecent = Math.round(100 * curLength / totalLength)//缓冲结束使用实际总长计算播放进度
    } else {
        mSpeakPecent = Math.round(100 * curLength / audioTimethEstimate)  //缓冲阶段使用估算总长计算播放进度
    }

    if (audioCount <= 1 && mSpeakPecent >= 98) {
        mSpeakPecent = 100
        window.clearInterval(barSpeeckTimer)
    }
}

// 首次开始播放设置播放进度相关
function audioPlayInit() {
    wavEnd = false
    audioCount = 0
    totalLength = 0
    //缓冲进度和播放进度参数初始化
    initSpeeckBarParam()
    //开启缓冲和播放进度回调
    barTimer = window.setInterval(function () {
        setBarProcess()
    }, 10)
    barSpeeckTimer = window.setInterval(function () {
        setSpeekBitProcess()
    }, 1)
}

// 暂停播放
function audioPlayPause() {
    if (audioPause) {
        return
    }
    audioPause = true
    myAudio.pause()
    document.querySelector('#tts_pause').classList.add("display")
    document.querySelector('#tts_resume').classList.remove("display")
    //关闭缓冲和播放进度回调
    window.clearInterval(barSpeeckTimer)
    window.clearInterval(barTimer)
}

// 继续播放
function audioPlayResume() {
    if (!audioPause) {
        return
    }
    audioPause = false
    myAudio.play()
    document.querySelector('#tts_resume').classList.add("display")
    document.querySelector('#tts_pause').classList.remove("display")
    // 每十毫秒进行一次计算开启缓冲和播放进度回调
    barTimer = window.setInterval(function () {
        setBarProcess()
    }, 10)
    barSpeeckTimer = window.setInterval(function () {
        setSpeekBitProcess()
    }, 1)
}

//合成缓存进度和播放进度回调
function onSpeekProcess(mBufferPecent,mSpeakPecent){
    //缓冲进度
    var processbar = document.querySelector('#processbar1')
    processbar.style.width = mBufferPecent + "%"
    processbar.innerHTML = processbar.style.width

    //播放进度
    var processbar2 = document.querySelector('#processbar2')
    processbar2.style.width = mSpeakPecent + "%"
    processbar2.innerHTML = processbar2.style.width
}

//播放状态回调 1=播放中 2=播放结束
function onAudioPlayStatus(status) {
    if (status === 1) {
        document.querySelector('#tts_start').textContent = '播放中'
    } else {
        document.querySelector('#tts_start').textContent = '开始播放'
        isStart = false
    }
}
// 音频播放结束
function audioPlayOver() {
    wavEnd = true

    //关闭缓冲和播放进度回调
    window.clearInterval(barSpeeckTimer)
    window.clearInterval(barTimer)
    document.querySelector('#tts_resume').classList.add("display")
    document.querySelector('#tts_pause').classList.add("display")
    // 修改播放状态
    onAudioPlayStatus(2)
}

// 循环请求得到数据后向sourceBuffer添加数据
function appendSegment(audioSegment) {
    audioSegments.push(audioSegment) // 添加mp3转写数据
    doAppendSegmentsToSource()
}

// 添加sourceBuffer数据
function doAppendSegmentsToSource() {
    // sourceBuffer.updating 检查sourceBuffer是否正在更新
    if (!sourceBuffer || sourceBuffer.updating) {
        return
    }

    if (audioSegments.length > 0) {
        var segment = audioSegments.shift() // 拿到第一个
        try {
            sourceBuffer.appendBuffer(segment) // 向sourceBuffer添加音频数据
        } catch (error) {
            audioSegments.unshift(segment)
            console.log(error)
        }
    }
}

// sourceBuffer监听数据更新回调
function onUpdateEnd() {
    if (audioSegments.length > 0) {
        doAppendSegmentsToSource() // 如果audioSegments数组中还有添加的MP3数据 再次添加到sourceBuffer中
    } else if (wavEnd) {
        if (mediaSource && mediaSource.readyState === 'open') {
            mediaSource.endOfStream() // endOfStream()流的结束
        }
    }
}

// mediaSource 绑定到src后监听打开链接回调
function onSourceOpen() {
    //创建sourceBuffer(生成sourceBuffer 时时向流式播放器添加音频)
    sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg')
    // 监听sourceBuffer中的数据更新updateend
    sourceBuffer.addEventListener('updateend', onUpdateEnd)
    sourceBuffer.addEventListener('error', (e) => {
        console.log('MSE source buffer error, ', e)
    })
}

// 搭建频流式播放器音
function initMediaSource() {
    mp3Encoder = new lamejs.Mp3Encoder(1, sampleRate, 64)
    // 创建MediaSource
    mediaSource = new window.MediaSource()
    // mediaSource设置监听打开链接  给myAudio.src赋值之后触发
    mediaSource.addEventListener('sourceopen', onSourceOpen)
    // 音频加载完成
    mediaSource.addEventListener('sourceended', () => {
        console.log('load audio segment finish')
    })
    // 音频播放器关闭时触发
    mediaSource.addEventListener('sourceclose', () => {
        console.log('audio player close')
    })

    // myAudio.src 通过 URL.createObjectURL 链接 mediaSource 赋值之后触发sourceopen
    myAudio.setAttribute('src', window.URL.createObjectURL(mediaSource))
    // 检查音频是否已经播放结束
    myAudio.addEventListener('ended', () => {
        audioPlayOver()
        uninitMediaSource()
    })
    // 音频因缓冲而暂停。
    myAudio.addEventListener('playing', () => {
        onAudioPlayStatus(1)
    })
    // 音频播放
    myAudio.play()
}

// 音频已经播放结束
function uninitMediaSource() {
    mp3Encoder = null
    audioSegments = []
    if (mediaSource) {
        if (sourceBuffer) {
            if (mediaSource.readyState !== 'closed') {
                mediaSource.removeSourceBuffer(sourceBuffer)
            }
    
            sourceBuffer = null
            if (mediaSource.readyState === 'open') {
                mediaSource.endOfStream()
            }
        }
        mediaSource = null
    }

    myAudio.src = ''
    myAudio.removeAttribute('src')
}

// 保存一次合成音频文件
function audioSave(isEnd, audio) {
    if (isEnd) {
        if (audioLen !== 0) {
            var offset = 0
            var audioBlob = new Int8Array(audioLen)
            for (var i = 0; i < audioBuffer.length; i++) {
                audioBlob.set(audioBuffer[i], offset)
                offset += audioBuffer[i].length
            }
            // 保存整个合成音频
            var blob = new Blob([audioBlob])
            var audioUrl = window.URL.createObjectURL(blob)
            document.querySelector('#download').setAttribute('href', audioUrl)
            document.querySelector('#download').setAttribute('download', 'tts.pcm')
            // 高亮显示下载按钮,表示音频可下载
            document.querySelector('#download').className = document.querySelector('#download').className.replace('btn-secondary', 'btn-primary')
        }

        // 清空合成音频缓存数据
        audioBuffer = []
        audioLen = 0
        wavEnd = true

        // var mp3bufLast = mp3Encoder.flush()
        var mp3bufLast = mp3Encoder ? mp3Encoder.flush() : []
        if (mp3bufLast.length > 0) {
            // 向流失播放器添加MP3音频数据
            appendSegment(mp3bufLast.buffer)
        }
        return
    }

    if (audio !== "") {
        totalLength += audio.length
        var segment = new Int8Array(audio.length) //生成二进制8位数组
        for (var i = 0; i < audio.length; i++) {
            segment[i] = audio.charCodeAt(i) // 获取字符的Unicode 编码
        }

        audioBuffer.push(segment)
        audioLen += segment.length

        var mp3buf = mp3Encoder.encodeBuffer(new Int16Array(segment.buffer)) // 将此段音频转换为mp3音频
        if (mp3buf.length > 0) {
            appendSegment(mp3buf.buffer)
        }

        // 估算缓冲进度
        audioCount++
        mBufferPecent = Math.round(100 * (Math.min(audioCount, textLength / 5) / (textLength / 5)))
    }
}

// 获取参数
function getParams() {
    var params = {}
    var parArr = document.querySelector('#tts_params').value.split("&")
    for (var i = 0; i < parArr.length; i++) {
        var idx = parArr[i].indexOf("=")
        params[parArr[i].substr(0, idx)] = parArr[i].substr(idx + 1)
    }

    return params
}

// 获取合成服务请求地址
function getUrls() {
    return document.querySelector('#tts_url').value
}

// 需要合成文本
function getText() {
    return document.querySelector('#tts_text').value
}

// 是否授权
function isAuth() {
    return document.querySelector('#auth').checked
}

var tts = new Tts(audioSave)

tts.onError(function (obj) {
    tts.stop()
    uninitMediaSource()
    audioPlayOver()
    isStart = false
    console.log(obj)
    alert(JSON.stringify(obj))
})

// 开始播放
document.querySelector('#tts_start').addEventListener('click', function () {
    debugger
    if (isStart) {
        return
    }
    // 开始按钮已按
    isStart = true

    // 下载音频按钮重置
    document.querySelector('#download').setAttribute('href', '#')
    document.querySelector('#download').removeAttribute('download')
    document.querySelector('#download').className = document.querySelector('#download').className.replace('btn-primary', 'btn-secondary')
    var params = getParams()
    var url = getUrls()
    var text = getText()
    var bAuth = isAuth()
    document.querySelector('#tts_pause').classList.remove("display")
    sampleRate = params['auf'] === '3' ? 8000 : 16000
    textLength = text.length
    audioPlayInit()

    initMediaSource()

    tts.start(url, params, text, bAuth)
})

// 暂停播放
document.querySelector('#tts_pause').addEventListener('click', function () {
    // 没有点击开始, 暂停无效
    if (!isStart) {
        return
    }
    audioPlayPause()
})

// 继续播放
document.querySelector('#tts_resume').addEventListener('click', function () {
    // 没有点击开始, 继续播放无效
    if (!isStart) {
        return
    }
    audioPlayResume()
})

//停止
document.querySelector('#tts_stop').addEventListener('click', function () {
    if (!isStart) {
        return
    }

    tts.stop()

    uninitMediaSource()

    audioPlayOver()
    isStart = false
})

// tts.onError(function (obj) {
//     tts.stop()
//     uninitMediaSource()
//     audioPlayOver()
//     isStart = false
//     if (obj === 40001) {
//       showToast('一般性错误')
//     } else if (obj === 40002) {
//       showToast('暂未没找到服务，请稍后再试')
//     }  else if (obj === 40003) {
//       showToast('连接引擎失败')
//     }  else if (obj === 40004) {
//       showToast('新建流失败')
//     }  else if (obj === 40005) {
//       showToast('写入流失败')
//     }  else if (obj === 40006) {
//       showToast('读取流失败')
//     }  else if (obj === 40007) {
//       showToast('会话不存在')
//     }  else if (obj === 40008) {
//       showToast('NLP调用失败')
//     } else if (obj === 40009) {
//       showToast('鉴权失败')
//     } else if (obj === 40010) {
//       showToast('组合服务调用失败')
//     } else if (obj === 40011) {
//       showToast('无效的cmd')
//     } else if (obj === 40012) {
//       showToast('数据格式错误')
//     } else if (obj === 40013) {
//       showToast('请求不支持')
//     } else if (obj === 40014) {
//       showToast('tes调用失败')
//     } else if (obj === 40015) {
//       showToast('无效的vid')
//     } else if (obj === 40016) {
//       showToast('调用第三方模拟引擎失败')
//     } else if (obj === 40017) {
//       showToast('请求服务发现失败')
//     } else if (obj === 40018) {
//       showToast('启动服务失败')
//     } else if (obj === 40019) {
//       showToast('路由内部异常')
//     } else if (obj === 40020) {
//       showToast('引擎无结果')
//     } else if (obj === 40021) {
//       showToast('文本写入失败')
//     } else if (obj === 40022) {
//       showToast('会话超时')
//     } else if (obj === 40023) {
//       showToast('MSP_ERROR_ROUTE_APPID_NOT_FIT')
//     } else if (obj === 40024) {
//       showToast('上传资源失败')
//     } else if (obj === 40025) {
//       showToast('删除资源失败')
//     } else if (obj === 40026) {
//       showToast('下载资源失败')
//     } else if (obj === 40027) {
//       showToast('MSP_ERROR_ROUTE_GET_SERVER')
//     } else if (obj === 40028) {
//       showToast('MSP_ERROR_ROUTE_AUDIO_DECODE')
//     } else if (obj === 'response error') {
//       showToast('服务连接异常，请检查url或者ssl证书未加载信任')
//     }
//     // stopTts()
//     // if (!isStart) {
//     //   tts.stop()
//     // }
//   })
