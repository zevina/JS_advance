'use strict';

const feedbackKey = 'feedbacks';

function saveFeedbacks(feedbacks) {
  const json = JSON.stringify(feedbacks);
  localStorage.setItem(feedbackKey, json);
}

function getFeedbacks() {
  const data = localStorage.getItem(feedbackKey);
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
}

function addFeedback(userProduct, userFeedback) {
  const productsArr = getFeedbacks();
  if (productsArr.length === 0) {
    const firstItem = {
      product: userProduct,
      feedbacks: [userFeedback],
    };
    productsArr.push(firstItem);
  } else {
    let isFound = false;
    productsArr.forEach((item) => {
      if (item.product === userProduct) {
        item.feedbacks.push(userFeedback);
        isFound = true;
      }
    });
    if (!isFound) {
      const newItem = {
        product: userProduct,
        feedbacks: [userFeedback],
      };
      productsArr.push(newItem);
    }
  }
  saveFeedbacks(productsArr)
}
[{ "product": "Lenovo", "feedbacks": ["Классный ноутбук!", "И для работы и для учебы супер"] }, { "product": "Sony", "feedbacks": ["Красочные цвета, современный дизайн"] }]
function deleteFeedback(feedbackToDelete) {
  const data = localStorage.getItem(feedbackKey);
  const newData = JSON.parse(data);
  newData.forEach(item => {
    item.feedbacks = item.feedbacks.filter(feedback => feedback !== feedbackToDelete);
  })
  saveFeedbacks(newData);
}

function displayProducts() {
  const productsArr = getFeedbacks();

  if (productsArr.length !== 0) {
    container.innerHTML = '';

    productsArr.forEach((item) => {
      if (item.feedbacks.length !== 0) {
        msgEl.classList.add('hidden');
        const productContainer = document.createElement('div');
        productContainer.classList.add('product');

        const productName = document.createElement('p');
        productName.textContent = item.product;
        productName.classList.add('product-name');

        const showFeedbackBtnEl = document.createElement('button');
        showFeedbackBtnEl.textContent = 'показать отзывы';
        showFeedbackBtnEl.classList.add('showFeedback-btn');

        const feedbacksContainer = document.createElement('div');
        feedbacksContainer.classList.add('feedbacks');

        const feedbackListEl = document.createElement('ul');
        feedbackListEl.classList.add('feedback-list', 'hidden');

        for (const feedback of item.feedbacks) {
          const feedbackEl = document.createElement('li');
          feedbackEl.textContent = feedback;
          feedbackEl.classList.add('feedback');

          const deleteBtnEl = document.createElement('button');
          deleteBtnEl.textContent = 'удалить';
          deleteBtnEl.classList.add('delete-btn');
          feedbackEl.appendChild(deleteBtnEl);

          feedbackListEl.appendChild(feedbackEl);
        }
        feedbacksContainer.appendChild(feedbackListEl);

        productContainer.appendChild(productName);
        productContainer.appendChild(showFeedbackBtnEl);
        productContainer.appendChild(feedbacksContainer);
        container.appendChild(productContainer);
      }
    });
  }
}