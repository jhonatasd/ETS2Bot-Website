document.addEventListener('DOMContentLoaded', () => {
    // Atualiza estatísticas simuladas
    function updateStats() {
        const randomValue = (max) => Math.floor(Math.random() * max);
        document.getElementById('server-count').textContent = randomValue(1000);
        document.getElementById('user-count').textContent = randomValue(50000);
        document.getElementById('trips-count').textContent = randomValue(100000);
    }

    // Inicializar estatísticas e agendar atualizações periódicas
    updateStats();
    setInterval(updateStats, 5000);

    // Navegação suave
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    initSmoothScroll();

    // Alteração de estilo da navbar durante o scroll
    function initNavbarScrollEffect() {
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            nav.style.backgroundColor = window.scrollY > 50
                ? 'rgba(44, 62, 80, 0.95)'
                : 'var(--primary-color)';
        });
    }
    initNavbarScrollEffect();

    // Animações de hover para cartões
    function initCommandCardHover() {
        const commandCards = document.querySelectorAll('.command-card');
        commandCards.forEach(card => {
            card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
            card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
        });
    }
    initCommandCardHover();

    // Configuração do botão "Voltar ao topo"
    function initBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'back-to-top';
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        });
    }
    initBackToTopButton();

    // Carregar estatísticas reais de uma API
    async function loadRealStats() {
        try {
            const response = await fetch('https://sua-api.com/bot-stats');
            if (!response.ok) throw new Error('Falha ao buscar dados');
            const data = await response.json();

            document.getElementById('server-count').textContent = data.servers || 0;
            document.getElementById('user-count').textContent = data.users || 0;
            document.getElementById('trips-count').textContent = data.trips || 0;
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    }
    // loadRealStats(); // Descomente para usar dados reais

    // Inicializar alternância de tema (claro/escuro)
    function initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            localStorage.setItem('dark-theme', isDark);
        });

        // Aplicar tema salvo
        const savedTheme = localStorage.getItem('dark-theme');
        if (savedTheme === 'true') {
            document.body.classList.add('dark-theme');
        }
    }
    initThemeToggle();

    // Animações de entrada baseadas em scroll
    function initAnimateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        });

        elements.forEach(element => observer.observe(element));
    }
    initAnimateOnScroll();

    // Inicializar menu mobile
    function initMobileMenu() {
        const menuButton = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuButton && navLinks) {
            menuButton.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuButton.classList.toggle('active');
            });
        }
    }
    initMobileMenu();

    // Carregar animação de loading
    function hideLoader() {
        const loader = document.querySelector('.loader');
        if (loader) loader.style.display = 'none';
    }
    window.addEventListener('load', hideLoader);

    // Validação de formulário
    function validateContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]');
            const message = form.querySelector('textarea');

            if (email?.value && message?.value) {
                alert('Mensagem enviada com sucesso!');
                form.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
    validateContactForm();
});
