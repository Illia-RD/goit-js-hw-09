import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
let convertedDate = 0;
const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
//  const selectedDate = selectedDates[0].getTime();
//  checkData(selectedDate, new Date());
// const selectedDate = selectedDates[0].getTime();
// checkData(selectedDate, new Date());
// function checkData(selectedDate) {
//   if (selectedDate <= dateNow.getTime()) {
//     Notiflix.Notify.failure('Please choose a date in the future');
//     startBtn.disabled = true;
//   }
//   if (selectedDate > dateNow.getTime()) {
//     startBtn.disabled = false;
//   }
// }
//   console.log('sld', selectedDate);
//   console.log('dfd', dateNow.getTime());
//   console.log('dateNow', new Date().getTime());
// }
// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

function startTimer() {
  console.log('converted data =>', convertedDate);
}

startBtn.disabled = true;
flatpickr('input#datetime-picker', flatpickrOptions);
startBtn.addEventListener('click', startTimer);
