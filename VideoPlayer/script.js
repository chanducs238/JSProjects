const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const timeStamp = document.getElementById('timestamp');
const progress = document.getElementById('progress');

// play and pause video
function toggleVideoStatus() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// update play/pause icon
function updatePlayIcon() {
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'; 
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'; 
    }

}

// update progress and timestamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    let minutes = Math.floor(video.currentTime / 60);
    if(minutes < 10){
        minutes = '0' + String(minutes);
    }

    let seconds = Math.floor(video.currentTime % 60);
    if(seconds) {
        seconds = '0' + String(seconds);  
    }

    timeStamp.innerHTML = `${minutes}:${seconds}`;
}

// stop video
function stopVideo() {
        video.currentTime = 0;
        video.pause();
}

//set video time progress
function setVideoProgess() {
    video.currentTime =(+progress.value * video.duration) / 100;
}

// event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);


play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgess);