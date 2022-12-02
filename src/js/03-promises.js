import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function createPromise(delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  let deley = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);

  if (deley < 0 || step < 0 || amount <= 0) {
    alert('Зповніть вcі поля.');
    return;
  }
  for (let position = 1; position <= amount; position++) {
    createPromise(deley)
      .then(() => {
        Notify.success(`✅ Fulfilled promise ${position} in ${deley}ms`, {
          useIcon: false,
        });
      })
      .catch(() => {
        Notify.failure(`❌ Rejected promise ${position} in ${deley}ms`, {
          useIcon: false,
        });
      });
    deley += step;
  }
  event.currentTarget.reset();
}
