'use strict';

const usersKey = 'users';
const userLoginKey = 'auth';

function addUsers(login, password) {
    const usersArr = getUsers();
    if (usersArr.some((user) => user.login === login)) {
        throw new Error("User already exists");
    }
    usersArr.push({login, password});
    saveUsers(usersArr);
}
 
function getUsers() {
    const data = localStorage.getItem(usersKey);
    if (data === null) {
        return [];
    } 
    return JSON.parse(data);    
}

function saveUsers(usersArr) {
    const json = JSON.stringify(usersArr); 
    localStorage.setItem(usersKey, json);
}

function findUser(login) {
    return getUsers().find((user) => user.login === login);    
}

function authUser(login) {
    localStorage.setItem(userLoginKey, login);
}

function getAuthedUser() {
    return localStorage.getItem(userLoginKey);
}

function logout() {
    localStorage.removeItem(userLoginKey);
}