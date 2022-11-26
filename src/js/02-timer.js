import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const days1 = document.querySelector('[data-days]');
const hours1 = document.querySelector('[data-hours]');
const minutes1 = document.querySelector('[data-minutes]');
const seconds1 = document.querySelector('[data-seconds]');
let intervalId = null;
let userselectedDates;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userselectedDates = selectedDates[0].getTime();
    if (userselectedDates < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
    clearClockFace();
  },
};
flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  input.disabled = true;
  startBtn.disabled = true;
  start();
});

function start() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    if (currentTime >= userselectedDates) {
      stop();
      input.disabled = false;
      startBtn.disabled = true;
      Notify.info('Time is up');
      return;
    }
    let deltaTime = userselectedDates - currentTime;
    updateClockFace(convertMs(deltaTime));
    console.log('timer on');
  }, 1000);
}

function stop() {
  clearInterval(intervalId);
  console.log('timer off');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  days1.textContent = `${days}`;
  hours1.textContent = `${hours}`;
  minutes1.textContent = `${minutes}`;
  seconds1.textContent = `${seconds}`;
}

function clearClockFace() {
  updateClockFace(convertMs(0));
  stop();
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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
