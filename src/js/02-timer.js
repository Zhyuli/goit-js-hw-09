
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.background = '#E6E6FA';

// let intervalId = null;
// let selectedDate = null;
// let currentDate = null;

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const timerInput = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');


startBtn.disabled = true;
startBtn.addEventListener('click', timerStart);

let remainingTime = 0;

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

Report.info('Select the date and click on start');
  
function checkDate (selectedDates) {
  const selectedDate = selectedDates[0].getTime();
  const currentDate = new Date().getTime();

if (selectedDate > currentDate) {
  startBtn.disabled = false;
  Report.success('Click on start!');
  return;
}
Report.failure('Please, choose a date in the future');
}

function timerStart() {
  const intervalId = setInterval(() => {
    const currentDate = new Date().getTime();
 
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      startBtn.disabled = true;
      timerInput.disabled = false;
      Report.info('Timer stopped!');
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



 



