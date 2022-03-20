const pomodoroText = document.querySelector(".pomodoro");

const pomodoroBox = document.querySelector(".pomodoro-system");
const focusText = pomodoroBox.querySelector(".focus");
const breakText = pomodoroBox.querySelector(".break");
const timer = pomodoroBox.querySelector("h1");
const startButton = pomodoroBox.querySelector(".progress");

pomodoroText.addEventListener("click", function () {
  pomodoroBox.classList.toggle("on");
});

timer.innerText = "25:00";

let TIME;

if (pomodoroBox.className === "pomodoro-system focus-mode") {
  TIME = 1500;
} else if (pomodoroBox.className === "pomodoro-system break-mode") {
  TIME = 300;
}

function focusMode() {
  if (pomodoroBox.className !== "pomodoro-system focus-mode") {
    pomodoroBox.classList.add("focus-mode");
    pomodoroBox.classList.remove("break-mode");
  }

  timer.innerText = "25:00";
  TIME = 1500;
}

function breakMode() {
  if (pomodoroBox.className !== "pomodoro-system break-mode") {
    pomodoroBox.classList.remove("focus-mode");
    pomodoroBox.classList.add("break-mode");
  }

  timer.innerText = "05:00";
  TIME = 300;
}

focusText.addEventListener("click", focusMode);
breakText.addEventListener("click", breakMode);

let progress;
let realtime;

function timerHandler() {
  realtime--;
  let minutes = parseInt(realtime / 60);
  let seconds = realtime % 60;

  timer.innerText = `${String(minutes).padStart(2, 0)}:${String(
    seconds
  ).padStart(2, 0)}`;

  if (realtime < 0) {
    timer.innerText = "Done!";
    clearInterval(progress);
    realtime = TIME;
  }
}

function focusTimer() {
  realtime = TIME;

  if (startButton.innerText === "Start") {
    startButton.innerText = "Reset";
    focusText.style.pointerEvents = "none";
    breakText.style.pointerEvents = "none";

    progress = setInterval(timerHandler, 1000);
  } else if (startButton.innerText === "Reset") {
    startButton.innerText = "Start";

    realtime = TIME;
    clearInterval(progress);

    if (pomodoroBox.classList.contains("focus-mode")) {
      timer.innerText = "25:00";
    } else {
      timer.innerText = "05:00";
    }

    focusText.style.pointerEvents = "auto";
    breakText.style.pointerEvents = "auto";
  }
}

startButton.addEventListener("click", focusTimer);
