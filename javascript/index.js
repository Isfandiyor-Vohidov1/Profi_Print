

const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioGrid = document.getElementById('portfolio-grid');
const itemsPerPage = 9;
let currentPage = 0;

function renderGallery() {
    portfolioItems.forEach((item, index) => {
        if (index >= currentPage * itemsPerPage && index < (currentPage + 1) * itemsPerPage) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

document.getElementById('next').addEventListener('click', () => {
    if ((currentPage + 1) * itemsPerPage < portfolioItems.length) {
        currentPage++;
        renderGallery();
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        renderGallery();
    }
});

renderGallery(); // первоначальный рендер






// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Theme switcher
const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    updateThemeIcon();
}

themeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const theme = body.classList.contains('dark-theme') ? 'dark-theme' : '';
    localStorage.setItem('theme', theme);
    updateThemeIcon();
});

function updateThemeIcon() {
    themeSwitch.innerHTML = body.classList.contains('dark-theme') ?
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}
// Animation on scroll
const animateElements = document.querySelectorAll('.feature-item, .portfolio-item, .testimonial, .contact-card');

function checkAnimation() {
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + windowHeight;

    animateElements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;

        if (elementBottom >= windowTop && elementTop <= windowBottom) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', checkAnimation);
window.addEventListener('load', checkAnimation);

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} — $${item.price}`;
        const btn = document.createElement("button");
        btn.textContent = "Удалить";
        btn.onclick = () => {
            cart.splice(index, 1);
            saveCart();
        };
        li.appendChild(btn);
        cartItems.appendChild(li);
        total += item.price;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
    const modal = document.getElementById("cart-modal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function toggleHistory() {
    const modal = document.getElementById("history-modal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
    showPurchaseHistory();
}

function checkout() {
    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    purchaseHistory.push({
        date: new Date().toISOString(),
        total: total,
        items: [...cart]
    });

    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
    cart = [];
    saveCart();
    toggleCart();
    alert(`Заказ оформлен на сумму $${total.toFixed(2)}!`);
}

function showPurchaseHistory() {
    const historyList = document.getElementById("purchase-history");
    historyList.innerHTML = "";

    purchaseHistory.forEach(order => {
        const li = document.createElement("li");
        li.innerHTML = `
            Заказ на сумму: $${order.total.toFixed(2)} 
            (${new Date(order.date).toLocaleString()})
            <ul>
                ${order.items.map(item => `<li>${item.name}</li>`).join("")}
            </ul>
        `;
        historyList.appendChild(li);
    });
}

// Добавляем кнопки "Добавить в корзину" ко всем товарам портфолио
document.addEventListener("DOMContentLoaded", function () {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach((item, index) => {
        const title = item.querySelector("h3")?.textContent.trim() || `Box #${index + 1}`;
        const price = Math.floor(Math.random() * 20) + 10; // случайная цена

        const btn = document.createElement("button");
        btn.textContent = `Добавить в корзину ($${price})`;
        btn.className = "add-to-cart-btn";
        btn.onclick = () => {
            cart.push({ name: title, price: price });
            saveCart();
            alert(`${title} добавлен в корзину`);
        };

        item.appendChild(btn);
    });

    updateCartUI();
});