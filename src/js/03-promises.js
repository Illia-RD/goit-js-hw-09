import { Notify } from 'notiflix/build/notiflix-notify-aio';

const promises = document.querySelector('.form');
promises.addEventListener('submit', event => {
  event.preventDefault();

  const formElement = event.currentTarget.elements;
  let delay = Number(formElement.delay.value);
  let step = Number(formElement.step.value);
  let amount = Number(formElement.amount.value);

  for (let iposition = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
