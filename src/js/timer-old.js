//---------------------------------------------

import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const clearBtn = document.querySelector('[data-clear]');
const stopBtn = document.querySelector('[data-stop]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const dateInput = document.querySelector('input#datetime-picker');

let timerId = null;
let selectedDate = 0;
let timeLeft;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'D d M Y H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      clearBtn.disabled = true;
    }
    if (selectedDates[0].getTime() > new Date()) {
      startBtn.disabled = false;
      Notiflix.Notify.success('A date in the future has been selected');
      selectedDate = selectedDates[0].getTime();
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function startTimer() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  clearBtn.disabled = false;
  dateInput.disabled = true;
  Notiflix.Notify.info('Timer started');
  countdown();
  timerId = setInterval(countdown, 1000);
}
function countdown() {
  timeLeft = selectedDate - new Date();
  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
  console.log(timeLeft);
  if (timeLeft < 1000) {
    clearInterval(timerId);
    Notiflix.Notify.info('Countdown is over');
  }
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function clearTimer() {
  clearInterval(timerId);
  dateInput.disabled = false;
  clearBtn.disabled = true;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  timerDays.textContent = '00';
  timerHours.textContent = '00';
  timerMinutes.textContent = '00';
  timerSeconds.textContent = '00';
  Notiflix.Notify.info('Timer has been reset');
}
function stopTimer() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  dateInput.disabled = false;
  Notiflix.Notify.info('Timer stopped');
}
flatpickr(dateInput, flatpickrOptions);
startBtn.addEventListener('click', startTimer);
clearBtn.addEventListener('click', clearTimer);
stopBtn.addEventListener('click', stopTimer);
