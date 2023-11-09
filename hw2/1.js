"use strict";

/*
Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
  #books = [];

  constructor(books) {
    const uniqueBooks = new Set();
    books.forEach(book => {
      uniqueBooks.add(book.title);
    });
    if (uniqueBooks.size !== books.length) {
      throw new Error('There are duplicate books in the array!');
    }
    this.#books = books;
  }

  // get allBooks() {
  //   return this.#books;
  // }
  // get allBooks() {
  //   return JSON.stringify(this.#books, null, 2);
  // }
  get allBooks() {
    const bookList = [];
    this.#books.forEach((book, index) => bookList.push(`${++index}. ${book.author} - "${book.title}"`));
    return bookList.join(`\n`);
  }

  addBook(title, author) {
    if (this.hasBook(title)) {
      throw new Error('A book with this title already exists!');
    }
    this.#books.push({ title, author });
  }

  removeBook(title) {
    if (!this.hasBook(title)) {
      throw new Error("A book with this title doesn't exists!");
    }
    this.#books = this.#books.filter(book => book.title !== title);
  }

  hasBook(title) {
    return this.#books.some(book => book.title === title);
  }
}

const bookArr = [
  {
    title: '1984',
    author: 'George Orwell',
  },
  {
    title: 'Robinson Crusoe',
    author: 'Daniel Defoe',
  },
  {
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
  },
  // {
  //   title: 'The Picture of Dorian Gray',
  //   author: 'Oscar Wilde',
  // },
];

const bookLibrary = new Library(bookArr);
console.log(bookLibrary.allBooks);

bookLibrary.addBook('Dracula', 'Bram Stoker');
console.log(bookLibrary.allBooks);
// bookLibrary.addBook('Dracula', 'Bram Stoker');

bookLibrary.removeBook('Dracula');
console.log(bookLibrary.allBooks);
// bookLibrary.removeBook('Dracula');