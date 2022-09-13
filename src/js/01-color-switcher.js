const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBg() {
  body.style.backgroundColor = `${getRandomHexColor()}`;
}
function startChangeBg() {
  timer = setInterval(() => changeBg(), 600);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}
function stopChangeBg() {
  clearInterval(timer);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

stopBtn.disabled = true;
startBtn.addEventListener('click', startChangeBg);
stopBtn.addEventListener('click', stopChangeBg);
