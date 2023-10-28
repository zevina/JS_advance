"use strict";

/*
Задание 2

Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца:
        Пицца "Маргарита"
        Пицца "Пепперони"
        Пицца "Три сыра"
Суши:
        Суши "Филадельфия"
        Суши "Калифорния"
        Суши "Чизмаки"
        Суши "Сеякемаки"
Десерт:
        Десерт "Тирамису"
        Десерт "Чизкейк"
*/

//Повар
class Cook {
    constructor(name, specialization, dishes = []) {
        this.name = name;
        this.specialization = specialization;
        this.dishes = dishes;
    }

    addDish(dish) {
        if (!this.dishes.includes(dish)) {
            this.dishes.push(dish);
        }
    }
}

// Повара
const oleg = new Cook('Олег', 'Пицца', ['Маргарита', 'Пепперони', 'Три сыра']);
const andrey = new Cook('Андрей', 'Суши', ['Филадельфия', 'Калифорния', 'Чизмаки', 'Сеякемаки']);
const anna = new Cook('Анна', 'Десерт', ['Тирамису', 'Чизкейк']);

const cooks = {
    chefs: [
        oleg,
        andrey,
        anna
    ],
    *[Symbol.iterator]() {
        for (const chef of this.chefs) {
            yield chef;
        }
    }
}

//Меню
const menu = new Set();
for (const cook of cooks) {
    for (const dish of cook.dishes) {
        menu.add(dish);
    }
}

// Посетитель ресторана.
class Client {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

// Класс, который управляет заказами и поварами.
class Manager {
    constructor(menuItems) {
        this.menuItems = menuItems;
        this.clients = new Set();
        this.orders = new Map();
    }

    /**
   * Метод формирует новый заказ для клиента, объединяя данные с предыдущими заказами при их наличии. 
   *
   * @param {Object} client - клиент
   * @param {...Object} dishes - блюда в текущем заказе
   * @throws {Error} ошибка, если хотя бы одного блюда текущего заказа нет в меню
   */
    newOrder(client, ...dishes) {

        const isValidDish = (dish) => {
            return this.menuItems.has(dish.name);
        };

        const mergeOrders = (clientOrders, newDishes) => {
            const result = [...clientOrders];
            newDishes.forEach(dishNew => {
                const dishExist = result.find(dishExist => dishExist.name === dishNew.name);
                if (dishExist) {
                    dishExist.quantity += dishNew.quantity;
                } else {
                    result.push(dishNew);
                }
            });
            return result;
        };


        for (const dish of dishes) {
            if (!isValidDish(dish)) {
                throw new Error(`${dish.type} "${dish.name}" - такого блюда не существует.`);
            }
        }
        if (!this.clients.has(client)) {
            this.clients.add(client)
            this.orders.set(client, [...dishes])
        }
        else {
            const clientOrders = this.orders.get(client);
            const newDishes = [...dishes];
            this.orders.set(client, mergeOrders(clientOrders, newDishes))
        }
        const clientOrders = this.orders.get(client);
        clientOrders.forEach(order => {
            switch (order.type) {
                case 'Пицца':
                    order.cook = oleg.name;
                    break;
                case 'Суши':
                    order.cook = andrey.name;
                    break;
                case 'Десерт':
                    order.cook = anna.name;
                    break;
            }
        });

        console.log(`Клиент ${client.firstname} заказал:`);
        this.orders.get(client).forEach((value) => { console.log(`${value.type} "${value.name}" - ${value.quantity}; готовит повар ${value.cook}`); })
    }
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager(menu);

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
    new Client("Иван", "Иванов"),
    { name: "Маргарита", quantity: 1, type: "Пицца" },
    { name: "Пепперони", quantity: 2, type: "Пицца" },
    { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
    clientPavel,
    { name: "Филадельфия", quantity: 5, type: "Суши" },
    { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
    clientPavel,
    { name: "Калифорния", quantity: 1, type: "Суши" },
    { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
    clientPavel,
    { name: "Филадельфия", quantity: 1, type: "Суши" },
    { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.