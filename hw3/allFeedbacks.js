'use strict';


// для формирования первоначального localstorage:

// const firstFeedbacks = [
//   {
//     product: 'Ноутбук игровой Lenovo IP Gaming 3 16ARH7',
//     feedbacks: ['Быстрый, качественный, не шумный', 'Отличная машина. Можно расширить возможности', 'Я в восторге!'],
//   },
//   {
//     product: '85" Телевизор Samsung QE85QN85',
//     feedbacks: ['Вообще огнище! Отличный телевизор'],
//   },
// ];
// saveFeedbacks(firstFeedbacks);


const container = document.querySelector('.all-products');
const msgEl = document.querySelector('.empty-msg');

displayProducts();

const feedbackBtnEls = document.querySelectorAll('.showFeedback-btn');
const feedbackListEl = document.querySelector('.feedback-list');

feedbackBtnEls.forEach((button) => {
  button.addEventListener('click', () => {
    const currentProduct = button.closest('.product');
    const currentFeedbacks = currentProduct.querySelector('.feedback-list');
    currentFeedbacks.classList.toggle('hidden');
    button.textContent === 'показать отзывы' ? button.textContent = 'скрыть отзывы' : button.textContent = 'показать отзывы';
  })
})

const deleteBtnEls = document.querySelectorAll('.delete-btn');

deleteBtnEls.forEach((button) => {
  button.addEventListener('click', () => {
    const currentProduct = button.closest('.product');
    const currentFeedbackList = button.closest('.feedback-list');
    const currentFeedback = button.closest('.feedback');
    deleteFeedback(currentFeedback.textContent.slice(0, -7));
    currentFeedback.remove();

    if (currentFeedbackList.children.length === 0) {
      currentProduct.remove();
    }
    if (container.children.length === 0) {
      localStorage.removeItem(feedbackKey);
      msgEl.classList.remove('hidden');
    }
  })
})

