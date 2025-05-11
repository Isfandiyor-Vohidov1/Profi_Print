// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация хедера при скролле
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Анимация элементов при появлении в viewport
const animateOnScroll = function () {
    const elements = document.querySelectorAll('.feature-item, .item, .form');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Инициализация анимаций
window.addEventListener('load', function () {
    const animatedElements = document.querySelectorAll('.feature-item, .item, .form');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Запускаем проверку при загрузке
    animateOnScroll();
});

// Проверка при скролле
window.addEventListener('scroll', animateOnScroll);

// Параллакс эффект для героя
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// Проверка состояния регистрации пользователя
window.onload = function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const accountSection = document.getElementById('accountSection');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutButton = document.getElementById('logoutButton');
    const popup = document.getElementById('popup');

    if (isLoggedIn) {
        // Если пользователь вошел в систему
        welcomeMessage.textContent = 'Welcome back!';
        logoutButton.style.display = 'inline-block'; // Показываем кнопку выхода

        // При выходе очищаем состояние
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('isLoggedIn');
            window.location.reload(); // Перезагружаем страницу, чтобы скрыть окно регистрации
        });
    } else {
        popup.style.display = 'block'; // Показать всплывающее окно для регистрации
    }
};

// Обработка формы
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const confirmation = document.getElementById('confirmationMessage');
    confirmation.classList.remove('hidden');

    // Анимация подтверждения
    confirmation.style.animation = 'none';
    void confirmation.offsetWidth; // Trigger reflow
    confirmation.style.animation = 'fadeIn 0.5s ease';

    // Скрываем форму
    this.style.display = 'none';

    // Сброс формы через 5 секунд
    setTimeout(() => {
        confirmation.classList.add('hidden');
        this.style.display = 'block';
        this.reset();
    }, 5000);
});
