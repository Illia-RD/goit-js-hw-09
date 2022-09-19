import throttle from 'lodash.throttle';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
const inputSpead = document.querySelector('#change-bg-spead-control');
const currentSpead = document.querySelector('[data-spead]');
let timer = null;
function changeState(startBtnState, stopBtnState, inputSpeadState) {
  startBtn.disabled = startBtnState;
  stopBtn.disabled = stopBtnState;
  inputSpead.disabled = inputSpeadState;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBg() {
  body.style.backgroundColor = `${getRandomHexColor()}`;
  body.style.transition = `${currentSpead.dataset.spead * 4}ms`;
}
function startChangeBg() {
  timer = setInterval(() => changeBg(), currentSpead.dataset.spead * 10);
  changeState(true, false, true);
}
function stopChangeBg() {
  clearInterval(timer);
  changeState(false, true, false);
}
function getSpead() {
  currentSpead.dataset.spead = inputSpead.value;
  currentSpead.textContent = currentSpead.dataset.spead / 100;
}
currentSpead.textContent = currentSpead.dataset.spead / 100;
changeState(false, true, false);
startBtn.addEventListener('click', startChangeBg);
stopBtn.addEventListener('click', stopChangeBg);
inputSpead.addEventListener('input', throttle(getSpead, 100));
