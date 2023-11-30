import { Notify } from 'notiflix/build/notiflix-notify-aio';

const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');
const delay = document.querySelector('[name="delay"]');

form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
   
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
     
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
} 


function onSubmit(event) {
  event.preventDefault();

  let valueDelay = +delay.value;
  let step = +step.value;
  let amount = +amount.value;

  for (let i = 1; i <= amount; i += 1) {
    let promiseDelay = valueDelay + step * 1;

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}


