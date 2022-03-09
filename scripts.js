const FULL_DASH_ARRAY = 283;
const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

const COLOR_CODES = {
  info: {
    color: "orange",
  },
};

let remainingPathColor = COLOR_CODES.info.color;

const timerPath = document.getElementById("path-remaining");
timerPath.classList.add(remainingPathColor);

const formatTimeLeft = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

const calculateTimeFraction = () => {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
};

const setCircleDasharray = () => {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  timerPath.setAttribute("stroke-dasharray", circleDasharray);
};

const onTimesUp = () => {
  clearInterval(timerInterval);
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

    document.getElementById("current-time").innerHTML =
      formatTimeLeft(timeLeft);
    setCircleDasharray();

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
};

document.getElementById("current-time").innerHTML = `${formatTimeLeft(
  timeLeft
)}`;
