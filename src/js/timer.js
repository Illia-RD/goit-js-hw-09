import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const clearBtn = document.querySelector('[data-clear]');
const stopBtn = document.querySelector('[data-stop]');
const dateInput = document.querySelector('input#datetime-picker');
const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

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
    const invalidDate = () => {
      Notiflix.Notify.failure('Please choose a date in the future');
      changeState(true, true, true, false);
    };
    const validDate = () => {
      changeState(false, true, true, false);
      Notiflix.Notify.success('A date in the future has been selected');
      selectedDate = selectedDates[0].getTime();
    };

    selectedDates[0].getTime() <= new Date() ? invalidDate() : validDate();
  },
};
function changeState(startBtnState, stopBtnState, clearBtnState, inputState) {
  startBtn.disabled = startBtnState;
  stopBtn.disabled = stopBtnState;
  clearBtn.disabled = clearBtnState;
  dateInput.disabled = inputState;
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const addLeadingZero = value => String(value).padStart(2, '0');

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function countdown() {
  timeLeft = convertMs(selectedDate - new Date());
  for (let key in timeLeft) {
    timer[key].textContent = timeLeft[key];
  }
  // console.log(timeLeft);
  if (timeLeft < 1000) {
    clearInterval(timerId);
    Notiflix.Notify.info('Countdown is over');
  }
}
function startTimer() {
  changeState(true, false, false, true);
  Notiflix.Notify.info('Timer started');
  countdown();
  timerId = setInterval(countdown, 1000);
}
function clearTimer() {
  clearInterval(timerId);
  changeState(false, true, true, false);

  for (let key in timer) {
    timer[key].textContent = '00';
  }
  Notiflix.Notify.info('Timer has been reset');
}
function stopTimer() {
  clearInterval(timerId);
  changeState(false, true, false, false);

  Notiflix.Notify.info('Timer stopped');
}

flatpickr(dateInput, flatpickrOptions);
startBtn.addEventListener('click', startTimer);
clearBtn.addEventListener('click', clearTimer);
stopBtn.addEventListener('click', stopTimer);
