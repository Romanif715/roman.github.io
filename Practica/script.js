// ==================== ЗАВДАННЯ 3 ====================
// Статистичний аналіз даних з масиву об'єктів (reduce)

const employees = [
    { name: "Олена", position: "Frontend Developer", salary: 45000, years: 3 },
    { name: "Андрій", position: "Backend Developer", salary: 52000, years: 5 },
    { name: "Марія", position: "QA Engineer", salary: 38000, years: 2 },
    { name: "Ігор", position: "Team Lead", salary: 75000, years: 8 },
    { name: "Наталія", position: "UI/UX Designer", salary: 42000, years: 4 }
];

// Середня зарплата
function getAverageSalary(arr) {
    if (arr.length === 0) return 0;

    const total = arr.reduce((sum, employee) => sum + employee.salary, 0);
    return total / arr.length;
}

// Працівник з найбільшим досвідом
function findMostExperiencedEmployee(arr) {
    return arr.reduce((max, employee) => {
        return employee.years > max.years ? employee : max;
    });
}

// ==================== ЗАВДАННЯ 4 ====================
// Обробка та аналіз даних про книги (reduce + sort)

const books = [
    { title: "Clean Code", author: "Robert C. Martin", year: 2008, rating: 4.7, isRead: true },
    { title: "Effective Java", author: "Joshua Bloch", year: 2018, rating: 4.8, isRead: false },
    { title: "Design Patterns", author: "Gang of Four", year: 1994, rating: 4.6, isRead: true },
    { title: "Java Concurrency in Practice", author: "Brian Goetz", year: 2006, rating: 4.5, isRead: false },
    { title: "Head First Design Patterns", author: "Eric Freeman", year: 2004, rating: 4.4, isRead: true },
    { title: "Refactoring", author: "Martin Fowler", year: 1999, rating: 4.3, isRead: false },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999, rating: 4.7, isRead: true },
    { title: "Clean Architecture", author: "Robert C. Martin", year: 2017, rating: 4.6, isRead: false }
];

// Назви непрочитаних книг
function getUnreadBooks(arr) {
    return arr
        .filter(book => !book.isRead)
        .map(book => book.title);
}

// Книги певного автора, відсортовані за роком (зростання)
function getBooksByAuthor(arr, authorName) {
    return arr
        .filter(book => book.author.toLowerCase() === authorName.toLowerCase())
        .sort((a, b) => a.year - b.year);
}

// Книги з рейтингом > 4, відсортовані за рейтингом (спадання)
function getTopRatedBooks(arr) {
    return arr
        .filter(book => book.rating > 4)
        .sort((a, b) => b.rating - a.rating);
}

// ==================== ПЕРЕВІРКА ====================

console.log("=== ЗАВДАННЯ 3 ===");
console.log("Середня зарплата:", getAverageSalary(employees));
console.log("Найдосвідченіший працівник:", findMostExperiencedEmployee(employees));

console.log("\n=== ЗАВДАННЯ 4 ===");
console.log("Непрочитані книги:", getUnreadBooks(books));
console.log("Книги Robert C. Martin:", getBooksByAuthor(books, "Robert C. Martin"));
console.log("Топ книги (рейтинг > 4):", getTopRatedBooks(books));