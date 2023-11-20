'use strict';

const formEl = document.querySelector('.feedback-form');
const btnEl = formEl.querySelector('.feedback-btn');

formEl.addEventListener('input', event => {
  if (!event.target.classList.contains('form-input')) {
    return;
  }
  event.target.value === ''
    ? event.target.classList.add('error')
    : event.target.classList.remove('error');
});

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const productInput = document.querySelector('.feedback-input');
  const feedbackInput = document.querySelector('.feedback-text');
  if (productInput.value === '' || feedbackInput.value === '') {
    productInput.classList.add('error');
    feedbackInput.classList.add('error');
    document.querySelector('.error-msg').classList.remove('hidden');
  } else {
    addFeedback(productInput.value, feedbackInput.value);
    productInput.value = '';
    feedbackInput.value = '';
  }
});
