const title = ['一路向北'];
const singer = ['北夜'];
const music = ['music/一路向北.mp3'];
const cover = ['img/一路向北.png'];
const foreign = [0];
let time = [], lyrics = [], size = [];
let showTime = [];

const lrc = [`[00:00.00]一路向北
[00:02.08]所属专辑：For Huahua: A special cover album
[00:04.90]cover：北夜（Bei Ye）
[00:32.53]后视镜里的世界
[00:39.54]越来越远的道别
[00:44.25]你转身向背 侧脸还是很美
[00:50.65]我用眼光去追 竟听见你的泪
[01:01.24]在车窗外面徘徊 是我错失的机会
[01:12.77]你站的方位 跟我中间隔着泪
[01:18.97]街景一直在后退
[01:22.55]你的崩溃在窗外零碎
[01:26.99]我一路向北 离开有你的季节
[01:34.18]你说你好累 已无法再爱上谁
[01:43.41]风在山路吹
[01:46.09]过往的画面全都是我不对
[01:51.62]细数惭愧我伤你几回
[02:17.90]后视镜里的世界 
[02:24.59]越来越远的道别
[02:29.02]你转身向背 侧脸还是很美
[02:35.53]我用眼光去追 竟听见你的泪
[02:46.04]在车窗外面徘徊 
[02:53.19]是我错失的机会
[02:57.78]你站的方位 跟我中间隔着泪
[03:03.76]街景一直在后退
[03:07.31]你的崩溃在窗外零碎
[03:11.88]我一路向北 离开有你的季节
[03:18.98]你说你好累 已无法再爱上谁
[03:26.18]风在山路吹
[03:28.97]过往的画面全都是我不对
[03:34.40]细数惭愧我伤你几回
[03:41.01]我一路向北 离开有你的季节
[03:47.76]方向盘周围 回转着我的后悔
[03:55.47]我加速超越
[03:57.64]却甩不掉紧紧跟随的伤悲
[04:02.93]细数惭愧我伤你几回
[04:10.32]停止狼狈就让错纯粹`];
//处理歌词
function handleLrc(lrc, index) {
    let time = [], lyrics = [], showTime = [];
    const regex = /^\[(\d{2}):(\d{2})\.(\d{1,})\]/;
    lrc = lrc.split('\n');
    time.push(0), lyrics.push(''), showTime.push('');
    for (let i = 0; i < lrc.length; i++) {
        const match = lrc[i].match(regex);
        if (match) {
            const min = Number(match[1]);
            const sec = Number(match[2]);
            const msec = Number(match[3]) / (10 ** match[3].length);
            let content;
            if (foreign[index] == 0) {
                content = lrc[i].replace(regex, '');
            }
            else {
                content = translation[index][i];
            }
            if (content != '') {
                time.push(min * 60 + sec + msec);
                lyrics.push(content);
                let timeText;
                if (sec < 10) {
                    timeText = min + ':0' + sec;
                }
                else {
                    timeText = min + ':' + sec;
                }
                if (min < 10) {
                    timeText = '0' + timeText;
                }
                showTime.push(timeText);
            }
        }
    }
    time.push(1e9);
    return { time, lyrics, showTime, size: time.length - 2 };
}
lrc.forEach((item, index) => {
    let result = handleLrc(item, index);
    time.push(result.time);
    lyrics.push(result.lyrics);
    showTime.push(result.showTime);
    size.push(result.size);
})
