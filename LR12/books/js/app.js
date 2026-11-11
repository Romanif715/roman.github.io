
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Підключення до Supabase
const supabaseUrl = 'https://ertnvnowinndqbcuyjro.supabase.co';

// Встав сюди свій sb_publishable ключ із попереднього app.js
const supabaseKey = 'sb_publishable_Bgx4lF5S_I-FZ9Chhwu8zQ_Dm6U3I6D';

const db = createClient(supabaseUrl, supabaseKey);

// Елементи сторінки
const status = document.querySelector('#status');
const list = document.querySelector('#books-list');
const bookForm = document.querySelector('#book-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

// Завантаження книг
async function loadBooks() {
    status.textContent = 'Завантаження книг...';
    list.replaceChildren();

    const { data, error } = await db
        .from('books')
        .select('id, title, author')
        .order('id', { ascending: true });

    if (error) {
        console.error(error);
        status.textContent = 'Помилка завантаження: ' + error.message;
        return;
    }

    if (!data || data.length === 0) {
        status.textContent = 'Книг поки немає.';
        return;
    }

    data.forEach(book => {
        const item = document.createElement('li');
        item.textContent = `${book.title} – ${book.author}`;
        list.appendChild(item);
    });

    status.textContent = `Знайдено книг: ${data.length}`;
}

// Додавання книги
bookForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (!title || !author) {
        status.textContent = 'Заповніть усі поля!';
        return;
    }

    const button = bookForm.querySelector('button');
    button.disabled = true;

    status.textContent = 'Додавання книги...';

    try {
        const { error } = await db
            .from('books')
            .insert([{ title, author }]);

        if (error) {
            console.error(error);
            status.textContent = 'Помилка: ' + error.message;
            return;
        }

        bookForm.reset();
        await loadBooks();

    } catch (error) {
        console.error(error);
        status.textContent = 'Помилка підключення до бази даних.';
    } finally {
        button.disabled = false;
    }
});

// Запуск
loadBooks();
