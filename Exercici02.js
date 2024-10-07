"use strict";
const infoCells = document.querySelectorAll(
  "#taula_propietats tr > td:nth-child(even)"
);
const elMaxValueJS = infoCells[0],
  elTotalScreenWidth = infoCells[1],
  elTotalInnerWidth = infoCells[2],
  elURL = infoCells[3];
elMaxValueJS.textContent = Number.MAX_VALUE;
elTotalScreenWidth.textContent = screen.height;
elTotalInnerWidth.textContent = window.innerHeight;
elURL.textContent = window.location.href;

// <<===========||===========||===========||===========>>

const btnStartCD = document.querySelector(".btn-start-countdown"),
  btnStopCD = document.querySelector(".btn-stop-countdown"),
  btnPauseCD = document.querySelector(".btn-pause-countdown"),
  btnStopMusic = document.querySelector(".btn-stop-music"),
  inputCDMinutes = document.querySelector("input.input-minutos"),
  inputCDSeconds = document.querySelector("input.input-segundos");

const outputDisplay = document.querySelector(".output-display"),
  outputMinutes = outputDisplay.querySelector(".minutes-output"),
  outputSeconds = outputDisplay.querySelector(".seconds-output"),
  audioCDPlayer = document.getElementById("audio-cd-player");

let intervalCD;
let countdownTime = 0;
let pausedCD = true;
/**
 * Permite restar la cuentra atras 1 segundo y actualizar el texto de salida
 * @returns void
 */
function updateCountdown() {
  if (countdownTime === 0) {
    clearInterval(intervalCD);
    intervalCD == null;
    audioCDPlayer.load();
    audioCDPlayer.play();
    btnStopMusic.style.display = "block";
    return;
  }
  countdownTime--;
  outputMinutes.textContent = (countdownTime / 60).toFixed(0).padStart(2, 0);
  outputSeconds.textContent = (((countdownTime / 60) % 1) * 60)
    .toFixed(0)
    .padStart(2, 0);
}

function togglePauseBtn() {
  if (btnPauseCD.textContent === "Pausar") {
    btnPauseCD.textContent = "Reanudar";
    return;
  }
  btnPauseCD.textContent = "Pausar";
}

btnStartCD.addEventListener("click", (e) => {
  countdownTime = +inputCDMinutes.value * 60 + +inputCDSeconds.value;
  if (countdownTime === 0) return;
  if (intervalCD) {
    clearInterval(intervalCD);
    intervalCD = null;
  }
  updateCountdown();
  intervalCD = setInterval(updateCountdown, 1000);
  pausedCD = true;
  btnPauseCD.textContent = "Pausar";
});

btnStopCD.addEventListener("click", (e) => {
  if (intervalCD) {
    clearInterval(intervalCD);
    intervalCD = null;
  }
  outputMinutes.textContent = outputSeconds.textContent = "00";
  inputCDMinutes.value = inputCDSeconds.value = 0;
  pausedCD = true;
  btnPauseCD.textContent = "Pausar";
});

btnPauseCD.addEventListener("click", (e) => {
  if (!intervalCD) return;
  togglePauseBtn();
  pausedCD = !pausedCD;
  if (pausedCD) {
    intervalCD = setInterval(updateCountdown, 1000);
    return;
  }
  clearInterval(intervalCD);
});
btnStopMusic.addEventListener("click", (e) => {
  audioCDPlayer.pause();
  e.target.style.display = "none";
});

// <<===========||===========||===========||===========>>
const inputAlarmHours = document.querySelector(".alarma .input-alarm-hours"),
  inputAlarmMinutes = document.querySelector(".alarma .input-alarm-minutes"),
  inputAlarmSeconds = document.querySelector(".alarma .input-alarm-seconds"),
  btnSetupAlarm = document.querySelector(".alarma .btn-setup-alarm"),
  btnUnsetAlarm = document.querySelector(".alarma .btn-unset-alarm"),
  btnPlayAudio = document.querySelector(".alarma .control-btns .btn-play"),
  btnStopAudio = document.querySelector(".alarma .control-btns .btn-stop"),
  btnPauseAudio = document.querySelector(".alarma .control-btns .btn-pause"),
  btnMuteAudio = document.querySelector(".alarma .control-btns .btn-mute"),
  btnVolUpAudio = document.querySelector(".alarma .control-btns .btn-vol-up"),
  btnVolDownAudio = document.querySelector(
    ".alarma .control-btns .btn-vol-down"
  ),
  rangeAlarmVolume = document.querySelector(".alarma .range-alarm-volume"),
  selectAlarmAudio = document.getElementById("audio-alarm-select");

