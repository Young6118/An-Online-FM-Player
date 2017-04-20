// 音乐播放器
/*
    1. 初始音乐 状态暂停
    2. 播放按钮
    3. 下一首 上一首
    4. 音量按钮
    5.
*/
function musicInit() {
    var music = e('#id-music-player')
    var a = musicList()
    var initNum = Math.floor(Math.random() * a.length)
    music.volume = 0.2
    var s = a[initNum].mp3Url
    music.src = s
    showTime()
    showName(a[initNum])
    music.dataset.list = initNum
    changeImg(a[initNum].picUrl)
}

//计算时间
function time(t) {
	var sec = Math.floor(t % 60)
	var min = Math.floor(t / 60)
	if(sec < 10) {
		sec = '0' + sec
	}
	if(min < 10) {
		min = '0' + min
	}
	return `${min}:${sec}`
}

function showTime() {
    var music = e('#id-music-player')
    var durationTime = e('#id-music-duration')
    var currentTime = e('#id-music-current-time')
    music.show = null
	clearInterval(music.show)
	music.show = setInterval(function() {
        var duration = music.duration
        var current = music.currentTime
        if(duration > 0 && duration < 120*60) {
            currentTime.innerHTML = time(current)
            durationTime.innerHTML = time(duration)
        }
	}, 100)
}

function showName(obj) {
    var s = obj.name + ' - ' + obj.artist
    var name = e('#id-music-name')
    name.innerHTML = s
}

function play() {
    var music = e('#id-music-player')
    var playBtn = e('#id-music-play')
    playBtn.src = './static/img/stop2.png'
    setTimeout(p, 1000)
    setTimeout(state, 3000)
}

function p() {
    var music = e('#id-music-player')
    var button = e('#id-music-rate')
    if(button.dataset.rate == 1) {
        music.playbackRate = 1
    }
    if(button.dataset.rate == 2) {
        music.playbackRate = 2
    }
    music.play()
}

function pause() {
    var music = e('#id-music-player')
    var playBtn = e('#id-music-play')
    playBtn.src = './static/img/play2.png'
    music.pause()
}

function nextMusic() {
    var music = e('#id-music-player')
    var cur = parseInt(music.dataset.list)
    var a = musicList()
    var len = a.length
    var nextIndex = (cur + 1) % len
    music.dataset.list = nextIndex
    music.src = a[nextIndex].mp3Url
    showName(a[nextIndex])
    changeImg(a[nextIndex].picUrl)
    play()
}
function state() {
    var music = e('#id-music-player')
    if(music.readyState != '0') {
        return;
    }
    setTimeout(checked, 1000)
}
function checked() {
    var music = e('#id-music-player')
    if(music.readyState == '0') {
        log("收费歌曲，无法试听！")
        nextMusic()
    }
}

function lastMusic() {
    var music = e('#id-music-player')
    var cur = parseInt(music.dataset.list)
    var a = musicList()
    var len = a.length
    var lastIndex = (len + cur - 1) % len
    music.dataset.list = lastIndex
    music.src = a[lastIndex].mp3Url
    changeImg(a[lastIndex].picUrl)
    showName(a[lastIndex])
    play()
}

function randomMusic() {
    var arr = musicList()
    var music = e('#id-music-player')
    var cur = parseInt(music.dataset.list)
    var len = arr.length
    var nextIndex = Math.floor(Math.random() * len)
	while(nextIndex == cur) {
		nextIndex = Math.floor(Math.random() * len)
	}
    music.src = arr[nextIndex].mp3Url
	music.dataset.list = nextIndex
	play()
}

function repeatMusic() {
    setTimeout(play, 500)
}

function autoPlay() {
        nextMusic()
}

function bindEventToggleMusic() {
    var last = e('#id-music-last')
    var next = e('#id-music-next')
    bindEvent(last, 'click', lastMusic)
    bindEvent(next, 'click', nextMusic)
}

function bindEventToggleMusic2() {
    var last = e('#id-music-last')
    var next = e('#id-music-next')
    bindEvent(last, 'touchend', lastMusic)
    bindEvent(next, 'touchend', nextMusic)
}

function bindEventPlayMusic() {
    var p = e('#id-music-play')
    var music = e('#id-music-player')
    bindEvent(p, 'click', event => {
        if(music.paused) {
            play()
        } else {
            pause()
        }
    })
}

function bindEventPlayMusic2() {
    var p = e('#id-music-play')
    var music = e('#id-music-player')
    bindEvent(p, 'touchend', event => {
        if(music.paused) {
            play()
        } else {
            pause()
        }
    })
}

function bindEventRate() {
    var button = e('#id-music-rate')
    bindEvent(button, 'click', rateSwitch)
}

function bindEventRate2() {
    var button = e('#id-music-rate')
    bindEvent(button, 'touchend', rateSwitch)
}

function rateSwitch() {
    var button = e('#id-music-rate')
    var music = e('#id-music-player')
    log(button.innerHtml)
    if(button.dataset.rate == 1) {
        music.playbackRate = 2
        button.dataset.rate = 2
        button.innerHTML = "2 X"
        return;
    }
    if (button.dataset.rate == 2) {
        music.playbackRate = 1
        button.dataset.rate = 1
        button.innerHTML = "1 X"
    }
}

function bindAutoPlay() {
    var music = e('#id-music-player')
    bindEvent(music, 'ended', event => {
        pause()
        setTimeout(autoPlay, 500)
    })
}

function changeImg(url) {
    var img = e("#id-music-pic")
    img.src = url
}

function init() {
    musicInit()
    bindEventToggleMusic()
    bindEventPlayMusic()
    bindAutoPlay()
    bindEventRate()
}


function init2() {
    musicInit()
    bindEventToggleMusic2()
    bindEventPlayMusic2()
    bindAutoPlay()
    bindEventRate2()
}

var deviceWidth = window.outerWidth
if(deviceWidth <= 500) {
    init2()
} else {
    init()
}
