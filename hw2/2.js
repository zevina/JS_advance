"use strict";

/*
Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

saveProducts(initialData);
const productList = document.querySelector('.product-list');
loadCards();

const submitButtons = document.querySelectorAll('.submit-btn');

submitButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentProduct = button.closest('.product-card');
    const productName = currentProduct.querySelector('.product-name').textContent;
    const reviewInput = currentProduct.querySelector(`.review-input`);
    const reviewUsList = currentProduct.querySelector(`.reviews`);
    const reviewData = reviewInput.value;
    const messageEl = currentProduct.querySelector(`.message`);

    if (reviewData.length < 50 || reviewData.length > 500) {
      messageEl.textContent = 'отзыв должен быть не менее 50 символов в длину и не более 500';
      messageEl.style.display = 'block';
    } else {
      const reviewUserItem = document.createElement('li');
      reviewUserItem.innerHTML = `<li class="review-content">${reviewData}</li>`;
      reviewUsList.appendChild(reviewUserItem);
      addRewiew(productName, reviewData);
      reviewInput.value = '';
      messageEl.style.display = 'none';
    }
  });
})