const elHour = document.querySelector(".alarma .clock span.hour"),
  elMsgAlarm = document.querySelector(".alarma .message"),
  elOutputElapsed = document.querySelector(".alarma .output-elapsed"),
  audioAlarm = document.getElementById("audio-alarm");

const currentTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  alarmTime = {},
  VOL_ADDITION = 0.15;
/* alarmTime = {
    hours: X hours,
    minutes: X mins,
    seconds: X secs
  } */

let alarmInterval = null;

const formatHours = (time) =>
    `${time.hours.toString().padStart(2, 0)}:${time.minutes
      .toString()
      .padStart(2, 0)}:${time.seconds.toString().padStart(2, 0)}`,
  timeToSeconds = (time) =>
    time.hours * 3600 + time.minutes * 60 + time.seconds;

function updateClock() {
  const time = new Date();

  (currentTime.hours = +time.getHours()),
    (currentTime.minutes = +time.getMinutes()),
    (currentTime.seconds = +time.getSeconds());
  elHour.textContent = formatHours(currentTime);
}

function updateVolume() {
  audioAlarm.volume = +rangeAlarmVolume.value / 100;
}
function volUp() {
  if (+audioAlarm.volume + VOL_ADDITION > 1) {
    rangeAlarmVolume.value = 100;
    audioAlarm.volume = 1;
    return;
  }
  rangeAlarmVolume.value = +rangeAlarmVolume.value + VOL_ADDITION * 100;
  audioAlarm.volume = +audioAlarm.volume + VOL_ADDITION;
}
function volDown() {
  if (+audioAlarm.volume - VOL_ADDITION < 0) {
    rangeAlarmVolume.value = 0;
    audioAlarm.volume = 0;
    return;
  }
  rangeAlarmVolume.value = +rangeAlarmVolume.value - VOL_ADDITION * 100;
  audioAlarm.volume = +audioAlarm.volume - VOL_ADDITION;
}

function playAudio() {
  audioAlarm.src = selectAlarmAudio.value;
  updateVolume();
  audioAlarm.load();
  audioAlarm.muted = false;
  audioAlarm.play();
}
function stopAudio() {
  audioAlarm.src = selectAlarmAudio.value;
  audioAlarm.pause();
  audioAlarm.load();
}
function pauseAudio() {
  if (audioAlarm.paused) {
    updateVolume();
    audioAlarm.play();
    return;
  }
  audioAlarm.pause();
}
function muteAudio() {
  audioAlarm.muted = !audioAlarm.muted;
}

function checkAlarm() {
  if (timeToSeconds(alarmTime) != timeToSeconds(currentTime)) return;
  elMsgAlarm.textContent = "";
  // accion
  clearInterval(alarmInterval);
  alarmInterval = null;
  playAudio();
}

function setAlarm() {
  alarmTime.hours = +inputAlarmHours.value;
  alarmTime.minutes = +inputAlarmMinutes.value;

  alarmTime.seconds = +inputAlarmSeconds.value;
  elMsgAlarm.textContent = `La alarma sonará exactamente a la hora ${formatHours(
    alarmTime
  )}`;
  if (alarmInterval) clearInterval(alarmInterval);
  alarmInterval = setInterval(checkAlarm, 1000);
}

function unsetAlarm() {
  if (alarmInterval) clearInterval(alarmInterval);
  alarmInterval = null;
  elMsgAlarm.textContent = ``;
  inputAlarmHours.value = "";
  inputAlarmMinutes.value = "";
  inputAlarmSeconds.value = "";
  stopAudio();
}

// Hora actual
updateClock();
setInterval(updateClock, 1000);

// Establecer alarma
btnSetupAlarm.addEventListener("click", setAlarm);

// Resetear alarma
btnUnsetAlarm.addEventListener("click", unsetAlarm);

btnPlayAudio.addEventListener("click", playAudio);
btnStopAudio.addEventListener("click", stopAudio);
btnPauseAudio.addEventListener("click", pauseAudio);
btnMuteAudio.addEventListener("click", muteAudio);
rangeAlarmVolume.addEventListener("input", updateVolume);
btnVolUpAudio.addEventListener("click", volUp);
btnVolDownAudio.addEventListener("click", volDown);
