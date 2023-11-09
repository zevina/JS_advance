"use strict";

const userLogin = getAuthedUser();
const messageEl = document.querySelector(".message");

if (!userLogin) {
    window.location.href = "login.html";    
} else {
    messageEl.textContent = `Hello ${userLogin}`
}

const btnEl = document.querySelector(".btnExit");
btnEl.addEventListener('click', () => {
    logout();
    window.location.href = "login.html";
});