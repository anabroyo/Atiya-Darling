let player;
let isPlaying = false;
let playerReady = false;
let openRequested = false;

// Taylor Swift - Love Story (official YouTube video ID)
const VIDEO_ID = "8xg3vE8Ie_E";

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "1",
    width: "1",
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: VIDEO_ID,
      rel: 0,
      modestbranding: 1,
      playsinline: 1
    },
    events: {
      onReady: () => {
        playerReady = true;
        if (openRequested) startMusic();
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          isPlaying = true;
          updateMusicButton();
        } else if (event.data === YT.PlayerState.PAUSED) {
          isPlaying = false;
          updateMusicButton();
        }
      }
    }
  });
}

const landing = document.getElementById("landing");
const memoryPage = document.getElementById("memoryPage");
const openBtn = document.getElementById("openBtn");
const musicToggle = document.getElementById("musicToggle");

function showMemoryPage() {
  landing.classList.add("hidden");
  memoryPage.classList.remove("hidden");
  memoryPage.setAttribute("aria-hidden", "false");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function startMusic() {
  if (!playerReady || !player) return;

  try {
    player.setVolume(45);
    player.playVideo();
    isPlaying = true;
    updateMusicButton();
  } catch (err) {
    console.log("Music could not autoplay:", err);
  }
}

function updateMusicButton() {
  if (!musicToggle) return;
  musicToggle.textContent = isPlaying ? "♫ music on" : "♫ music off";
}

openBtn.addEventListener("click", () => {
  openRequested = true;
  showMemoryPage();
  startMusic();
});

musicToggle.addEventListener("click", () => {
  if (!playerReady || !player) return;

  if (isPlaying) {
    player.pauseVideo();
    isPlaying = false;
  } else {
    player.playVideo();
    isPlaying = true;
  }
  updateMusicButton();
});
