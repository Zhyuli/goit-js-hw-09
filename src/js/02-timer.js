
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';
// import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.background = '#E6E6FA';

let intervalId = null;
let selectedDate = null;
let currentDate = null;
let remainingTime = 0;

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const timerInput = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');


startBtn.disabled = true;
startBtn.addEventListener('click', timerStart);



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    checkDate(selectedDates);
  },
};

flatpickr(timerInput, options);

function checkDate (selectedDates) {
  selectedDate = selectedDates[0].getTime();
  // currentDate = new Date().getTime();
  currentDate = Date.now();

if (selectedDate > currentDate) {
  startBtn.disabled = false;
Notiflix.Notify.success('Hello!Click on start');
  return;
}
  Notiflix.Notify.failure('Please choose a date in the future');
}

function timerStart() {
  intervalId = setInterval(() => {
    // currentDate = new Date().getTime();
    currentDate = Date.now();
  
    console.log(selectedDate);
    console.log(currentDate);
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      startBtn.disabled = true;
      timerInput.disabled = false;
     Notiflix.Notify.success('Timer stopped!');
      return;
    } else {
      startBtn.disabled = true;
      timerInput.disabled = true;
      currentDate += 1000;
      remainingTime = Math.floor(selectedDate - currentDate);
      convertMs(remainingTime);
    }
  }, 1000);
}

function createMarkup ({days, hours, minutes, seconds}) {
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

 
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  createMarkup ({days, hours, minutes, seconds})
  return { days, hours, minutes, seconds };
}



 



