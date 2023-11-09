"use strict";

const btnEl = document.querySelector(".btn");
const inputLoginEl = document.querySelector(".login");
const inputPasswordEl = document.querySelector(".password");
const messageEl = document.querySelector(".message");

btnEl.addEventListener("click", () => {
  const user = findUser(inputLoginEl.value);
  if (user && user.password === inputPasswordEl.value) {
    authUser(inputLoginEl.value);
    window.location.href = "hello.html";
  } else {
    messageEl.textContent = "Не верный логин и пароль";
  }
});

