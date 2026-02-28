const themeToggle = document.getElementById('themeToggle');
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const body = document.body;

        // --- Theme Logic ---
        const savedTheme = localStorage.getItem('dark');
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            themeToggle.querySelector('i').className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        // --- Hamburger Logic ---
        function toggleMenu() {
            const isOpening = !navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').className = isOpening ? 'fas fa-times' : 'fas fa-bars';
        }

        menuToggle.addEventListener('click', toggleMenu);

        // Auto-close menu when link clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) toggleMenu();
            });
        });

        const observerOptions = {
    threshold: 0.15 // Triggers when 15% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop watching once it has revealed
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Target all elements with the 'reveal' class
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));