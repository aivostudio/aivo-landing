/* =====================================================================
   AIVO STUDIO — TEMİZ, SORUNSUZ SES KAYDI SCRIPTİ
   ===================================================================== */

let mediaRecorder;
let audioChunks = [];
let recording = false;
let timerInterval;
let seconds = 0;

const recordBtn = document.getElementById("recordToggleBtn");
const timerDisplay = document.getElementById("recordTimer");
const overlay = document.getElementById("recordingOverlay");
const overlayTimer = document.getElementById("overlayTimer");
const overlayStopBtn = document.getElementById("overlayStopBtn");
const overlayCancelBtn = document.getElementById("overlayCancelBtn");

const resultCard = document.getElementById("recordResultCard");
const resultTime = document.getElementById("recordResultTime");
const resultPlayBtn = document.getElementById("resultPlayBtn");
const resultDownloadBtn = document.getElementById("resultDownloadBtn");
const resultDeleteBtn = document.getElementById("resultDeleteBtn");

let audioBlob = null;
let audioUrl = null;
let audioElement = null;

/* -----------------------------------------------------------
   TIMER FONKSİYONU
----------------------------------------------------------- */
function startTimer(displayElement) {
  seconds = 0;

  timerInterval = setInterval(() => {
    seconds++;
    let min = String(Math.floor(seconds / 60)).padStart(2, "0");
    let sec = String(seconds % 60).padStart(2, "0");
    displayElement.textContent = `${min}:${sec}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

/* -----------------------------------------------------------
   SES KAYDINI BAŞLATMA
----------------------------------------------------------- */
recordBtn.addEventListener("click", async () => {
  if (recording) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
      audioUrl = URL.createObjectURL(audioBlob);

      audioElement = new Audio(audioUrl);
      resultCard.style.display = "block";
      resultTime.textContent = overlayTimer.textContent;
    };

    mediaRecorder.start();
    recording = true;

    overlay.style.display = "flex";
    startTimer(overlayTimer);

  } catch (e) {
    alert("Mikrofona erişilemiyor! Tarayıcına izin ver.");
  }
});

/* -----------------------------------------------------------
   OVERLAY DURDUR
----------------------------------------------------------- */
overlayStopBtn.addEventListener("click", () => {
  if (!recording) return;

  mediaRecorder.stop();
  recording = false;

  stopTimer();
  overlay.style.display = "none";
  overlayTimer.textContent = "00:00";
});

/* -----------------------------------------------------------
   OVERLAY İPTAL (KAYIT SİL)
----------------------------------------------------------- */
overlayCancelBtn.addEventListener("click", () => {
  if (recording) {
    mediaRecorder.stop();
    recording = false;
  }

  audioChunks = [];
  overlay.style.display = "none";
  stopTimer();
  overlayTimer.textContent = "00:00";
});

/* -----------------------------------------------------------
   PLAY BUTONU
----------------------------------------------------------- */
resultPlayBtn.addEventListener("click", () => {
  if (!audioElement) return;

  if (audioElement.paused) {
    audioElement.play();
    resultPlayBtn.textContent = "⏸";
  } else {
    audioElement.pause();
    resultPlayBtn.textContent = "▶️";
  }
});

/* -----------------------------------------------------------
   DOWNLOAD BUTONU
----------------------------------------------------------- */
resultDownloadBtn.addEventListener("click", () => {
  if (!audioBlob) return;

  const a = document.createElement("a");
  a.href = audioUrl;
  a.download = "aivo_record.mp3";
  a.click();
});

/* -----------------------------------------------------------
   DELETE BUTONU
----------------------------------------------------------- */
resultDeleteBtn.addEventListener("click", () => {
  audioBlob = null;
  audioElement = null;
  audioUrl = null;

  resultCard.style.display = "none";
});
