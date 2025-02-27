const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEL = document.getElementById("current-time"),
  durationEL = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

const song = [
  {
    path: "02.m4a",
    displayName: "Red wine ",
    cover: "01.jpg",
    artist: "Lenna",
  },
  {
    path: "01.m4a",
    displayName: "unstoppable ",
    cover: "001.jpg",
    artist: "sia",
  },
  {
    path: "03.m4a",
    displayName: "Hey Ghose",
    cover: "03.jpg",
    artist: "Canis, Emma",
  },
  {
    path: "04.m4a",
    displayName: "Listen Before I Go",
    cover: "04.jpg",
    artist: "Billie Eilish",
  },
  {
    path: "let.mp3",
    displayName: "Let Me Down Slowly",
    cover: "05.jpg",
    artist: " Alec Benjamin",
  },
  {
    path: "06.m4a",
    displayName: "Age Manteghi She",
    cover: "06.jpg",
    artist: "Feezer ft.Kamand",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-circle-pause", "fa-circle-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + song.length) % song.length;
  loadMusic(song[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  if (!isNaN(duration) && !isNaN(currentTime)) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
    durationEL.textContent = `${formatTime(duration / 60)}:${formatTime(
      duration % 60
    )}`;
    currentTimeEL.textContent = `${formatTime(currentTime / 60)}:${formatTime(
      currentTime % 60
    )}`;
  }
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(song[musicIndex]);
