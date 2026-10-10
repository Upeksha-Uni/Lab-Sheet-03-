document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Effect for Hero Section
    const words = ["Full-Stack.", "with Git & GitHub.", "Clean Code.", "Teamwork."];
    let i = 0;
    const typedTextSpan = document.querySelector('.typed-text');
    
    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                typedTextSpan.textContent += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return;
            }
            setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                typedTextSpan.textContent = word.join("");
            } else {
                i = (i + 1) % words.length;
                setTimeout(typingEffect, 500);
                return;
            }
            setTimeout(loopDeleting, 50);
        };
        loopDeleting();
    }
    
    if (typedTextSpan) {
        typingEffect();
    }

    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.getElementById('navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }

    // 3. Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && themeToggle) {
            themeToggle.textContent = '☀️';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            }
        });
    }

    // 4. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            if (nameInput.value.trim() === '') {
                setError(nameInput, 'Name cannot be blank');
                isValid = false;
            } else {
                setSuccess(nameInput);
            }

            if (emailInput.value.trim() === '') {
                setError(emailInput, 'Email cannot be blank');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                setError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                setSuccess(emailInput);
            }

            if (messageInput.value.trim() === '') {
                setError(messageInput, 'Message cannot be blank');
                isValid = false;
            } else {
                setSuccess(messageInput);
            }

            if (isValid) {
                if (formMessage) {
                    formMessage.style.display = 'block';
                    formMessage.style.color = 'green';
                }
                form.reset();
                setTimeout(() => {
                    if (formMessage) {
                        formMessage.style.display = 'none';
                    }
                }, 4000);
            }
        });
    }

    function setError(input, message) {
        const formGroup = input.parentElement;
        
        let errorSmall = formGroup.querySelector('.error-msg');
        if (!errorSmall) {
            errorSmall = document.createElement('small');
            errorSmall.className = 'error-msg';
            errorSmall.style.color = 'red';
            formGroup.appendChild(errorSmall);
        }
        errorSmall.textContent = message;
        formGroup.classList.add('error');
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        const errorSmall = formGroup.querySelector('.error-msg');
        if (errorSmall) {
            errorSmall.textContent = '';
        }
        formGroup.classList.remove('error');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
