'use strict';

const productKey = 'products';
const counterIdKey = 'counter';

function loadCards() {
    if (localStorage.getItem('products')) {
        const data = getProducts();
        data.forEach((item) => {
            const productItem = document.createElement('li');
            productItem.classList.add('product-card');
            productItem.innerHTML = `
                <div class="product-desc">
                <h3 class="product-name">${item.product}</h3>
                <ul class="reviews">
                </ul>
                </div>
                <form action="#" class="review-form">
                <textarea class="review-input" placeholder="Ваш отзыв..."></textarea>
                <div class="message"></div>
                <button class="submit-btn">Отправить</button>
                </form>`;
            productList.appendChild(productItem);

            const reviewList = productItem.querySelector(`.reviews`);
            const dataReview = item.reviews;
            dataReview.forEach((review) => {
                const reviewItem = document.createElement('li');
                reviewItem.innerHTML = `<li class="review-content">${review.text}</li>`;
                reviewList.append(reviewItem);
            });
        });
    }
}

function addRewiew(product, review) {
    let productsArr = getProducts();
    let counterID = localStorage.getItem(counterIdKey);
    counterID++;
    const userReview = {
        id: counterID,
        text: review,
    };
    productsArr.forEach((item) => {
        if (item.product === product) {
            item.reviews.push(userReview);
        }
    })
    saveProducts(productsArr)
}

function saveProducts(products) {
    let counterID = 0;
    products.forEach(item => {
        counterID += item.reviews.length;
    });
    const json = JSON.stringify(products);
    localStorage.setItem(productKey, json);
    localStorage.setItem(counterIdKey, counterID);
}

function getProducts() {
    const data = localStorage.getItem(productKey);
    if (data === null) {
        return [];
    }
    return JSON.parse(data);
}



