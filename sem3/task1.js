'use strict';
/*
Задание 1: 
Вы разрабатываете прототип веб-приложения для чтения новостей. Статьи "хранятся" 
во внутреннем массиве (имитируя базу данных). Когда пользователь нажимает на 
кнопку "Загрузить новости", ваш код должен имитировать задержку, словно 
происходит реальная загрузка данных из внешнего источника, а после этой 
задержки — отображать новости на странице.
 
1. Создайте базовую HTML-структуру с кнопкой для загрузки новостей и контейнером 
для их отображения.
2. Реализуйте функцию fetchNews(), возвращающую промис. Эта функция должна 
имитировать задержку в 2 секунды перед успешным возвращением данных из 
"виртуальной" базы данных. Для добавления интереса: с вероятностью 10% она 
должна возвращать ошибку вместо данных.
3. При нажатии на кнопку "Загрузить новости" вызывайте функцию fetchNews(), 
обрабатывая успешное выполнение и ошибки с использованием then() и catch().
При успешной загрузке отобразите статьи на странице. При ошибке покажите 
сообщение об ошибке.
4. Добавьте функционал, который отключает кнопку загрузки на время "загрузки" 
новостей и активирует её снова после завершения операции (будь то успешная 
загрузка или ошибка).
*/

const articlsArr = [
    {"title": 'Hello',
     "text": " Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cupiditate quisquam quis placeat perspiciatis voluptas reprehenderit fugit accusantium inventore qui officiis pariatur nisi eveniet quam sit amet necessitatibus, nemo illum!"},
    {"title": 'Hi',
    "text": " Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cupiditate quisquam quis placeat perspiciatis voluptas reprehenderit fugit accusantium inventore qui officiis pariatur nisi eveniet quam sit amet necessitatibus, nemo illum!"},
    {"title":  "Good day",   
    "text" : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cupiditate quisquam quis placeat perspiciatis voluptas reprehenderit fugit accusantium inventore qui officiis pariatur nisi eveniet quam sit amet necessitatibus, nemo illum!"},
];
function fetchNews() {
    return new Promise((resolve, reject) => {        
        setTimeout(() => {
            const randomNumber = Math.random();
            if (randomNumber > 0.5) {
                resolve(articlsArr);
            } else {
                reject(new Error("404"));
            }           
        },2000)
    });
}
const btnEl = document.querySelector('.addNews');
const divEl = document.querySelector('.news');
btnEl.addEventListener('click', () => {
    btnEl.disabled = true;
    const promis = fetchNews();
    promis.then(result =>{
        divEl.innerHTML = result.map((article) => `<div>
        <h3>${article.title}</h3>
        <p>${article.text}</p>
        </div>`).join("");
    }).catch(error => console.log(error)).finally(() => btnEl.disabled = false);    
        
});