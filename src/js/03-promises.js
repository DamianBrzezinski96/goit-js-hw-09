'use strict';
import Notiflix from "notiflix";

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
};

const qs = selector => document.querySelector(selector);
const form = qs('.form');

function startPromise({ delay, step, amount }) {
  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
  })
      .catch (({ position, delay }) => {
    setTimeout(() => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }, delay);
});

delay += step;
}
};

function promiseBtn(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  startPromise({
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  });

  e.currentTarget.reset();
}

form.addEventListener('submit', promiseBtn);