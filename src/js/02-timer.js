'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from "notiflix";

let timerID = null;
const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);
const input = qs('#date-selector');
const start = qs('[data-start]');
const stop = qs('[data-stop]');
const days = qs('[data-days]');
const hours = qs('[data-hours]');
const minutes = qs('[data-minutes]');
const seconds = qs('[data-seconds]');
const timer = qs('.timer');
const numbers = qsa('.value');
const timerSections = qsa('.field');
let selDate;

// timer style
input.style.fontSize = '25px';
timer.style.marginTop = '20px';
timer.style.display = 'flex';
timer.style.flexDirection = 'flex';
start.style.fontSize = '25px';
stop.style.fontSize = '25px';


for (const section of timerSections) {
  section.style.display = 'flex';
  section.style.flexDirection = 'column';
  section.style.alignItems = 'center';
  section.style.marginRight = '10px';
    section.style.textTransform = 'uppercase';
    section.style.fontWeight = '500';
};

for (const number of numbers) {
  number.style.fontSize = '40px';
};

// timer object

start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  

  onClose(selectedDates) {
    const dateCurrent = new Date();
    selDate = selectedDates[0];
    if (selectedDates[0].getTime() - dateCurrent.getTime() <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      start.disabled = true;
    } else {
        Notiflix.Notify.success('You will wait a while :D');
      start.disabled = false;
    }
  },
};


flatpickr(input, options);

// EventListener buttons

start.addEventListener('click', timerInitializer);
stop.addEventListener('click', timerDestructor);

// start button

function timerInitializer() {
  start.disabled = true;
  timerID = setInterval(() => {
    const dateCurrent = new Date();
    const ms = selDate.getTime() - dateCurrent.getTime();

    if (ms <= 0) {
      timerDestructor();
    } else {
      

      const timerTotal = convertMs(ms);
      days.textContent = `${addLeadingZero(timerTotal.days)}`;
      hours.textContent = `${addLeadingZero(timerTotal.hours)}`;
      minutes.textContent = `${addLeadingZero(timerTotal.minutes)}`;
      seconds.textContent = `${addLeadingZero(timerTotal.seconds)}`;
    }
  }, 1000);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

// stop button

function timerDestructor() {
    start.disabled = false;
  clearInterval(timerID);
  days.textContent = '00';
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

