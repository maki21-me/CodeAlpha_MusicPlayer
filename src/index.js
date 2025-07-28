const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const songList = document.getElementById('song-list');

const songs = [
  {
    name: "Music/Ba.mp3",
    title: "Back-ground Music",
  },

  {
    name: "Music/ex.mp3",
    title: "exciting Music",
  },

  {
    name: "Music/hbd.mp3",
    title: "Birthday Music",
  },

  {
    name: "Music/HBD2.mp3",
    title: "Birthday Music 2",
  },

  {
    name: "Music/Mot.mp3",
    title: "Motivational Music",
  },

  {
    name: "Music/SHO.mp3",
    title: "show reel Music",
  },

  {
    name: "Music/so.mp3",
    title: "Soft Music",
  }
];



let songIndex = 0;

// Load Song
function loadSong(song) {
  title.textContent = song.title;
 audio.src = song.name;

}

loadSong(songs[songIndex]);

// Play / Pause
let isPlaying = false;

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = '⏸';
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// Next / Prev
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Progress Bar
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Volume Control
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title}`;
  li.addEventListener('click', () => {
    songIndex = index;
    loadSong(song);
    playSong();
  });
  songList.appendChild(li);
});

// Autoplay next
audio.addEventListener('ended', nextSong);
