const control_container = document.querySelector('.control-container');
const video = document.querySelector('video');
const play_btn = document.querySelector('.play');
const volume_percent = document.querySelector('.volume-percent');
let volume = document.querySelector('.volume');

function hide_controls(){
    control_container.style.opacity=0;
}
function show_controls(){
    control_container.style.opacity=1;
}

function video_play(){
    if (video.paused){
        video.play();
        play_btn.classList.remove('fa-play');
        play_btn.classList.add('fa-pause');
    }
    else {
        video.pause();
        play_btn.classList.add('fa-play');
        play_btn.classList.remove('fa-pause');
    }
}

function seekButton(n){
    video.currentTime += (n*5)
}

video.addEventListener('timeupdate',()=>{
    let percent = video.currentTime/video.duration * 100;
    let line = document.querySelector('.tow-line');
    line.style.width=percent+"%";
})

function show_volume(){
    volume_percent.style.opacity=1;
}
function hide_volume(){
    volume_percent.style.opacity=0;
}

document.onkeydown = (e)=>{
    switch (e.key){
        case 'ArrowUp':
            if (video.volume < 1){
                video.volume = (video.volume + 0.1).toFixed(1);
                volume_percent.innerHTML = video.volume * 100+"%";
                volume_percent.classList.add('opacity');
                if(volume.classList.contains('fa-volume-mute')){
                    volume.classList.remove("fa-volume-mute");
                }
                if(video.volume >= 0.3){
                    volume.classList.add('fa-volume-high');
                    volume.classList.remove('fa-volume-low');
                }
                if(video.muted){
                    video.muted=false;
                    volume.classList.remove("fa-volume-off");
                }
            }
            break;
        case 'ArrowDown':{
            if (video.volume > 0){
                video.volume = (video.volume - 0.1).toFixed(1);
                volume_percent.innerHTML = video.volume * 100+"%";
                volume_percent.classList.add('opacity');
                if(video.volume <= 0.3){
                    volume.classList.remove('fa-volume-high');
                    volume.classList.add('fa-volume-low');
                }
                if (video.volume==0){
                    volume.classList.add('fa-volume-mute');
                }
            }
            if(video.muted){
                video.muted=false;
                volume.classList.remove("fa-volume-off");
            }
            break;
        }
        case ' ':
            video_play()
            break;
        case 'ArrowRight':{
            video.currentTime += 5;
        }
        break;
        case 'ArrowLeft':{
            video.currentTime -= 5;
        }
        break;
        case 'Enter':{
            full_screen();
        }
    }

}

function full_screen(){
    if(video.requestFullscreen){
        video.requestFullscreen();
    }
    if(document.exitFullscreen){
        document.exitFullscreen()
    }
}

function mute_volume(){
    if (video.muted){
        video.muted = false;
        volume.classList.remove('fa-volume-off');
        volume_percent.innerHTML = (video.volume * 100) +'%';
    }
    else {
        video.muted = true;
        volume.classList.add('fa-volume-off');
        volume_percent.innerHTML = (video.volume * 100) +'%';
    }
}

function stop(){
    video_play();
    video.currentTime=0;
}