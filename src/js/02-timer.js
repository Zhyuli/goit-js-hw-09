
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.background = '#E6E6FA';
// let intervalId = null;
// let selectedDate = null;
// let currentDate = null;

const timerDays = document.querySelector('.span[data-days]');
const timerHours = document.querySelector('.span[data-hours]');
const timerMinutes = document.querySelector('.span[data-minutes]');
const timerSeconds = document.querySelector('.span[data-seconds]');
const timerInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');


startBtn.disabled = true;
startBtn.addEventListener('click', startCounter);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure("Please choose a date in the future");
    } else {
      selectedDates = selectedDates[0].getTime();
      startBtn.disabled = false;

      Report.success('click start');
    }
  },
};

flatpickr(timerInput, options);

Report.info('Select the date and click on start');

function startCounter () {
  counter.start();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const counter = {
  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;
      updateTimer(convertMs(deltaTime));
      startBtn.disabled = true;
      timerInput.disabled = true;

      if (deltaTime <= 1000) {
        this.stop();
        Report.info('Timer stopped');
      }
    }, 1000);
  },
  
  stop() {
    startBtn.disabled = true;
    timerInput.disabled = false;
    clearInterval(intervalId);
    return;
  },
};

function updateTimer({days, hours, minutes, seconds}) {
  timerDays.textContent = `${days}`;
  timerHours.textContent = `${hours}`;
  timerMinutes.textContent = `${minutes}`;
  timerSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
     return String(value).padStart(2, '0');
  }


console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}