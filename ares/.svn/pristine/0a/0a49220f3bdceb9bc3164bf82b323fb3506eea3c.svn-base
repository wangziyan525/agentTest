window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
window.URL = window.URL || window.webkitURL
var audioBuffer = []
var audioLen = 0

var audioCtx = null
var audioPlaying = false
var wavBuffer = []
var sampleRate = 16000
var isStart = false
var wavEnd = true

function strToArrayBuffer(str) {
    var buffer = new Int8Array(str.length)
    for (var i = 0; i < str.length; i++) {
        buffer[i] = str.charCodeAt(i)
    }

    return buffer
}

function u32toArrayBuffer(number) {
    var buffer = new Int8Array(4)
    buffer[0] = number & 0xFF
    buffer[1] = (number >> 8) & 0xFF
    buffer[2] = (number >> 16) & 0xFF
    buffer[3] = (number >> 24) & 0xFF

    return buffer
}

function u16toArrayBuffer(number) {
    var buffer = new Int8Array(2)
    buffer[0] = number & 0xFF
    buffer[1] = (number >> 8) & 0xFF

    return buffer
}

function toWav(audioBuff, sampleRate, channels, byteBits) {
    var wavLen = audioBuff.length + 44
    var wav = new Int8Array(wavLen)
    var chunkId = "RIFF"
    var format = "WAVE"
    var subChunkId1 = "fmt "
    var subChunkId2 = "data"

    wav.set(strToArrayBuffer(chunkId), 0)
    wav.set(u32toArrayBuffer(wavLen - 8), 4)
    wav.set(strToArrayBuffer(format), 8)
    wav.set(strToArrayBuffer(subChunkId1), 12)
    wav.set(u32toArrayBuffer(16), 16)
    wav.set(u16toArrayBuffer(1), 20)
    wav.set(u16toArrayBuffer(channels), 22)
    wav.set(u32toArrayBuffer(sampleRate), 24)
    wav.set(u32toArrayBuffer(sampleRate * byteBits * channels / 8), 28)
    wav.set(u16toArrayBuffer(channels * byteBits / 8), 32)
    wav.set(u16toArrayBuffer(byteBits), 34)
    wav.set(strToArrayBuffer(subChunkId2), 36)
    wav.set(u32toArrayBuffer(wavLen - 44), 40)
    wav.set(audioBuff, 44)

    return wav
}
// var myAudio = document.createElement('audio')
var myAudio = document.getElementById("myAudio")
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

            // 非实时播放
            var audioWav = toWav(audioBlob, sampleRate, 1, 16) // 转换音频是否压缩
            var blob1 = new Blob([audioWav])
            var audioUrl1 = window.URL.createObjectURL(blob1)
            myAudio.setAttribute('src', audioUrl1)
            myAudio.addEventListener('ended', function() {
                isStart = false
                wavEnd = true
                // debugger
                // play()
            })
            myAudio.play().then(() => {
                document.querySelector('#tts_start').textContent = '播放中...'
            }).catch(() => {})
        }
        // 清空合成音频缓存数据
        audioBuffer = []
        audioLen = 0
        wavEnd = true
        return
    }

    if (audio !== "") {
        var buffer = new Int8Array(audio.length) //生成二进制8位数组
        for (var i = 0; i < audio.length; i++) {
            buffer[i] = audio.charCodeAt(i) // 获取字符的Unicode 编码
        }

        audioBuffer.push(buffer)
        audioLen += buffer.length
    }
}

function getParams() {
    var params = {}
    var parArr = document.querySelector('#tts_params').value.split("&")
    for (var i = 0; i < parArr.length; i++) {
        var idx = parArr[i].indexOf("=")
        params[parArr[i].substr(0, idx)] = parArr[i].substr(idx+1)
    }

    return params
}

function getUrls() {
    return document.querySelector('#tts_url').value
}

function getText() {
    return document.querySelector('#tts_text').value
}

function isAuth() {
    return document.querySelector('#auth').checked
}

var tts = new Tts(audioSave)

tts.onError(function (obj) {
    isStart = false
    wavEnd = true
    console.log(obj.msg)
    alert(JSON.stringify(obj))
})

var play = function() {
    if (isStart) {
        return
    }
    isStart = true
    wavEnd = false

    var params = getParams()
    var url = getUrls()
    var text = getText()
    var bAuth = isAuth()

    sampleRate = params['auf'] === '3' ? 8000 : 16000
    tts.start(url, params, text, bAuth)
    document.querySelector('#tts_start').textContent = '音频合成中...'
    document.querySelector('#tts_start').className = document.querySelector('#tts_start').className.replace('btn-primary', 'btn-secondary')
}

document.querySelector('#tts_start').addEventListener('click', function () {
    play()
})

document.querySelector('#tts_stop').addEventListener('click', function () {
    if (!isStart) {
        return
    }

    isStart = false
    wavEnd = true
    tts.stop()
    myAudio.pause()
    document.querySelector('#tts_start').textContent = '开始播放'
    document.querySelector('#tts_start').className = document.querySelector('#tts_start').className.replace('btn-secondary', 'btn-primary')
})