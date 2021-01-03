const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlay = document.getElementById("jsVideo");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreenBtn");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  // eslint-disable-next-line no-use-before-define
  fullScreenBtn.addEventListener("click", goFullScreen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = `${formatDate(Math.floor(videoPlay.currentTime))} `;
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlay.duration);
  totalTime.innerHTML = totalTimeString;
  videoPlay.addEventListener("timeupdate", getCurrentTime);
}

function init() {
  videoPlay.volume = 0.5;
  playBtn.addEventListener("click", () => {
    if (videoPlay.paused) {
      videoPlay.play();
      playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    } else {
      videoPlay.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  volumeBtn.addEventListener("click", () => {
    if (videoPlay.muted) {
      videoPlay.muted = false;
      volumeRange.value = videoPlay.volume;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      volumeRange.value = 0;
      videoPlay.muted = true;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  });

  fullScreenBtn.addEventListener("click", goFullScreen);

  videoPlay.addEventListener("loadedmetadata", setTotalTime);
  videoPlay.addEventListener("ended", () => {
    videoPlay.currentTime = 0;
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  });
  volumeRange.addEventListener("input", (event) => {
    const {
      target: { value },
    } = event;
    videoPlay.volume = value;
    if (value >= 0.5) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if (value >= 0.2) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
  });
}

if (videoContainer) {
  init();
}
