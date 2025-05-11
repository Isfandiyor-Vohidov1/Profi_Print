
// Получаем элементы формы и сообщения об ошибке
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Обработчик отправки формы
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Отменяем стандартную отправку формы

    const email = emailInput.value;
    const password = passwordInput.value;

    // Получаем данные из localStorage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    // Проверка введенных данных
    if (email === storedEmail && password === storedPassword) {
        // Сохраняем информацию о входе в localStorage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userEmail', email);

        // Перенаправляем пользователя на главную страницу
        window.location.href = 'index.html';
    } else {
        // Показать ошибку, если данные неверны
        errorMessage.textContent = "Invalid email or password. Please try again.";
    }
});
