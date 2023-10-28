/*
Задание 4.
Представьте себе ситуацию: у нас есть группа студентов, и мы хотим отследить, 
кто из них посетил какие уроки и кто из преподавателей вёл данные уроки. 

Необходимо: 
1. Создать Map объект, который будет использоваться для хранения соответствия 
между уроком и преподавателем, урок => преподаватель.
2. Необходимо создать Map объект, ключами которого будут объекты студентов,
а значениями будут Set объекты, которые будут хранить уроки, посещенные 
студентом.
*/

const ivan = {
    name: "Иван",
};

const lessonsTeacher = new Map();
lessonsTeacher.set('Математика', 'Смирнов');
lessonsTeacher.set('Литература', 'Пушкиин');
lessonsTeacher.set('Английский', 'Браун');

const ivanLessons = new Set();
ivanLessons.add('Математика')
ivanLessons.add('История')

const studentLessons = new Map();
studentLessons.set(ivan, ivanLessons);

console.log(lessonsTeacher);

// Преподаватель по Математике: Смирнов.
console.log(`Преподаватель по математике: ${lessonsTeacher.get('Математика')}`);
// Уроки Ивана: Математика, История.
console.log(`Уроки Ивана: ${Array.from(studentLessons.get(ivan)).join(', ')}`);