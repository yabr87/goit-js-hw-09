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
let userselectedDates;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userselectedDates = selectedDates[0].getTime();
    if (userselectedDates < Date.now()) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });
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
  timer.start();
});

function updateClockFace({ days, hours, minutes, seconds }) {
  days1.textContent = `${days}`;
  hours1.textContent = `${hours}`;
  minutes1.textContent = `${minutes}`;
  seconds1.textContent = `${seconds}`;
}

function clearClockFace() {
  updateClockFace(timer.convertMs(0));
  timer.stop();
}

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime >= userselectedDates) {
        this.stop();
        input.disabled = false;
        startBtn.disabled = true;
        Notify.info('Time is up', {
          position: 'center-top',
        });
        return;
      }
      let deltaTime = userselectedDates - currentTime;
      const time = this.convertMs(deltaTime);
      this.onTick(time);
      console.log('timer on');
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    console.log('timer off');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({ onTick: updateClockFace });

// class Timer {
//   constructor(start, end, userTime, id) {
//   }
// }
